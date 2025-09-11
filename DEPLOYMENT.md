# NaniMade Ecommerce Platform - Deployment Guide

This guide will help you deploy the complete NaniMade ecommerce platform to Vercel with all features working.

## Prerequisites

- Node.js 18+ installed locally
- Git installed
- Vercel account
- Supabase account
- Razorpay account
- Google Cloud Console account (for OAuth)
- Shiprocket account (optional, for shipping)

## 1. Environment Setup

### Required Environment Variables

Create a `.env.local` file in your project root with the following variables:

```env
# Database
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Authentication
NEXTAUTH_URL=https://your-domain.vercel.app
NEXTAUTH_SECRET=your_nextauth_secret_key

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Razorpay Payment Gateway
NEXT_PUBLIC_RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

# Shiprocket (Optional)
SHIPROCKET_EMAIL=your_shiprocket_email
SHIPROCKET_PASSWORD=your_shiprocket_password

# Analytics
NEXT_PUBLIC_GA_ID=your_google_analytics_id
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app

# Site Configuration
NEXT_PUBLIC_SITE_NAME=NaniMade
NEXT_PUBLIC_SITE_DESCRIPTION=Authentic handmade pickles from Malda
```

## 2. Supabase Setup

### Step 1: Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Note down your project URL and anon key

### Step 2: Run Database Migrations
1. Copy the SQL from `supabase/migrations/create_complete_schema.sql`
2. Go to your Supabase dashboard → SQL Editor
3. Paste and run the SQL to create all tables and policies

### Step 3: Configure Authentication
1. Go to Authentication → Settings
2. Enable email authentication
3. Add your site URL to allowed redirect URLs
4. Configure Google OAuth provider with your credentials

### Step 4: Storage Setup (Optional)
1. Go to Storage → Create bucket named "product-images"
2. Set bucket to public
3. Configure upload policies for authenticated users

## 3. Google OAuth Setup

### Step 1: Create Google Cloud Project
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select existing one
3. Enable Google+ API

### Step 2: Configure OAuth Consent Screen
1. Go to APIs & Services → OAuth consent screen
2. Fill in application details
3. Add your domain to authorized domains

### Step 3: Create OAuth Credentials
1. Go to APIs & Services → Credentials
2. Create OAuth 2.0 Client ID
3. Add authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google` (development)
   - `https://your-domain.vercel.app/api/auth/callback/google` (production)

## 4. Razorpay Setup

