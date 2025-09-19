# Supabase Setup Guide for NaniMade

This guide will help you set up Supabase for your NaniMade ecommerce website.

## Step 1: Create a Supabase Account

1. Go to [https://supabase.com](https://supabase.com)
2. Click "Start your project" and sign up with GitHub/Google
3. Create a new organization (or use existing)

## Step 2: Create a New Project

1. Click "New Project"
2. Choose your organization
3. Fill in project details:
   - **Name**: nanimade-ecommerce
   - **Database Password**: Choose a strong password (save it!)
   - **Region**: Choose closest to your users (e.g., Mumbai for India)
4. Click "Create new project"
5. Wait for project to be ready (2-3 minutes)

## Step 3: Get Your Project Credentials

1. Go to Project Settings > API
2. Copy these values:
   - **Project URL**: `https://your-project-id.supabase.co`
   - **Public anon key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
   - **Service role key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` (keep this secret!)

## Step 4: Update Environment Variables

1. Open `.env.local` in your project
2. Replace the placeholder values:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_public_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

## Step 5: Set Up Database Schema

1. Go to Supabase Dashboard > SQL Editor
2. Copy the entire content from `supabase-schema.sql` file
3. Paste it in the SQL Editor
4. Click "Run" to execute the script

This will create:
- All necessary tables (users, products, orders, etc.)
- Row Level Security policies
- Indexes for performance
- Default categories and settings

## Step 6: Set Up Authentication

1. Go to Authentication > Settings
2. Configure the following:

### Site URL
- Add your site URL: `http://localhost:3000` (for development)
- For production: `https://your-domain.com`

### Auth Providers

#### Email Provider
1. Enable "Email" provider
2. Disable "Confirm email" for now (you can enable later)
3. Enable "Enable email confirmations"

#### Google OAuth
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select existing
3. Enable Google+ API
4. Go to Credentials > Create Credentials > OAuth 2.0 Client IDs
5. Set application type to "Web application"
6. Add authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google` (development)
   - `https://your-domain.com/api/auth/callback/google` (production)
7. Copy Client ID and Client Secret
8. In Supabase, go to Authentication > Settings > Auth Providers
9. Enable Google and add your credentials

## Step 7: Configure Storage (Optional)

1. Go to Storage > Buckets
2. Create a new bucket named "products"
3. Set it to public
4. Create another bucket named "blog" for blog images
5. Set up policies as needed

## Step 8: Set Up Real-time (Optional)

1. Go to Database > Replication
2. Enable real-time for tables you want to sync:
   - `cart_items` (for real-time cart updates)
   - `orders` (for order status updates)

## Step 9: Update NextAuth Configuration

Update your `.env.local` with Google OAuth credentials:

```env
# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

## Step 10: Test the Setup

1. Restart your development server: `npm run dev`
2. Try to:
   - Sign up with email
   - Sign in with Google
   - Browse products
   - Add items to cart

## Production Setup

For production deployment:

1. Update environment variables with production URLs
2. Set up custom domain in Supabase (optional)
3. Configure production OAuth redirect URLs
4. Set up database backups
5. Enable Row Level Security policies
6. Set up monitoring and alerts

## Troubleshooting

### Common Issues:

1. **Invalid Supabase URL**: Make sure URL starts with `https://` and ends with `.supabase.co`
2. **Authentication not working**: Check OAuth redirect URLs match exactly
3. **Database connection issues**: Verify service role key is correct
4. **CORS errors**: Make sure site URL is configured in Supabase Auth settings

### Support

- Supabase Docs: [https://supabase.com/docs](https://supabase.com/docs)
- Community: [https://github.com/supabase/supabase/discussions](https://github.com/supabase/supabase/discussions)

## Security Checklist

- [ ] Service role key is kept secret
- [ ] Row Level Security is enabled
- [ ] Auth providers are properly configured
- [ ] Database policies are restrictive
- [ ] Regular backups are scheduled
- [ ] Environment variables are secure

## Next Steps

After Supabase is set up:
1. Complete the admin dashboard
2. Set up Razorpay for payments
3. Configure Shiprocket for shipping
4. Set up Google Analytics
5. Deploy to Vercel