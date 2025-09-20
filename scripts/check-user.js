require('dotenv').config({ path: '.env.local' });

const { createClient } = require('@supabase/supabase-js');

// Supabase configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Supabase environment variables not set');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function checkUser(email) {
  try {
    console.log(`Checking user with email: ${email}`);
    
    // Check if user exists in users table
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (userError) {
      console.error('User fetch error:', userError);
      return;
    }

    if (!user) {
      console.log('User not found in database');
      return;
    }

    console.log('User found in database:');
    console.log('ID:', user.id);
    console.log('Name:', user.name);
    console.log('Email verified:', user.email_verified);
    console.log('Is admin:', user.is_admin);
    console.log('Has password hash:', !!user.password_hash);
    
    if (user.password_hash) {
      console.log('Password hash length:', user.password_hash.length);
    }

    // Check if user exists in auth system by trying to sign in
    console.log('\n--- Testing authentication ---');
    
    // Let's test the credentials provider logic directly
    const testPassword = 'Password123'; // Assuming this is the password used
    
    // Get user again to test password verification
    const { data: testUser, error: testError } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (testError || !testUser) {
      console.log('Could not fetch user for testing');
      return;
    }

    console.log('Testing user data:');
    console.log('- Email verified:', testUser.email_verified);
    console.log('- Has password hash:', !!testUser.password_hash);
    
    if (testUser.password_hash) {
      const bcrypt = require('bcryptjs');
      const isPasswordValid = await bcrypt.compare(testPassword, testUser.password_hash);
      console.log('- Password valid:', isPasswordValid);
    }

  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

// Check the admin user
checkUser('admin@nanimade.com');