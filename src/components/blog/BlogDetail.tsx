'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Heart, MessageCircle, Eye, Clock, Bookmark, Share2,
  Twitter, Linkedin, Link2, Check, Calendar
} from 'lucide-react';
import { type Blog, formatDate, formatNumber } from '@/lib/data';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';

interface BlogDetailProps {
  blog: Blog;
}

export function BlogDetail({ blog }: BlogDetailProps) {
  const { data: session } = useSession();
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [likeCount, setLikeCount] = useState(blog.likes);
  const [copied, setCopied] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followCount, setFollowCount] = useState(0);

  useEffect(() => {
    // Initial load check for personal status if logged in
    fetch('/api/user/bookmarks')
      .then(res => res.json())
      .then(bookmarks => {
        if (Array.isArray(bookmarks)) {
           setBookmarked(bookmarks.some(b => b._id === blog.id || b === blog.id));
        }
      }).catch(() => {});

    // Fetch follow status
    if (blog.author.id && !blog.author.id.includes('unknown')) {
        fetch(`/api/user/follow?userId=${blog.author.id}`)
            .then(res => res.json())
            .then(data => {
                setIsFollowing(data.isFollowing);
                setFollowCount(data.followerCount);
            }).catch(() => {});
    }
  }, [blog.id, blog.author.id]);

  useEffect(() => {
    // Increment views on mount
    if (blog.id && !blog.id.includes('b')) { 
       fetch(`/api/posts/${blog.id}/view`, { method: 'POST' }).catch(console.error);
    }
  }, [blog.id]);

  const handleLike = async () => {
    if (!session) {
      toast.error('Join Blogo to appreciate this masterpiece and more!', {
        duration: 5000,
        icon: '❤️',
        style: {
          background: '#f43f5e',
          color: '#fff',
          fontWeight: '600',
        }
      });
      return;
    }

    if (liked) return; 
    
    const originalCount = likeCount;
    setLiked(true);
    setLikeCount(prev => prev + 1);
    
    try {
       const res = await fetch(`/api/posts/${blog.id}/like`, { method: 'POST' });
       if (!res.ok) throw new Error();
       toast.success('Added to your liked articles!');
    } catch {
       setLiked(false);
       setLikeCount(originalCount);
       toast.error('Failed to like article');
    }
  };

  const handleBookmark = async () => {
    if (!session) {
      toast.error('Join Blogo to save this for later and build your genius library!', {
        duration: 5000,
        icon: '🔖',
        style: {
          background: '#6366f1',
          color: '#fff',
          fontWeight: '600',
        }
      });
      return;
    }

    const originalState = bookmarked;
    const newState = !bookmarked;
    setBookmarked(newState);
    
    try {
       const res = await fetch('/api/user/bookmarks', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ postId: blog.id })
       });
       if (!res.ok) throw new Error();
       toast.success(newState ? 'Saved to bookmarks!' : 'Removed from bookmarks');
    } catch {
       setBookmarked(originalState);
       toast.error('Failed to update bookmarks');
    }
  };

  const handleFollow = async () => {
    if (!session) {
      toast.error('Join Blogo to follow your favorite authors and stay updated on their latest genius!', {
        duration: 5000,
        icon: '✨',
        style: {
          background: '#6366f1',
          color: '#fff',
          fontWeight: '600',
        }
      });
      return;
    }

    try {
       const res = await fetch('/api/user/follow', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ targetUserId: blog.author.id })
       });
       const data = await res.json();
       if (res.ok) {
          setIsFollowing(data.isFollowing);
          setFollowCount(data.followerCount);
          toast.success(data.isFollowing ? `Following ${blog.author.name}` : `Unfollowed ${blog.author.name}`);
       } else {
          toast.error(data.error || 'Failed to follow');
       }
    } catch {
       toast.error('Failed to follow');
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    toast.success('Link copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Category & Reading time */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center gap-3 mb-6"
      >
        <Link href={`/categories/${blog.category.toLowerCase()}`}>
          <span className="category-badge text-sm px-4 py-1.5 hover:bg-primary-200 dark:hover:bg-primary-800/50 transition-colors cursor-pointer">
            {blog.category}
          </span>
        </Link>
        {blog.tags.map((tag) => (
          <span key={tag} className="px-3 py-1 text-xs rounded-full bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-dark-muted">
            #{tag}
          </span>
        ))}
      </motion.div>

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight mb-6"
      >
        {blog.title}
      </motion.h1>

      {/* Excerpt */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="text-xl text-gray-600 dark:text-dark-muted leading-relaxed mb-8 border-l-4 border-primary-500 pl-4"
      >
        {blog.excerpt}
      </motion.p>

      {/* Author Info + Meta */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex flex-wrap items-center gap-4 py-6 border-y border-gray-200 dark:border-dark-border mb-8"
      >
        <Link href={`/authors/${blog.author.id}`} className="flex items-center gap-3 group">
          <Image
            src={blog.author.avatar}
            alt={blog.author.name}
            width={48}
            height={48}
            className="rounded-full bg-gray-100 dark:bg-slate-700 ring-2 ring-transparent group-hover:ring-primary-400 transition-all"
          />
          <div>
            <p className="font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
              {blog.author.name}
            </p>
            <p className="text-sm text-gray-500 dark:text-dark-muted">{blog.author.category} Expert</p>
          </div>
        </Link>

        <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-dark-muted md:ml-auto flex-wrap">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4" />
            {formatDate(blog.publishedAt)}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" />
            {blog.readingTime} min read
          </span>
          <span className="flex items-center gap-1.5">
            <Eye className="w-4 h-4" />
            {formatNumber(blog.views)} views
          </span>
        </div>
      </motion.div>

      {/* Cover Image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.25 }}
        className="relative h-64 md:h-96 rounded-2xl overflow-hidden mb-10 shadow-lg"
      >
        <Image
          src={blog.coverImage}
          alt={blog.title}
          fill
          className="object-cover"
          priority
        />
      </motion.div>

      {/* Blog Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="prose-blog mb-12"
        dangerouslySetInnerHTML={{ __html: formatContent(blog.content) }}
      />

      {/* Engagement Bar */}
      <div className="sticky bottom-6 z-20 flex justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="inline-flex items-center gap-1 px-4 py-3 rounded-2xl bg-white dark:bg-dark-card shadow-xl border border-gray-200 dark:border-dark-border"
        >
          <button
            onClick={handleLike}
            className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-all ${
              liked
                ? 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400'
                : 'text-gray-500 dark:text-dark-muted hover:bg-gray-100 dark:hover:bg-slate-700'
            }`}
          >
            <Heart className={`w-4 h-4 ${liked ? 'fill-red-500 text-red-500' : ''}`} />
            <span>{formatNumber(likeCount)}</span>
          </button>

          <div className="w-px h-5 bg-gray-200 dark:bg-dark-border" />

          <a
            href="#comments"
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium text-gray-500 dark:text-dark-muted hover:bg-gray-100 dark:hover:bg-slate-700 transition-all"
          >
            <MessageCircle className="w-4 h-4" />
            <span>{blog.comments}</span>
          </a>

          <div className="w-px h-5 bg-gray-200 dark:bg-dark-border" />

          <button
            onClick={handleBookmark}
            className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-all ${
              bookmarked
                ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                : 'text-gray-500 dark:text-dark-muted hover:bg-gray-100 dark:hover:bg-slate-700'
            }`}
          >
            <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-primary-500 text-primary-500' : ''}`} />
          </button>

          <div className="w-px h-5 bg-gray-200 dark:bg-dark-border" />

          {/* Share buttons */}
          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(blog.title)}&url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium text-gray-500 dark:text-dark-muted hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-500 transition-all"
          >
            <Twitter className="w-4 h-4" />
          </a>

          <button
            onClick={handleCopyLink}
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium text-gray-500 dark:text-dark-muted hover:bg-gray-100 dark:hover:bg-slate-700 transition-all"
          >
            {copied ? <Check className="w-4 h-4 text-green-500" /> : <Link2 className="w-4 h-4" />}
          </button>
        </motion.div>
      </div>

      {/* Author Card */}
      <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-primary-50 to-blue-50 dark:from-primary-900/20 dark:to-blue-900/20 border border-primary-100 dark:border-primary-800/30">
        <div className="flex items-start gap-4">
          <Image
            src={blog.author.avatar}
            alt={blog.author.name}
            width={64}
            height={64}
            className="rounded-full bg-gray-100 dark:bg-slate-700 ring-4 ring-white dark:ring-dark-card"
          />
          <div className="flex-1">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div>
                <Link
                  href={`/authors/${blog.author.id}`}
                  className="font-bold text-gray-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 transition-colors text-lg"
                >
                  {blog.author.name}
                </Link>
                <p className="text-sm text-primary-600 dark:text-primary-400 font-medium">{blog.author.category}</p>
              </div>
              <button
                onClick={handleFollow}
                className={`text-sm px-4 py-2 rounded-lg transition-all ${
                    isFollowing 
                    ? 'bg-gray-200 dark:bg-slate-700 text-gray-700 dark:text-white hover:bg-gray-300 dark:hover:bg-slate-600'
                    : 'btn-primary'
                }`}
              >
                {isFollowing ? 'Following' : 'Follow'}
              </button>
            </div>
            <p className="mt-2 text-gray-600 dark:text-dark-muted text-sm leading-relaxed">{blog.author.bio}</p>
          </div>
        </div>
      </div>
    </article>
  );
}

function formatContent(content: string): string {
  return content
    .trim()
    .split('\n')
    .map((line) => {
      if (line.startsWith('# ')) return `<h1>${line.slice(2)}</h1>`;
      if (line.startsWith('## ')) return `<h2>${line.slice(3)}</h2>`;
      if (line.startsWith('### ')) return `<h3>${line.slice(4)}</h3>`;
      if (line.startsWith('**') && line.endsWith('**')) return `<strong>${line.slice(2, -2)}</strong>`;
      if (line.startsWith('- ')) return `<li>${line.slice(2)}</li>`;
      if (line.startsWith('```')) return line === '```' ? '</code></pre>' : `<pre><code class="language-${line.slice(3)}">`;
      if (line === '') return '<br>';
      return `<p>${line}</p>`;
    })
    .join('\n')
    .replace(/<br>\n<br>/g, '<br>')
    .replace(/(<li>.*<\/li>\n?)+/g, (match) => `<ul>${match}</ul>`);
}
