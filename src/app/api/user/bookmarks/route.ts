export const dynamic = "force-dynamic";
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import connectDB from '@/lib/db';
import User from '@/models/User';
import mongoose from 'mongoose';

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { postId } = await req.json();
    if (!postId || !mongoose.Types.ObjectId.isValid(postId)) {
        return NextResponse.json({ error: 'Invalid Post ID' }, { status: 400 });
    }

    await connectDB();
    const user = await User.findOne({ email: session.user.email });
    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

    const isBookmarked = user.bookmarks.includes(postId);
    if (isBookmarked) {
      user.bookmarks = user.bookmarks.filter((id: any) => id.toString() !== postId);
    } else {
      user.bookmarks.push(postId);
    }

    await user.save();
    return NextResponse.json({ 
      message: isBookmarked ? 'Removed from bookmarks' : 'Saved to bookmarks',
      bookmarked: !isBookmarked 
    });
  } catch (error) {
    console.error('Bookmark error:', error);
    return NextResponse.json({ error: 'Server Error' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    await connectDB();
    const user = await User.findOne({ email: session.user.email }).populate({
        path: 'bookmarks',
        populate: { path: 'author', select: 'name image' }
    });
    
    return NextResponse.json(user.bookmarks || []);
  } catch (error) {
    return NextResponse.json({ error: 'Server Error' }, { status: 500 });
  }
}
