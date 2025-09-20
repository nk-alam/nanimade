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

async function debugFullPassword(email, testPassword) {
  try {
    console.log(`Debugging password for user: ${email}`);
    console.log(`Testing with password: "${testPassword}"`);
    console.log(`Password length: ${testPassword.length}`);
    
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

    console.log('\nUser data:');
    console.log('- ID:', user.id);
    console.log('- Name:', user.name);
    console.log('- Email verified:', user.email_verified);
    console.log('- Is admin:', user.is_admin);
    console.log('- Has password hash:', !!user.password_hash);
    
    if (user.password_hash) {
      console.log('- Password hash length:', user.password_hash.length);
      console.log('- Full password hash:', user.password_hash);
      
      // Test password validation
      console.log('\n--- Password Validation Tests ---');
      const isValid = await bcrypt.compare(testPassword, user.password_hash);
      console.log('- Exact password match:', isValid);
      
      // Test with trimmed password
      const trimmedPassword = testPassword.trim();
      if (trimmedPassword !== testPassword) {
        const isTrimmedValid = await bcrypt.compare(trimmedPassword, user.password_hash);
        console.log('- Trimmed password match:', isTrimmedValid);
      }
      
      // Hash the test password to see what it would look like
      console.log('\n--- Password Hashing Test ---');
      const testHash = await bcrypt.hash(testPassword, 12);
      console.log('- Test hash:', testHash);
      console.log('- Test hash length:', testHash.length);
      
      // Compare hashes
      console.log('- Hashes match:', user.password_hash === testHash);
    }
    
    // Check auth user
    console.log('\n--- Auth User Check ---');
    const { data: authUser, error: authError } = await supabase.auth.admin.getUserById(user.id);
    
    if (authError) {
      console.log('Auth user error:', authError.message);
    } else {
      console.log('- Auth user exists:', !!authUser.user);
      if (authUser.user) {
        console.log('- Auth user email:', authUser.user.email);
        console.log('- Auth user confirmed:', authUser.user.email_confirmed_at);
      }
    }

  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

// Get password from command line arguments or use default
const email = process.argv[2] || 'admin@nanimade.com';
const password = process.argv[3] || 'Password123'; // Default test password

debugFullPassword(email, password);