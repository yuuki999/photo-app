import React from 'react';
import Modal from 'react-modal';
import style from '../../styles/video_result_modal.module.scss';
import VideoUploadConfirm from './VideoUploadConfirm';
import { useAtom } from 'jotai';
import { showComponentAtom } from '../../state/showComponentAtom';

interface VideoResultModalProps {
  modalIsOpen: boolean;
  closeModal: () => void;
  movieUrl?: string | undefined;
}

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    maxWidth: '800px',
    height: 'auto',
    maxHeight: '90vh',
    padding: '20px',
    borderRadius: '10px',
  },
};

const VideoResultModal: React.FC<VideoResultModalProps> = ({ modalIsOpen, closeModal, movieUrl}) => {
  const [, setShowComponent] = useAtom(showComponentAtom);

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Video Confirmation Modal"
      shouldCloseOnOverlayClick={false}
    >
      <div className={style.modalContent}>
        <h2 className={style.modalTitle}>撮影確認</h2>
        <div className={style.videoContainer}>
          <video src={movieUrl} controls className={style.video}>
            お使いのブラウザはvideoタグをサポートしていません。
          </video>
        </div>
        <VideoUploadConfirm />
        <div className={style.buttonContainer}>
          <button className={`${style.button} ${style.buttonCancel}`} onClick={closeModal}>
            やり直す
          </button>
          <button className={`${style.button} ${style.buttonUpload}`} onClick={() => {setShowComponent("photo")}}>
            続ける
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default VideoResultModal;
