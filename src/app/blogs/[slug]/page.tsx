import { notFound } from 'next/navigation';
import { getBlogBySlug, getRelatedBlogs, blogs } from '@/lib/data';
import { BlogDetail } from '@/components/blog/BlogDetail';
import { CommentSection } from '@/components/blog/CommentSection';
import { RelatedArticles } from '@/components/blog/RelatedArticles';
import type { Metadata } from 'next';

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const blog = getBlogBySlug(params.slug);
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

export default function BlogPage({ params }: Props) {
  const blog = getBlogBySlug(params.slug);
  if (!blog) notFound();

  const related = getRelatedBlogs(blog, 3);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="lg:grid lg:grid-cols-[1fr_320px] lg:gap-8">
        {/* Main content */}
        <div>
          <BlogDetail blog={blog} />
          <CommentSection blogId={blog.id} commentCount={blog.comments} />
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
