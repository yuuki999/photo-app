import React from 'react';
import styles from '../../styles/upload.module.scss';

interface FileUploadProps {
  handleFileChange: any;
  handleUpload: any;
  isUploadDisabled: boolean;
  uploadStatus?: string;
  isFormValid: boolean;
}

const FileUpload: React.FC<FileUploadProps> = ({
  handleFileChange,
  handleUpload,
  isUploadDisabled,
  isFormValid
}) => {
  return (
    <div className={styles.wrapper_container}>
      <div className={styles.container}>
        <div className={styles.form_row}>
          <div className={styles.form_group}>
            <label className={styles.label}>動画</label>
            <input
              type="file"
              onChange={(e) => handleFileChange(e, 'video')}
              accept=".mov,.mp4"
              className={styles.input_file}
            />
          </div>
          <div className={styles.form_group}>
            <label className={styles.label}>静止画</label>
            <input
              type="file"
              onChange={(e) => handleFileChange(e, 'image')}
              accept=".jpeg,.jpg"
              className={styles.input_file}
            />
          </div>
        </div>

        <button
          onClick={handleUpload}
          disabled={isUploadDisabled}
          className={isUploadDisabled && !isFormValid ? `${styles.video_upload_button} ${styles.video_upload_button_disabled}` : styles.video_upload_button}
        >
          アップロード
        </button>
      </div>
    </div>
  );
};

export default FileUpload;
