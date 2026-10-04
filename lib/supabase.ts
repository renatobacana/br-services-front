import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    '⚠️ As variáveis de ambiente do Supabase não foram encontradas. Verifique o ficheiro .env.local.'
  );
}
// Cria o cliente mesmo com strings vazias para evitar crash na compilação,
// permitindo que o aviso seja exibido no console do navegador.
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-key'
);
