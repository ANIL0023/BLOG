import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Post from '@/models/Post';

export async function POST(req: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    const post = await Post.findByIdAndUpdate(
      params.id,
      { $inc: { likes: 1 } },
      { new: true }
    );
    
    if (!post) return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    
    return NextResponse.json({ likes: post.likes });
  } catch (error) {
    return NextResponse.json({ error: 'Server Error' }, { status: 500 });
  }
}
