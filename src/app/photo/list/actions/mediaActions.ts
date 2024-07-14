'use server'

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

export interface MediaEntry {
  id: number;
  member_id: string;
  video_path: string;
  photo_path: string;
  created_at: string;
}

export async function fetchMediaEntries() {
  try {
    const { data, error } = await supabase
      .from('media_entries')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return { entries: data || [], error: null };
  } catch (error) {
    console.error('Error fetching media entries:', error);
    return { entries: [], error: 'Failed to fetch media entries' };
  }
}

export async function getSignedUrl(path: string) {
  const { data, error } = await supabase.storage
    .from('media')
    .createSignedUrl(path, 3600); // 1時間有効なURLを生成

  if (error) {
    console.error('Error creating signed URL:', error);
    return null;
  }

  return data.signedUrl;
}
