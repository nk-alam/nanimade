// Security configuration settings
export const securityConfig = {
  // Rate limiting settings
  rateLimiting: {
    global: {
      limit: 1000,
      windowMs: 15 * 60 * 1000 // 15 minutes
    },
    auth: {
      limit: 5,
      windowMs: 15 * 60 * 1000 // 15 minutes
    },
    api: {
      read: {
        limit: 100,
        windowMs: 15 * 60 * 1000 // 15 minutes
      },
      write: {
        limit: 20,
        windowMs: 15 * 60 * 1000 // 15 minutes
      }
    }
  },
  
  // Password requirements
  password: {
    minLength: 8,
    requireUppercase: true,
    requireLowercase: true,
    requireNumbers: true,
    requireSpecialChars: false,
    blockCommonPasswords: true
  },
  
  // Session settings
  session: {
    maxAge: 30 * 24 * 60 * 60, // 30 days
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      sameSite: 'lax',
      path: '/'
    }
  },
  
  // CORS settings
  cors: {
    allowedOrigins: [
      'http://localhost:3000',
      'http://localhost:3001',
      'https://your-domain.com'
    ],
    allowedMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    credentials: true
  },
  
  // Content Security Policy
  csp: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https:"],
      fontSrc: ["'self'", "data:"],
      connectSrc: ["'self'"],
      frameAncestors: ["'none'"]
    }
  },
  
  // Security headers
  headers: {
    xDnsPrefetchControl: 'on',
    strictTransportSecurity: 'max-age=63072000; includeSubDomains; preload',
    xFrameOptions: 'DENY',
    xContentTypeOptions: 'nosniff',
    referrerPolicy: 'strict-origin-when-cross-origin',
    permissionsPolicy: 'camera=(), microphone=(), geolocation=()',
    xXssProtection: '1; mode=block'
  }
}