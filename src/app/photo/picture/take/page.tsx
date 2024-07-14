"use client"

import React, { useEffect, useState } from 'react';
import { useDevices } from './hooks/useDevices';
import Video from './components/video/Video';
import styles from './styles/video.module.scss';
import stylesContent from '../../styles/content.module.scss';
import Photo from './components/photo/Photo';
import { showComponentAtom } from './state/showComponentAtom';
import { useAtom } from 'jotai';
import { useRouter } from 'next/navigation';

// import { memberAtom } from '@/app/photo/state/memberAtoms';
// import { recordedVideoAtom, capturePhotoAtom, thumbnailUrlAtom } from './state/mediaAtoms';
import { Header } from '../../components/header';

export default function Take() {
  const devices = useDevices();
  const [displayReady, setDisplayReady] = useState(false);
  const [showComponent] = useAtom(showComponentAtom);

  // デバック用
  // const [staff, setStaff] = useAtom(staffAtom);
  // const [member, setMember] = useAtom(memberAtom);
  // const [video, setRecordedVideoUrl] = useAtom(recordedVideoAtom);
  // const [photo, setCapturePhotoUrl] = useAtom(capturePhotoAtom);
  // const [thmnail, setThumbnailUrl] = useAtom(thumbnailUrlAtom);
  // const [show, setShowComponent] = useAtom(showComponentAtom);
  // console.log("test");
  // console.log(staff);
  // console.log(member);
  // console.log(selectStudio);
  // console.log(video);
  // console.log(photo);
  // console.log(thmnail);
  // console.log(show);

  const router = useRouter();

  // コンポーネントの状態が取得できたら画面表示をする。
  useEffect(() => {
    setDisplayReady(true);
  }, [showComponent]);

  return (
    <>
      <div className={styles.wrapper}>
        <Header /> 
        {displayReady ? ( // ??だとなぜか画面が切り替わらない
          <div className={stylesContent.video_container}>
            {showComponent === 'video' && <Video device={devices[0]} />}
            {showComponent === 'photo' && <Photo device={devices[0]} />}
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </>
  );
}
