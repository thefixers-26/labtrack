import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface Equipment {
  equipment_id: string;
  name: string;
  category?: string;
  manufacturer?: string;
  serial_no?: string;
  purchase_date?: string;
  location?: string;
  status?: string;
  specifications?: string;
  maintenance_due?: string;
  assigned_user?: string;
  notes?: string;
}

// Function to generate QR code as data URL
async function generateQRCode(equipmentId: string): Promise<string> {
  const baseUrl = Deno.env.get('FRONTEND_URL') || 'https://3777a8eb-9867-4205-8038-1fece8c04d39.lovableproject.com';
  const qrData = `${baseUrl}/equipment/${equipmentId}`;
  
  // Use QR Server API to generate QR code
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(qrData)}`;
  
  return qrUrl;
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    );

    const url = new URL(req.url);
    const equipmentId = url.searchParams.get('equipment_id');

    // GET - Fetch equipment
    if (req.method === 'GET') {
      if (equipmentId) {
        // Get single equipment
        console.log('Fetching equipment:', equipmentId);
        const { data, error } = await supabaseClient
          .from('equipment')
          .select('*')
          .eq('equipment_id', equipmentId)
          .single();

        if (error) {
          console.error('Error fetching equipment:', error);
          return new Response(
            JSON.stringify({ error: error.message }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 404 }
          );
        }

        return new Response(
          JSON.stringify(data),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      } else {
        // Get all equipment
        console.log('Fetching all equipment');
        const { data, error } = await supabaseClient
          .from('equipment')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching equipment:', error);
          return new Response(
            JSON.stringify({ error: error.message }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
          );
        }

        return new Response(
          JSON.stringify(data || []),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
    }

    // POST - Create new equipment
    if (req.method === 'POST') {
      const body: Equipment = await req.json();
      console.log('Creating equipment:', body.equipment_id);

      // Generate QR code URL
      const qrUrl = await generateQRCode(body.equipment_id);

      const { data, error } = await supabaseClient
        .from('equipment')
        .insert([{ ...body, qr_url: qrUrl }])
        .select()
        .single();

      if (error) {
        console.error('Error creating equipment:', error);
        return new Response(
          JSON.stringify({ error: error.message }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
        );
      }

      console.log('Equipment created successfully');
      return new Response(
        JSON.stringify(data),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 201 }
      );
    }

    // PUT - Update equipment
    if (req.method === 'PUT') {
      if (!equipmentId) {
        return new Response(
          JSON.stringify({ error: 'equipment_id is required' }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
        );
      }

      const body: Partial<Equipment> = await req.json();
      console.log('Updating equipment:', equipmentId);

      const { data, error } = await supabaseClient
        .from('equipment')
        .update(body)
        .eq('equipment_id', equipmentId)
        .select()
        .single();

      if (error) {
        console.error('Error updating equipment:', error);
        return new Response(
          JSON.stringify({ error: error.message }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
        );
      }

      console.log('Equipment updated successfully');
      return new Response(
        JSON.stringify(data),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // DELETE - Remove equipment
    if (req.method === 'DELETE') {
      if (!equipmentId) {
        return new Response(
          JSON.stringify({ error: 'equipment_id is required' }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
        );
      }

      console.log('Deleting equipment:', equipmentId);

      const { error } = await supabaseClient
        .from('equipment')
        .delete()
        .eq('equipment_id', equipmentId);

      if (error) {
        console.error('Error deleting equipment:', error);
        return new Response(
          JSON.stringify({ error: error.message }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
        );
      }

      console.log('Equipment deleted successfully');
      return new Response(
        JSON.stringify({ message: 'Equipment deleted successfully' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 405 }
    );
  } catch (error) {
    console.error('Unexpected error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error occurred';
    return new Response(
      JSON.stringify({ error: message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});