import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Newsletter from '@/models/Newsletter';

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    await connectDB();
    
    // Check if already subscribed
    const existing = await Newsletter.findOne({ email });
    if (existing) {
      if (existing.active) {
        return NextResponse.json({ message: 'You are already subscribed!' }, { status: 200 });
      } else {
        existing.active = true;
        await existing.save();
        return NextResponse.json({ message: 'Welcome back! Your subscription is reactivated.' }, { status: 200 });
      }
    }

    await Newsletter.create({ email });
    
    return NextResponse.json({ message: 'Success! You are now subscribed to Blogo.' }, { status: 201 });
  } catch (error) {
    console.error('Newsletter error:', error);
    return NextResponse.json({ error: 'Failed to subscribe. Please try again later.' }, { status: 500 });
  }
}
