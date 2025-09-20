# NaniMade E-commerce API Documentation

## Overview
The NaniMade API provides a complete backend for the e-commerce platform, including authentication, product management, order processing, payment integration, and more.

**Base URL**: `https://nanimade.com/api`  
**Environment**: Production  
**Version**: 1.0.0  

## Authentication

### Session-based Authentication
Uses NextAuth.js for session management with JWT tokens.

```typescript
// Headers required for authenticated requests
{
  "Authorization": "Bearer <session_token>",
  "Content-Type": "application/json"
}
```

### Admin Authentication
Admin routes require elevated privileges:
```typescript
// Admin user check
{
  "role": "admin",
  "email": "admin@nanimade.com"
}
```

## Rate Limiting

| Endpoint Category | Requests per Minute | Window |
|------------------|-------------------|--------|
| Authentication   | 5                 | 60s    |
| Payments         | 10                | 60s    |
| Orders           | 20                | 60s    |
| Products         | 100               | 60s    |
| Default          | 50                | 60s    |

## API Endpoints

### Authentication Endpoints

#### POST `/api/auth/register`
Register a new user account.

**Request Body:**
```typescript
{
  "email": "user@example.com",
  "password": "securePassword123",
  "name": "John Doe",
  "phone": "+91-9876543210"
}
```

**Response:**
```typescript
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "name": "John Doe",
      "role": "customer"
    }
  },
  "message": "User registered successfully"
}
```

#### POST `/api/auth/signin`
Sign in user with email and password.

