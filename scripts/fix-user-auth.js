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

async function fixUserAuth(email, password) {
  try {
    console.log(`Fixing auth for user: ${email}`);
    
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

    console.log('Current user data:');
    console.log('- ID:', user.id);
    console.log('- Email verified:', user.email_verified);
    console.log('- Has password hash:', !!user.password_hash);
    
    // Update the user to be verified in our database
    console.log('\n--- Updating user verification ---');
    const { error: updateError } = await supabase
      .from('users')
      .update({ 
        email_verified: true,
        verified_at: new Date().toISOString()
      })
      .eq('id', user.id);

    if (updateError) {
      console.error('User update error:', updateError);
    } else {
      console.log('User verification updated successfully');
    }
    
    // Confirm the user in Supabase Auth
    console.log('\n--- Confirming user in Supabase Auth ---');
    const { data: authUser, error: confirmError } = await supabase.auth.admin.updateUserById(
      user.id,
      { 
        email_confirm: true 
      }
    );

    if (confirmError) {
      console.error('Auth user confirmation error:', confirmError);
    } else {
      console.log('Auth user confirmed successfully');
    }
    
    // Update password in Supabase Auth to match our hash
    console.log('\n--- Updating password in Supabase Auth ---');
    // Note: We can't directly set the password hash, but we can update the password
    const { data: updateData, error: passwordError } = await supabase.auth.admin.updateUserById(
      user.id,
      { 
        password: password
      }
    );

    if (passwordError) {
      console.error('Password update error:', passwordError);
    } else {
      console.log('Password updated successfully in Supabase Auth');
      
      // Now let's rehash the password in our database to ensure consistency
      console.log('\n--- Rehashing password in database ---');
      const saltRounds = 12;
      const newPasswordHash = await bcrypt.hash(password, saltRounds);
      
      const { error: hashUpdateError } = await supabase
        .from('users')
        .update({ 
          password_hash: newPasswordHash
        })
        .eq('id', user.id);

      if (hashUpdateError) {
        console.error('Password hash update error:', hashUpdateError);
      } else {
        console.log('Password hash updated successfully in database');
      }
    }
    
    console.log('\n--- Final verification ---');
    // Test the password again
    const { data: updatedUser, error: fetchError } = await supabase
      .from('users')
      .select('password_hash')
      .eq('email', email)
      .single();
      
    if (!fetchError && updatedUser.password_hash) {
      const isValid = await bcrypt.compare(password, updatedUser.password_hash);
      console.log('Final password validation:', isValid);
    }

  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

// Get password from command line arguments
const email = process.argv[2] || 'admin@nanimade.com';
const password = process.argv[3] || 'Password123'; // Default test password

fixUserAuth(email, password);