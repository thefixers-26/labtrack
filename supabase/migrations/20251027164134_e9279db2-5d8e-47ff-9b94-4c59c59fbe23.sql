-- Add new columns to equipment table for comprehensive tracking
ALTER TABLE public.equipment 
ADD COLUMN IF NOT EXISTS make text,
ADD COLUMN IF NOT EXISTS model_no text,
ADD COLUMN IF NOT EXISTS stock_register_info text,
ADD COLUMN IF NOT EXISTS physical_presence text DEFAULT 'Available',
ADD COLUMN IF NOT EXISTS working_status text DEFAULT 'Working',
ADD COLUMN IF NOT EXISTS repair_status text,
ADD COLUMN IF NOT EXISTS funding_source text,
ADD COLUMN IF NOT EXISTS govt_registration text,
ADD COLUMN IF NOT EXISTS project_completion_year text,
ADD COLUMN IF NOT EXISTS purchase_cost numeric,
ADD COLUMN IF NOT EXISTS faculty_incharge text;