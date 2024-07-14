import { setCookie } from "cookies-next";

interface Options {
  httpOnly?: boolean;
  secure?: boolean;
  maxAge?: number;
  path?: string;
}

// サーバーアクションでのCookie設定
export function GeneralSetCookie(name: string, value: string, cookies?: any, options?: Options) {

  const isLocal = process.env.NEXT_PUBLIC_APP_ENV === "local";

  const defaultOptions = {
    httpOnly: false,          // クライアントサイドでの使用を許可
    secure: !isLocal,         // HTTPSが必須ではない。ローカル環境ではhttpでの開発を想定しており、falseとする。
    maxAge: 60 * 60 * 24 * 3, // 3日間の有効期限
    path: "/",                // すべてのパスで利用可能
  };

  const customOptions = { ...defaultOptions, ...options };

  setCookie(name, value, {
    cookies,
    httpOnly: customOptions.httpOnly,
    secure: customOptions.secure,
    maxAge: customOptions.maxAge,
    path: customOptions.path,
  });

}
