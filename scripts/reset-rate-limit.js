// Script to reset rate limiting for testing
// This is for development/testing purposes only

const fs = require('fs');
const path = require('path');

// For in-memory store, we need to restart the server to reset rate limits
console.log('To reset rate limits, restart the development server:');
console.log('pkill -f "next dev" && npm run dev');

// For production with Redis, you would clear the Redis keys here
// Example:
// const redis = require('redis');
// const client = redis.createClient();
// await client.connect();
// await client.flushAll();
// await client.quit();

console.log('Rate limit reset instructions provided above.');