export type IAnalysisReport = {
  disp_sagittal_dynamic_id: string;
  disp_sagittal_dynamic: {
    name_jp: string;
    image: string;
    effect_00: number;
    effect_90: number;
  };
  disp_sagittal_id: number;
  disp_sagittal_name_jp: string;
  disp_sagittal_text: string;
  disp_coronal_id: number;
  disp_coronal_name_jp: string;
  disp_coronal_text: string;
  disp_spine_subdetails: {
    id: string;
    name: string;
    text: string;
    movie: string;
  };
  disp_spine_subsubdetails: {
    id: string;
    name: string;
    description: string;
  };
  disp_mf_contraction_details: {
    id: number;
    movement_suggestion_exercises: Array<{
      id: string;
      name_jp: string;
      movie: string;
      audio: string;
      image: string;
    }>;
  };
  measurement_score?: {
    before_lesson?: {
      disp_spine_21?: string | number;
      disp_spine_22?: string | number;
      disp_spine_23?: string | number;
    };
  };
};

export type IAnalysis = {
  status: boolean;
  code: number;
  data: {
    analysis_report: IAnalysisReport;
  };
};

export type IAnalysisList = {
  id: number;
  member_id: number;
  staff_id: number;
  analyzed_status: string;
  analyzed: string;
  created_at: string;
  created_by: number;
  updated_at: string;
  updated_by: number;
  type: string;
  studio_id: number;
  analysis_result: IAnalysis;
  user_rec_group: string;
};
