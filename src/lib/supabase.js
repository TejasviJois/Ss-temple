/**
 * Supabase client for auth and database.
 * Uses VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY from environment.
 */
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY. Set them in .env for Supabase.')
}

export const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '')
