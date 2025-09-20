require('dotenv').config({ path: '.env.local' });

const { createClient } = require('@supabase/supabase-js');

// Supabase configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://amswadhxbldmskbmbqdm.supabase.co';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Supabase environment variables not set');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function checkSchema() {
  try {
    console.log('Checking if password_hash column exists in users table...');
    
    // Check if the password_hash column exists
    const { data, error } = await supabase
      .from('information_schema.columns')
      .select('column_name')
      .eq('table_schema', 'public')
      .eq('table_name', 'users')
      .eq('column_name', 'password_hash');

    if (error) {
      console.error('Error checking schema:', error);
      return;
    }

    if (data && data.length > 0) {
      console.log('✓ password_hash column exists in users table');
    } else {
      console.log('✗ password_hash column does not exist in users table');
    }
    
    // List all columns in users table
    console.log('\nAll columns in users table:');
    const { data: allColumns, error: allColumnsError } = await supabase
      .from('information_schema.columns')
      .select('column_name, data_type')
      .eq('table_schema', 'public')
      .eq('table_name', 'users')
      .order('ordinal_position');

    if (allColumnsError) {
      console.error('Error fetching all columns:', allColumnsError);
      return;
    }

    allColumns.forEach(column => {
      console.log(`  - ${column.column_name} (${column.data_type})`);
    });
  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

checkSchema();