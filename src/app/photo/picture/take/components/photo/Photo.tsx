"use client"

import stylesVideo from '../../styles/video.module.scss';
import stylesContent from '../../../../styles/content.module.scss';
import useModal from '../../hooks/useModal';
import Modal from 'react-modal';
import { useEffect, useState } from 'react';
import { usePhotoCapture } from '../../hooks/usePhotoCapture';
import PhotoResultModal from './PhotoResultModal';
import useAudioPhotoCapture from '../../hooks/useAudioPhotoCapture';

export default function Photo({ device }: { device: MediaDeviceInfo | undefined }) {
  const [ playButton, setPlayButton ] = useState<boolean>(false);
  const { videoRef, photoUrl, setPhotoUrl, capturePhoto } = usePhotoCapture({ device });
  const { isOpen, openModal, closeModal } = useModal();
  const { audioRef, playAudioAndCapturePhoto } = useAudioPhotoCapture(openModal, capturePhoto);

  useEffect(() => {
    Modal.setAppElement('#root_modal');
  }, []);

  // モーダル閉じると、撮影した写真とサムネイルを削除する。
  const closeModalHandle = () => {
    setPhotoUrl("");
    closeModal();
    setPlayButton(false);
  };

  const handlePlayButtonClick = () => {
    playAudioAndCapturePhoto();
    setPlayButton(true);
  }

  console.log(playButton)

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
          className={`${stylesVideo.video} ${playButton ? stylesVideo.recording_border_blue : ''}`}>
        </video>
        <audio ref={audioRef} src="/audio/movie2.mp4" /> 
      </div>
      <div className={stylesContent.container}>
        <button
          className={`${stylesContent.video_upload_button}`}
          onClick={handlePlayButtonClick}
        > 
          撮影する
        </button>
      </div>
      <PhotoResultModal modalIsOpen={isOpen} closeModal={closeModalHandle} thumbnailUrl={photoUrl}/>
    </>
  );
} 
