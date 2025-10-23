import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ScanLog {
  equipment_id: string;
  user_info?: string;
  latitude?: number;
  longitude?: number;
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

    // GET - Fetch all scan logs
    if (req.method === 'GET') {
      console.log('Fetching scan logs');
      const { data, error } = await supabaseClient
        .from('scan_logs')
        .select('*')
        .order('scanned_at', { ascending: false });

      if (error) {
        console.error('Error fetching scan logs:', error);
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

    // POST - Create scan log
    if (req.method === 'POST') {
      const body: ScanLog = await req.json();
      console.log('Creating scan log for equipment:', body.equipment_id);

      const { data, error } = await supabaseClient
        .from('scan_logs')
        .insert([body])
        .select()
        .single();

      if (error) {
        console.error('Error creating scan log:', error);
        return new Response(
          JSON.stringify({ error: error.message }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
        );
      }

      console.log('Scan log created successfully');
      return new Response(
        JSON.stringify(data),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 201 }
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