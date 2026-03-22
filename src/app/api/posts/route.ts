export const dynamic = "force-dynamic";
import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Post from '@/models/Post';
import User from '@/models/User';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');

    await connectDB();
    
    let query: any = { isPublished: true };
    if (category) query.category = category;

    const posts = await Post.find(query)
      .populate('author', 'name image')
      .sort({ createdAt: -1 });

    return NextResponse.json({ success: true, data: posts });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const data = await req.json();
    await connectDB();

    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
    }

    data.author = user._id;

    // Convert tags string to array if necessary
    if (typeof data.tags === 'string') {
      data.tags = data.tags.split(',').map((t: string) => t.trim()).filter(Boolean);
    }

    const post = await Post.create(data);

    return NextResponse.json({ success: true, data: post }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