**Request Body:**
```typescript
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

#### POST `/api/auth/send-otp`
Send OTP for email verification.

**Request Body:**
```typescript
{
  "email": "user@example.com",
  "type": "verification" | "password_reset"
}
```

#### POST `/api/auth/verify-otp`
Verify OTP code.

**Request Body:**
```typescript
{
  "email": "user@example.com",
  "otp": "123456",
  "type": "verification" | "password_reset"
}
```

### Product Endpoints

#### GET `/api/products`
Get all products with optional filtering.

**Query Parameters:**
- `page`: number (default: 1)
- `limit`: number (default: 12)
- `category`: string
- `status`: 'active' | 'draft' | 'archived'
- `featured`: boolean
- `search`: string

**Response:**
```typescript
{
  "success": true,
  "data": {
    "products": [
      {
        "id": "uuid",
        "name": "Classic Mango Pickle",
        "slug": "classic-mango-pickle",
        "description": "Authentic Malda mango pickle...",
        "price": 299,
        "compare_price": 399,
        "images": ["url1", "url2"],
        "variants": [
          {
            "id": "uuid",
            "title": "500g",
            "price": 299,
            "quantity": 45
          }
        ],
        "category": {
          "id": "uuid",
          "name": "Mango Pickle",
          "slug": "mango-pickle"
        },
        "rating": 4.8,
        "reviews_count": 128,
        "created_at": "2024-01-01T00:00:00Z"
      }
    ],
    "pagination": {
      "current_page": 1,
      "total_pages": 5,
      "total_items": 60,
      "has_next": true,
      "has_prev": false
    }
  }
}
```

#### GET `/api/products/[slug]`
Get single product by slug.

**Response:**
```typescript
{
  "success": true,
  "data": {
    "product": {
      // Full product details including variants, reviews, etc.
    }
  }
}
```

#### POST `/api/products` (Admin Only)
Create a new product.

**Request Body:**
```typescript
{
  "name": "New Pickle Product",
  "slug": "new-pickle-product",
  "description": "Product description",
  "short_description": "Short description",
  "price": 299,
  "compare_price": 399,
  "category_id": "uuid",
  "images": ["url1", "url2"],
  "variants": [
    {
      "title": "500g",
      "price": 299,
      "quantity": 50,
      "sku": "NM-MP-500",
      "weight": 0.5
    }
  ],
  "tags": ["mango", "pickle", "traditional"],
  "seo_title": "SEO Title",
  "seo_description": "SEO Description",
  "status": "active",
  "featured": false
}
```

### Cart Endpoints

#### GET `/api/cart`
Get user's cart items.

**Response:**
```typescript
{
  "success": true,
  "data": {
    "items": [
      {
        "id": "uuid",
        "product": {
          "id": "uuid",
          "name": "Classic Mango Pickle",
          "images": ["url"],
          "price": 299
        },
        "variant": {
          "id": "uuid",
          "title": "500g",
          "price": 299
        },
        "quantity": 2,
        "total": 598
      }
    ],
    "summary": {
      "subtotal": 598,
      "tax": 0,
      "shipping": 50,
      "total": 648,
      "items_count": 2
    }
  }
}
```

#### POST `/api/cart/add`
Add item to cart.

**Request Body:**
```typescript
{
  "product_id": "uuid",
  "variant_id": "uuid",
  "quantity": 1
}
```

#### PUT `/api/cart/update`
Update cart item quantity.

**Request Body:**
```typescript
{
  "item_id": "uuid",
  "quantity": 3
}
```

#### DELETE `/api/cart/remove`
Remove item from cart.

**Request Body:**
```typescript
{
  "item_id": "uuid"
}
```

### Order Endpoints

#### POST `/api/orders/create`
Create a new order.

**Request Body:**
```typescript
{
  "billing_address": {
    "first_name": "John",
    "last_name": "Doe",
    "address1": "123 Main St",
    "city": "Mumbai",
    "state": "Maharashtra",
    "postal_code": "400001",
    "country": "India",
    "phone": "+91-9876543210",
    "email": "john@example.com"
  },
  "shipping_address": {
    // Same structure as billing_address
  },
  "items": [
    {
      "product_id": "uuid",
      "variant_id": "uuid",
      "quantity": 2,
      "price": 299
    }
  ],
  "payment_method": "razorpay",
  "shipping_method": "standard",
  "notes": "Special delivery instructions"
}
```

**Response:**
```typescript
{
  "success": true,
  "data": {
    "order": {
      "id": "uuid",
      "order_number": "NM-2024-001",
      "status": "pending",
      "payment_status": "pending",
      "total_amount": 648,
      "created_at": "2024-01-01T00:00:00Z"
    },
    "payment": {
      "razorpay_order_id": "order_xyz123",
      "amount": 64800, // in paise
      "currency": "INR"
    }
  }
}
```

#### GET `/api/orders`
Get user's orders with pagination.

**Query Parameters:**
- `page`: number
- `limit`: number
- `status`: string

#### GET `/api/orders/[id]`
Get single order details.

#### PUT `/api/orders/[id]/status` (Admin Only)
Update order status.

**Request Body:**
```typescript
{
  "status": "confirmed" | "processing" | "shipped" | "delivered" | "cancelled",
  "tracking_number": "TRK123456789",
  "notes": "Status update notes"
}
```

### Payment Endpoints

#### POST `/api/payments/create-order`
Create Razorpay payment order.

**Request Body:**
```typescript
{
  "order_id": "uuid",
  "amount": 64800, // in paise
  "currency": "INR"
}
```

#### POST `/api/payments/verify`
Verify Razorpay payment.

**Request Body:**
```typescript
{
  "razorpay_order_id": "order_xyz123",
  "razorpay_payment_id": "pay_abc456",
  "razorpay_signature": "signature_hash",
  "order_id": "uuid"
}
```

#### POST `/api/payments/webhook`
Razorpay webhook handler.

### Shipping Endpoints

#### POST `/api/shipping/calculate`
Calculate shipping rates.

**Request Body:**
```typescript
{
  "delivery_pincode": "400001",
  "items": [
    {
      "weight": 0.5,
      "length": 15,
      "breadth": 10,
      "height": 8
    }
  ]
}
```

#### POST `/api/shipping/create` (Admin Only)
Create shipping order with Shiprocket.

#### GET `/api/shipping/track/[awb]`
Track shipment by AWB number.

### Blog/Recipe Endpoints

#### GET `/api/blog/posts`
Get blog posts with pagination.

**Query Parameters:**
- `page`: number
- `limit`: number
- `category`: string
- `status`: 'published' | 'draft'
- `featured`: boolean

#### GET `/api/blog/posts/[slug]`
Get single blog post by slug.

#### POST `/api/blog/posts` (Admin Only)
Create new blog post.

### User Endpoints

#### GET `/api/user/profile`
Get user profile.

#### PUT `/api/user/profile`
Update user profile.

#### GET `/api/user/addresses`
Get user addresses.

#### POST `/api/user/addresses`
Add new address.

#### PUT `/api/user/addresses/[id]`
Update address.

#### DELETE `/api/user/addresses/[id]`
Delete address.

#### GET `/api/user/wishlist`
Get user wishlist.

#### POST `/api/user/wishlist/add`
Add item to wishlist.

#### DELETE `/api/user/wishlist/remove`
Remove item from wishlist.

### Admin Endpoints

#### GET `/api/admin/dashboard/stats`
Get dashboard statistics.

**Response:**
```typescript
{
  "success": true,
  "data": {
    "total_orders": 1247,
    "total_revenue": 89650,
    "total_customers": 456,
    "total_products": 28,
    "revenue_growth": 12.5,
    "order_growth": 8.3,
    "customer_growth": 15.2,
    "recent_orders": [...],
    "top_products": [...],
    "sales_data": {
      "labels": ["Jan", "Feb", "Mar", ...],
      "data": [12000, 19000, 15000, ...]
    }
  }
}
```

#### GET `/api/admin/customers`
Get customers list with pagination.

#### GET `/api/admin/inventory`
Get inventory status.

#### POST `/api/admin/settings/integrations`
Update integration settings.

### Newsletter Endpoints

#### POST `/api/newsletter/subscribe`
Subscribe to newsletter.

**Request Body:**
```typescript
{
  "email": "user@example.com",
  "first_name": "John"
}
```

#### POST `/api/newsletter/unsubscribe`
Unsubscribe from newsletter.

#### POST `/api/newsletter/send` (Admin Only)
Send newsletter campaign.

## Error Handling

All API responses follow a consistent error format:

```typescript
{
  "success": false,
  "error": "Error message",
  "details": {
    "field": "Specific field error",
    "code": "ERROR_CODE"
  },
  "timestamp": "2024-01-01T00:00:00Z"
}
```

### Common Error Codes

| Code | Status | Description |
|------|--------|-------------|
| `UNAUTHORIZED` | 401 | Missing or invalid authentication |
| `FORBIDDEN` | 403 | Insufficient permissions |
| `NOT_FOUND` | 404 | Resource not found |
| `VALIDATION_ERROR` | 400 | Invalid request data |
| `RATE_LIMIT_EXCEEDED` | 429 | Too many requests |
| `INTERNAL_ERROR` | 500 | Server error |

## Security

### Headers
All API requests include security headers:
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`
- `Strict-Transport-Security: max-age=31536000`

