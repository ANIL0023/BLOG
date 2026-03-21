import { HeroSection } from '@/components/home/HeroSection';
import { FeaturedStory } from '@/components/home/FeaturedStory';
import { TrendingBlogs } from '@/components/home/TrendingBlogs';
import { Categories } from '@/components/home/Categories';
import { TopAuthors } from '@/components/home/TopAuthors';
import { RecentArticles } from '@/components/home/RecentArticles';
import { getFeaturedBlogs, getTrendingBlogs, getRecentBlogs } from '@/lib/data';

export default function HomePage() {
  const featured = getFeaturedBlogs();
  const trending = getTrendingBlogs();
  const recent = getRecentBlogs(6);

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
