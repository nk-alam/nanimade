# NaniMade - Complete Ecommerce Platform

A comprehensive ecommerce platform for authentic handmade pickles from Malda, built with Next.js, Supabase, and modern web technologies.

## 🚀 Features

### Core Ecommerce Features
- **Product Management**: Complete product catalog with variants, categories, and inventory tracking
- **Shopping Cart**: Persistent cart with quantity management and variant selection
- **Checkout Process**: Smooth, multi-step checkout with address management
- **Payment Integration**: Razorpay payment gateway with multiple payment options
- **Order Management**: Complete order lifecycle from placement to delivery
- **User Authentication**: Email/password and Google OAuth integration
- **User Dashboard**: Order history, address management, wishlist, and profile settings

### Admin Features
- **Admin Dashboard**: Comprehensive analytics with Chart.js visualizations
- **Product Management**: Add, edit, and manage products with variants
- **Order Management**: Process orders, update status, and track shipments
- **Customer Management**: View and manage customer accounts
- **Blog Management**: Create and manage blog posts with recipe schema
- **Settings Management**: Configure site settings, payment gateways, and integrations
- **Analytics**: Sales tracking, popular products, and performance metrics

### Advanced Features
- **SEO Optimized**: Dynamic meta tags, structured data, and sitemap generation
- **Blog System**: Recipe-focused blog with proper schema markup
- **Search Functionality**: Advanced product search with filters
- **Wishlist**: Save favorite products for later
- **Multi-address Support**: Multiple delivery addresses with default selection
- **Responsive Design**: Mobile-first design with smooth animations
- **Real-time Updates**: Live inventory and order status updates
- **Email Notifications**: Order confirmations and status updates
- **Security**: JWT authentication, CORS protection, and secure API routes

### Integrations
- **Supabase**: Database, authentication, and real-time subscriptions
- **Razorpay**: Payment processing with multiple payment methods
- **Shiprocket**: Shipping and order tracking integration
- **Google Analytics**: Traffic and conversion tracking
- **Google Search Console**: SEO monitoring and optimization
- **Social Media**: Facebook Pixel and social login integration

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, Framer Motion
- **Database**: Supabase (PostgreSQL)
- **Authentication**: NextAuth.js with Google OAuth
- **Payment**: Razorpay
- **Charts**: Chart.js
- **State Management**: Zustand
- **Form Handling**: React Hook Form with Yup validation
- **Icons**: Heroicons
- **Deployment**: Vercel

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/nanimade-ecommerce.git
   cd nanimade-ecommerce
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Fill in your environment variables in `.env.local`

4. **Set up Supabase**
   - Create a new Supabase project
   - Run the migration file in your Supabase SQL editor
   - Update your environment variables with Supabase credentials

5. **Set up authentication providers**
   - Configure Google OAuth in Google Cloud Console
   - Add redirect URIs for your domain
   - Update environment variables with OAuth credentials

6. **Set up payment gateway**
   - Create a Razorpay account
   - Get your API keys from Razorpay dashboard
   - Update environment variables with Razorpay credentials

7. **Run the development server**
   ```bash
   npm run dev
   ```

## 🚀 Deployment to Vercel

### Prerequisites
- Vercel account
- GitHub repository
- All required service accounts (Supabase, Razorpay, Google OAuth, etc.)

### Step-by-Step Deployment

1. **Prepare your repository**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Configure environment variables in Vercel dashboard

3. **Environment Variables for Production**
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_production_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_production_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_production_service_role_key
   NEXTAUTH_URL=https://your-domain.vercel.app
   NEXTAUTH_SECRET=your_production_nextauth_secret
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   NEXT_PUBLIC_RAZORPAY_KEY_ID=your_razorpay_key_id
   RAZORPAY_KEY_SECRET=your_razorpay_key_secret
   NEXT_PUBLIC_GA_ID=your_google_analytics_id
   NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
   ```

4. **Update OAuth Redirect URIs**
   - Add your Vercel domain to Google OAuth settings
   - Update redirect URIs: `https://your-domain.vercel.app/api/auth/callback/google`

5. **Configure Custom Domain (Optional)**
   - Add your custom domain in Vercel dashboard
   - Update DNS records as instructed
   - Update environment variables with your custom domain

6. **Post-Deployment Setup**
   - Create admin user in Supabase
   - Configure site settings through admin panel
   - Test all functionality including payments
   - Set up Google Analytics and Search Console
   - Configure email notifications

### Production Checklist

- [ ] All environment variables configured
- [ ] Database migrations applied
- [ ] OAuth providers configured
- [ ] Payment gateway tested
- [ ] Admin user created
- [ ] Site settings configured
- [ ] Analytics tracking active
- [ ] SSL certificate active
- [ ] Custom domain configured (if applicable)
- [ ] Email notifications working
- [ ] All features tested end-to-end

## 🔧 Configuration

### Admin Setup
1. Register a user account
2. Go to Supabase dashboard → Table Editor → profiles
3. Change the user's role from 'user' to 'admin'
4. Access admin panel at `/admin`

### Site Settings
Configure the following through the admin panel:
- Site name and description
- Contact information
- Payment gateway settings
- Shipping configuration
- SEO and analytics settings
- Security settings

### Google Analytics Setup
1. Create GA4 property
2. Get Measurement ID (G-XXXXXXXXXX)
3. Add to environment variables
4. Configure enhanced ecommerce tracking

### Google Search Console
1. Add property for your domain
2. Verify ownership
3. Submit sitemap: `https://your-domain.com/sitemap.xml`

## 📱 Features Overview

### Customer Features
- Browse products with advanced filtering
- Product variants (size, weight, price)
- Shopping cart with persistent storage
- Wishlist functionality
- User registration and login
- Google OAuth integration
- Multiple delivery addresses
- Order tracking
- Review and rating system
- Blog with recipes

### Admin Features
- Dashboard with analytics
- Product management
- Order processing
- Customer management
- Blog management
- Site settings
- Payment configuration
- Shipping settings
- SEO tools

### Technical Features
- Server-side rendering (SSR)
- Static site generation (SSG)
- API routes for backend logic
- Real-time database updates
- Responsive design
- Progressive Web App (PWA) ready
- SEO optimized
- Security best practices

## 🔒 Security Features

- JWT-based authentication
- Row Level Security (RLS) in Supabase
- CORS protection
- Rate limiting
- Input validation and sanitization
- Secure payment processing
- Environment variable protection
- SQL injection prevention

## 📊 Analytics & Monitoring

- Google Analytics 4 integration
- Enhanced ecommerce tracking
- Custom event tracking
- Performance monitoring
- Error tracking
- User behavior analysis
- Conversion tracking
- Sales analytics

## 🛡️ Best Practices

- TypeScript for type safety
- ESLint and Prettier for code quality
- Responsive design principles
- Accessibility standards (WCAG)
- SEO optimization
- Performance optimization
- Security best practices
- Clean code architecture

## 📞 Support

For support and questions:
- Email: support@nanimade.com
- Documentation: Check the `/docs` folder
- Issues: Create an issue on GitHub

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 🙏 Acknowledgments

- Supabase for the amazing backend platform
- Vercel for seamless deployment
- The Next.js team for the excellent framework
- All contributors and supporters

---

Built with ❤️ for authentic pickle lovers everywhere! 🥭