### Step 1: Create Razorpay Account
1. Go to [razorpay.com](https://razorpay.com)
2. Sign up and complete KYC verification
3. Go to Settings → API Keys
4. Generate and note down Key ID and Key Secret

### Step 2: Configure Webhooks (Optional)
1. Go to Settings → Webhooks
2. Add webhook URL: `https://your-domain.vercel.app/api/webhooks/razorpay`
3. Select relevant events (payment.captured, payment.failed, etc.)

## 5. Google Analytics Setup (Optional)

### Step 1: Create GA4 Property
1. Go to [Google Analytics](https://analytics.google.com)
2. Create a new GA4 property
3. Note down the Measurement ID (G-XXXXXXXXXX)

### Step 2: Configure Enhanced Ecommerce
1. Enable Enhanced Ecommerce in GA4
2. Set up conversion events for purchases

## 6. Shiprocket Setup (Optional)

### Step 1: Create Shiprocket Account
1. Go to [shiprocket.in](https://shiprocket.in)
2. Complete seller onboarding
3. Note down API credentials

### Step 2: Configure Pickup Address
1. Add your pickup/warehouse address
2. Configure shipping rates and zones

## 7. Local Development

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Run Development Server
```bash
npm run dev
```

### Step 3: Test All Features
- User registration/login
- Product browsing and search
- Cart functionality
- Checkout process
- Payment integration
- Admin dashboard
- Blog functionality

## 8. Vercel Deployment

### Step 1: Connect Repository
1. Push your code to GitHub/GitLab
2. Go to [vercel.com](https://vercel.com)
3. Import your repository

### Step 2: Configure Environment Variables
1. In Vercel dashboard, go to Settings → Environment Variables
2. Add all environment variables from your `.env.local`
3. Make sure to update `NEXTAUTH_URL` and `NEXT_PUBLIC_SITE_URL` to your Vercel domain

### Step 3: Deploy
1. Vercel will automatically deploy on push
2. Check deployment logs for any errors
3. Test all functionality on production

## 9. Domain Configuration

### Step 1: Custom Domain (Optional)
1. In Vercel dashboard, go to Settings → Domains
2. Add your custom domain
3. Configure DNS records as instructed

### Step 2: Update Environment Variables
1. Update `NEXTAUTH_URL` and `NEXT_PUBLIC_SITE_URL` to your custom domain
2. Update OAuth redirect URIs in Google Cloud Console
3. Update webhook URLs in Razorpay dashboard

## 10. Post-Deployment Setup

### Step 1: Create Admin User
1. Register a user account through the website
2. Go to Supabase dashboard → Table Editor → profiles
3. Change the user's role from 'user' to 'admin'

### Step 2: Add Initial Content
1. Login as admin
2. Add product categories
3. Add initial products with images
4. Create blog posts
5. Configure site settings

### Step 3: Test Complete Flow
1. Test user registration/login
2. Test product purchase flow
3. Test payment processing
4. Test order management
5. Test admin dashboard functionality

## 11. SEO Configuration

### Step 1: Google Search Console
1. Go to [Google Search Console](https://search.google.com/search-console)
2. Add your property
3. Verify ownership
4. Submit sitemap: `https://your-domain.vercel.app/sitemap.xml`

### Step 2: Structured Data
- Product schema is automatically generated
- Recipe schema is included in blog posts
- Organization schema is in the layout

## 12. Performance Optimization

### Step 1: Image Optimization
- All images are optimized using Next.js Image component
- Configure image domains in `next.config.js`

### Step 2: Caching
- Static pages are cached at build time
- API routes use appropriate cache headers
- Database queries are optimized with indexes

## 13. Security Checklist

- ✅ Environment variables are secure
- ✅ Database RLS policies are configured
- ✅ API routes are protected
- ✅ Payment processing is secure
- ✅ User input is validated
- ✅ CORS is properly configured

## 14. Monitoring and Analytics

### Step 1: Error Monitoring
- Check Vercel function logs regularly
- Monitor Supabase logs for database errors
- Set up error alerts if needed

### Step 2: Performance Monitoring
- Use Vercel Analytics for performance insights
- Monitor Core Web Vitals
- Track conversion rates in Google Analytics

## 15. Backup and Maintenance

### Step 1: Database Backups
- Supabase automatically backs up your database
- Consider setting up additional backup strategies for critical data

### Step 2: Regular Updates
- Keep dependencies updated
- Monitor security advisories
- Test updates in staging environment

## Troubleshooting

### Common Issues

1. **Authentication not working**
   - Check NEXTAUTH_URL and NEXTAUTH_SECRET
   - Verify OAuth redirect URIs
   - Check Supabase auth settings

2. **Payment failures**
   - Verify Razorpay credentials
   - Check webhook configuration
   - Test in Razorpay test mode first

3. **Database connection issues**
   - Verify Supabase URL and keys
   - Check RLS policies
   - Ensure migrations are applied

4. **Build failures**
   - Check for TypeScript errors
   - Verify all environment variables are set
   - Check import paths and dependencies

### Support

For additional support:
- Check Vercel documentation
- Review Supabase guides
- Consult Next.js documentation
- Check component library documentation

## Success Checklist

Before going live, ensure:
- [ ] All environment variables are configured
- [ ] Database schema is deployed
- [ ] Admin user is created
- [ ] Payment gateway is tested
- [ ] Email notifications work
- [ ] SEO meta tags are configured
- [ ] Analytics tracking is active
- [ ] SSL certificate is active
- [ ] Custom domain is configured (if applicable)
- [ ] All features are tested end-to-end

Your NaniMade ecommerce platform is now ready for production! 🥭✨