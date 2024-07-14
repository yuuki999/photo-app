export type Studio = {
  studio_id: number;
  brand_id: number;
  studio_name: string;
  seo_area: string;
  topic_text: string;
  tel: string;
  brand_name: string;
  brand_ryaku_name: string;
  brand_url: string;
  name_for_receipt: string;
  email: string;
  grade: number;
  multi_team_no: string;
  is_display: number;
  is_opened: number;
  studio_main_image: string;
  facility_1_image: string;
  facility_2_image: string;
  facility_3_image: string;
  facility_4_image: string;
  facility_5_image: string;
  facility_6_image: string | null;
  facility_7_image: string | null;
  facility_8_image: string | null;
  address1: string;
  address2: string;
  address3: string;
  address: string;
  slug: string;
  pref_id: number;
  prefecture_id: number;
  pref: string;
};

export type SelectStudio = {
  studio_id: number;
  studio_name: string;
}
