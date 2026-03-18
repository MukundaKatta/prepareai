import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface RiskCategory {
  id: string;
  name: string;
  domain: "cyber" | "bio" | "cbrn" | "autonomy" | "persuasion" | "societal";
  description: string;
  subcategories: string[];
}

export interface CapabilityEvaluation {
  id: string;
  modelId: string;
  modelName: string;
  category: string;
  level: "none" | "low" | "medium" | "high" | "critical";
  evidence: string;
  evaluatedAt: string;
  evaluator: string;
}

export interface RiskThreshold {
  id: string;
  category: string;
  currentLevel: number;
  threshold: number;
  trend: "increasing" | "stable" | "decreasing";
  lastUpdated: string;
}

export interface Mitigation {
  id: string;
  riskId: string;
  title: string;
  description: string;
  status: "planned" | "in_progress" | "implemented" | "verified";
  effectiveness: number | null;
  owner: string;
}
