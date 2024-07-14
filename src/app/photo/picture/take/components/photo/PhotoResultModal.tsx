"use client"

import React, { useEffect } from 'react';
import Modal from 'react-modal';
import style from '../../styles/photo_result_modal.module.scss';
import PhotoUploadConfirm from './PhotoUploadConfirm';
import { useS3Upload } from '../../hooks/useS3Upload';
import { useRouter } from 'next/navigation';
import ReactLoading from 'react-loading';
import { useResetAllAtoms } from "@/app/photo/hooks/useResetAllAtom";

interface PhotoResultModalProps {
  modalIsOpen: boolean;
  closeModal: () => void;
  thumbnailUrl: string | undefined;
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

const PhotoResultModal: React.FC<PhotoResultModalProps> = ({ modalIsOpen, closeModal, thumbnailUrl }) => {
  const { uploadStatus, upload, isLoading } = useS3Upload()
  const resetAllAtoms = useResetAllAtoms();
  const router = useRouter();

  useEffect(() => {
    if (!uploadStatus) return;

    switch (uploadStatus) {
      case 'アップロードが成功しました！':
        alert('アップロードが完了しました。解析一覧画面にて解析完了をお待ちください');
        resetAllAtoms();
        router.push('/photo/list');
        break;
      case 'アップロードが失敗しました！':
      default:
        alert('アップロードに失敗しました。お手数ですが最初からやり直してください。');
        resetAllAtoms();
        router.push('/photo/picture');
    }
  }, [uploadStatus, router, resetAllAtoms]);

  const handleUpload = async () => {
    await upload();
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Photo Confirmation Modal"
      shouldCloseOnOverlayClick={false}
    >
      <div className={style.modalContent}>
        <h2 className={style.modalTitle}>写真確認</h2>
        <div className={style.imageContainer}>
          <img src={thumbnailUrl} alt="撮影した写真" className={style.image} />
        </div>
        <PhotoUploadConfirm />
        <div className={style.buttonContainer}>
          <button className={`${style.button} ${style.buttonCancel}`} onClick={closeModal}>
            やり直す
          </button>
          <button className={`${style.button} ${style.buttonUpload}`} onClick={handleUpload}>
            アップロード
          </button>
        </div>

        {isLoading && (
          <div className={style.overlay}>
            <div className={style.loadingContainer}>
              <ReactLoading type="bars" color="#000000" />
              <p className={style.loadingText}>
                アップロードしています。<br />
                1分ほどかかります。少々お待ちください。
              </p>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default PhotoResultModal;
