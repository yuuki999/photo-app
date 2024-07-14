// useVideoRecorder.js
import { useEffect, useRef, useState } from 'react';
import { isMobileDevice, supportedMimeType } from "@/app/photo/libs/utils";
import { recordedVideoAtom, thumbnailUrlAtom } from '../state/mediaAtoms';
import { useAtom } from 'jotai';

export const useVideoRecorder = ({ device }: { device: MediaDeviceInfo | undefined }) => {
  const videoRef = useRef<HTMLVideoElement>(null); // 動画撮影DOMの参照
  const mediaRecorderRef = useRef<MediaRecorder | null>(null); // 動画撮影DOMの制御
  const [isRecording, setIsRecording] = useState(false); // 録画中かどうか
  const [recordedVideo, setRecordedVideo] = useAtom(recordedVideoAtom); // 録画した動画
  const [thumbnailUrl, setThumbnailUrl] = useAtom(thumbnailUrlAtom); // サムネイルのURL
  const [uploadStatus, setUploadStatus] = useState(""); // 処理状況

  // カメラをセットする。
  const setupMedia = async () => {
    if (!videoRef.current || !device) {
      return;
    }

    const isMobile = isMobileDevice();
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { 
        deviceId: device.deviceId,
        ...(isMobile && { facingMode: { exact: "environment" } }) // モバイルなら背面カメラを使用
      },
    });
    if (videoRef.current) {
      videoRef.current.srcObject = stream;
    }
    const mimeType = await supportedMimeType();
    mediaRecorderRef.current = new MediaRecorder(stream, { mimeType: mimeType, videoBitsPerSecond: 500000 }); // ビデオの品質管理
    const recordedChunks: BlobPart[] = [];
    mediaRecorderRef.current.addEventListener("dataavailable", (event) => {
      if (event.data.size > 0) {
        recordedChunks.push(event.data);
      }
    });
    // 録画停止時に動画をブラウザに保存する。
    mediaRecorderRef.current.addEventListener("stop", () => {
      const blob = new Blob(recordedChunks, { type: mimeType });
      const url = URL.createObjectURL(blob);
      setRecordedVideo(url);
    });
  };

  // カメラを止める。ドキュメント: https://developer.mozilla.org/ja/docs/Web/API/MediaStreamTrack/stop
  const resetRecordingSetup = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
    }

    if (mediaRecorderRef.current) {
      if (mediaRecorderRef.current.state !== "inactive") {
        mediaRecorderRef.current.stop();
      }
      mediaRecorderRef.current = null;
    }
  };

  useEffect(() => {
    setupMedia(); // カメラ起動

    // コンポーネントがアンマウントされたら、ストリームを停止する。
    return () => {
      resetRecordingSetup();
    };
  }, [device]);

  // 録画開始
  const startRecording = () => {
    console.log("録画開始");
    if (!mediaRecorderRef.current) return;
    if (recordedVideo) {
      alert("すでに動画を撮影済みです。");
      return;
    }
    mediaRecorderRef.current.start();
    setIsRecording(true);
  };

  // 録画停止に関する処理
  const stopRecording = () => {
    console.log("録画停止");
    if (!mediaRecorderRef.current) return;
    mediaRecorderRef.current.stop();
    setIsRecording(false);
    // 動画のサムネイル生成
    generateThumbnail();
  };

  // 動画からサムネイルを生成する
  const generateThumbnail = () => {
    if (thumbnailUrl) {
      // サムネイルがあるということは動画を撮影ずみということ
      alert("すでに動画を撮影済みです。");
      return;
    }
    const videoElement = videoRef.current;
    if (!videoElement) return;
    const canvas = document.createElement('canvas');
    canvas.width = videoElement.videoWidth; // 動画の幅
    canvas.height = videoElement.videoHeight; // 動画の高さ
    // canvasに動画のフレームを描画
    const context = canvas.getContext('2d');
    if (!context) return;
    context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
    // canvasの内容を画像としてエクスポートし、サムネイルのURLとしてstateに保存
    canvas.toBlob((blob) => {
      if(blob) {
        const thumbnailUrl = URL.createObjectURL(blob);
        setThumbnailUrl(thumbnailUrl);
      }
    }, 'image/jpeg');
  };

  return { 
    videoRef, 
    isRecording, setIsRecording, 
    recordedVideo, setRecordedVideo,
    thumbnailUrl, setThumbnailUrl,
    uploadStatus, setUploadStatus, 
    startRecording, stopRecording,
    setupMedia, resetRecordingSetup
  };
};
