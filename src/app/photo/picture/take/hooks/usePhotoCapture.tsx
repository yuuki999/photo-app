import { isMobileDevice } from '@/app/photo/libs/utils';
import { useEffect, useRef, useState } from 'react';
import { capturePhotoAtom } from '../state/mediaAtoms';
import { useAtom } from 'jotai';

export const usePhotoCapture = ({ device }: { device: MediaDeviceInfo | undefined }) => {
  const videoRef = useRef<HTMLVideoElement>(null); // 写真撮影用のビデオストリームDOMの参照
  const [isCameraReady, setIsCameraReady] = useState(false); // カメラの準備状況
  const [photoUrl, setPhotoUrl] = useAtom(capturePhotoAtom); // 撮影した写真のURL

  useEffect(() => {
    let activeStream: MediaStream | null = null; 

    if (!videoRef.current || !device) {
      return;
    }
    const setupMedia = async () => {
      const isMobile = isMobileDevice();
      const stream = await navigator.mediaDevices.getUserMedia({ // これが実行されると、ビデオマークがつく。
        video: { 
          deviceId: device.deviceId,
          ...(isMobile && { facingMode: { exact: "environment" } }) // モバイルなら背面カメラを使用
        },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream; // カメラをDOMにセットする。
        activeStream = stream; // カメラをOFFにするために、activeStreamにセットする。
        setIsCameraReady(true);
      }
    };
    setupMedia();

    return () => {
      if (activeStream) {
        activeStream.getTracks().forEach(track => {
          track.stop();  // カメラをOFFにする。
        });
      }
    }
  }, [device]);

  // 写真撮影
  const capturePhoto = () => {
    if (!videoRef.current) return;

    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;

    const context = canvas.getContext('2d');
    if (!context) return;
    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

    canvas.toBlob(blob => {
      if (blob) {
        const photoUrl = URL.createObjectURL(blob); // 画像データを保存
        setPhotoUrl(photoUrl);
      }
    }, 'image/jpeg');
  };

  return { 
    videoRef, 
    isCameraReady, 
    photoUrl, setPhotoUrl,
    capturePhoto
  };
};
