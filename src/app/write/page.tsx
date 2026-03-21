'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Bold, Italic, Underline, List, ListOrdered, Quote,
  Image as ImageIcon, Link2, Code, Eye, Save, Send, X
} from 'lucide-react';
import toast from 'react-hot-toast';

const categories = ['Technology', 'Design', 'Business', 'AI & ML', 'Finance', 'Wellness', 'Science', 'Culture'];

export default function WritePage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState('');
  const [preview, setPreview] = useState(false);
  const [saving, setSaving] = useState(false);

  const wordCount = content.split(/\s+/).filter(Boolean).length;
  const readingTime = Math.ceil(wordCount / 200);

  const handleSaveDraft = async () => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 800));
    setSaving(false);
    toast.success('Draft saved!');
  };

  const handlePublish = async () => {
    if (!title.trim()) { toast.error('Please add a title'); return; }
    if (!content.trim()) { toast.error('Please add some content'); return; }
    if (!category) { toast.error('Please select a category'); return; }
    setSaving(true);
    await new Promise((r) => setTimeout(r, 1500));
    setSaving(false);
    toast.success('Article published successfully! 🎉');
  };

  const toolbar = [
    { icon: Bold, action: () => {}, title: 'Bold' },
    { icon: Italic, action: () => {}, title: 'Italic' },
    { icon: Underline, action: () => {}, title: 'Underline' },
    { type: 'divider' },
    { icon: List, action: () => {}, title: 'Bullet List' },
    { icon: ListOrdered, action: () => {}, title: 'Numbered List' },
    { icon: Quote, action: () => {}, title: 'Blockquote' },
    { type: 'divider' },
    { icon: Code, action: () => {}, title: 'Code Block' },
    { icon: Link2, action: () => {}, title: 'Insert Link' },
    { icon: ImageIcon, action: () => toast.success('Image upload coming soon!'), title: 'Insert Image' },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Write Article</h1>
          <p className="text-sm text-gray-500 dark:text-dark-muted mt-0.5">
            {wordCount > 0 && `${wordCount} words · ~${readingTime} min read`}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setPreview(!preview)}
            className={`btn-secondary text-sm px-4 py-2 rounded-xl ${preview ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 border-primary-200' : ''}`}
          >
            <Eye className="w-4 h-4" />
            {preview ? 'Edit' : 'Preview'}
          </button>
          <button
            onClick={handleSaveDraft}
            disabled={saving}
            className="btn-secondary text-sm px-4 py-2 rounded-xl"
          >
            <Save className="w-4 h-4" />
            Save Draft
          </button>
          <button
            onClick={handlePublish}
            disabled={saving}
            className="btn-primary text-sm px-4 py-2 rounded-xl"
          >
            <Send className="w-4 h-4" />
            Publish
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-[1fr_280px] gap-6">
        {/* Editor */}
        <div className="space-y-4">
          {/* Cover image upload */}
          <div
            className="h-48 rounded-2xl border-2 border-dashed border-gray-300 dark:border-dark-border flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-primary-400 hover:bg-primary-50/50 dark:hover:bg-primary-900/10 transition-all group"
            onClick={() => toast.success('Image upload coming soon!')}
          >
            <ImageIcon className="w-8 h-8 text-gray-300 dark:text-dark-muted group-hover:text-primary-500 transition-colors" />
            <p className="text-sm text-gray-400 dark:text-dark-muted group-hover:text-primary-500 font-medium transition-colors">
              Click to add a cover image
            </p>
          </div>

          {/* Title */}
          <textarea
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Your article title..."
            rows={2}
            className="w-full text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white placeholder-gray-300 dark:placeholder-slate-600 bg-transparent border-none outline-none resize-none leading-tight"
          />

          {/* Excerpt */}
          <textarea
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            placeholder="Write a short description (shown in previews)..."
            rows={2}
            className="w-full text-lg text-gray-500 dark:text-dark-muted placeholder-gray-300 dark:placeholder-slate-600 bg-transparent border-none outline-none resize-none border-b border-gray-200 dark:border-dark-border pb-4"
          />

          {/* Toolbar */}
          {!preview && (
            <div className="flex items-center gap-1 flex-wrap p-2 rounded-xl bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border">
              {toolbar.map((item, i) =>
                'type' in item ? (
                  <div key={i} className="w-px h-5 bg-gray-200 dark:bg-dark-border mx-1" />
                ) : (
                  <button
                    key={i}
                    onClick={item.action}
                    title={item.title}
                    className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 dark:text-dark-muted hover:bg-gray-100 dark:hover:bg-slate-700 hover:text-gray-900 dark:hover:text-white transition-all"
                  >
                    <item.icon className="w-4 h-4" />
                  </button>
                )
              )}
            </div>
          )}

          {/* Content Editor / Preview */}
          {preview ? (
            <div className="min-h-[400px] p-6 rounded-2xl bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border">
              {content ? (
                <div className="prose-blog">{content}</div>
              ) : (
                <p className="text-gray-400 italic">Nothing to preview yet...</p>
              )}
            </div>
          ) : (
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Start writing your story... 

You can use Markdown:
# Heading 1
## Heading 2
**bold text**
*italic text*
- bullet item
> blockquote"
              rows={20}
              className="w-full p-4 rounded-2xl border border-gray-200 dark:border-dark-border bg-white dark:bg-dark-card text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none font-mono text-sm leading-relaxed"
            />
          )}
        </div>

        {/* Settings Panel */}
        <div className="space-y-4">
          {/* Category */}
          <div className="bg-white dark:bg-dark-card rounded-2xl border border-gray-200 dark:border-dark-border p-5 shadow-sm">
            <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-3">Category</h3>
            <div className="grid grid-cols-2 gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-3 py-2 text-xs rounded-lg font-medium transition-all ${
                    category === cat
                      ? 'bg-primary-600 text-white shadow-sm'
                      : 'bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-dark-muted hover:bg-gray-200 dark:hover:bg-slate-600'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div className="bg-white dark:bg-dark-card rounded-2xl border border-gray-200 dark:border-dark-border p-5 shadow-sm">
            <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-3">Tags</h3>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="React, TypeScript, Next.js..."
              className="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-dark-border bg-gray-50 dark:bg-slate-800 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <p className="text-xs text-gray-400 dark:text-dark-muted mt-2">Separate tags with commas</p>
          </div>

          {/* Stats */}
          <div className="bg-white dark:bg-dark-card rounded-2xl border border-gray-200 dark:border-dark-border p-5 shadow-sm">
            <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-3">Article Stats</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500 dark:text-dark-muted">Word Count</span>
                <span className="font-medium text-gray-900 dark:text-white">{wordCount}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500 dark:text-dark-muted">Reading Time</span>
                <span className="font-medium text-gray-900 dark:text-white">~{readingTime} min</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500 dark:text-dark-muted">Characters</span>
                <span className="font-medium text-gray-900 dark:text-white">{content.length}</span>
              </div>
            </div>
          </div>

          {/* Publish settings */}
          <div className="bg-white dark:bg-dark-card rounded-2xl border border-gray-200 dark:border-dark-border p-5 shadow-sm">
            <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-3">Settings</h3>
            <div className="space-y-3">
              {[
                { label: 'Allow comments', defaultChecked: true },
                { label: 'Show in newsletter', defaultChecked: true },
                { label: 'Featured article', defaultChecked: false },
              ].map((item) => (
                <label key={item.label} className="flex items-center justify-between cursor-pointer">
                  <span className="text-sm text-gray-600 dark:text-dark-muted">{item.label}</span>
                  <input
                    type="checkbox"
                    defaultChecked={item.defaultChecked}
                    className="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
