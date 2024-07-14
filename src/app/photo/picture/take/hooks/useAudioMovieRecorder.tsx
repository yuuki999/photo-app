import { useRef, useState, useEffect } from 'react';

function useAudioMovieRecorder(
    startRecording: { (): void; (): void; }, 
    stopRecording: { (): void; (): void; },
    onRecordingComplete: () => void
  ) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [seconds, setSeconds] = useState(59);

  // 音声を再生し、終了後に録画を開始する
  const playAudioAndStartRecording = () => {    
    const audio = audioRef.current;
    if (audio) {
      audioRef.current.src = "/audio/movie1.mp4";
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          console.log("音声を流す");
          audio.addEventListener('ended', () => {
            console.log("音声再生終了");
            startRecording();
            setIsRecording(true);
          }, { once: true });
        }).catch(error => {
          console.error("音声再生に失敗しました。: ", error);
        });
      }
    }
  };

  // 音声を2つ流す場合
  // const playAudioAndStartRecording = async () => {
  //   const audios = ["/audio/movie2.mp3", "/audio/movie1.mp3"];
  
  //   for (let i = 0; i < audios.length; i++) {
  //     const src = audios[i];
  //     if (audioRef.current) {
  //       audioRef.current.src = src;
  //       try {
  //         await audioRef.current.play();
  
  //         // 2つ目の音声が再生を開始したら録画を開始
  //         // （1つ目の音声が終了後に撮影を開始すると、たまにラグで2つ目の音声が遅れて流れることがあり挙動がおかしく見えるののでこれで回避）
  //         if (i === 1) {
  //           startRecording();
  //           setIsRecording(true);
  //         }
  
  //         await new Promise<void>((resolve, reject) => {
  //           if (audioRef.current) {
  //             const handler = () => {
  //               resolve();
  //             };
  //             audioRef.current.addEventListener('ended', handler, { once: true });
  //           } else {
  //             reject(new Error("'audioRef.current' is null"));
  //           }
  //         });
  //       } catch (error) {
  //         console.error("音声再生に失敗しました。: ", error);
  //       }
  //     } else {
  //       console.error("'audioRef.current' is null at the beginning of the loop");
  //       break; // audioRef.current が null ならループを中断
  //     }
  //   }
  //   // すべてのファイルが再生された後の処理があればここに記述。
    
  // };
  
  // 59秒で自動的に録画を停止する
  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (isRecording) {
      interval = setInterval(() => {
        setSeconds((prevSeconds: number) => {
          if (prevSeconds <= 1) {
            stopRecording();  // 0秒で録画停止
            setIsRecording(false); // レコードを止める
            onRecordingComplete();  // 録画停止後にモーダル表示関数を呼び出す
            return prevSeconds;  // 秒数リセット
          }
          return prevSeconds - 1;  // 秒数を1減らす
        });
      }, 1000);
    } else {
      clearInterval(interval);  // インターバル(秒数自動カウント)をクリア
      setSeconds(59);  // 秒数リセット
    }

    return () => clearInterval(interval);  // クリーンアップ
  }, [isRecording]);

  return { audioRef, playAudioAndStartRecording, seconds, setSeconds, setIsRecording };
}

export default useAudioMovieRecorder;
