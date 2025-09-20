# NaniMade E-commerce Deployment Guide

## 🚀 Deployment Instructions for Vercel

### Prerequisites
- Vercel account (sign up at vercel.com)
- Supabase account (sign up at supabase.com)
- Domain name (optional, Vercel provides free subdomain)

### 1. Supabase Setup

#### Create a New Project
1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Click "New project"
3. Choose organization and set project details:
   - **Name**: `nanimade-production`
   - **Database Password**: Generate strong password (save it!)
   - **Region**: Choose closest to your target audience
   - **Pricing Plan**: Start with Free tier

#### Database Schema Setup
1. Go to **SQL Editor** in Supabase dashboard
2. Run the following SQL to create all required tables:

```sql
-- Enable Row Level Security
alter table if exists public.users enable row level security;
alter table if exists public.products enable row level security;
alter table if exists public.orders enable row level security;
alter table if exists public.categories enable row level security;
alter table if exists public.blog_posts enable row level security;

-- Users table (extends auth.users)
create table if not exists public.users (
  id uuid references auth.users(id) primary key,
  email text unique not null,
  name text,
  phone text,
  role text default 'customer' check (role in ('customer', 'admin')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Categories table
create table if not exists public.categories (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  slug text unique not null,
  description text,
  image text,
  status text default 'active' check (status in ('active', 'inactive')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Products table
create table if not exists public.products (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  slug text unique not null,
  description text,
  short_description text,
  price decimal(10,2) not null,
  compare_price decimal(10,2),
  cost_price decimal(10,2),
  sku text unique,
  barcode text,
  track_quantity boolean default true,
  quantity integer default 0,
  category_id uuid references public.categories(id),
  images text[] default '{}',
  tags text[] default '{}',
  status text default 'active' check (status in ('active', 'draft', 'archived')),
  featured boolean default false,
  seo_title text,
  seo_description text,
  weight decimal(8,2),
  requires_shipping boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Product variants table
create table if not exists public.product_variants (
  id uuid default gen_random_uuid() primary key,
  product_id uuid references public.products(id) on delete cascade,
  title text not null,
  sku text unique,
  barcode text,
  price decimal(10,2) not null,
  compare_price decimal(10,2),
  cost_price decimal(10,2),
  quantity integer default 0,
  weight decimal(8,2),
  option1 text,
  option2 text,
  option3 text,
  image text,
  position integer default 1,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Addresses table
create table if not exists public.addresses (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.users(id) on delete cascade,
  type text default 'shipping' check (type in ('shipping', 'billing')),
  first_name text not null,
  last_name text,
  company text,
  address1 text not null,
  address2 text,
  city text not null,
  state text not null,
  postal_code text not null,
  country text not null default 'India',
  phone text,
  is_default boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Orders table
create table if not exists public.orders (
  id uuid default gen_random_uuid() primary key,
  order_number text unique not null,
  user_id uuid references public.users(id),
  email text not null,
  status text default 'pending' check (status in ('pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded')),
  payment_status text default 'pending' check (payment_status in ('pending', 'paid', 'failed', 'refunded')),
  fulfillment_status text default 'unfulfilled' check (fulfillment_status in ('unfulfilled', 'partial', 'fulfilled')),
  subtotal decimal(10,2) not null,
  tax_amount decimal(10,2) default 0,
  shipping_amount decimal(10,2) default 0,
  discount_amount decimal(10,2) default 0,
  total_amount decimal(10,2) not null,
  currency text default 'INR',
  billing_address jsonb,
  shipping_address jsonb,
  shipping_method text,
  tracking_number text,
  tracking_url text,
  notes text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Order items table
create table if not exists public.order_items (
  id uuid default gen_random_uuid() primary key,
  order_id uuid references public.orders(id) on delete cascade,
  product_id uuid references public.products(id),
  variant_id uuid references public.product_variants(id),
  quantity integer not null,
  price decimal(10,2) not null,
  total decimal(10,2) not null,
  product_title text not null,
  variant_title text,
  sku text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Cart table
create table if not exists public.cart_items (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.users(id) on delete cascade,
  session_id text,
  product_id uuid references public.products(id) on delete cascade,
  variant_id uuid references public.product_variants(id) on delete cascade,
  quantity integer not null default 1,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Wishlist table
create table if not exists public.wishlist_items (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.users(id) on delete cascade,
  product_id uuid references public.products(id) on delete cascade,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Blog posts table
create table if not exists public.blog_posts (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  slug text unique not null,
  excerpt text,
  content text,
  featured_image text,
  author_id uuid references public.users(id),
  category text,
  tags text[] default '{}',
  status text default 'draft' check (status in ('draft', 'published', 'archived')),
  featured boolean default false,
  seo_title text,
  seo_description text,
  published_at timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Reviews table
create table if not exists public.reviews (
  id uuid default gen_random_uuid() primary key,
  product_id uuid references public.products(id) on delete cascade,
  user_id uuid references public.users(id) on delete cascade,
  rating integer not null check (rating >= 1 and rating <= 5),
  title text,
  content text,
  verified_purchase boolean default false,
  status text default 'pending' check (status in ('pending', 'approved', 'rejected')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Insert default admin user
INSERT INTO public.users (id, email, name, role) 
VALUES ('00000000-0000-0000-0000-000000000000', 'admin@nanimade.com', 'Admin', 'admin')
ON CONFLICT (id) DO NOTHING;

-- Insert sample categories
INSERT INTO public.categories (name, slug, description, status) VALUES
('Mango Pickle', 'mango-pickle', 'Traditional mango pickles from Malda', 'active'),
('Mixed Pickle', 'mixed-pickle', 'Assorted vegetable and fruit pickles', 'active'),
('Seasonal Pickles', 'seasonal-pickles', 'Limited time seasonal varieties', 'active')
ON CONFLICT (slug) DO NOTHING;

-- Enable RLS policies
create policy "Users can view their own data" on public.users for select using (auth.uid() = id);
create policy "Users can update their own data" on public.users for update using (auth.uid() = id);
create policy "Anyone can view published products" on public.products for select using (status = 'active');
create policy "Anyone can view active categories" on public.categories for select using (status = 'active');
create policy "Users can manage their own cart" on public.cart_items for all using (auth.uid() = user_id);
create policy "Users can manage their own wishlist" on public.wishlist_items for all using (auth.uid() = user_id);
create policy "Users can view their own orders" on public.orders for select using (auth.uid() = user_id);
create policy "Users can manage their own addresses" on public.addresses for all using (auth.uid() = user_id);
create policy "Anyone can view published blog posts" on public.blog_posts for select using (status = 'published');
create policy "Anyone can view approved reviews" on public.reviews for select using (status = 'approved');
create policy "Users can create reviews" on public.reviews for insert with check (auth.uid() = user_id);
```

