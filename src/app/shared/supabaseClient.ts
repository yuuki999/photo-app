import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceRoleKey) {
  throw new Error('supabaseを使用するための環境変数がありません')
}

// Supabase クライアントを作成
export const supabase = createClient(supabaseUrl, supabaseServiceRoleKey)
