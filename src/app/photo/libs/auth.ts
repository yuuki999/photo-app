import { Dispatch, SetStateAction } from "react";
import { Staff } from "../types/staff";

type SetState<T> = Dispatch<SetStateAction<T>>;

// Jwtトークンのデコード
export const decodeJwtToken = (token: string) => {
  try {
    const base64Payload = token.split('.')[1];
    const decodedPayload = JSON.parse(atob(base64Payload));
    return decodedPayload;
  } catch (error) {
    console.error('JWT解析に失敗', error);
    return null;
  }
};

// JWTをデコードして、認証可能か(スタッフ情報が取得できるか)
export const authenticateWithJwt = (
    jwtToken: string,
    setStaff: SetState<Staff | null>,
    setIsAuthenticated: (authState: boolean) => void,
    setError: (errorMessage: string) => void
  ) => {
  const jwtPayload = decodeJwtToken(jwtToken);
  if (jwtPayload && jwtPayload.user) {
    // 認証成功
    setStaff(jwtPayload.user);
    setIsAuthenticated(true);
    console.log("JWTから認証が完了しました。");
  } else {
    setIsAuthenticated(false);
    setError("JWTにスタッフ情報がありませんでした。認証失敗");
  }
};