#### Enable Authentication
1. Go to **Authentication** > **Settings**
2. Configure **Site URL**: `https://your-domain.com` (or `http://localhost:3000` for development)
3. Add **Redirect URLs**:
   - `https://your-domain.com/auth/callback`
   - `http://localhost:3000/auth/callback`

#### Google OAuth Setup (Optional)
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized origins and redirect URIs
6. Copy Client ID and Client Secret
7. In Supabase: **Authentication** > **Settings** > **Auth Providers** > **Google**
8. Enable Google and add your credentials

### 2. Environment Variables

Create `.env.local` file in your project root:

```env
# App
NEXT_PUBLIC_APP_NAME="NaniMade"
NEXT_PUBLIC_APP_URL="https://nanimade.com"

# Supabase
NEXT_PUBLIC_SUPABASE_URL="your_supabase_project_url"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your_supabase_anon_key"
SUPABASE_SERVICE_ROLE_KEY="your_supabase_service_role_key"

# Auth
NEXTAUTH_SECRET="your_random_secret_key_here"
NEXTAUTH_URL="https://nanimade.com"

# Google OAuth (optional)
GOOGLE_CLIENT_ID="your_google_client_id"
GOOGLE_CLIENT_SECRET="your_google_client_secret"

# Razorpay
RAZORPAY_KEY_ID="rzp_test_your_key_id"
RAZORPAY_KEY_SECRET="your_razorpay_secret"
NEXT_PUBLIC_RAZORPAY_KEY_ID="rzp_test_your_key_id"

# Shiprocket
SHIPROCKET_EMAIL="your_shiprocket_email"
SHIPROCKET_PASSWORD="your_shiprocket_password"

# Analytics
NEXT_PUBLIC_GA_ID="G-XXXXXXXXXX"
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION="your_verification_code"
NEXT_PUBLIC_FACEBOOK_PIXEL_ID="your_pixel_id"

# Email (Optional)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your_email@gmail.com"
SMTP_PASSWORD="your_app_password"

# Admin
ADMIN_EMAIL="admin@nanimade.com"
```

### 3. Vercel Deployment

