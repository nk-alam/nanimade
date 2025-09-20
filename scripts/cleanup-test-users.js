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

async function cleanupTestUsers() {
  try {
    console.log('Cleaning up test users...');
    
    // Delete test users
    const testEmails = ['test@example.com', 'test2@example.com', 'test3@example.com', 'testfinal@example.com'];
    
    for (const email of testEmails) {
      // First, find the user ID
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('id')
        .eq('email', email)
        .single();

      if (userData && userData.id) {
        // Delete from auth.users
        const { error: deleteAuthError } = await supabase.auth.admin.deleteUser(userData.id);
        if (deleteAuthError) {
          console.log(`Error deleting auth user ${email}:`, deleteAuthError.message);
        } else {
          console.log(`Deleted auth user ${email}`);
        }
        
        // Delete from public.users
        const { error: deleteUserError } = await supabase
          .from('users')
          .delete()
          .eq('email', email);

        if (deleteUserError) {
          console.log(`Error deleting public user ${email}:`, deleteUserError.message);
        } else {
          console.log(`Deleted public user ${email}`);
        }
      }
    }
    
    console.log('Cleanup completed');
  } catch (error) {
    console.error('Unexpected error during cleanup:', error);
  }
}

cleanupTestUsers();