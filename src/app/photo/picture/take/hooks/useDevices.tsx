// hooks/useDevices.js
import { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// カメラデバイスを取得・管理するカスタムフック
export const useDevices = () => {
  const router = useRouter();
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);

  const refreshDevices = useCallback(async () => {
    if (!navigator.mediaDevices) {
      alert("カメラ、またはマイクへのアクセスがブロックされています。ブラウザの設定を確認してください。");
      router.push('/photo/picture');
      return;
    }

    const latestDevices = (
      await navigator.mediaDevices.enumerateDevices()
    ).filter(d => d.kind === "videoinput");

    setDevices(latestDevices);
  }, []);

  useEffect(() => {
    refreshDevices();
    navigator.mediaDevices?.addEventListener("devicechange", refreshDevices);

    return () => {
      navigator.mediaDevices?.removeEventListener("devicechange", refreshDevices);
    };
  }, [refreshDevices]);

  return devices;
};
