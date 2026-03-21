'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Heart, MessageCircle, Send, ChevronDown } from 'lucide-react';
import { mockComments, authors, formatDate, type Comment } from '@/lib/data';
import toast from 'react-hot-toast';

interface CommentSectionProps {
  blogId: string;
  commentCount: number;
}

export function CommentSection({ blogId, commentCount }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>(
    mockComments.filter((c) => c.blogId === blogId)
  );
  const [newComment, setNewComment] = useState('');
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');
  const [expandedReplies, setExpandedReplies] = useState<Set<string>>(new Set());

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: `c${Date.now()}`,
      blogId,
      author: authors[0],
      content: newComment,
      publishedAt: new Date().toISOString().split('T')[0],
      likes: 0,
      replies: [],
    };

    setComments((prev) => [comment, ...prev]);
    setNewComment('');
    toast.success('Comment posted!');
  };

  const handleSubmitReply = (commentId: string) => {
    if (!replyText.trim()) return;

    const reply: Comment = {
      id: `r${Date.now()}`,
      blogId,
      author: authors[0],
      content: replyText,
      publishedAt: new Date().toISOString().split('T')[0],
      likes: 0,
    };

    setComments((prev) =>
      prev.map((c) =>
        c.id === commentId
          ? { ...c, replies: [...(c.replies || []), reply] }
          : c
      )
    );
    setReplyText('');
    setReplyTo(null);
    setExpandedReplies((prev) => new Set(Array.from(prev).concat(commentId)));
    toast.success('Reply posted!');
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
          <Image
            src={authors[0].avatar}
            alt="You"
            width={40}
            height={40}
            className="rounded-full bg-gray-100 dark:bg-slate-700 mt-1"
          />
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
                src={comment.author.avatar}
                alt={comment.author.name}
                width={40}
                height={40}
                className="rounded-full bg-gray-100 dark:bg-slate-700"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div>
                    <span className="font-semibold text-gray-900 dark:text-white text-sm">
                      {comment.author.name}
                    </span>
                    <span className="mx-2 text-gray-300 dark:text-dark-border">•</span>
                    <span className="text-xs text-gray-400 dark:text-dark-muted">
                      {formatDate(comment.publishedAt)}
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
                    <Image
                      src={authors[0].avatar}
                      alt="You"
                      width={28}
                      height={28}
                      className="rounded-full bg-gray-100 dark:bg-slate-700 mt-1"
                    />
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
                    {comment.replies.map((reply) => (
                      <div key={reply.id} className="flex items-start gap-3">
                        <Image
                          src={reply.author.avatar}
                          alt={reply.author.name}
                          width={32}
                          height={32}
                          className="rounded-full bg-gray-100 dark:bg-slate-700"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold text-gray-900 dark:text-white text-xs">
                              {reply.author.name}
                            </span>
                            <span className="text-xs text-gray-400 dark:text-dark-muted">
                              {formatDate(reply.publishedAt)}
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
