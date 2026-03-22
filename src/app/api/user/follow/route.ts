import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import connectDB from '@/lib/db';
import User from '@/models/User';

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { targetUserId } = await req.json();
    if (!targetUserId) {
      return NextResponse.json({ error: 'Target User ID required' }, { status: 400 });
    }

    await connectDB();
    const currentUser = await User.findOne({ email: session.user.email });
    const targetUser = await User.findById(targetUserId);

    if (!currentUser || !targetUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    if (currentUser._id.toString() === targetUserId) {
      return NextResponse.json({ error: 'You cannot follow yourself' }, { status: 400 });
    }

    const isFollowing = currentUser.following.includes(targetUserId);

    if (isFollowing) {
      // Unfollow
      currentUser.following = currentUser.following.filter((id: any) => id.toString() !== targetUserId);
      targetUser.followers = targetUser.followers.filter((id: any) => id.toString() !== currentUser._id.toString());
    } else {
      // Follow
      currentUser.following.push(targetUserId);
      targetUser.followers.push(currentUser._id);
    }

    await currentUser.save();
    await targetUser.save();

    return NextResponse.json({ 
      isFollowing: !isFollowing,
      followerCount: targetUser.followers.length 
    });
  } catch (error) {
    console.error('Follow error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function GET(req: Request) {
    try {
      const { searchParams } = new URL(req.url);
      const targetUserId = searchParams.get('userId');
      const session = await getServerSession(authOptions);
      
      if (!targetUserId) return NextResponse.json({ error: 'User ID required' }, { status: 400 });
  
      await connectDB();
      const targetUser = await User.findById(targetUserId);
      if (!targetUser) return NextResponse.json({ error: 'User not found' }, { status: 404 });
  
      let isFollowing = false;
      if (session?.user?.email) {
          const currentUser = await User.findOne({ email: session.user.email });
          if (currentUser) {
              isFollowing = currentUser.following.includes(targetUserId);
          }
      }
  
      return NextResponse.json({ 
        isFollowing,
        followerCount: targetUser.followers.length,
        followingCount: targetUser.following?.length || 0
      });
    } catch (error) {
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
  }
