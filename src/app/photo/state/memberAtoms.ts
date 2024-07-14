import { atomWithStorage, createJSONStorage } from 'jotai/utils'

const storage = createJSONStorage(() => sessionStorage);
export const memberIdAtom = atomWithStorage<string | null | any>("member_id", null, storage);
export const memberAtom = atomWithStorage<string | null | any>("member", null, storage);
