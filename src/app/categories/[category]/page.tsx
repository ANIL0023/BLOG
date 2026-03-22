import { categories } from '@/lib/data';
import { getDbBlogsByCategory } from '@/lib/db-queries';
import { BlogCard } from '@/components/blog/BlogCard';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

interface Props {
  params: { category: string };
}

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const cat = categories.find((c) => c.slug === params.category);
  return { title: cat ? `${cat.name} Articles` : 'Category' };
}

export default async function CategoryPage({ params }: Props) {
  const cat = categories.find((c) => c.slug === params.category);
  const categoryName = cat?.name || params.category.replace('-', ' & ');
  const rawBlogs = await getDbBlogsByCategory(categoryName);
  
  const blogs = rawBlogs.map(p => ({
    id: p._id.toString(),
    slug: p._id.toString(),
    title: p.title,
    excerpt: p.excerpt || p.content?.substring(0, 120),
    content: p.content,
    coverImage: p.coverImage || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643',
    category: p.category,
    tags: p.tags || [],
    author: {
       id: p.author?._id?.toString() || 'unknown',
       name: p.author?.name || 'Writer',
       avatar: p.author?.image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${p.author?.name || 'anon'}`,
       bio: 'Professional writer and contributor.',
       followers: 0,
       articles: 0,
       category: 'Technology',
       social: { twitter: '#', github: '#' }
    },
    publishedAt: p.createdAt.toISOString(),
    readingTime: Math.ceil((p.content?.length || 0) / 1000) || 5,
    likes: p.likes || 0,
    comments: p.comments || 0,
    views: p.views || 0,
    featured: p.featured || false,
    trending: p.trending || false
  }));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-12 text-center">
        {cat && <div className="text-5xl mb-4">{cat.icon}</div>}
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-3">
          <span className="gradient-text">{categoryName}</span>
        </h1>
        <p className="text-gray-500 dark:text-dark-muted">
          {blogs.length} article{blogs.length !== 1 ? 's' : ''} in this category
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex gap-2 flex-wrap justify-center mb-10">
        {categories.map((c) => (
          <a
            key={c.slug}
            href={`/categories/${c.slug}`}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              c.slug === params.category
                ? 'bg-primary-600 text-white shadow-lg'
                : 'bg-white dark:bg-dark-card text-gray-600 dark:text-dark-muted border border-gray-200 dark:border-dark-border hover:border-primary-400'
            }`}
          >
            {c.icon} {c.name}
          </a>
        ))}
      </div>

      {/* Articles */}
      {blogs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="text-5xl mb-4">📭</div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            No articles in {categoryName} yet
          </h3>
          <p className="text-gray-500 dark:text-dark-muted">Check back soon!</p>
        </div>
      )}
    </div>
  );
}
