"use client"

import stylesVideo from '../../styles/video.module.scss';
import stylesContent from '../../../../styles/content.module.scss';
import { useVideoRecorder } from "../../hooks/useVideoRecorder";
import useModal from '../../hooks/useModal';
import Modal from 'react-modal';
import { useEffect, useState } from 'react';
import VideoResultModal from './VideoResultModal';
import useAudioMovieRecorder from '../../hooks/useAudioMovieRecorder';


export default function Video({ device }: { device: MediaDeviceInfo | undefined }) {
  const [ playButton, setPlayButton ] = useState<boolean>(false);
  const { videoRef, isRecording, recordedVideo, setRecordedVideo, thumbnailUrl, setThumbnailUrl, startRecording, stopRecording, setupMedia, resetRecordingSetup } = useVideoRecorder({ device });
  const { isOpen, openModal, closeModal } = useModal();

  useEffect(() => {
    Modal.setAppElement('#root_modal');
  }, []);

  // レコードを停止して、モーダルを開く。
  const stopHandle = () => {
    stopRecording(); // 録画自体を止める。
    openModal();
    setIsRecording(false); // 録画中かどうかを制御
    setPlayButton(false);
    // stopRecordingとsetIsRecordingの名称が分かりずらい...
  };

  const { audioRef, playAudioAndStartRecording, seconds, setSeconds, setIsRecording } = useAudioMovieRecorder(startRecording, stopRecording, stopHandle);

  // モーダル閉じると、撮影した動画とサムネイルを削除する。
  const closeModalHandle = () => {
    resetRecordingSetup(); // カメラを止める
    setupMedia(); // カメラを再設定する。こうしないと前撮った動画が、撮り直した動画に連結されてしまう。
    // 動画URLがあれば、ブラウザからデータを解放する
    if (recordedVideo) {
      URL.revokeObjectURL(recordedVideo);
      setRecordedVideo(undefined);
    }
    if (thumbnailUrl) {
      URL.revokeObjectURL(thumbnailUrl);
      setThumbnailUrl(undefined);
    }

    closeModal();
    setPlayButton(false);
  };


  const handlePlayButtonClick = () => {
    playAudioAndStartRecording();
    setPlayButton(true);
  }

  // レコーディングが始まったら、ボタンstateを非活性にする。
  useEffect(() => {
    isRecording ?? setPlayButton(false);
  }, [isRecording]);

  return (
    <>
      <div id="root_modal" className={stylesVideo.container}>
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          height="530px"
          width="530px"
          className={
            `${playButton && !isRecording ? stylesVideo.recording_border_blue : ''}
            ${isRecording ? stylesVideo.recording_border_red : ''}`
          }
        ></video>
        <audio ref={audioRef} />
      </div>
      <div className={stylesContent.container}>
        <button
          className={`${stylesContent.video_upload_button} ${isRecording ? stylesContent.video_upload_button_disabled : ''}`}
          onClick={handlePlayButtonClick}
          disabled={isRecording}
        > 
          撮影開始
        </button>

        {/* 撮影経過時間を表示 */}
        {isRecording && <div className={stylesVideo.timer}>{seconds} 秒</div>}

        <button
          className={`${stylesContent.video_upload_button} ${!isRecording ? stylesContent.video_upload_button_disabled : ''}`}
          onClick={stopHandle}
          disabled={!isRecording}
        >
          撮影完了
        </button>
      </div>
      <VideoResultModal modalIsOpen={isOpen} closeModal={closeModalHandle} movieUrl={recordedVideo}/>
    </>
  );
} 
