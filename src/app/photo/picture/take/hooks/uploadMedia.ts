'use server'

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
const supabase = createClient(supabaseUrl, supabaseServiceKey)

export async function uploadMedia(videoBase64: string, photoBase64: string, memberId: string) {
  try {
    // Base64 文字列を Blob に変換
    const videoBlob = Buffer.from(videoBase64.split(',')[1], 'base64');
    const photoBlob = Buffer.from(photoBase64.split(',')[1], 'base64');

    const videoFileName = `video_${memberId}_${Date.now()}.mov`;
    const photoFileName = `photo_${memberId}_${Date.now()}.jpg`;

    // Supabase にアップロード
    const { data: videoData, error: videoError } = await supabase.storage
      .from('media')
      .upload(`videos/${videoFileName}`, videoBlob, { contentType: 'video/quicktime' });

    if (videoError) throw videoError;

    const { data: photoData, error: photoError } = await supabase.storage
      .from('media')
      .upload(`photos/${photoFileName}`, photoBlob, { contentType: 'image/jpeg' });

    if (photoError) throw photoError;

    // メタデータをデータベースに保存
    const { data, error } = await supabase
      .from('media_entries')
      .insert([
        { 
          member_id: memberId, 
          video_path: videoData.path,
          photo_path: photoData.path
        }
      ]);

    if (error) throw error;

    return { success: true, message: 'アップロードが成功しました！' };
  } catch (error) {
    console.error(error);
    return { success: false, message: 'アップロードが失敗しました！' };
  }
}
