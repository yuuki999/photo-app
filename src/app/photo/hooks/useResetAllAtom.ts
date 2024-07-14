import { useAtom } from "jotai";
import { memberAtom } from "../state/memberAtoms";
import { capturePhotoAtom, recordedVideoAtom, thumbnailUrlAtom } from "../picture/take/state/mediaAtoms";
import { showComponentAtom } from "../picture/take/state/showComponentAtom";

export function useResetAllAtoms() {
  const [, setMember] = useAtom(memberAtom);
  const [, setRecordedVideoUrl] = useAtom(recordedVideoAtom);
  const [, setCapturePhotoUrl] = useAtom(capturePhotoAtom);
  const [, setThumbnailUrl] = useAtom(thumbnailUrlAtom);
  const [, setShowComponent] = useAtom(showComponentAtom);

  const resetAllAtoms = () => {
    setShowComponent('video');
    setRecordedVideoUrl(undefined);
    setCapturePhotoUrl(undefined);
    setThumbnailUrl(undefined);
    setMember(null);
  };

  return resetAllAtoms;
}
