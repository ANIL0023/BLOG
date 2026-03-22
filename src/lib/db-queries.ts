import connectDB from './db';
import Post from '@/models/Post';
import User from '@/models/User';

export async function getDbFeaturedBlogs() {
  await connectDB();
  return await Post.find({ featured: true }).populate('author', 'name image').sort({ createdAt: -1 });
}

export async function getDbTrendingBlogs(limit = 6) {
  await connectDB();
  return await Post.find().populate('author', 'name image').sort({ views: -1 }).limit(limit);
}

export async function getDbRecentBlogs(limit = 6) {
  await connectDB();
  return await Post.find().populate('author', 'name image').sort({ createdAt: -1 }).limit(limit);
}

export async function getDbBlogsByCategory(category: string) {
  await connectDB();
  return await Post.find({ category: { $regex: new RegExp(category, 'i') } }).populate('author', 'name image').sort({ createdAt: -1 });
}

export async function getDbUserById(id: string) {
  await connectDB();
  return await User.findById(id);
}

export async function getDbBlogsByAuthor(authorId: string) {
  await connectDB();
  return await Post.find({ author: authorId }).populate('author', 'name image').sort({ createdAt: -1 });
}
