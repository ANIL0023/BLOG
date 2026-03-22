export const dynamic = "force-dynamic";
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import connectDB from '@/lib/db';
import Post from '@/models/Post';
import User from '@/models/User';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const posts = await Post.find({ author: user._id });
    
    const totalPosts = posts.length;
    const totalViews = posts.reduce((sum, post) => sum + (post.views || 0), 0);
    const totalLikes = posts.reduce((sum, post) => sum + (post.likes || 0), 0);
    
    // Generate some monthly view data based on totalViews
    // In a real app, this would be fetched from a separate Analytics model
    const monthlyViews = [
        Math.floor(totalViews * 0.05), Math.floor(totalViews * 0.07), Math.floor(totalViews * 0.04), 
        Math.floor(totalViews * 0.08), Math.floor(totalViews * 0.12), Math.floor(totalViews * 0.15),
        Math.floor(totalViews * 0.10), Math.floor(totalViews * 0.09), Math.floor(totalViews * 0.11), 
        Math.floor(totalViews * 0.08), Math.floor(totalViews * 0.06), Math.floor(totalViews * 0.05)
    ];

    const trafficSources = [
        { source: 'Organic Search', pct: 45, color: 'bg-primary-500' },
        { source: 'Social Media', pct: 25, color: 'bg-pink-500' },
        { source: 'Direct', pct: 20, color: 'bg-blue-500' },
        { source: 'Referrals', pct: 10, color: 'bg-green-500' }
    ];

    // Top 5 articles map
    const topArticles = [...posts]
      .sort((a, b) => (b.views || 0) - (a.views || 0))
      .slice(0, 5)
      .map(p => ({
        title: p.title,
        views: p.views || 0,
        change: '+0%'
      }));

    return NextResponse.json({
      totalPosts,
      totalViews,
      totalLikes,
      followers: user.followers?.length || 0,
      following: user.following?.length || 0,
      monthlyViews,
      trafficSources,
      topArticles
    });
  } catch (error) {
    console.error('Error fetching user stats:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
