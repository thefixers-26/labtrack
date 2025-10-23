-- Create Equipment table
CREATE TABLE IF NOT EXISTS public.equipment (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  equipment_id TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  category TEXT,
  manufacturer TEXT,
  serial_no TEXT,
  purchase_date DATE,
  location TEXT,
  status TEXT DEFAULT 'Operational',
  specifications TEXT,
  maintenance_due DATE,
  assigned_user TEXT,
  notes TEXT,
  qr_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create ScanLogs table
CREATE TABLE IF NOT EXISTS public.scan_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  equipment_id TEXT NOT NULL,
  user_info TEXT DEFAULT 'Guest',
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  scanned_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE public.equipment ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scan_logs ENABLE ROW LEVEL SECURITY;

-- Create policies for equipment (public read, no auth required)
CREATE POLICY "Allow public read access to equipment"
  ON public.equipment
  FOR SELECT
  USING (true);

CREATE POLICY "Allow public insert to equipment"
  ON public.equipment
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow public update to equipment"
  ON public.equipment
  FOR UPDATE
  USING (true);

CREATE POLICY "Allow public delete to equipment"
  ON public.equipment
  FOR DELETE
  USING (true);

-- Create policies for scan_logs (public read and insert)
CREATE POLICY "Allow public read access to scan logs"
  ON public.scan_logs
  FOR SELECT
  USING (true);

CREATE POLICY "Allow public insert to scan logs"
  ON public.scan_logs
  FOR INSERT
  WITH CHECK (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = timezone('utc'::text, now());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for equipment updated_at
CREATE TRIGGER set_equipment_updated_at
  BEFORE UPDATE ON public.equipment
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_equipment_equipment_id ON public.equipment(equipment_id);
CREATE INDEX IF NOT EXISTS idx_equipment_status ON public.equipment(status);
CREATE INDEX IF NOT EXISTS idx_equipment_location ON public.equipment(location);
CREATE INDEX IF NOT EXISTS idx_scan_logs_equipment_id ON public.scan_logs(equipment_id);
CREATE INDEX IF NOT EXISTS idx_scan_logs_scanned_at ON public.scan_logs(scanned_at DESC);