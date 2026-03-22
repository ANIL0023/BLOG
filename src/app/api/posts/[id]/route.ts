import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import connectDB from '@/lib/db';
import Post from '@/models/Post';
import User from '@/models/User';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    const post = await Post.findById(params.id);
    if (!post) return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json({ error: 'Server Error' }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    
    await connectDB();
    const user = await User.findOne({ email: session.user.email });
    const post = await Post.findById(params.id);
    
    if (!post) return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    if (post.author.toString() !== user._id.toString()) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const data = await req.json();
    const updatedPost = await Post.findByIdAndUpdate(params.id, { $set: data }, { new: true });
    return NextResponse.json(updatedPost);
  } catch (error) {
    return NextResponse.json({ error: 'Server Error' }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    
    await connectDB();
    const user = await User.findOne({ email: session.user.email });
    const post = await Post.findById(params.id);
    
    if (!post) return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    if (post.author.toString() !== user._id.toString()) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    await Post.findByIdAndDelete(params.id);
    return NextResponse.json({ message: 'Post deleted completely' });
  } catch (error) {
    return NextResponse.json({ error: 'Server Error' }, { status: 500 });
  }
}
