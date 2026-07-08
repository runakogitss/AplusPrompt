export type RubricCategoryId =
  | "goal_clarity"
  | "business_context"
  | "input_source_clarity"
  | "output_format"
  | "constraints"
  | "verification"
  | "actionability";

export type Mission = {
  id: string;
  title: string;
  subtitle: string;
  difficulty: string;
  skill_focus: string[];
  scenario: Record<string, unknown>;
  bad_prompt_example: string;
  improved_prompt_example: string;
  success_criteria: string[];
  locked?: boolean;
};

export type RubricCategory = {
  id: RubricCategoryId;
  name: string;
  weight: number;
  question: string;
};

export type PromptRubric = {
  total_points: number;
  categories: RubricCategory[];
  grades: Array<{
    min: number;
    max: number;
    grade: string;
    title: string;
  }>;
};

export type PromptScore = {
  total_score: number;
  grade: string;
  user_title: string;
  category_scores: Record<RubricCategoryId, number>;
  strengths: string[];
  weaknesses: string[];
  coach_explanation: string;
  next_reps: string[];
};

export type ImprovedPrompt = {
  improved_prompt: string;
  changes_made: string[];
  why_it_is_better: string;
};

export type OutputComparison = {
  weak_output: string;
  improved_output: string;
  comparison: {
    specificity: string;
    safety: string;
    usefulness: string;
    business_fit: string;
  };
  main_learning: string;
};

export type PlaybookEntry = {
  id: string;
  mission_id: string;
  title: string;
  final_prompt: string;
  attempted_prompt?: string;
  ai_best_approach?: string;
  score: number;
  tags: string[];
  when_to_use?: string;
  inputs_to_replace?: string[];
  safety_notes?: string[];
  created_at: string;
};

export type SubscriptionPlan = {
  plan_id: string;
  name: string;
  price_display: string;
  features: string[];
  is_mock: boolean;
};

export type GuestSession = {
  profile_id: string;
  session_id: string | null;
  guest_name: string;
  storage: "supabase" | "local-fallback";
};

export type CustomerSaveAgentOutput = {
  issue_type: string;
  emotion: string;
  severity: "low" | "medium" | "high" | "critical";
  summary: string;
  policy_match: {
    allowed_actions: string[];
    requires_approval: string[];
    forbidden: string[];
  };
  recommended_action: string;
  risk_flags: string[];
  draft_reply: string;
  follow_up_message: string;
  approval_required: boolean;
};

export type CertificateProgress = {
  user_id: string;
  display_name?: string;
  track_id: string;
  missions_completed: string[];
  prompt_attempts_count: number;
  improved_prompts_count: number;
  saved_playbook_count: number;
  final_assessment_score: number | null;
  certificate_unlocked: boolean;
  certificate_title: string;
  completed_at: string | null;
  storage: "supabase" | "local-fallback";
};
