import { useRef } from 'react';

function useAudioPhotoCapture(
    openModal: () => void,
    capturePhoto: () => void  // 写真を撮影する関数を引数に追加
) {
  const audioRef = useRef<HTMLAudioElement>(null);

  const playAudioAndCapturePhoto = () => {
    const audio = audioRef.current;
    if (audio) {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          console.log("音声を流す");
          audio.addEventListener('ended', () => {
            console.log("音声再生終了");
            capturePhoto();  // 写真を撮影
            openModal(); // 撮影後のモーダルを表示
          }, { once: true });
        }).catch(error => {
          console.error("音声再生に失敗しました。: ", error);
        });
      }
    }
  };

  return { audioRef, playAudioAndCapturePhoto };
}

export default useAudioPhotoCapture;
