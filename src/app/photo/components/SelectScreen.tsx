"use client"

import React, { useEffect } from 'react';
import Link from 'next/link';
import styles from '../styles/select_screen.module.scss';
import { useSearchParams } from "next/navigation";
import { useAtom } from 'jotai';
import { memberIdAtom } from '../state/memberAtoms';

export default function SelectScreen() {
  const searchParams = useSearchParams();
  const userLoginId = searchParams.get("member_id");
  const [, setMemberId] = useAtom(memberIdAtom);

  useEffect(() => {
    setMemberId(userLoginId);
  }, [userLoginId, setMemberId]);

  return (
    <div className={styles.container}>
      <div className={styles.buttonContainer}>
        <Link className={styles.button} href="/photo/picture">
          撮影をする
        </Link>
        <Link 
          className={styles.button}
          href={userLoginId ? `/photo/list?member_id=${userLoginId}` : "/photo/list"}>
          撮影結果を見る
        </Link>
      </div>
    </div>
  );
}
