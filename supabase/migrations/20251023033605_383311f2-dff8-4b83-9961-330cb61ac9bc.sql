-- Fix function search path security warning
DROP TRIGGER IF EXISTS set_equipment_updated_at ON public.equipment;
DROP FUNCTION IF EXISTS public.handle_updated_at();

CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = timezone('utc'::text, now());
  RETURN NEW;
END;
$$;

-- Recreate trigger
CREATE TRIGGER set_equipment_updated_at
  BEFORE UPDATE ON public.equipment
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();