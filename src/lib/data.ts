export interface Author {
  id: string;
  name: string;
  bio: string;
  avatar: string;
  followers: number;
  articles: number;
  category: string;
  social: {
    twitter?: string;
    github?: string;
    linkedin?: string;
  };
}

export interface Blog {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: string;
  tags: string[];
  author: Author;
  publishedAt: string;
  readingTime: number;
  likes: number;
  comments: number;
  views: number;
  featured: boolean;
  trending: boolean;
}

export interface Comment {
  id: string;
  blogId: string;
  author: Author;
  content: string;
  publishedAt: string;
  likes: number;
  replies?: Comment[];
}

export interface Category {
  name: string;
  slug: string;
  count: number;
  color: string;
  icon: string;
}

export const authors: Author[] = [
  {
    id: '1',
    name: 'Alex Morgan',
    bio: 'Full-stack developer and tech writer with 8+ years of experience building scalable web applications. Passionate about React, TypeScript, and cloud architecture.',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=AlexMorgan',
    followers: 12400,
    articles: 47,
    category: 'Technology',
    social: { twitter: '@alexmorgan', github: 'alexmorgan', linkedin: 'alexmorgan' },
  },
  {
    id: '2',
    name: 'Sarah Chen',
    bio: 'UX designer and product strategist. I write about design systems, user psychology, and creating delightful digital experiences.',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=SarahChen',
    followers: 9800,
    articles: 35,
    category: 'Design',
    social: { twitter: '@sarahchen', linkedin: 'sarahchen' },
  },
  {
    id: '3',
    name: 'Marcus Johnson',
    bio: 'Startup founder turned writer. Sharing lessons from building three companies, raising venture capital, and the realities of entrepreneurship.',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=MarcusJohnson',
    followers: 22100,
    articles: 62,
    category: 'Business',
    social: { twitter: '@marcusj', linkedin: 'marcusjohnson' },
  },
  {
    id: '4',
    name: 'Priya Patel',
    bio: 'Machine learning engineer at a top AI lab. I break down complex ML concepts into digestible articles for developers at all levels.',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=PriyaPatel',
    followers: 18600,
    articles: 41,
    category: 'AI & ML',
    social: { twitter: '@priyapatel', github: 'priyapatel' },
  },
  {
    id: '5',
    name: 'David Kim',
    bio: 'Personal finance advisor and investor. Helping millennials navigate investing, budgeting, and building long-term wealth.',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=DavidKim',
    followers: 15300,
    articles: 29,
    category: 'Finance',
    social: { twitter: '@davidkim', linkedin: 'davidkim' },
  },
  {
    id: '6',
    name: 'Emma Wilson',
    bio: 'Wellness coach and mindfulness teacher. Writing about mental health, productivity, and finding balance in a hyperconnected world.',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=EmmaWilson',
    followers: 31200,
    articles: 78,
    category: 'Wellness',
    social: { twitter: '@emmawilson', linkedin: 'emmawilson' },
  },
];

