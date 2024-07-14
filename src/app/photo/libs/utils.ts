import { zip } from 'fflate';
import { MiddlewareNotFoundError } from 'next/dist/shared/lib/utils';

// ファイルを圧縮する。
export const compressFiles = async (files: any, filename: string) => {
  const fileContents: Record<string, Uint8Array> = {};
  for (const file of files) {
    const arrayBuffer = await file.arrayBuffer();
    fileContents[file.name] = new Uint8Array(arrayBuffer);
  }

  const zippedContent: Uint8Array = await new Promise((resolve, reject) => {
    zip(fileContents, (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });

  return new File([zippedContent], filename);
};

// ブラウザによって対応可能なmimeTypeを取得する。
export const supportedMimeType = async (): Promise<string> => {
  let mimeType: string;

  // ブラウザ判定
  if (navigator.userAgent.includes('Chrome')) {
    mimeType = 'video/webm';
  } else if (navigator.userAgent.includes('Safari')) {
    mimeType = 'video/mp4';
  } else {
    mimeType = 'video/webm';
  }
  return mimeType;
};

// モバイルかどうかを判定する。
// TODO: 今度はiphoneがおかしくなった。
export function isMobileDevice() {
  const userAgent = navigator.userAgent;

  // ipadかどうかを判定、ios13からipadもMacintoshとして判定されるため、ontouchendがあるかどうかで判定
  const ipad = userAgent.indexOf('iPad') > -1 || (userAgent.indexOf('Macintosh') > -1 && 'ontouchend' in document);
  if(ipad == true){
    return true;
  }
  
  // その他のモバイルデバイスの検出
  return /Android|iPhone|webOS|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
}
