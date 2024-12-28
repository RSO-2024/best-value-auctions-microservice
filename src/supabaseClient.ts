import { createClient, SupabaseClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

export const supabase: SupabaseClient = createClient(
  process.env.SUPABASEURL!,
  process.env.SUPABASEKEY!
);
