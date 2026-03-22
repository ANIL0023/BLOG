'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Heart, MessageCircle, Send, ChevronDown, Loader2 } from 'lucide-react';
import { formatDate, type Comment as CommentType } from '@/lib/data';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';

interface CommentSectionProps {
  blogId: string;
  commentCount: number;
}

export function CommentSection({ blogId, commentCount }: CommentSectionProps) {
  const { data: session } = useSession();
  const [comments, setComments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState('');
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');
  const [expandedReplies, setExpandedReplies] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (blogId && !blogId.includes('b')) {
       fetch(`/api/posts/${blogId}/comments`)
         .then(res => res.json())
         .then(data => {
            if (Array.isArray(data)) setComments(data);
            setLoading(false);
         })
         .catch(() => setLoading(false));
    } else {
       setLoading(false);
    }
  }, [blogId]);

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    if (!session) { toast.error('Please sign in to comment'); return; }

    try {
       const res = await fetch(`/api/posts/${blogId}/comments`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ content: newComment })
       });
       const data = await res.json();
       if (res.ok) {
          setComments((prev) => [data, ...prev]);
          setNewComment('');
          toast.success('Comment posted!');
       }
    } catch {
       toast.error('Failed to post comment');
    }
  };

  const handleSubmitReply = async (commentId: string) => {
    if (!replyText.trim()) return;
    if (!session) { toast.error('Please sign in to reply'); return; }

    try {
       const res = await fetch(`/api/posts/${blogId}/comments`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ content: replyText, parentId: commentId })
       });
       const data = await res.json();
       if (res.ok) {
          setComments((prev) =>
            prev.map((c) =>
              c.id === commentId
                ? { ...c, replies: [...(c.replies || []), data] }
                : c
            )
          );
          setReplyText('');
          setReplyTo(null);
          setExpandedReplies((prev) => new Set(Array.from(prev).concat(commentId)));
          toast.success('Reply posted!');
       }
    } catch {
       toast.error('Failed to post reply');
    }
  };

  const toggleReplies = (commentId: string) => {
    setExpandedReplies((prev) => {
      const next = new Set(prev);
      if (next.has(commentId)) next.delete(commentId);
      else next.add(commentId);
      return next;
    });
  };

  return (
    <section id="comments" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center gap-2 mb-8">
        <MessageCircle className="w-5 h-5 text-primary-500" />
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          {comments.length} Comments
        </h2>
      </div>

      {/* Comment Form */}
      <div className="mb-10 p-5 rounded-2xl bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border shadow-sm">
        <div className="flex items-start gap-3">
          {session?.user?.image ? (
            <Image
                src={session.user.image}
                alt={session.user.name || 'You'}
                width={40}
                height={40}
                className="rounded-full bg-gray-100 dark:bg-slate-700 mt-1"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-slate-700 mt-1 flex items-center justify-center">
               <MessageCircle className="w-5 h-5 text-gray-400" />
            </div>
          )}
          <form onSubmit={handleSubmitComment} className="flex-1">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Share your thoughts..."
              rows={3}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-dark-border
                bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white
                placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-primary-500
                transition-all text-sm"
            />
            <div className="flex justify-end mt-2">
              <button
                type="submit"
                disabled={!newComment.trim()}
                className="btn-primary text-sm px-4 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                <Send className="w-4 h-4" />
                Post Comment
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Comments List */}
      <div className="space-y-6">
        {comments.length === 0 && (
          <div className="text-center py-12 text-gray-400 dark:text-dark-muted">
            <MessageCircle className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p>No comments yet. Be the first to share your thoughts!</p>
          </div>
        )}

        {comments.map((comment, index) => (
          <motion.div
            key={comment.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white dark:bg-dark-card rounded-2xl border border-gray-100 dark:border-dark-border p-5 shadow-sm"
          >
            {/* Comment Author */}
            <div className="flex items-start gap-3 mb-3">
                <Image
                  src={comment.author?.image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${comment.author?.name || 'anon'}`}
                  alt={comment.author?.name || 'User'}
                  width={40}
                  height={40}
                  className="rounded-full bg-gray-100 dark:bg-slate-700"
                />
              <div className="flex-1">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div>
                    <span className="font-semibold text-gray-900 dark:text-white text-sm">
                      {comment.author?.name || 'Deleted User'}
                    </span>
                    <span className="mx-2 text-gray-300 dark:text-dark-border">•</span>
                    <span className="text-xs text-gray-400 dark:text-dark-muted">
                      {formatDate(comment.createdAt || comment.publishedAt)}
                    </span>
                  </div>
                </div>
                <p className="text-gray-700 dark:text-dark-text text-sm leading-relaxed mt-1">
                  {comment.content}
                </p>

                {/* Comment Actions */}
                <div className="flex items-center gap-4 mt-3">
                  <button className="flex items-center gap-1.5 text-xs text-gray-400 dark:text-dark-muted hover:text-red-500 transition-colors">
                    <Heart className="w-3.5 h-3.5" />
                    {comment.likes > 0 && <span>{comment.likes}</span>}
                    <span>Like</span>
                  </button>
                  <button
                    onClick={() => setReplyTo(replyTo === comment.id ? null : comment.id)}
                    className="flex items-center gap-1.5 text-xs text-gray-400 dark:text-dark-muted hover:text-primary-500 transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    Reply
                  </button>

                  {(comment.replies?.length ?? 0) > 0 && (
                    <button
                      onClick={() => toggleReplies(comment.id)}
                      className="flex items-center gap-1 text-xs text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors ml-auto"
                    >
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform ${expandedReplies.has(comment.id) ? 'rotate-180' : ''}`} />
                      {comment.replies?.length} {comment.replies?.length === 1 ? 'reply' : 'replies'}
                    </button>
                  )}
                </div>

                {/* Reply Form */}
                {replyTo === comment.id && (
                  <div className="mt-4 flex items-start gap-2">
                    {session?.user?.image && (
                        <Image
                            src={session.user.image}
                            alt="You"
                            width={28}
                            height={28}
                            className="rounded-full bg-gray-100 dark:bg-slate-700 mt-1"
                        />
                    )}
                    <div className="flex-1">
                      <textarea
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        placeholder={`Reply to ${comment.author.name}...`}
                        rows={2}
                        className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-dark-border bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
                        autoFocus
                      />
                      <div className="flex justify-end gap-2 mt-2">
                        <button
                          onClick={() => setReplyTo(null)}
                          className="text-xs text-gray-500 hover:text-gray-700 dark:text-dark-muted dark:hover:text-white px-3 py-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => handleSubmitReply(comment.id)}
                          disabled={!replyText.trim()}
                          className="btn-primary text-xs px-3 py-1.5 rounded-lg disabled:opacity-50"
                        >
                          Reply
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Nested Replies */}
                {expandedReplies.has(comment.id) && comment.replies && comment.replies.length > 0 && (
                  <div className="mt-4 space-y-4 pl-4 border-l-2 border-gray-100 dark:border-dark-border">
                    {comment.replies.map((reply: any) => (
                      <div key={reply.id} className="flex items-start gap-3">
                        <Image
                          src={reply.author?.image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${reply.author?.name || 'anon'}`}
                          alt={reply.author?.name || 'User'}
                          width={32}
                          height={32}
                          className="rounded-full bg-gray-100 dark:bg-slate-700"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold text-gray-900 dark:text-white text-xs">
                              {reply.author?.name || 'User'}
                            </span>
                            <span className="text-xs text-gray-400 dark:text-dark-muted">
                              {formatDate(reply.createdAt || reply.publishedAt)}
                            </span>
                          </div>
                          <p className="text-gray-700 dark:text-dark-text text-sm leading-relaxed">
                            {reply.content}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