export const categories: Category[] = [
  { name: 'Technology', slug: 'technology', count: 124, color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400', icon: '💻' },
  { name: 'Design', slug: 'design', count: 89, color: 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400', icon: '🎨' },
  { name: 'Business', slug: 'business', count: 97, color: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400', icon: '📈' },
  { name: 'AI & ML', slug: 'ai-ml', count: 76, color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400', icon: '🤖' },
  { name: 'Finance', slug: 'finance', count: 63, color: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400', icon: '💰' },
  { name: 'Wellness', slug: 'wellness', count: 112, color: 'bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400', icon: '🧘' },
  { name: 'Science', slug: 'science', count: 58, color: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400', icon: '🔬' },
  { name: 'Culture', slug: 'culture', count: 81, color: 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400', icon: '🎭' },
];

export const blogs: Blog[] = [
  {
    id: '1',
    slug: 'mastering-react-server-components',
    title: 'Mastering React Server Components in Next.js 14',
    excerpt: 'Dive deep into React Server Components and learn how they fundamentally change how we think about rendering in modern web applications.',
    content: `
# Mastering React Server Components in Next.js 14

React Server Components (RSC) represent one of the most significant architectural shifts in React's history. With Next.js 14's App Router, server components are now the default—and for good reason.

## What Are React Server Components?

React Server Components allow you to write UI that can be rendered and optionally cached on the server. Unlike traditional server-side rendering (SSR), RSC components never ship their JavaScript to the client, resulting in smaller bundle sizes and faster page loads.

\`\`\`tsx
// This component runs ONLY on the server
async function BlogPost({ slug }: { slug: string }) {
  const post = await db.post.findUnique({ where: { slug } });
  
  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </article>
  );
}
\`\`\`

## The Key Benefits

**1. Zero Client-Side JavaScript**
Server components ship no JavaScript to the browser. This dramatically reduces your bundle size, especially for data-heavy components.

**2. Direct Backend Access**
Server components can directly access databases, file systems, and internal APIs without exposing sensitive logic to the client.

**3. Automatic Code Splitting**
Client components are automatically code-split, and you only download what's needed.

## When to Use Server vs Client Components

Use **Server Components** when you need to:
- Fetch data
- Access backend resources
- Keep sensitive information on the server
- Reduce client-side JavaScript

Use **Client Components** when you need to:
- Add interactivity and event listeners
- Use React hooks (useState, useEffect, etc.)
- Use browser-only APIs
- Use class components

## Practical Patterns

### Data Fetching Pattern

\`\`\`tsx
// app/posts/page.tsx - Server Component
export default async function PostsPage() {
  const posts = await getPosts(); // Direct DB call
  
  return (
    <div>
      {posts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
\`\`\`

### Mixing Server and Client Components

\`\`\`tsx
// Server Component (parent)
async function BlogLayout({ children }: { children: React.ReactNode }) {
  const categories = await getCategories();
  
  return (
    <div className="flex">
      <Sidebar categories={categories} /> {/* Server */}
      <main>
        {children}
        <LikeButton /> {/* Client - needs interactivity */}
      </main>
    </div>
  );
}
\`\`\`

## Streaming and Suspense

One of the most powerful features of the App Router is streaming with Suspense:

\`\`\`tsx
import { Suspense } from 'react';

export default function Page() {
  return (
    <>
      <StaticHeader />
      <Suspense fallback={<LoadingSpinner />}>
        <SlowDataComponent />
      </Suspense>
    </>
  );
}
\`\`\`

## Conclusion

React Server Components aren't just a performance optimization—they're a paradigm shift. By default rendering on the server, we get better performance, simpler data fetching, and more secure applications. The key is understanding the boundary between server and client, and making intentional decisions about where each component lives.

Start experimenting with RSC today and experience the difference in your application's performance!
    `,
    coverImage: 'https://picsum.photos/800/400?random=1',
    category: 'Technology',
    tags: ['React', 'Next.js', 'TypeScript', 'Web Dev'],
    author: authors[0],
    publishedAt: '2024-01-15',
    readingTime: 8,
    likes: 847,
    comments: 64,
    views: 12400,
    featured: true,
    trending: true,
  },
  {
    id: '2',
    slug: 'design-systems-at-scale',
    title: 'Building Design Systems That Scale Across Teams',
    excerpt: 'Learn how to create a robust design system that maintains consistency across large organizations while enabling teams to move fast.',
    content: `
# Building Design Systems That Scale Across Teams

A design system is more than a component library—it's the foundation upon which your entire product experience is built. When done right, it enables teams to ship faster while maintaining visual and behavioral consistency.

## Why Design Systems Matter

The average enterprise design team loses **30% of their time** recreating components that already exist elsewhere in the organization. A well-implemented design system eliminates this waste and creates a shared language between designers and developers.

## The Three Pillars

### 1. Design Tokens

Design tokens are the atomic values that define your visual language:

\`\`\`js
const tokens = {
  colors: {
    primary: { 50: '#f5f3ff', 500: '#8b5cf6', 900: '#4c1d95' },
    semantic: { success: '#10b981', error: '#ef4444' }
  },
  spacing: { 1: '4px', 2: '8px', 4: '16px', 8: '32px' },
  typography: { 
    fontFamily: { sans: 'Inter, system-ui' },
    fontSize: { sm: '0.875rem', base: '1rem', xl: '1.25rem' }
  }
}
\`\`\`

### 2. Component Architecture

Components should be:
- **Composable**: Small, focused, and combinable
- **Accessible**: Following WCAG 2.1 AA standards
- **Themeable**: Adaptable to different brand needs
- **Documented**: With usage examples and guidelines

### 3. Documentation

Great documentation is what separates a good design system from a great one. Include:
- Visual examples of every state
- Code snippets ready to copy
- Do's and don'ts
- Accessibility notes

## Governance Model

For a design system to succeed at scale, you need clear governance:

**Contribution Process**: How teams submit new components
**Review Criteria**: What makes a component "ready" for the system
**Versioning Strategy**: How you handle breaking changes
**Communication Channels**: How you announce updates

## Measuring Success

Track these metrics to know if your design system is working:

1. **Adoption Rate**: % of product screens using DS components
2. **Time to Ship**: Reduction in time from design to production
3. **Bug Rate**: Design-related bugs reported by users
4. **Satisfaction Score**: Developer and designer NPS

A mature design system is never finished—it evolves with your product and organization.
    `,
    coverImage: 'https://picsum.photos/800/400?random=2',
    category: 'Design',
    tags: ['Design Systems', 'UI/UX', 'Figma', 'CSS'],
    author: authors[1],
    publishedAt: '2024-01-18',
    readingTime: 6,
    likes: 623,
    comments: 41,
    views: 8900,
    featured: true,
    trending: false,
  },
  {
    id: '3',
    slug: 'ai-product-strategy-2024',
    title: 'AI Product Strategy: What Every Founder Must Know in 2024',
    excerpt: 'The AI landscape is changing faster than ever. Here\'s a pragmatic framework for integrating AI into your product without getting burned.',
    content: `
# AI Product Strategy: What Every Founder Must Know in 2024

Every founder I talk to is asking the same question: "How do we integrate AI without betting the company on it?" After helping 50+ startups navigate this, here's what I've learned.

## The AI Integration Spectrum

Not all AI integration is equal. Think of it as a spectrum:

**Level 1 - AI-Enhanced**: Using existing AI APIs to add features (ChatGPT API, image generation)

**Level 2 - AI-Native**: Core product functionality depends on AI capabilities

**Level 3 - AI-Differentiated**: Proprietary AI models that create defensible moats

Most startups should start at Level 1 and only move up with strong evidence.

## The Framework I Use

### Step 1: Identify the Pain Point First

Don't start with "how can we use AI?" Start with "what's the most painful thing for our users?" AI is a solution, not a problem statement.

### Step 2: Build the Boring Version

Before investing in AI, build the manual/rule-based version. This validates the problem and gives you training data.

### Step 3: Measure Before and After

Define clear metrics before adding AI. What does success look like? Without benchmarks, you won't know if AI is actually helping.

## Common Mistakes

**Mistake 1: Over-relying on LLMs for structured tasks**
LLMs are great for language, not for logic. Don't use GPT-4 to determine if a user should get a discount—use business rules.

**Mistake 2: Ignoring AI failures**
AI fails differently than traditional software. Build robust fallbacks and monitor for degraded performance.

**Mistake 3: Underestimating data quality**
Garbage in, garbage out. Your AI is only as good as your data.

## The Defensibility Question

The hardest truth: most AI features are easily replicable. Your moat comes from:
- **Data advantages**: Proprietary training data
- **Workflow integration**: Deep embedding in user processes
- **Network effects**: AI that improves with more users

## Conclusion

AI is neither the salvation nor the existential threat many portray it as. It's a powerful tool that requires thoughtful application. Focus on problems first, solutions second.
    `,
    coverImage: 'https://picsum.photos/800/400?random=3',
    category: 'Business',
    tags: ['AI', 'Product Strategy', 'Startups', 'Founders'],
    author: authors[2],
    publishedAt: '2024-01-20',
    readingTime: 10,
    likes: 1204,
    comments: 98,
    views: 24600,
    featured: false,
    trending: true,
  },
  {
    id: '4',
    slug: 'transformer-architecture-explained',
    title: 'The Transformer Architecture Explained for Developers',
    excerpt: 'A developer-friendly deep dive into the attention mechanisms and architecture that powers GPT, BERT, and modern language models.',
    content: `
# The Transformer Architecture Explained for Developers

If you've been trying to understand how large language models work under the hood, you've come to the right place. I'll explain transformers the way I wish someone had explained them to me.

## The Fundamental Problem Transformers Solve

Before transformers, we used RNNs (Recurrent Neural Networks) for sequence data. The problem? RNNs process data sequentially—they can't parallelize, and they struggle with long-range dependencies.

Transformers solve both problems with one elegant mechanism: **attention**.

## Self-Attention: The Core Idea

Self-attention allows each word in a sequence to "look at" every other word and determine how relevant they are to each other.

For the sentence "The cat sat on the mat because it was tired":
- "it" needs to attend strongly to "cat" to understand the reference
- "tired" needs context from "cat" and "sat"

This is computed using three matrices: **Queries (Q)**, **Keys (K)**, and **Values (V)**:

\`\`\`python
import numpy as np

def attention(Q, K, V):
    d_k = Q.shape[-1]
    scores = np.matmul(Q, K.T) / np.sqrt(d_k)
    weights = softmax(scores)
    return np.matmul(weights, V)
\`\`\`

## Multi-Head Attention

Instead of computing attention once, transformers compute it multiple times in parallel ("heads"), each learning to attend to different aspects of the input:

\`\`\`python
class MultiHeadAttention:
    def __init__(self, d_model, n_heads):
        self.n_heads = n_heads
        self.d_head = d_model // n_heads
        self.W_q = Linear(d_model, d_model)
        self.W_k = Linear(d_model, d_model)
        self.W_v = Linear(d_model, d_model)
        self.W_o = Linear(d_model, d_model)
    
    def forward(self, x):
        # Split into heads, compute attention, concatenate
        ...
\`\`\`

## The Full Architecture

A transformer encoder block contains:
1. Multi-Head Self-Attention
2. Add & Layer Normalize
3. Feed-Forward Network
4. Add & Layer Normalize

This is stacked N times (GPT-3 uses 96 layers!).

## Why This Matters for Developers

Understanding transformers helps you:
- **Prompt engineer** more effectively
- **Choose the right model** for your task
- **Debug** unexpected model behaviors
- **Fine-tune** models appropriately

The attention mechanism, while conceptually simple, is what gives LLMs their remarkable ability to understand context and nuance.
    `,
    coverImage: 'https://picsum.photos/800/400?random=4',
    category: 'AI & ML',
    tags: ['AI', 'Machine Learning', 'Transformers', 'Deep Learning'],
    author: authors[3],
    publishedAt: '2024-01-22',
    readingTime: 12,
    likes: 934,
    comments: 76,
    views: 18200,
    featured: false,
    trending: true,
  },
  {
    id: '5',
    slug: 'index-fund-investing-guide',
    title: 'The Definitive Guide to Index Fund Investing for Beginners',
    excerpt: 'Stop picking stocks and start building wealth. Here\'s the evidence-based approach to investing that beats 95% of professional fund managers.',
    content: `
# The Definitive Guide to Index Fund Investing for Beginners

Let me tell you something the finance industry doesn't want you to know: you don't need them.

Over any 15-year period, index funds outperform over 90% of actively managed funds. And they do it with lower fees, less stress, and minimal time investment.

## What Is an Index Fund?

An index fund is a type of investment that tracks a market index—like the S&P 500, which contains the 500 largest US companies. Instead of picking individual stocks, you own a tiny piece of all of them.

## Why Index Funds Win

**The Math Is Simple:**
- Average active fund: 1-2% annual fees
- Index fund: 0.03-0.20% annual fees

Over 30 years, this difference in fees on a $100,000 investment can mean **$200,000+ more** in your pocket.

**The Evidence Is Clear:**
Warren Buffett bet $1 million that index funds would outperform hedge funds over 10 years. He won.

## Getting Started in 4 Steps

### Step 1: Open a Brokerage Account
Best options: Fidelity, Vanguard, Schwab (all offer commission-free trading)

### Step 2: Choose Your Funds
For a simple three-fund portfolio:
- 60% Total US Stock Market (VTI)
- 30% Total International (VXUS)  
- 10% US Bonds (BND)

### Step 3: Set Up Automatic Investing
Automate monthly contributions. This enforces discipline and takes advantage of dollar-cost averaging.

### Step 4: Rebalance Annually
Once a year, adjust your portfolio back to your target allocation. Nothing more needed.

## The Psychological Challenge

The hardest part isn't the strategy—it's the psychology. When markets crash 40%, everything in you screams to sell.

**Don't.**

Investors who stayed invested during the 2020 COVID crash (which dropped 34%) and held on saw a 100%+ recovery within 18 months.

Time in the market beats timing the market. Every. Single. Time.
    `,
    coverImage: 'https://picsum.photos/800/400?random=5',
    category: 'Finance',
    tags: ['Investing', 'Personal Finance', 'Index Funds', 'Wealth'],
    author: authors[4],
    publishedAt: '2024-01-25',
    readingTime: 9,
    likes: 2341,
    comments: 187,
    views: 45600,
    featured: false,
    trending: true,
  },
  {
    id: '6',
    slug: 'digital-minimalism-productivity',
    title: 'Digital Minimalism: How I Reclaimed 4 Hours Per Day',
    excerpt: 'I deleted social media, turned off notifications, and restructured my digital life. The results transformed my productivity and mental health.',
    content: `
# Digital Minimalism: How I Reclaimed 4 Hours Per Day

Eighteen months ago, I was checking my phone 150 times per day. I know because I finally looked at my screen time stats—and was horrified.

The average person spends 7 hours per day on screens. For knowledge workers, it's often more. I decided to conduct an experiment in digital minimalism.

## What Is Digital Minimalism?

Cal Newport defines it as "a philosophy of technology use in which you focus your online time on a small number of carefully selected and optimized activities that strongly support things you value, and then happily miss out on everything else."

The key word is **intentional**.

## The 30-Day Experiment

I followed three rules for 30 days:

1. **No social media** on my phone (kept desktop access, scheduled)
2. **Notifications off** for everything except calls from family
3. **Email at specific times** only (9am, 1pm, 5pm)

### Week 1: Withdrawal

It was rough. I reached for my phone constantly out of habit. I felt oddly anxious, like I was missing something important.

Nothing important happened.

### Week 2: Boredom

Pure boredom. Standing in line meant... standing in line. Waiting for coffee meant waiting.

But I started noticing things. Other people. Conversations. My own thoughts.

### Week 3-4: Flow

Something remarkable happened: deep work became possible again. I wrote 2,000 words in a single sitting. I read for 2 hours straight. I had ideas.

Real, connected thoughts—not a stream of disconnected social media fragments.

## What I Changed Permanently

**Deleted**: Instagram, Twitter, TikTok from my phone
**Kept**: WhatsApp (family communication), Podcasts, Kindle
**Added**: Physical journal, Morning walks without phone

## The Results

- **4 hours/day recovered**
- **Anxiety decreased** significantly
- **Deep work increased** from ~1 hour/day to ~4 hours
- **Better relationships**: I'm actually present

## Starting Your Own Experiment

Try a 7-day digital fast. You won't miss what you think you'll miss. And you'll discover what you've been missing by being constantly connected.
    `,
    coverImage: 'https://picsum.photos/800/400?random=6',
    category: 'Wellness',
    tags: ['Productivity', 'Mental Health', 'Digital Wellness', 'Minimalism'],
    author: authors[5],
    publishedAt: '2024-01-28',
    readingTime: 7,
    likes: 3892,
    comments: 224,
    views: 67800,
    featured: true,
    trending: true,
  },
  {
    id: '7',
    slug: 'css-grid-mastery',
    title: 'CSS Grid Mastery: Beyond the Basics',
    excerpt: 'Take your CSS Grid skills to the next level with advanced layout techniques, subgrid, and container queries.',
    content: `# CSS Grid Mastery: Beyond the Basics\n\nCSS Grid is the most powerful layout system available in CSS. Most developers know the basics, but the advanced features can transform how you build layouts.\n\n## Named Grid Areas\n\nOne of Grid's most readable features is named areas:\n\n\`\`\`css\n.layout {\n  display: grid;\n  grid-template-areas:\n    "header header header"\n    "sidebar main aside"\n    "footer footer footer";\n  grid-template-columns: 250px 1fr 200px;\n  grid-template-rows: auto 1fr auto;\n}\n\n.header { grid-area: header; }\n.sidebar { grid-area: sidebar; }\n.main { grid-area: main; }\n.aside { grid-area: aside; }\n.footer { grid-area: footer; }\n\`\`\`\n\n## Subgrid\n\nSubgrid allows nested grids to participate in the parent grid's tracks—solving the alignment problem that plagued CSS Grid for years.\n\n## Container Queries + Grid\n\nThe combination of container queries and grid enables truly responsive, context-aware layouts.`,
    coverImage: 'https://picsum.photos/800/400?random=7',
    category: 'Technology',
    tags: ['CSS', 'Web Dev', 'Frontend', 'Design'],
    author: authors[1],
    publishedAt: '2024-01-30',
    readingTime: 5,
    likes: 445,
    comments: 32,
    views: 7800,
    featured: false,
    trending: false,
  },
  {
    id: '8',
    slug: 'venture-capital-reality',
    title: 'The Real Truth About Venture Capital Nobody Tells You',
    excerpt: 'After raising $12M across three companies, here\'s the unfiltered reality of working with venture capitalists.',
    content: `# The Real Truth About Venture Capital Nobody Tells You\n\nI've raised venture capital three times. The first time, I was naive. The second, I was cautious. The third, I was strategic. Here's what I wish I'd known from the start.\n\n## VC Economics 101\n\nVenture firms raise money from Limited Partners (LPs)—pension funds, endowments, wealthy individuals. They typically aim for a **3x return** on the entire fund.\n\nWith most startups failing, they need their winners to return **10x, 50x, or even 100x** to make the math work. This fundamentally shapes their behavior.\n\n## What VCs Actually Want\n\nThey want outliers. Not good businesses—**exceptional** businesses that can return the fund. This means they're actively looking for companies that could become billion-dollar businesses.\n\nIf your startup is building a great $50M revenue business, that's fantastic—but most VCs won't be interested.\n\n## The Terms That Actually Matter\n\n**Liquidation Preferences**: Who gets paid first in an exit\n**Pro-rata Rights**: The right to invest in future rounds\n**Board Seats**: Decision-making power\n**Anti-dilution**: Protection against down rounds\n\nAlways hire a startup lawyer. Always.`,
    coverImage: 'https://picsum.photos/800/400?random=8',
    category: 'Business',
    tags: ['Startups', 'Venture Capital', 'Funding', 'Business'],
    author: authors[2],
    publishedAt: '2024-02-01',
    readingTime: 11,
    likes: 1876,
    comments: 143,
    views: 34200,
    featured: false,
    trending: false,
  },
  {
    id: '9',
    slug: 'typescript-advanced-patterns',
    title: 'Advanced TypeScript Patterns for Production Applications',
    excerpt: 'Explore conditional types, template literal types, and advanced generic patterns that will transform your TypeScript code.',
    content: `# Advanced TypeScript Patterns for Production Applications\n\nAfter years of writing TypeScript professionally, I've collected a set of patterns that consistently make code more type-safe and maintainable.\n\n## Discriminated Unions\n\nThe most underused TypeScript pattern:\n\n\`\`\`typescript\ntype Result<T> = \n  | { success: true; data: T }\n  | { success: false; error: string };\n\nfunction processResult<T>(result: Result<T>) {\n  if (result.success) {\n    console.log(result.data); // TypeScript knows data exists\n  } else {\n    console.log(result.error); // TypeScript knows error exists\n  }\n}\n\`\`\`\n\n## Template Literal Types\n\n\`\`\`typescript\ntype EventName = \`on\${Capitalize<string>}\`;\ntype CSSUnit = \`\${number}px\` | \`\${number}rem\` | \`\${number}%\`;\n\`\`\`\n\n## Conditional Types\n\n\`\`\`typescript\ntype IsArray<T> = T extends any[] ? true : false;\ntype UnwrapArray<T> = T extends Array<infer U> ? U : T;\n\`\`\``,
    coverImage: 'https://picsum.photos/800/400?random=9',
    category: 'Technology',
    tags: ['TypeScript', 'JavaScript', 'Web Dev', 'Programming'],
    author: authors[0],
    publishedAt: '2024-02-03',
    readingTime: 9,
    likes: 712,
    comments: 58,
    views: 13400,
    featured: false,
    trending: true,
  },
  {
    id: '10',
    slug: 'morning-routine-high-performers',
    title: 'The Science-Backed Morning Routine of High Performers',
    excerpt: 'Analyzing the morning habits of 500 high performers revealed surprising patterns. Here\'s what the science actually says.',
    content: `# The Science-Backed Morning Routine of High Performers\n\nI've been obsessed with morning routines for years. Not the 4am cold shower woo-woo stuff—but what the actual science says about optimizing your mornings.\n\n## The Research\n\nI analyzed the morning habits of 500 high-performing individuals (CEOs, athletes, artists, scientists) and cross-referenced with peer-reviewed research.\n\n## What Actually Works\n\n**1. Consistent Wake Time (High Evidence)**\nYour circadian rhythm thrives on consistency. Waking at the same time—even weekends—improves sleep quality and cognitive performance.\n\n**2. Morning Light (High Evidence)**\nSunlight within 30 minutes of waking sets your circadian clock, improves mood, and boosts afternoon alertness.\n\n**3. Delayed Caffeine (Medium Evidence)**\nWaiting 90 minutes before caffeine (when cortisol naturally peaks) makes it more effective and reduces the afternoon crash.\n\n**4. Exercise Timing (Context-Dependent)**\nMorning exercise improves sleep, but the "best" time depends on your chronotype.\n\n## What's Overrated\n\n**Cold Showers**: Mild evidence for alertness, no evidence for productivity\n**Journaling**: Helpful for some, not universal\n**Meditation**: Beneficial, but timing doesn't matter much\n\n## Building Your Routine\n\nStart with ONE change. Master it. Then add another. Most people fail because they try to overhaul everything at once.`,
    coverImage: 'https://picsum.photos/800/400?random=10',
    category: 'Wellness',
    tags: ['Productivity', 'Health', 'Science', 'Habits'],
    author: authors[5],
    publishedAt: '2024-02-05',
    readingTime: 8,
    likes: 2654,
    comments: 198,
    views: 52100,
    featured: false,
    trending: true,
  },
  {
    id: '11',
    slug: 'fine-tuning-llms-practical',
    title: 'Fine-Tuning LLMs: A Practical Guide for ML Engineers',
    excerpt: 'A hands-on guide to fine-tuning large language models using LoRA, QLoRA, and instruction tuning techniques.',
    content: `# Fine-Tuning LLMs: A Practical Guide for ML Engineers\n\nFine-tuning has become essential for teams that need specialized model behavior beyond what prompt engineering can achieve. Here's my practical guide.\n\n## When to Fine-Tune\n\nFine-tuning makes sense when:\n- You need consistent output format\n- The domain is highly specialized\n- Latency and cost require smaller models\n- Prompt engineering has hit its ceiling\n\n## LoRA: Parameter-Efficient Fine-Tuning\n\n\`\`\`python\nfrom peft import LoraConfig, get_peft_model\n\nconfig = LoraConfig(\n    r=16,           # Rank of the update matrices\n    lora_alpha=32,  # Scaling factor\n    target_modules=["q_proj", "v_proj"],\n    lora_dropout=0.1,\n    bias="none",\n    task_type="CAUSAL_LM"\n)\n\nmodel = get_peft_model(base_model, config)\nprint(f"Trainable params: {model.print_trainable_parameters()}")\n\`\`\`\n\n## Data Quality > Data Quantity\n\nThe most important lesson: 1,000 high-quality examples outperform 100,000 mediocre ones. Invest time in data curation.`,
    coverImage: 'https://picsum.photos/800/400?random=11',
    category: 'AI & ML',
    tags: ['LLMs', 'Machine Learning', 'Fine-Tuning', 'AI'],
    author: authors[3],
    publishedAt: '2024-02-07',
    readingTime: 14,
    likes: 1123,
    comments: 87,
    views: 22800,
    featured: false,
    trending: false,
  },
  {
    id: '12',
    slug: 'tax-optimization-freelancers',
    title: 'Tax Optimization Strategies for Freelancers and Solopreneurs',
    excerpt: 'Legal strategies to minimize your tax burden as a self-employed professional. What most freelancers don\'t know is costing them thousands.',
    content: `# Tax Optimization Strategies for Freelancers and Solopreneurs\n\nThe IRS estimates that self-employed individuals overpay by an average of $3,200 per year due to missed deductions. Let's fix that.\n\n## The Foundation: Business Structure\n\nMost freelancers operate as sole proprietors by default—and leave significant money on the table.\n\n**Sole Proprietor**: Simple, but you pay self-employment tax (15.3%) on all profits\n\n**S-Corporation**: Pay yourself a reasonable salary; remaining profits avoid self-employment tax\n\nExample: $120k freelance income as sole prop vs S-corp can save $8,000-12,000 annually.\n\n## Top Deductions You're Missing\n\n**Home Office**: Square footage percentage of rent/mortgage, utilities, internet\n**Vehicle**: Business mileage at $0.67/mile (2024 rate)\n**Equipment**: Full deduction via Section 179\n**Health Insurance**: 100% deductible for self-employed\n**Retirement Contributions**: Solo 401k allows up to $66,000 in contributions\n\n## Quarterly Estimated Taxes\n\nFreelancers must pay quarterly taxes or face penalties. Mark these dates:\n- Q1: April 15\n- Q2: June 15  \n- Q3: September 15\n- Q4: January 15\n\n**Rule of thumb**: Save 25-30% of every payment for taxes.`,
    coverImage: 'https://picsum.photos/800/400?random=12',
    category: 'Finance',
    tags: ['Taxes', 'Freelancing', 'Finance', 'Business'],
    author: authors[4],
    publishedAt: '2024-02-10',
    readingTime: 10,
    likes: 1987,
    comments: 156,
    views: 38900,
    featured: false,
    trending: false,
  },
];

export const mockComments: Comment[] = [
  {
    id: 'c1',
    blogId: '1',
    author: authors[1],
    content: 'This is one of the best explanations of RSC I\'ve read. The code examples make it crystal clear. Thanks for writing this!',
    publishedAt: '2024-01-16',
    likes: 34,
    replies: [
      {
        id: 'c1r1',
        blogId: '1',
        author: authors[0],
        content: 'Thank you! I spent a lot of time on those examples to make sure they were practical and easy to follow.',
        publishedAt: '2024-01-16',
        likes: 12,
      },
    ],
  },
  {
    id: 'c2',
    blogId: '1',
    author: authors[3],
    content: 'One thing I\'d add: the Suspense integration with RSC is also super powerful for showing loading states at a granular level. Great article overall!',
    publishedAt: '2024-01-17',
    likes: 28,
    replies: [],
  },
  {
    id: 'c3',
    blogId: '1',
    author: authors[2],
    content: 'We migrated our whole app to the App Router last quarter and this mental model was exactly what we needed. Our bundle size dropped 40%!',
    publishedAt: '2024-01-18',
    likes: 67,
    replies: [],
  },
];

export function getBlogBySlug(slug: string): Blog | undefined {
  return blogs.find((b) => b.slug === slug);
}

export function getBlogsByCategory(category: string): Blog[] {
  return blogs.filter((b) => b.category.toLowerCase() === category.toLowerCase());
}

export function getFeaturedBlogs(): Blog[] {
  return blogs.filter((b) => b.featured);
}

export function getTrendingBlogs(): Blog[] {
  return blogs.filter((b) => b.trending).slice(0, 6);
}

export function getRecentBlogs(limit = 6): Blog[] {
  return [...blogs].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()).slice(0, limit);
}

export function getRelatedBlogs(blog: Blog, limit = 3): Blog[] {
  return blogs
    .filter((b) => b.id !== blog.id && b.category === blog.category)
    .slice(0, limit);
}

export function getAuthorById(id: string): Author | undefined {
  return authors.find((a) => a.id === id);
}

export function getBlogsByAuthor(authorId: string): Blog[] {
  return blogs.filter((b) => b.author.id === authorId);
}

export function searchBlogs(query: string): Blog[] {
  const q = query.toLowerCase();
  return blogs.filter(
    (b) =>
      b.title.toLowerCase().includes(q) ||
      b.excerpt.toLowerCase().includes(q) ||
      b.tags.some((t) => t.toLowerCase().includes(q)) ||
      b.category.toLowerCase().includes(q)
  );
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function formatNumber(num: number): string {
  if (num === undefined || num === null) return '0';
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'k';
  }
  return num.toString();
}
