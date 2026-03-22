export const dynamic = "force-dynamic";
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import connectDB from '@/lib/db';
import Comment from '@/models/Comment';
import User from '@/models/User';
import Post from '@/models/Post';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    const comments = await Comment.find({ postId: params.id, parentId: null })
      .populate('author', 'name image')
      .sort({ createdAt: -1 });
    
    // Also fetch replies for each comment (simplified for this step)
    const commentsWithReplies = await Promise.all(comments.map(async (comment) => {
      const replies = await Comment.find({ parentId: comment._id }).populate('author', 'name image').sort({ createdAt: 1 });
      return {
        ...comment.toObject(),
        id: comment._id.toString(),
        replies: replies.map(r => ({ ...r.toObject(), id: r._id.toString() }))
      };
    }));

    return NextResponse.json(commentsWithReplies);
  } catch (error) {
    return NextResponse.json({ error: 'Server Error' }, { status: 500 });
  }
}

export async function POST(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { content, parentId } = await req.json();
    if (!content) return NextResponse.json({ error: 'Content required' }, { status: 400 });

    await connectDB();
    const user = await User.findOne({ email: session.user.email });
    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

    const comment = await Comment.create({
      postId: params.id,
      author: user._id,
      content,
      parentId: parentId || null,
    });

    // Increment comment count on post
    await Post.findByIdAndUpdate(params.id, { $inc: { comments: 1 } });

    const populated = await Comment.findById(comment._id).populate('author', 'name image');

    return NextResponse.json({
        ...populated.toObject(),
        id: populated._id.toString(),
        replies: []
    });
  } catch (error) {
    console.error('Comment POST error:', error);
    return NextResponse.json({ error: 'Server Error' }, { status: 500 });
  }
}
