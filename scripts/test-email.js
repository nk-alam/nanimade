const dotenv = require('dotenv');
dotenv.config({ path: '.env.local' });

// Simple test to verify SMTP configuration
const nodemailer = require('nodemailer');

async function testEmail() {
  try {
    console.log('Testing email service...');
    console.log('SMTP Host:', process.env.EMAIL_SERVER_HOST);
    console.log('SMTP Port:', process.env.EMAIL_SERVER_PORT);
    console.log('SMTP User:', process.env.EMAIL_SERVER_USER);
    console.log('From Email:', process.env.EMAIL_FROM);
    
    // Create transporter with Hostinger SMTP settings
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SERVER_HOST || 'smtp.hostinger.com',
      port: parseInt(process.env.EMAIL_SERVER_PORT || '465'),
      secure: parseInt(process.env.EMAIL_SERVER_PORT || '465') === 465, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false // Only for testing, should be true in production
      }
    });

    // Verify connection
    await transporter.verify();
    console.log('SMTP connection verified successfully!');
    
    // Send test email
    const mailOptions = {
      from: `"NaniMade Test" <${process.env.EMAIL_FROM || process.env.EMAIL_SERVER_USER}>`,
      to: 'palanceroot@gmail.com', // Replace with your test email
      subject: 'NaniMade SMTP Test',
      html: `
        <h1>SMTP Test Successful!</h1>
        <p>This is a test email from NaniMade to verify that the SMTP configuration is working correctly.</p>
        <p>Configuration used:</p>
        <ul>
          <li>Host: ${process.env.EMAIL_SERVER_HOST}</li>
          <li>Port: ${process.env.EMAIL_SERVER_PORT}</li>
          <li>User: ${process.env.EMAIL_SERVER_USER}</li>
        </ul>
      `
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('Test email sent successfully!');
    console.log('Message ID:', result.messageId);
  } catch (error) {
    console.error('Email test failed:', error);
  }
}

testEmail();