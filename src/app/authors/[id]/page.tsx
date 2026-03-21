import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getAuthorById, getBlogsByAuthor, authors, formatNumber } from '@/lib/data';
import { BlogCard } from '@/components/blog/BlogCard';
import { Users, BookOpen, Twitter, Github, Linkedin } from 'lucide-react';
import type { Metadata } from 'next';

interface Props {
  params: { id: string };
}

export function generateStaticParams() {
  return authors.map((a) => ({ id: a.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const author = getAuthorById(params.id);
  if (!author) return { title: 'Not Found' };
  return { title: `${author.name} — Author Profile` };
}

export default function AuthorProfilePage({ params }: Props) {
  const author = getAuthorById(params.id);
  if (!author) notFound();

  const authorBlogs = getBlogsByAuthor(params.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Profile Header */}
      <div className="relative mb-12">
        {/* Banner */}
        <div className="h-48 rounded-3xl gradient-bg opacity-80 mb-16" />

        {/* Profile Card */}
        <div className="absolute bottom-0 left-0 right-0 flex flex-col md:flex-row items-start md:items-end gap-4 px-6">
          <div className="relative -mb-6">
            <Image
              src={author.avatar}
              alt={author.name}
              width={96}
              height={96}
              className="rounded-full bg-white dark:bg-dark-card ring-4 ring-white dark:ring-dark-bg shadow-xl"
            />
          </div>
          <div className="flex-1 pb-2">
            <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white">{author.name}</h1>
            <p className="text-primary-600 dark:text-primary-400 font-medium">{author.category} Expert</p>
          </div>
          <button className="btn-primary px-6 py-2.5 rounded-xl text-sm mb-2">
            Follow
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-[1fr_280px] gap-8 pt-6">
        {/* Articles */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
            Published Articles ({authorBlogs.length})
          </h2>
          {authorBlogs.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-6">
              {authorBlogs.map((blog) => (
                <BlogCard key={blog.id} blog={blog} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-gray-400 dark:text-dark-muted">
              <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p>No articles published yet.</p>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          {/* Bio */}
          <div className="bg-white dark:bg-dark-card rounded-2xl border border-gray-100 dark:border-dark-border p-6 shadow-sm">
            <h3 className="font-bold text-gray-900 dark:text-white mb-3">About</h3>
            <p className="text-sm text-gray-600 dark:text-dark-muted leading-relaxed">{author.bio}</p>

            {/* Social Links */}
            <div className="flex gap-3 mt-4 pt-4 border-t border-gray-100 dark:border-dark-border">
              {author.social.twitter && (
                <a href={`https://twitter.com/${author.social.twitter}`} target="_blank" rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all">
                  <Twitter className="w-4 h-4" />
                </a>
              )}
              {author.social.github && (
                <a href={`https://github.com/${author.social.github}`} target="_blank" rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-slate-700 transition-all">
                  <Github className="w-4 h-4" />
                </a>
              )}
              {author.social.linkedin && (
                <a href={`https://linkedin.com/in/${author.social.linkedin}`} target="_blank" rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all">
                  <Linkedin className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="bg-white dark:bg-dark-card rounded-2xl border border-gray-100 dark:border-dark-border p-6 shadow-sm">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4">Stats</h3>
            <div className="space-y-3">
              {[
                { label: 'Followers', value: formatNumber(author.followers), icon: Users },
                { label: 'Articles', value: author.articles.toString(), icon: BookOpen },
              ].map(({ label, value, icon: Icon }) => (
                <div key={label} className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-dark-muted">
                    <Icon className="w-4 h-4 text-primary-400" />
                    {label}
                  </div>
                  <span className="font-semibold text-gray-900 dark:text-white">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