#### Method 1: GitHub Integration (Recommended)
1. Push your code to GitHub
2. Go to [Vercel Dashboard](https://vercel.com/dashboard)
3. Click "New Project"
4. Import your GitHub repository
5. Configure project:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./` (if monorepo, specify frontend folder)
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `.next` (default)
   - **Install Command**: `npm install` (default)

#### Method 2: Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Follow prompts:
# ? Set up and deploy "~/nanimade"? [Y/n] y
# ? Which scope should contain your project? Your Name
# ? What's your project's name? nanimade
# ? In which directory is your code located? ./
# ? Want to override the settings? [y/N] n
```

#### Environment Variables in Vercel
1. Go to your project in Vercel Dashboard
2. Navigate to **Settings** > **Environment Variables**
3. Add all variables from your `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL = your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY = your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY = your_supabase_service_role_key
NEXTAUTH_SECRET = your_random_secret_key_here
NEXTAUTH_URL = https://your-domain.vercel.app
... (add all other variables)
```

### 4. Domain Configuration

#### Custom Domain (Optional)
1. In Vercel Dashboard, go to **Settings** > **Domains**
2. Add your custom domain
3. Follow DNS configuration instructions
4. Update `NEXTAUTH_URL` environment variable to your custom domain

#### SSL Certificate
- Vercel automatically provides SSL certificates
- Your site will be available at `https://your-project.vercel.app`

### 5. Post-Deployment Setup

#### Admin Access
1. Visit `https://your-domain.com/auth/signin`
2. Sign in with `admin@nanimade.com`
3. Go to `https://your-domain.com/admin` to access admin dashboard
4. Configure integrations in **Settings**

#### Test Core Features
1. **Homepage**: Verify layout and content load
2. **Products**: Check product pages and variations
3. **Cart**: Add/remove items, checkout flow
4. **Authentication**: Sign up/sign in flows
5. **Admin**: Dashboard access and functionality

#### SEO Setup
1. **Google Search Console**:
   - Add and verify your domain
   - Submit sitemap: `https://your-domain.com/sitemap.xml`
2. **Google Analytics**:
   - Add tracking code in admin settings
   - Verify tracking is working

### 6. Performance Optimization

#### Image Optimization
- Use Next.js Image component (already implemented)
- Upload images to Supabase Storage or use external CDN

#### Caching
- Vercel provides automatic edge caching
- Configure ISR for dynamic content

#### Database Optimization
- Monitor Supabase performance
- Add indexes for frequently queried fields
- Consider upgrading to Pro plan for production

### 7. Monitoring & Maintenance

#### Error Tracking
- Monitor Vercel Analytics
- Set up error tracking (Sentry, LogRocket)

#### Backup
- Supabase provides automatic backups
- Export data regularly for additional security

#### Updates
- Monitor dependencies for security updates
- Test updates in staging environment first

### 8. Production Checklist

- [ ] Supabase project configured
- [ ] All environment variables set
- [ ] Domain configured and SSL enabled
- [ ] Admin access working
- [ ] Payment gateway tested (use test mode initially)
- [ ] Shipping integration configured
- [ ] Analytics tracking verified
- [ ] SEO meta tags and sitemaps working
- [ ] Error pages customized
- [ ] Contact forms working
- [ ] Mobile responsiveness tested
- [ ] Performance audit completed
- [ ] Security headers configured

### 9. Going Live

1. **Test Thoroughly**: Use Razorpay test mode for payment testing
2. **Switch to Production**: Update environment variables for production APIs
3. **Monitor**: Watch for errors and performance issues
4. **Marketing**: Set up email campaigns, social media integration
5. **Customer Support**: Ensure contact methods are working

### 10. Support & Resources

- **Next.js Docs**: https://nextjs.org/docs
- **Vercel Docs**: https://vercel.com/docs
- **Supabase Docs**: https://supabase.com/docs
- **Razorpay Docs**: https://razorpay.com/docs
- **Shiprocket API**: https://apidocs.shiprocket.in

---

**Need Help?** 
If you encounter any issues during deployment, check the troubleshooting section below or refer to the platform-specific documentation.

## Troubleshooting

### Common Issues

1. **Build Errors**
   - Check TypeScript errors: `npm run lint`
   - Verify all dependencies are installed: `npm install`

2. **Environment Variables**
   - Ensure all required variables are set in Vercel
   - Check variable names match exactly (case-sensitive)

3. **Database Connection**
   - Verify Supabase URL and keys
   - Check RLS policies are correctly configured

4. **Authentication Issues**
   - Verify redirect URLs in Supabase Auth settings
   - Check NEXTAUTH_URL matches your domain

5. **Payment Integration**
   - Start with test mode before going live
   - Verify webhook URLs are correctly configured

This comprehensive deployment guide will help you get your NaniMade e-commerce platform running on Vercel with all integrations properly configured!