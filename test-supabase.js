require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function test() {
  const { data: profilData, error: profilError } = await supabase.from('profil_desa').select('*').eq('id', 1).single();
  console.log('Profil Error:', profilError);
  console.log('Profil Data:', profilData);
  
  const { data: homeData, error: homeError } = await supabase.from('homepage_settings').select('*').eq('id', 1).single();
  console.log('Home Error:', homeError);
  console.log('Home Data:', homeData);
}

test();
