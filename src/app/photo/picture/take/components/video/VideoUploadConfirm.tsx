import React from 'react';
import styles from '../../styles/video_upload_confirm.module.scss';

const VideoUploadConfirm = () => (
  <div className={styles.confirmContainer}>
    <h3 className={styles.confirmTitle}>動画撮影内容確認</h3>
    <p className={styles.confirmText}>
      こちらの動画でよろしいですか？撮り直したい場合は「やり直す」ボタンで再度撮影して下さい。
    </p>
  </div>
);

export default VideoUploadConfirm;
