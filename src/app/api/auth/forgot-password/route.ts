import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import User from '@/models/User';
import crypto from 'crypto';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    if (!email) return NextResponse.json({ error: 'Email is required' }, { status: 400 });

    await connectDB();
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: 'If an account exists with that email, a reset link has been sent.' });
    }

    // Generate secure token
    const token = crypto.randomBytes(32).toString('hex');
    const expiry = new Date(Date.now() + 3600000); // 1 hour from now

    user.resetPasswordToken = token;
    user.resetPasswordExpires = expiry;
    await user.save();

    // Nodemailer configuration
    console.log('Nodemailer config:', {
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: process.env.EMAIL_SECURE,
        user: process.env.EMAIL_USER,
        hasPass: !!process.env.EMAIL_PASS
    });

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.EMAIL_PORT || '465'),
      secure: process.env.EMAIL_SECURE === 'true', // true for 465, false for 587
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });


    const host = req.headers.get('x-forwarded-host') || req.headers.get('host');
    const proto = req.headers.get('x-forwarded-proto') || (host?.includes('localhost') ? 'http' : 'https');
    const baseUrl = `${proto}://${host}`;
    const resetUrl = `${baseUrl}/auth/reset-password?token=${token}&email=${email}`;

    const mailOptions = {
      from: `"Blogo Support" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Password Reset Request',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 12px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #6366f1; margin: 0;">Blogo</h1>
            <p style="color: #6b7280; font-size: 16px;">Secure Password Reset</p>
          </div>
          <p>Hello,</p>
          <p>You requested a password reset for your Blogo account. Click the button below to set a new password. This link will expire in 1 hour.</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetUrl}" style="background-color: #6366f1; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">Reset Password</a>
          </div>
          <p style="color: #6b7280; font-size: 14px;">If the button doesn't work, copy and paste this link into your browser:</p>
          <p style="color: #6b7280; font-size: 12px; word-break: break-all;">${resetUrl}</p>
          <hr style="border: 0; border-top: 1px solid #e0e0e0; margin: 30px 0;" />
          <p style="color: #9ca3af; font-size: 12px; text-align: center;">If you did not request this, please ignore this email.</p>
        </div>
      `,
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log(`Reset email sent to ${email}`);
    } catch (emailError: any) {
      console.error('Nodemailer Error:', emailError.message || emailError);
      return NextResponse.json({ 
        message: 'If an account exists, a reset link has been sent.',
        warning: 'Email delivery failed. Please check your Gmail credentials.',
        simulatedUrl: resetUrl
      });
    }

    return NextResponse.json({ 
      message: 'Password reset link sent! Check your email.',
      simulatedUrl: resetUrl
    });
  } catch (error) {
    console.error('Forgot password error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
