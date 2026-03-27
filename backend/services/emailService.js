const nodemailer = require('nodemailer');

// Create reusable transporter using Gmail
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: process.env.SMTP_PORT || 587,
    secure: false, // Use TLS, not SSL
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD
    }
  });
};

// Send verification email
const sendVerificationEmail = async (email, verificationToken, userName = 'User') => {
  try {
    const transporter = createTransporter();
    const baseUrl = process.env.API_BASE_URL || 'http://localhost:5000';
    const verificationLink = `${baseUrl.replace('/api', '')}/verify-email?token=${verificationToken}`;

    const mailOptions = {
      from: process.env.SMTP_EMAIL,
      to: email,
      subject: 'Verify Your CareerViewX Email Address',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; border-radius: 8px; }
              .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center; }
              .content { background: white; padding: 30px; border-radius: 0 0 8px 8px; }
              .button { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 12px 30px; border-radius: 5px; text-decoration: none; display: inline-block; margin: 20px 0; }
              .footer { text-align: center; color: #999; font-size: 12px; margin-top: 20px; }
              .token-box { background: #f0f0f0; padding: 15px; border-radius: 5px; word-break: break-all; font-family: monospace; margin: 15px 0; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>Verify Your Email</h1>
              </div>
              <div class="content">
                <p>Hi ${userName},</p>
                <p>Thank you for signing up for CareerViewX! To complete your registration, please verify your email address by clicking the button below:</p>

                <center>
                  <a href="${verificationLink}" class="button">Verify Email Address</a>
                </center>

                <p>Or copy and paste this link in your browser:</p>
                <div class="token-box">${verificationLink}</div>

                <p>This verification link will expire in 24 hours.</p>
                <p>If you didn't create this account, please ignore this email.</p>

                <p>Best regards,<br>The CareerViewX Team</p>
              </div>
              <div class="footer">
                <p>&copy; 2024 CareerViewX. All rights reserved.</p>
              </div>
            </div>
          </body>
        </html>
      `,
      text: `Hi ${userName},

Thank you for signing up for CareerViewX! To complete your registration, please visit this link:

${verificationLink}

This verification link will expire in 24 hours.

If you didn't create this account, please ignore this email.

Best regards,
The CareerViewX Team`
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Verification email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending verification email:', error.message);
    return { success: false, error: error.message };
  }
};

// Send password reset email
const sendPasswordResetEmail = async (email, resetToken, userName = 'User') => {
  try {
    const transporter = createTransporter();
    const baseUrl = process.env.API_BASE_URL || 'http://localhost:5000';
    const resetLink = `${baseUrl.replace('/api', '')}/reset-password?token=${resetToken}`;

    const mailOptions = {
      from: process.env.SMTP_EMAIL,
      to: email,
      subject: 'Reset Your CareerViewX Password',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; border-radius: 8px; }
              .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center; }
              .content { background: white; padding: 30px; border-radius: 0 0 8px 8px; }
              .button { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 12px 30px; border-radius: 5px; text-decoration: none; display: inline-block; margin: 20px 0; }
              .footer { text-align: center; color: #999; font-size: 12px; margin-top: 20px; }
              .warning { background: #ffe0e0; padding: 15px; border-radius: 5px; margin: 15px 0; border-left: 4px solid #e74c3c; }
              .token-box { background: #f0f0f0; padding: 15px; border-radius: 5px; word-break: break-all; font-family: monospace; margin: 15px 0; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>Reset Your Password</h1>
              </div>
              <div class="content">
                <p>Hi ${userName},</p>
                <p>We received a request to reset your CareerViewX password. Click the button below to create a new password:</p>

                <center>
                  <a href="${resetLink}" class="button">Reset Password</a>
                </center>

                <p>Or copy and paste this link in your browser:</p>
                <div class="token-box">${resetLink}</div>

                <div class="warning">
                  <strong>⚠️ Security Notice:</strong> This link will expire in 1 hour. If you didn't request a password reset, please ignore this email and your password will remain unchanged.
                </div>

                <p>Best regards,<br>The CareerViewX Team</p>
              </div>
              <div class="footer">
                <p>&copy; 2024 CareerViewX. All rights reserved.</p>
              </div>
            </div>
          </body>
        </html>
      `,
      text: `Hi ${userName},

We received a request to reset your CareerViewX password. Click the link below to create a new password:

${resetLink}

This link will expire in 1 hour.

If you didn't request a password reset, please ignore this email and your password will remain unchanged.

Best regards,
The CareerViewX Team`
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Password reset email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending password reset email:', error.message);
    return { success: false, error: error.message };
  }
};

module.exports = {
  sendVerificationEmail,
  sendPasswordResetEmail
};
