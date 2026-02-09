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
      projects: {
        Row: {
          id: string;
          created_at: string;
          offer_name: string | null;
          promise: string | null;
          audience: string | null;
          calendly_url: string | null;
          owner_id: string | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          offer_name?: string | null;
          promise?: string | null;
          audience?: string | null;
          calendly_url?: string | null;
          owner_id?: string | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          offer_name?: string | null;
          promise?: string | null;
          audience?: string | null;
          calendly_url?: string | null;
          owner_id?: string | null;
        };
        Relationships: [];
      };
    };
    Views: {};
    Functions: {};
    Enums: {};
    CompositeTypes: {};
  };
}
