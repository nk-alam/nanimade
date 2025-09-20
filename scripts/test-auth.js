require('dotenv').config({ path: '.env.local' });

const { createClient } = require('@supabase/supabase-js');
const bcrypt = require('bcryptjs');

// Supabase configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Supabase environment variables not set');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function testAuth(email, password) {
  try {
    console.log(`Testing authentication for user: ${email}`);
    
    // Get user from database
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (error) {
      console.error('User fetch error:', error);
      return;
    }

    if (!user) {
      console.log('User not found');
      return;
    }

    console.log('User data:');
    console.log('- Email verified:', user.email_verified);
    console.log('- Has password hash:', !!user.password_hash);
    
    if (!user.email_verified) {
      console.log('ERROR: User email is not verified');
      return;
    }
    
    if (!user.password_hash) {
      console.log('ERROR: User has no password hash');
      return;
    }
    
    // Test password validation
    const isValid = await bcrypt.compare(password, user.password_hash);
    console.log('- Password validation:', isValid);
    
    if (!isValid) {
      console.log('ERROR: Password validation failed');
      return;
    }
    
    console.log('SUCCESS: Authentication test passed');

  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

// Get credentials from command line arguments
const email = process.argv[2] || 'admin@nanimade.com';
const password = process.argv[3] || 'Password123';

testAuth(email, password);