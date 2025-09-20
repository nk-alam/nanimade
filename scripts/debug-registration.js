require('dotenv').config({ path: '.env.local' });

const { createClient } = require('@supabase/supabase-js');

// Supabase configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

console.log('Supabase Config:');
console.log('URL:', supabaseUrl);
console.log('Service Key exists:', !!supabaseServiceKey);

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Supabase environment variables not set');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function debugRegistration() {
  try {
    console.log('\n--- Testing Supabase Connection ---');
    
    // Test basic connection
    const { data, error } = await supabase
      .from('users')
      .select('id')
      .limit(1);

    if (error) {
      console.error('Connection test failed:', error);
      return;
    }

    console.log('Connection test successful');
    
    // Test user creation in Auth
    console.log('\n--- Testing Auth User Creation ---');
    const testEmail = `test_${Date.now()}@example.com`;
    const testPassword = 'TestPassword123';
    
    console.log('Creating auth user with:', { email: testEmail });
    const { data: authUser, error: authError } = await supabase.auth.admin.createUser({
      email: testEmail,
      password: testPassword,
      email_confirm: false,
    });

    if (authError) {
      console.error('Auth user creation failed:', authError);
      console.error('Error details:', {
        message: authError.message,
        status: authError.status,
        code: authError.code
      });
      return;
    }

    console.log('Auth user created successfully:', authUser.user.id);
    
    // Test database user creation
    console.log('\n--- Testing Database User Creation ---');
    console.log('Creating database user with ID:', authUser.user.id);
    
    const { data: dbUser, error: dbError } = await supabase
      .from('users')
      .insert({
        id: authUser.user.id,
        email: testEmail,
        name: 'Test User',
        password_hash: 'test_hash',
        email_verified: false,
        is_admin: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .select()
      .single();

    if (dbError) {
      console.error('Database user creation failed:', dbError);
      console.error('Error details:', {
        message: dbError.message,
        code: dbError.code,
        details: dbError.details,
        hint: dbError.hint
      });
      
      // Clean up auth user if database insert failed
      await supabase.auth.admin.deleteUser(authUser.user.id);
      return;
    }

    console.log('Database user created successfully:', dbUser.id);
    
    // Test OTP creation
    console.log('\n--- Testing OTP Creation ---');
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
    
    const { error: otpError } = await supabase
      .from('otp_codes')
      .insert({
        email: testEmail,
        code: otp,
        type: 'verification',
        expires_at: expiresAt.toISOString(),
        used: false,
        created_at: new Date().toISOString()
      });

    if (otpError) {
      console.error('OTP creation failed:', otpError);
    } else {
      console.log('OTP created successfully');
    }
    
    // Clean up test users
    console.log('\n--- Cleaning up test users ---');
    await supabase.auth.admin.deleteUser(authUser.user.id);
    await supabase.from('users').delete().eq('email', testEmail);
    await supabase.from('otp_codes').delete().eq('email', testEmail);
    
    console.log('Test completed successfully!');
    
  } catch (error) {
    console.error('Unexpected error:', error);
    console.error('Error stack:', error.stack);
  }
}

debugRegistration();