export type User = {
  user_id: number;
  login_id: string;
  member_name: string;
  member_name_kana: string;
  brand_id: number;
  member_studio: number;
  tel: string;
  user_email: string;
  is_trial: number;
  nyukai_date: string | null;
  service_start_on: string | null;
  profile_image_url: string | null;
  join_status: string | null;
  zeus_sendid: string | null;
  nyukai_tanto_id: string | null;
  birthday: string;
  sex: string | null;
  is_staff: number | null;
  register_online_zeus_sendid: string | null;
  email_parent_user_id: string | null;
  email_authenticated: number;
  email_unsubscribed: number;
  email_unregistered: number;
  corporate_member_id: string | null;
  business_memo: string | null;
};
