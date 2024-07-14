import React from 'react';
import styles from '../../styles/photo_upload_confirm.module.scss';

const PhotoUploadConfirm = () => {
  return (
    <div className={styles.confirmContainer}>
      <h3 className={styles.confirmTitle}>写真撮影内容確認</h3>
      <p className={styles.confirmText}>
        こちらの写真でよろしいですか？撮り直したい場合は「やり直す」ボタンで再度撮影して下さい。
      </p>
    </div>
  );
};

export default PhotoUploadConfirm;
