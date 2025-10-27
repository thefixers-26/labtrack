import { supabase } from "@/integrations/supabase/client";

export interface Equipment {
  id?: string;
  equipment_id: string;
  name: string;
  make?: string;
  serial_no?: string;
  model_no?: string;
  purchase_date?: string;
  stock_register_info?: string;
  physical_presence?: string;
  working_status?: string;
  repair_status?: string;
  funding_source?: string;
  govt_registration?: string;
  project_completion_year?: string;
  purchase_cost?: number;
  location?: string;
  faculty_incharge?: string;
  category?: string;
  manufacturer?: string;
  status?: string;
  specifications?: string;
  maintenance_due?: string;
  assigned_user?: string;
  notes?: string;
  qr_url?: string;
  created_at?: string;
  updated_at?: string;
}

export interface ScanLog {
  id?: string;
  equipment_id: string;
  user_info?: string;
  latitude?: number;
  longitude?: number;
  scanned_at?: string;
}

// Equipment API
export const equipmentApi = {
  getAll: async (): Promise<Equipment[]> => {
    const { data, error } = await supabase.functions.invoke('equipment', {
      method: 'GET',
    });
    
    if (error) throw error;
    return data || [];
  },

  getById: async (equipmentId: string): Promise<Equipment> => {
    const { data, error } = await supabase.functions.invoke('equipment', {
      method: 'GET',
      body: null,
    });
    
    if (error) throw error;
    
    // Filter client-side since we're using query params
    const response = await fetch(
      `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/equipment?equipment_id=${equipmentId}`,
      {
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
      }
    );
    
    if (!response.ok) throw new Error('Failed to fetch equipment');
    return response.json();
  },

  create: async (equipment: Equipment): Promise<Equipment> => {
    const { data, error } = await supabase.functions.invoke('equipment', {
      method: 'POST',
      body: equipment,
    });
    
    if (error) throw error;
    return data;
  },

  update: async (equipmentId: string, updates: Partial<Equipment>): Promise<Equipment> => {
    const response = await fetch(
      `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/equipment?equipment_id=${equipmentId}`,
      {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      }
    );
    
    if (!response.ok) throw new Error('Failed to update equipment');
    return response.json();
  },

  delete: async (equipmentId: string): Promise<void> => {
    const response = await fetch(
      `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/equipment?equipment_id=${equipmentId}`,
      {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
      }
    );
    
    if (!response.ok) throw new Error('Failed to delete equipment');
  },
};

// Scan Log API
export const scanLogApi = {
  getAll: async (): Promise<ScanLog[]> => {
    const { data, error } = await supabase.functions.invoke('scan-log', {
      method: 'GET',
    });
    
    if (error) throw error;
    return data || [];
  },

  create: async (scanLog: ScanLog): Promise<ScanLog> => {
    const { data, error } = await supabase.functions.invoke('scan-log', {
      method: 'POST',
      body: scanLog,
    });
    
    if (error) throw error;
    return data;
  },
};