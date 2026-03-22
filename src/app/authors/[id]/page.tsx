import { notFound } from 'next/navigation';
import { getDbUserById, getDbBlogsByAuthor } from '@/lib/db-queries';
import type { Metadata } from 'next';
import { AuthorProfileUI } from '@/components/author/AuthorProfileUI';

interface Props {
  params: { id: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const author = await getDbUserById(params.id);
  if (!author) return { title: 'Not Found' };
  return { title: `${author.name} — Author Profile` };
}

export default async function AuthorProfilePage({ params }: Props) {
  return <AuthorProfileContent authorId={params.id} />;
}

async function AuthorProfileContent({ authorId }: { authorId: string }) {
  const author = await getDbUserById(authorId);
  if (!author) notFound();

  const authorBlogsRaw = await getDbBlogsByAuthor(authorId);
  // Transform data for the client component
  const authorData = {
    _id: author._id.toString(),
    name: author.name,
    image: author.image,
    bio: author.bio,
    followers: author.followers
  };

  const blogs = authorBlogsRaw.map(p => ({
     id: p._id.toString(),
     title: p.title,
     excerpt: p.excerpt,
     coverImage: p.coverImage,
     category: p.category,
     tags: p.tags,
     publishedAt: p.publishedAt,
     readingTime: p.readingTime,
     views: p.views,
     author: authorData
  })); 

  return <AuthorProfileUI author={authorData} blogs={blogs} />;
}

