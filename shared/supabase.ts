export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          created_at: string
          email: string
          free_reviews: number | null
          id: string
        }
        Insert: {
          created_at?: string
          email?: string
          free_reviews?: number | null
          id?: string
        }
        Update: {
          created_at?: string
          email?: string
          free_reviews?: number | null
          id?: string
        }
        Relationships: []
      }
      prompts: {
        Row: {
          application_year: number | null
          created_at: string
          id: number
          max_characters: number | null
          max_words: number | null
          prompt_text: string
          school_id: number
        }
        Insert: {
          application_year?: number | null
          created_at?: string
          id?: number
          max_characters?: number | null
          max_words?: number | null
          prompt_text: string
          school_id: number
        }
        Update: {
          application_year?: number | null
          created_at?: string
          id?: number
          max_characters?: number | null
          max_words?: number | null
          prompt_text?: string
          school_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "prompts_school_id_fkey"
            columns: ["school_id"]
            referencedRelation: "schools"
            referencedColumns: ["id"]
          }
        ]
      }
      reviews: {
        Row: {
          complete: boolean | null
          created_at: string
          essay_content: string
          general_feedback: string | null
          id: number
          prompt_id: number
          user_id: string
        }
        Insert: {
          complete?: boolean | null
          created_at?: string
          essay_content: string
          general_feedback?: string | null
          id?: number
          prompt_id: number
          user_id: string
        }
        Update: {
          complete?: boolean | null
          created_at?: string
          essay_content?: string
          general_feedback?: string | null
          id?: number
          prompt_id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reviews_prompt_id_fkey"
            columns: ["prompt_id"]
            referencedRelation: "prompts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      schools: {
        Row: {
          id: number
          official_name: string
        }
        Insert: {
          id?: number
          official_name: string
        }
        Update: {
          id?: number
          official_name?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      requesting_user_id: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
