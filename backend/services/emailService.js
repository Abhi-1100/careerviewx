const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

// Inline logo as base64 so it shows in email without needing a public URL
let LOGO_BASE64 = '';
try {
  const logoPath = path.join(__dirname, '../../frontend/public/logo.png');
  LOGO_BASE64 = fs.readFileSync(logoPath).toString('base64');
} catch (e) {
  console.warn('Email logo not found, skipping:', e.message);
}
const LOGO_SRC = LOGO_BASE64 ? `data:image/png;base64,${LOGO_BASE64}` : '';


// Create reusable transporter using Gmail
// NOTE: When using service:'gmail', do NOT also set host/port — it causes auth conflicts.
const createTransporter = () => {
  if (!process.env.SMTP_EMAIL || !process.env.SMTP_PASSWORD) {
    throw new Error('SMTP_EMAIL and SMTP_PASSWORD must be set in .env');
  }
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD   // 16-char Gmail App Password (no spaces)
    }
  });
};

/* ─────────────────────────────────────────────────────────────
   SHARED EMAIL WRAPPER  (violet CareerviewX theme)
───────────────────────────────────────────────────────────── */
const emailWrapper = (title, bodyHtml) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>${title}</title>
</head>
<body style="margin:0;padding:0;background:#0f0a1a;font-family:'Segoe UI',Arial,sans-serif;">

  <!-- Outer wrapper -->
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0f0a1a;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;border-radius:20px;overflow:hidden;background:#18102a;border:1px solid rgba(139,92,246,0.2);">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#4c1d95 0%,#7c3aed 50%,#8b5cf6 100%);padding:40px 32px;text-align:center;">
              <!-- Logo area -->
              <div style="display:inline-flex;align-items:center;gap:10px;margin-bottom:16px;">
                ${LOGO_SRC ? `<img src="${LOGO_SRC}" alt="CareerviewX Logo" style="width:40px;height:40px;border-radius:12px;background:white;padding:2px;" />` : `<div style="width:40px;height:40px;background:rgba(255,255,255,0.15);border-radius:12px;display:inline-block;"></div>`}
                <span style="color:#fff;font-size:22px;font-weight:800;letter-spacing:-0.5px;">CareerviewX</span>
              </div>
              <h1 style="margin:0;color:#ffffff;font-size:26px;font-weight:700;letter-spacing:-0.3px;">${title}</h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:36px 40px;">
              ${bodyHtml}
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:24px 40px;border-top:1px solid rgba(139,92,246,0.15);text-align:center;">
              <p style="margin:0;color:#6b7280;font-size:12px;line-height:1.6;">
                &copy; ${new Date().getFullYear()} CareerviewX &mdash; Navigating Your Career Path<br/>
                You received this email because an action was taken on your account.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>
