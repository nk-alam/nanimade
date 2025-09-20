require('dotenv').config({ path: '.env.local' });

const { createClient } = require('@supabase/supabase-js');

// Supabase configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://amswadhxbldmskbmbqdm.supabase.co';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Supabase environment variables not set');
  console.log('URL:', supabaseUrl);
  console.log('Service Key exists:', !!supabaseServiceKey);
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function refreshSchema() {
  try {
    console.log('Refreshing Supabase schema cache...');
    
    // Test if we can access the users table
    const { data, error } = await supabase
      .from('users')
      .select('id, email, name, password_hash')
      .limit(1);

    if (error) {
      console.error('Error accessing users table:', error);
      return;
    }

    console.log('Successfully accessed users table');
    console.log('Sample data:', data);
    
    // If we get here, the schema is working correctly
    console.log('Schema appears to be working correctly');
  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

refreshSchema();