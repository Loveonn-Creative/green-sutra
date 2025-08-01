export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.12 (cd3cf9e)"
  }
  public: {
    Tables: {
      achievements: {
        Row: {
          achievement_description: string
          achievement_title: string
          achievement_type: string
          badge_icon: string | null
          earned_at: string
          id: string
          points_earned: number
          user_id: string
        }
        Insert: {
          achievement_description: string
          achievement_title: string
          achievement_type: string
          badge_icon?: string | null
          earned_at?: string
          id?: string
          points_earned?: number
          user_id: string
        }
        Update: {
          achievement_description?: string
          achievement_title?: string
          achievement_type?: string
          badge_icon?: string | null
          earned_at?: string
          id?: string
          points_earned?: number
          user_id?: string
        }
        Relationships: []
      }
      admin_requests: {
        Row: {
          admin_notes: string | null
          company_name: string | null
          contact_person: string | null
          id: string
          phone: string | null
          request_type: string
          requested_at: string
          reviewed_at: string | null
          reviewed_by: string | null
          status: string
          user_email: string
          user_id: string
          user_role: string
        }
        Insert: {
          admin_notes?: string | null
          company_name?: string | null
          contact_person?: string | null
          id?: string
          phone?: string | null
          request_type?: string
          requested_at?: string
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string
          user_email: string
          user_id: string
          user_role: string
        }
        Update: {
          admin_notes?: string | null
          company_name?: string | null
          contact_person?: string | null
          id?: string
          phone?: string | null
          request_type?: string
          requested_at?: string
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string
          user_email?: string
          user_id?: string
          user_role?: string
        }
        Relationships: []
      }
      carbon_credits: {
        Row: {
          created_at: string
          credits_balance: number
          credits_earned: number
          credits_redeemed: number
          id: string
          source_description: string | null
          source_type: string
          transaction_hash: string | null
          user_id: string
          verification_status: string | null
        }
        Insert: {
          created_at?: string
          credits_balance?: number
          credits_earned?: number
          credits_redeemed?: number
          id?: string
          source_description?: string | null
          source_type: string
          transaction_hash?: string | null
          user_id: string
          verification_status?: string | null
        }
        Update: {
          created_at?: string
          credits_balance?: number
          credits_earned?: number
          credits_redeemed?: number
          id?: string
          source_description?: string | null
          source_type?: string
          transaction_hash?: string | null
          user_id?: string
          verification_status?: string | null
        }
        Relationships: []
      }
      contact_submissions: {
        Row: {
          admin_notes: string | null
          company: string | null
          email: string
          first_name: string
          id: string
          last_name: string
          message: string
          responded_at: string | null
          status: string
          subject: string
          submitted_at: string
        }
        Insert: {
          admin_notes?: string | null
          company?: string | null
          email: string
          first_name: string
          id?: string
          last_name: string
          message: string
          responded_at?: string | null
          status?: string
          subject: string
          submitted_at?: string
        }
        Update: {
          admin_notes?: string | null
          company?: string | null
          email?: string
          first_name?: string
          id?: string
          last_name?: string
          message?: string
          responded_at?: string | null
          status?: string
          subject?: string
          submitted_at?: string
        }
        Relationships: []
      }
      demo_requests: {
        Row: {
          admin_notes: string | null
          company: string | null
          email: string
          id: string
          interest: string | null
          message: string | null
          name: string
          role: string | null
          scheduled_at: string | null
          status: string
          submitted_at: string
        }
        Insert: {
          admin_notes?: string | null
          company?: string | null
          email: string
          id?: string
          interest?: string | null
          message?: string | null
          name: string
          role?: string | null
          scheduled_at?: string | null
          status?: string
          submitted_at?: string
        }
        Update: {
          admin_notes?: string | null
          company?: string | null
          email?: string
          id?: string
          interest?: string | null
          message?: string | null
          name?: string
          role?: string | null
          scheduled_at?: string | null
          status?: string
          submitted_at?: string
        }
        Relationships: []
      }
      esg_reports: {
        Row: {
          created_at: string
          diversity_score: number | null
          emissions_scope1: number | null
          emissions_scope2: number | null
          emissions_scope3: number | null
          employee_count: number | null
          energy_consumption: number | null
          green_cibil_score: number | null
          id: string
          overall_esg_score: number | null
          renewable_energy_percent: number | null
          report_name: string
          reporting_period: string
          safety_incidents: number | null
          status: string | null
          updated_at: string
          user_id: string
          waste_generated: number | null
          waste_recycled: number | null
          water_consumption: number | null
        }
        Insert: {
          created_at?: string
          diversity_score?: number | null
          emissions_scope1?: number | null
          emissions_scope2?: number | null
          emissions_scope3?: number | null
          employee_count?: number | null
          energy_consumption?: number | null
          green_cibil_score?: number | null
          id?: string
          overall_esg_score?: number | null
          renewable_energy_percent?: number | null
          report_name: string
          reporting_period: string
          safety_incidents?: number | null
          status?: string | null
          updated_at?: string
          user_id: string
          waste_generated?: number | null
          waste_recycled?: number | null
          water_consumption?: number | null
        }
        Update: {
          created_at?: string
          diversity_score?: number | null
          emissions_scope1?: number | null
          emissions_scope2?: number | null
          emissions_scope3?: number | null
          employee_count?: number | null
          energy_consumption?: number | null
          green_cibil_score?: number | null
          id?: string
          overall_esg_score?: number | null
          renewable_energy_percent?: number | null
          report_name?: string
          reporting_period?: string
          safety_incidents?: number | null
          status?: string | null
          updated_at?: string
          user_id?: string
          waste_generated?: number | null
          waste_recycled?: number | null
          water_consumption?: number | null
        }
        Relationships: []
      }
      ewaste_ledger: {
        Row: {
          carbon_credits_earned: number | null
          created_at: string
          id: string
          pickup_date: string
          record_hash: string
          recycler_id: string
          recycler_name: string
          submission_id: string
          user_id: string
          verification_status: string | null
          waste_type: string
          weight_kg: number
        }
        Insert: {
          carbon_credits_earned?: number | null
          created_at?: string
          id?: string
          pickup_date: string
          record_hash: string
          recycler_id: string
          recycler_name: string
          submission_id: string
          user_id: string
          verification_status?: string | null
          waste_type: string
          weight_kg: number
        }
        Update: {
          carbon_credits_earned?: number | null
          created_at?: string
          id?: string
          pickup_date?: string
          record_hash?: string
          recycler_id?: string
          recycler_name?: string
          submission_id?: string
          user_id?: string
          verification_status?: string | null
          waste_type?: string
          weight_kg?: number
        }
        Relationships: []
      }
      mandi_listings: {
        Row: {
          carbon_efficiency_score: number
          certifications: string[] | null
          created_at: string
          delivery_time_days: number
          description: string | null
          id: string
          images: string[] | null
          is_active: boolean | null
          location_city: string
          location_state: string
          manufacturer_id: string
          minimum_order_quantity: number
          price_per_unit: number
          product_category: string
          product_name: string
          solar_powered: boolean | null
          updated_at: string
        }
        Insert: {
          carbon_efficiency_score: number
          certifications?: string[] | null
          created_at?: string
          delivery_time_days: number
          description?: string | null
          id?: string
          images?: string[] | null
          is_active?: boolean | null
          location_city: string
          location_state: string
          manufacturer_id: string
          minimum_order_quantity: number
          price_per_unit: number
          product_category: string
          product_name: string
          solar_powered?: boolean | null
          updated_at?: string
        }
        Update: {
          carbon_efficiency_score?: number
          certifications?: string[] | null
          created_at?: string
          delivery_time_days?: number
          description?: string | null
          id?: string
          images?: string[] | null
          is_active?: boolean | null
          location_city?: string
          location_state?: string
          manufacturer_id?: string
          minimum_order_quantity?: number
          price_per_unit?: number
          product_category?: string
          product_name?: string
          solar_powered?: boolean | null
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          address: string | null
          approval_status: string | null
          city: string | null
          company_name: string | null
          contact_person: string | null
          created_at: string
          gst_number: string | null
          id: string
          onboarding_completed: boolean | null
          phone: string | null
          pincode: string | null
          preferred_language: string | null
          role: string
          state: string | null
          ui_theme: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          address?: string | null
          approval_status?: string | null
          city?: string | null
          company_name?: string | null
          contact_person?: string | null
          created_at?: string
          gst_number?: string | null
          id?: string
          onboarding_completed?: boolean | null
          phone?: string | null
          pincode?: string | null
          preferred_language?: string | null
          role: string
          state?: string | null
          ui_theme?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          address?: string | null
          approval_status?: string | null
          city?: string | null
          company_name?: string | null
          contact_person?: string | null
          created_at?: string
          gst_number?: string | null
          id?: string
          onboarding_completed?: boolean | null
          phone?: string | null
          pincode?: string | null
          preferred_language?: string | null
          role?: string
          state?: string | null
          ui_theme?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      calculate_carbon_credits_india: {
        Args: {
          energy_kwh?: number
          fuel_liters?: number
          waste_recycled_kg?: number
          renewable_energy_percent?: number
        }
        Returns: number
      }
      calculate_green_cibil_score: {
        Args: {
          esg_score?: number
          carbon_credits?: number
          compliance_score?: number
          waste_management_score?: number
        }
        Returns: number
      }
      get_user_role: {
        Args: { user_uuid: string }
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

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
