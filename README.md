# NaniMade - Authentic Malda Mango Pickles E-commerce Platform

<div align="center">
  <img src="public/logo.png" alt="NaniMade Logo" width="200" height="200">
  
  <p><strong>A complete, production-ready e-commerce platform for authentic Bengali pickles from Malda</strong></p>

  [![Next.js](https://img.shields.io/badge/Next.js-15.5.3-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
  [![Supabase](https://img.shields.io/badge/Supabase-Database-green?style=for-the-badge&logo=supabase)](https://supabase.com/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
</div>

## 🌟 Features

### 🛒 E-commerce Core
- **Product Management**: Full CRUD with variants, pricing, inventory
- **Shopping Cart**: Persistent cart with local storage sync
- **Checkout Process**: Multi-step checkout with upselling
- **Order Management**: Complete order lifecycle tracking
- **User Accounts**: Registration, login, profile management
- **Wishlist**: Save products for later
- **Reviews & Ratings**: Customer feedback system

### 🎨 User Experience
- **Responsive Design**: Mobile-first, works on all devices
- **Fast Performance**: Next.js 15 with optimizations
- **SEO Optimized**: Meta tags, sitemaps, structured data
- **Progressive Web App**: Installable, offline-capable
- **Accessibility**: WCAG compliant design

### 🔐 Authentication & Security
- **Multiple Auth Methods**: Email/password, Google OAuth
- **OTP Verification**: SMS/Email verification for accounts
- **Role-based Access**: Customer and admin roles
- **Secure Sessions**: JWT tokens with NextAuth.js
- **Data Protection**: Row-level security with Supabase

### 💳 Payment & Shipping
- **Razorpay Integration**: Secure payment processing
- **Multiple Payment Methods**: Cards, UPI, Net Banking, COD
- **Shiprocket Integration**: Real-time shipping rates and tracking
- **Address Management**: Multiple shipping addresses
- **Order Tracking**: Real-time shipment updates

### 📊 Admin Dashboard
- **Analytics**: Sales charts, customer insights, product performance
- **Inventory Management**: Stock tracking, low stock alerts
- **Order Processing**: Order status management, fulfillment
- **Customer Management**: User accounts, order history
- **Content Management**: Blog posts, recipes, SEO content
- **Settings**: Payment gateways, shipping, integrations

### 📝 Content Management
- **Recipe Blog**: SEO-optimized recipe posts with structured data
- **Rich Content**: Images, videos, step-by-step instructions
- **Search Functionality**: Full-text search across products and content
- **Category Management**: Organized product categories

### 🔌 Integrations
- **Google Analytics**: Traffic and conversion tracking
- **Facebook Pixel**: Social media advertising
- **Google Search Console**: SEO monitoring
- **Email Marketing**: SMTP integration for notifications
- **Social Sharing**: Share products and recipes

### 📱 Mobile Optimized
- **Sticky Cart**: Mobile-friendly add to cart
- **Touch Gestures**: Swipe navigation, touch-friendly buttons
- **Fast Loading**: Optimized images and lazy loading
- **Offline Support**: Basic functionality works offline

## 🚀 Tech Stack

### Frontend
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4.0
- **UI Components**: Radix UI primitives
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Forms**: React Hook Form with Zod validation

### Backend
- **Database**: Supabase (PostgreSQL)
- **Authentication**: NextAuth.js v5
- **API**: Next.js API Routes
- **File Storage**: Supabase Storage
- **Real-time**: Supabase Realtime

### Integrations
- **Payments**: Razorpay
- **Shipping**: Shiprocket
- **Analytics**: Google Analytics 4
- **SEO**: Next-SEO, Next-Sitemap
- **Charts**: Chart.js, React-Chartjs-2

### Development Tools
- **Linting**: ESLint
- **Type Checking**: TypeScript
- **Build**: Next.js Turbopack
- **Deployment**: Vercel

## 📁 Project Structure

```
nanimade/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── (auth)/                   # Authentication pages
│   │   ├── admin/                    # Admin dashboard
│   │   ├── api/                      # API routes
│   │   ├── cart/                     # Shopping cart
│   │   ├── checkout/                 # Checkout process
│   │   ├── dashboard/                # User dashboard
│   │   ├── products/                 # Product pages
│   │   ├── recipes/                  # Blog/Recipe pages
│   │   ├── globals.css               # Global styles
│   │   ├── layout.tsx                # Root layout
│   │   └── page.tsx                  # Homepage
│   ├── components/                   # Reusable components
│   │   ├── ui/                       # UI primitives
│   │   ├── cart/                     # Cart components
│   │   ├── product/                  # Product components
│   │   └── ...
│   ├── lib/                          # Utility libraries
│   │   ├── supabase.ts              # Supabase client
│   │   ├── auth.ts                  # Auth configuration
│   │   ├── utils.ts                 # Helper functions
│   │   ├── shiprocket.ts            # Shipping integration
│   │   └── analytics.tsx            # Analytics tracking
│   ├── hooks/                        # Custom React hooks
│   ├── types/                        # TypeScript type definitions
│   └── middleware.ts                 # Next.js middleware
├── public/                           # Static assets
├── docs/                            # Documentation
├── .env.local.example               # Environment variables template
├── next-sitemap.config.js          # Sitemap configuration
├── package.json                     # Dependencies
├── tailwind.config.ts              # Tailwind configuration
├── tsconfig.json                   # TypeScript configuration
├── DEPLOYMENT.md                   # Deployment guide
└── README.md                       # This file
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account
- Razorpay account (for payments)

### 1. Clone Repository
```bash
git clone https://github.com/yourusername/nanimade.git
cd nanimade
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Setup
Copy `.env.local.example` to `.env.local` and fill in your credentials:

```env
# App
NEXT_PUBLIC_APP_NAME="NaniMade"
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Supabase
NEXT_PUBLIC_SUPABASE_URL="your_supabase_project_url"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your_supabase_anon_key"
SUPABASE_SERVICE_ROLE_KEY="your_supabase_service_role_key"

# Auth
NEXTAUTH_SECRET="your_random_secret_key"
NEXTAUTH_URL="http://localhost:3000"

# Payment
RAZORPAY_KEY_ID="rzp_test_your_key"
RAZORPAY_KEY_SECRET="your_secret"
NEXT_PUBLIC_RAZORPAY_KEY_ID="rzp_test_your_key"

# Optional integrations
GOOGLE_CLIENT_ID="your_google_client_id"
GOOGLE_CLIENT_SECRET="your_google_client_secret"
SHIPROCKET_EMAIL="your_email"
SHIPROCKET_PASSWORD="your_password"
NEXT_PUBLIC_GA_ID="G-XXXXXXXXXX"
```

### 4. Database Setup
1. Create a Supabase project
2. Run the SQL schema from `DEPLOYMENT.md`
3. Configure Row Level Security policies

### 5. Run Development Server
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your application.

### 6. Admin Access
- Default admin email: `admin@nanimade.com`
- Access admin dashboard at `/admin`

## 📖 Usage Guide

### For Customers
1. **Browse Products**: View pickles with variants and pricing
2. **Add to Cart**: Select weight/quantity and add to cart
3. **Checkout**: Secure payment with multiple options
4. **Track Orders**: Real-time shipping updates
5. **Account Management**: Addresses, order history, wishlist
6. **Recipes**: Learn traditional pickle recipes

### For Administrators
1. **Dashboard**: Monitor sales, orders, and analytics
2. **Products**: Add/edit products with variants and images
3. **Orders**: Process orders and update fulfillment
4. **Customers**: Manage customer accounts and support
5. **Content**: Create blog posts and recipes
6. **Settings**: Configure payments, shipping, and integrations

## 🔧 Configuration

### Payment Gateway
Configure Razorpay in the admin settings:
1. Get API keys from Razorpay dashboard
2. Set up webhooks for order confirmations
3. Test with test keys before going live

### Shipping Integration
Set up Shiprocket for shipping:
1. Create Shiprocket account
2. Configure pickup locations
3. Set shipping rules and rates

### Analytics
Set up tracking:
1. Google Analytics 4 for website analytics
2. Facebook Pixel for social media advertising
3. Google Search Console for SEO monitoring

## 🚀 Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions to Vercel.

### Quick Deploy to Vercel
1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy with automatic CI/CD

## 🧪 Testing

### Manual Testing Checklist
- [ ] User registration and login
- [ ] Product browsing and search
- [ ] Cart functionality
- [ ] Checkout process
- [ ] Payment integration (test mode)
- [ ] Order tracking
- [ ] Admin dashboard features
- [ ] Mobile responsiveness
- [ ] SEO elements

### Performance Testing
- Lighthouse scores (aim for 90+)
- Core Web Vitals optimization
- Mobile performance testing

## 📱 Mobile App (Future)

The platform is PWA-ready and can be extended with:
- React Native mobile app
- Push notifications
- Offline functionality
- App store deployment

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

### Development Guidelines
- Follow TypeScript best practices
- Use ESLint and Prettier for code formatting
- Write meaningful commit messages
- Update documentation as needed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

### Documentation
- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

### Issues
If you encounter any issues:
1. Check the [troubleshooting section](./DEPLOYMENT.md#troubleshooting)
2. Search existing issues
3. Create a new issue with detailed information

### Contact
- **Email**: support@nanimade.com
- **Website**: [https://nanimade.com](https://nanimade.com)

## 🙏 Acknowledgments

- **Design Inspiration**: Modern e-commerce platforms
- **Community**: Next.js and React community
- **Icons**: Lucide React icon library
- **Images**: Placeholder images for demo

## 🗺️ Roadmap

### Phase 1 (Current)
- [x] Core e-commerce functionality
- [x] Admin dashboard
- [x] Payment integration
- [x] Shipping integration
- [x] SEO optimization

### Phase 2 (Planned)
- [ ] Advanced analytics dashboard
- [ ] Email marketing automation
- [ ] Multi-language support
- [ ] Advanced inventory management
- [ ] Subscription products

### Phase 3 (Future)
- [ ] Mobile app development
- [ ] AI-powered recommendations
- [ ] Advanced reporting
- [ ] Multi-vendor marketplace
- [ ] International shipping

---

<div align="center">
  <p>Made with ❤️ for authentic Bengali pickle lovers</p>
  <p><strong>NaniMade</strong> - Bringing traditional flavors to the digital age</p>
</div>