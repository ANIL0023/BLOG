import { HeroSection } from '@/components/home/HeroSection';
import { FeaturedStory } from '@/components/home/FeaturedStory';
import { TrendingBlogs } from '@/components/home/TrendingBlogs';
import { Categories } from '@/components/home/Categories';
import { TopAuthors } from '@/components/home/TopAuthors';
import { RecentArticles } from '@/components/home/RecentArticles';
import { getDbFeaturedBlogs, getDbTrendingBlogs, getDbRecentBlogs } from '@/lib/db-queries';

function mapPostToBlog(p: any) {
  return {
    id: p._id.toString(),
    slug: p._id.toString(),
    title: p.title,
    excerpt: p.excerpt || p.content?.substring(0, 120),
    coverImage: p.coverImage || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643',
    category: p.category,
    author: {
       id: p.author?._id?.toString() || 'unknown',
       name: p.author?.name || 'Writer',
       avatar: p.author?.image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${p.author?.name || 'anon'}`,
       bio: p.author?.bio || 'Professional writer and contributor.',
       followers: 0,
       articles: 0,
       category: 'Technology',
       social: { twitter: '#', github: '#' }
    },
    publishedAt: p.createdAt.toISOString(),
    readingTime: Math.ceil((p.content?.length || 0) / 1000) || 5, // Simple estimate
    views: p.views || 0,
    likes: p.likes || 0,
    comments: p.comments || 0,
    tags: p.tags || [],
    content: p.content || '',
    featured: p.featured || false,
    trending: p.trending || false
  };
}

export default async function HomePage() {
  const [featuredRaw, trendingRaw, recentRaw] = await Promise.all([
    getDbFeaturedBlogs(),
    getDbTrendingBlogs(6),
    getDbRecentBlogs(6),
  ]);

  const featured = featuredRaw.map(mapPostToBlog);
  const trending = trendingRaw.map(mapPostToBlog);
  const recent = recentRaw.map(mapPostToBlog);

  return (
    <>
      <HeroSection />
      {featured[0] && <FeaturedStory blog={featured[0]} />}
      <Categories />
      <TrendingBlogs blogs={trending} />
      <TopAuthors />
      <RecentArticles blogs={recent} />
    </>
  );
}
