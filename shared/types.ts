import { Database } from './supabase';

export type School = Database['public']['Tables']['schools']['Row'];
export type Prompt = Database['public']['Tables']['prompts']['Row'];
export type Profile = Database['public']['Tables']['profiles']['Row'];
export type Review = Database['public']['Tables']['reviews']['Row'];