### CORS
CORS is configured to allow requests from:
- Production: `https://nanimade.com`
- Development: `http://localhost:3000`, `http://localhost:3001`

### Input Validation
- All inputs are sanitized and validated
- SQL injection prevention through parameterized queries
- XSS protection through input sanitization
- CSRF protection via NextAuth.js

### Rate Limiting
Implemented per endpoint with IP-based tracking.

## Webhooks

### Razorpay Webhook
**Endpoint**: `POST /api/payments/webhook`  
**Events**: `payment.captured`, `payment.failed`, `order.paid`

**Payload Example:**
```json
{
  "entity": "event",
  "account_id": "acc_xxx",
  "event": "payment.captured",
  "payload": {
    "payment": {
      "entity": {
        "id": "pay_xxx",
        "amount": 64800,
        "currency": "INR",
        "status": "captured",
        "order_id": "order_xxx"
      }
    }
  }
}
```

### Shiprocket Webhook
**Endpoint**: `POST /api/shipping/webhook`  
**Events**: `shipment.created`, `shipment.delivered`, `shipment.cancelled`

## Testing

### Test Environment
- Base URL: `http://localhost:3001/api`
- Test credentials available in documentation

### API Testing Tools
- Postman collection available
- OpenAPI/Swagger documentation at `/api/docs`

## Support

For API support:
- Email: developers@nanimade.com
- Documentation: https://docs.nanimade.com
- Status Page: https://status.nanimade.com

---

*Last Updated: January 2024*  
*API Version: 1.0.0*