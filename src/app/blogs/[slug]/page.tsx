import { notFound } from 'next/navigation';
import { getBlogBySlug, getRelatedBlogs, blogs, type Blog } from '@/lib/data';
import { BlogDetail } from '@/components/blog/BlogDetail';
import { CommentSection } from '@/components/blog/CommentSection';
import { RelatedArticles } from '@/components/blog/RelatedArticles';
import type { Metadata } from 'next';
import connectDB from '@/lib/db';
import Post from '@/models/Post';
import mongoose from 'mongoose';

interface Props {
  params: { slug: string };
}

export const dynamic = 'force-dynamic';
export const dynamicParams = true;

async function fetchBlog(slug: string): Promise<Blog | undefined> {
  // Try finding it in DB first if it's a valid Mongo ObjectId
  if (mongoose.Types.ObjectId.isValid(slug)) {
    try {
      await connectDB();
      const p = await Post.findById(slug).populate('author', 'name image');
      if (p) {
        return {
          id: p._id.toString(),
          slug: p._id.toString(),
          title: p.title,
          excerpt: p.excerpt || p.content?.substring(0, 120) || '',
          content: p.content,
          coverImage: p.coverImage || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643',
          category: p.category,
          tags: p.tags || [],
          author: {
            id: p.author?._id?.toString() || 'unknown',
            name: p.author?.name || 'System',
            avatar: p.author?.image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${p.author?.name || 'anon'}`,
            bio: 'Writer and developer sharing insights on tech and life.',
            followers: 0,
            articles: 1,
            category: 'Technology',
            social: { twitter: '#', github: '#' }
          },
          publishedAt: p.createdAt.toISOString(),
          readingTime: Math.max(1, Math.ceil((p.content?.split(/\\s+/)?.length || 0) / 200)),
          likes: p.likes || 0,
          views: p.views || 0,
          trending: p.views > 50,
          comments: 0,
          featured: false
        };
      }
    } catch (error) {
      console.error('Error fetching blog from DB:', error);
    }
  }

  return getBlogBySlug(slug);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const blog = await fetchBlog(params.slug);
  if (!blog) return { title: 'Not Found' };
  return {
    title: blog.title,
    description: blog.excerpt,
    openGraph: {
      title: blog.title,
      description: blog.excerpt,
      images: [{ url: blog.coverImage }],
    },
  };
}

export function generateStaticParams() {
  return blogs.map((b) => ({ slug: b.slug }));
}

export default async function BlogPage({ params }: Props) {
  const blog = await fetchBlog(params.slug);
  if (!blog) notFound();

  const related = getRelatedBlogs(blog, 3);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="lg:grid lg:grid-cols-[1fr_320px] lg:gap-8">
        {/* Main content */}
        <div>
          <BlogDetail blog={blog} />
          <CommentSection blogId={blog.id} commentCount={blog.comments || 0} />
        </div>

        {/* Sidebar */}
        <aside className="hidden lg:block py-12 pr-8">
          <div className="sticky top-24 space-y-6">
            <RelatedArticles blogs={related} />

            {/* Tags */}
            <div className="bg-white dark:bg-dark-card rounded-2xl border border-gray-100 dark:border-dark-border p-6 shadow-sm">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4 text-sm uppercase tracking-wider">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {blog.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1.5 text-sm rounded-full bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-dark-muted hover:bg-primary-100 dark:hover:bg-primary-900/30 hover:text-primary-700 dark:hover:text-primary-400 transition-colors cursor-pointer">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
