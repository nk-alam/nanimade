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

async function checkUsersTable() {
  try {
    console.log('Checking users table structure...');
    
    // Try to insert a user with password_hash to see if the column exists
    const testUser = {
      email: 'test@example.com',
      name: 'Test User',
      password_hash: 'test_hash_value'
    };
    
    const { data, error } = await supabase
      .from('users')
      .insert([testUser])
      .select()
      .single();

    if (error) {
      console.log('Error inserting user:', error.message);
      // Try without password_hash
      const testUserWithoutPassword = {
        email: 'test2@example.com',
        name: 'Test User 2'
      };
      
      const { data: data2, error: error2 } = await supabase
        .from('users')
        .insert([testUserWithoutPassword])
        .select()
        .single();
        
      if (error2) {
        console.log('Error inserting user without password_hash:', error2.message);
      } else {
        console.log('Successfully inserted user without password_hash');
        // Clean up
        await supabase.from('users').delete().eq('email', 'test2@example.com');
      }
    } else {
      console.log('Successfully inserted user with password_hash');
      // Clean up
      await supabase.from('users').delete().eq('email', 'test@example.com');
    }
    
    // Try to select with password_hash
    console.log('\nTesting SELECT with password_hash...');
    const { data: selectData, error: selectError } = await supabase
      .from('users')
      .select('id, email, name, password_hash')
      .limit(1);

    if (selectError) {
      console.log('Error selecting with password_hash:', selectError.message);
      // Try without password_hash
      console.log('Testing SELECT without password_hash...');
      const { data: selectData2, error: selectError2 } = await supabase
        .from('users')
        .select('id, email, name')
        .limit(1);
        
      if (selectError2) {
        console.log('Error selecting without password_hash:', selectError2.message);
      } else {
        console.log('Successfully selected user data without password_hash');
        console.log('Sample data:', selectData2);
      }
    } else {
      console.log('Successfully selected user data with password_hash');
      console.log('Sample data:', selectData);
    }
  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

checkUsersTable();