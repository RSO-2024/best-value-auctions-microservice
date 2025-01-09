const { createClient, SupabaseClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');

dotenv.config();

export const supabase: typeof SupabaseClient = createClient(
  process.env.SUPABASEURL!,
  process.env.SUPABASEKEY!
);