`;

/* ─────────────────────────────────────────────────────────────
   SEND VERIFICATION EMAIL
───────────────────────────────────────────────────────────── */
const sendVerificationEmail = async (email, verificationToken, userName = 'User') => {
  try {
    const transporter = createTransporter();
    const baseUrl = process.env.API_BASE_URL || 'http://localhost:3000';
    const verificationLink = `${baseUrl}/verify-email?token=${verificationToken}`;

    const bodyHtml = `
      <p style="margin:0 0 8px;color:#a78bfa;font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:1px;">
        Email Verification
      </p>
      <p style="margin:0 0 20px;color:#e5e7eb;font-size:18px;font-weight:700;">
        Hi ${userName} 👋
      </p>
      <p style="margin:0 0 28px;color:#9ca3af;font-size:15px;line-height:1.7;">
        Welcome to <strong style="color:#c4b5fd;">CareerviewX</strong>! You're one step away from unlocking your personalized career journey.
        Please verify your email address to activate your account.
      </p>

      <!-- CTA Button -->
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td align="center" style="padding:8px 0 32px;">
            <a href="${verificationLink}"
               style="display:inline-block;background:linear-gradient(135deg,#7c3aed,#8b5cf6);color:#ffffff;
                      text-decoration:none;font-size:15px;font-weight:700;padding:16px 40px;
                      border-radius:12px;letter-spacing:0.3px;
                      box-shadow:0 8px 24px rgba(124,58,237,0.45);">
              ✦ &nbsp; Verify My Email
            </a>
          </td>
        </tr>
      </table>

      <!-- Info box -->
      <div style="background:rgba(139,92,246,0.08);border:1px solid rgba(139,92,246,0.2);border-radius:12px;padding:16px 20px;">
        <p style="margin:0;color:#9ca3af;font-size:13px;line-height:1.6;">
          ⏱ &nbsp;This link expires in <strong style="color:#c4b5fd;">24 hours</strong>.<br/>
          🔒 &nbsp;If you didn't create this account, you can safely ignore this email.
        </p>
      </div>
    `;

    const mailOptions = {
      from: `"CareerviewX" <${process.env.SMTP_EMAIL}>`,
      to: email,
      subject: '✦ Verify your CareerviewX account',
      html: emailWrapper('Verify Your Email', bodyHtml),
      text: `Hi ${userName},\n\nPlease verify your CareerviewX email by visiting:\n${verificationLink}\n\nThis link expires in 24 hours.\n\nIf you didn't create this account, ignore this email.\n\n— The CareerviewX Team`
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Verification email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending verification email:', error.message);
    return { success: false, error: error.message };
  }
};

/* ─────────────────────────────────────────────────────────────
   SEND PASSWORD RESET EMAIL
───────────────────────────────────────────────────────────── */
const sendPasswordResetEmail = async (email, resetToken, userName = 'User') => {
  try {
    const transporter = createTransporter();
    const baseUrl = process.env.API_BASE_URL || 'http://localhost:3000';
    const resetLink = `${baseUrl}/reset-password?token=${resetToken}`;

    const bodyHtml = `
      <p style="margin:0 0 8px;color:#a78bfa;font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:1px;">
        Password Reset
      </p>
      <p style="margin:0 0 20px;color:#e5e7eb;font-size:18px;font-weight:700;">
        Hi ${userName} 👋
      </p>
      <p style="margin:0 0 28px;color:#9ca3af;font-size:15px;line-height:1.7;">
        We received a request to reset your <strong style="color:#c4b5fd;">CareerviewX</strong> password.
        Click the button below to set a new password. If you didn't request this, you can safely ignore this email.
      </p>

      <!-- CTA Button -->
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td align="center" style="padding:8px 0 32px;">
            <a href="${resetLink}"
               style="display:inline-block;background:linear-gradient(135deg,#7c3aed,#8b5cf6);color:#ffffff;
                      text-decoration:none;font-size:15px;font-weight:700;padding:16px 40px;
                      border-radius:12px;letter-spacing:0.3px;
                      box-shadow:0 8px 24px rgba(124,58,237,0.45);">
              🔑 &nbsp; Reset My Password
            </a>
          </td>
        </tr>
      </table>

      <!-- Warning box -->
      <div style="background:rgba(139,92,246,0.08);border:1px solid rgba(139,92,246,0.2);border-radius:12px;padding:16px 20px;">
        <p style="margin:0;color:#9ca3af;font-size:13px;line-height:1.6;">
          ⏱ &nbsp;This link expires in <strong style="color:#c4b5fd;">1 hour</strong>.<br/>
          🔒 &nbsp;If you didn't request a password reset, your account remains safe — no action needed.
        </p>
      </div>
    `;

    const mailOptions = {
      from: `"CareerviewX" <${process.env.SMTP_EMAIL}>`,
      to: email,
      subject: '🔑 Reset your CareerviewX password',
      html: emailWrapper('Reset Your Password', bodyHtml),
      text: `Hi ${userName},\n\nReset your CareerviewX password by visiting:\n${resetLink}\n\nThis link expires in 1 hour.\n\nIf you didn't request this, ignore this email.\n\n— The CareerviewX Team`
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
