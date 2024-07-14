"use client";

import { useState } from "react";
import { showComponentAtom } from "../state/showComponentAtom";
import { useAtom } from "jotai";
import { recordedVideoAtom, capturePhotoAtom, thumbnailUrlAtom } from "../state/mediaAtoms";
import { memberIdAtom } from "@/app/photo/state/memberAtoms";
import { useRouter } from 'next/navigation';
import { useResetAllAtoms } from "@/app/photo/hooks/useResetAllAtom";
import { uploadMedia } from "./uploadMedia";

export const useS3Upload = () => {
  const router = useRouter();
  const [uploadStatus, setUploadStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [, setShowComponent] = useAtom(showComponentAtom);
  const [recordedVideoUrl, setRecordedVideoUrl] = useAtom(recordedVideoAtom);
  const [capturePhotoUrl, setCapturePhotoUrl] = useAtom(capturePhotoAtom);
  const [, setThumbnailUrl] = useAtom(thumbnailUrlAtom);
  const [memberId] = useAtom(memberIdAtom);
  const resetAllAtoms = useResetAllAtoms();

  const upload = async () => {
    if (!memberId) {
      alert("クライアント様の情報が正しくありません。管理者に問い合わせてください");
      resetAllAtoms();
      router.push('/photo/picture');
      return;
    }

    if (!recordedVideoUrl || !capturePhotoUrl) {
      alert("撮影済みの動画または写真がありません。もう一度撮り直してください。");
      setShowComponent('video');
      setRecordedVideoUrl(undefined);
      setCapturePhotoUrl(undefined);
      setThumbnailUrl(undefined);
      return;
    }

    setIsLoading(true);
    const startTime = performance.now();

    try {
      // Blob を Base64 エンコードされた文字列に変換
      const videoBlob = await fetch(recordedVideoUrl).then(res => res.blob());
      const photoBlob = await fetch(capturePhotoUrl).then(res => res.blob());

      const videoBase64 = await blobToBase64(videoBlob);
      const photoBase64 = await blobToBase64(photoBlob);

      const result = await uploadMedia(videoBase64, photoBase64, memberId);

      const endTime = performance.now();
      const timeTaken = (endTime - startTime) / 1000;
      console.log(`Supabaseにファイルをアップロードする処理時間: ${timeTaken.toFixed(2)}秒`);

      setUploadStatus(result.message);
    } catch (error) {
      console.error(error);
      setUploadStatus('アップロードが失敗しました！');
    } finally {
      setIsLoading(false);
    }
  }


  return { uploadStatus, upload, isLoading };
}

// Blob を Base64 に変換するヘルパー関数。server actionではオブジェクトのみを渡せるので、Base64に変換する必要がある。
function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

