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

async function debugPassword(email, testPassword) {
  try {
    console.log(`Debugging password for user: ${email}`);
    console.log(`Testing with password: ${testPassword}`);
    
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
    
    if (user.password_hash) {
      console.log('- Password hash:', user.password_hash);
      
      // Test password validation
      const isValid = await bcrypt.compare(testPassword, user.password_hash);
      console.log('- Password valid:', isValid);
      
      // Also test with some common variations
      const variations = [
        testPassword.toLowerCase(),
        testPassword.toUpperCase(),
        testPassword + ' ',  // trailing space
        ' ' + testPassword,  // leading space
      ];
      
      for (const variation of variations) {
        if (variation !== testPassword) {
          const isValidVar = await bcrypt.compare(variation, user.password_hash);
          console.log(`- Password valid (${variation}):`, isValidVar);
        }
      }
    }
    
    // Check recent OTP codes for this user
    console.log('\n--- Recent OTP codes ---');
    const { data: otpCodes, error: otpError } = await supabase
      .from('otp_codes')
      .select('*')
      .eq('email', email)
      .order('created_at', { ascending: false })
      .limit(5);
      
    if (otpError) {
      console.error('OTP fetch error:', otpError);
    } else {
      console.log('Recent OTP codes:', otpCodes.length);
      otpCodes.forEach((code, index) => {
        console.log(`${index + 1}. Type: ${code.type}, Used: ${code.used}, Expires: ${code.expires_at}`);
      });
    }

  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

// Get password from command line arguments or use default
const email = process.argv[2] || 'admin@nanimade.com';
const password = process.argv[3] || 'Password123'; // Default test password

debugPassword(email, password);