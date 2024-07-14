import React from 'react';
import styles from '../../styles/content.module.scss';
import Link from "next/link";

const Content = ({ isFormValid }: { isFormValid: boolean; }) => (
  <>
    <div className={styles.container}>
      <Link href={`/photo/picture/take`}>
        <button className={styles.video_upload_button} disabled={!isFormValid}>撮影開始</button>
      </Link>
    </div>
  </>
);

export default Content;
