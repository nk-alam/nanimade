# NaniMade - Authentic Handmade Pickles E-commerce Store

## Overview
This is a Next.js-based e-commerce application for "NaniMade," a handmade pickles business from Malda, India. The application features user authentication, product management, shopping cart functionality, and payment processing.

## Recent Changes (September 11, 2025)
- Successfully imported GitHub project to Replit environment
- Configured Next.js development server to run on port 5000 with proper host configuration
- Set up Supabase integration with environment variables for database connectivity
- Fixed next-auth dependency installation and configuration
- Configured deployment settings for production using autoscale target
- Application is now fully functional in Replit environment

## Project Architecture
- **Frontend**: Next.js 15.5.2 with React 19, TypeScript
- **UI Library**: Radix UI components with Tailwind CSS
- **Authentication**: NextAuth.js with Supabase adapter
- **Database**: Supabase (PostgreSQL)
- **Payment Processing**: Razorpay integration
- **State Management**: Zustand for cart functionality
- **Styling**: Tailwind CSS with custom theme for pickle/mango branding

## Key Technologies
- Next.js App Router with TypeScript
- Supabase for backend services
- NextAuth.js for authentication
- Tailwind CSS for styling
- Radix UI for accessible components
- React Hook Form with Zod validation
- Framer Motion for animations

## Environment Variables Required
- `NEXT_PUBLIC_SUPABASE_URL`: Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Supabase anonymous key
- `SUPABASE_SERVICE_ROLE_KEY`: Supabase service role key
- `GOOGLE_CLIENT_ID`: (Optional) Google OAuth client ID
- `GOOGLE_CLIENT_SECRET`: (Optional) Google OAuth client secret

## Development
- Development server runs on port 5000 (configured for Replit)
- Server configured to accept requests from all hosts for Replit proxy
- Hot reload and fast refresh enabled

## Deployment
- Configured for autoscale deployment
- Build command: `npm run build`
- Start command: `npm start`
- Optimized for static export when needed

## Current Status
✅ Development environment fully configured and working
✅ Database integration set up
✅ Authentication system ready
✅ Deployment configuration complete