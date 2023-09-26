export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          created_at: string;
          email: string;
          freeReviews: number | null;
          id: string;
          subscriptionId: number | null;
        };
        Insert: {
          created_at?: string;
          email?: string;
          freeReviews?: number | null;
          id?: string;
          subscriptionId?: number | null;
        };
        Update: {
          created_at?: string;
          email?: string;
          freeReviews?: number | null;
          id?: string;
          subscriptionId?: number | null;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      requesting_user_id: {
        Args: Record<PropertyKey, never>;
        Returns: string;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
