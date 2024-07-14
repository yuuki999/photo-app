import { atom } from 'jotai';

export const recordedVideoAtom = atom<string | undefined>(undefined); // 撮影した動画
export const thumbnailUrlAtom = atom<string | undefined>(undefined); // 撮影した動画のサムネイル表示用URL
export const capturePhotoAtom = atom<string | undefined>(undefined); // 撮影した画像
