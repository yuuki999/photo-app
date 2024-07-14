"use client"

import React, { useEffect } from 'react';
import styles from '../../styles/content.module.scss';
import { useAtom } from 'jotai';
import { memberIdAtom } from '@/app/photo/state/memberAtoms';

const Conditions = ({ setIsFormValid }: { setIsFormValid: (isValid: boolean) => void }) => {
  const [memberId, setMemberId] = useAtom(memberIdAtom);

  useEffect(() => {
    // メンバーIDが存在し、空でない場合にフォームを有効にする
    const isValid = !!memberId && memberId.trim() !== '';
    setIsFormValid(isValid);
  }, [memberId, setIsFormValid]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMemberId(value);
  };

  return (
    <>
      <div className={styles.wrapper_container}>
        <div className={styles.conditions_container}>
          <div className={styles.form_row}>
            <div className={styles.form_group}>
              <label className={styles.label}>ユーザーID</label>
              <input
                className={styles.input_text}
                type="text"
                value={memberId ?? ""}
                onChange={handleInputChange}
                placeholder="ユーザーIDを入力 例) 1001"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Conditions;
