'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { PostType } from '@/lib/types/posts';

export default function WritesPage() {
  const [posts, setPosts] = useState<PostType[]>(() => {
    if (typeof window !== 'undefined') {
      const savedPosts = localStorage.getItem('writes');
      return savedPosts
        ? JSON.parse(savedPosts) as PostType[]
        : [];
    }
    return [];
  });

  const deletePost = (postId: string) => {
    const updatedPosts = posts.filter(post => post.id !== postId);
    setPosts(updatedPosts);
    if (typeof window !== 'undefined') {
      localStorage.setItem('writes', JSON.stringify(updatedPosts));
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="font-rubik text-4xl mb-4">Writes</h1>
        <Link
          href="/"
          className='
            underline decoration-dotted
            underline-offset-4 transition-colors
          '
        >
          ← back home
        </Link>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg mb-6">
            No writes yet. Ready to share your thoughts?
          </p>
          <Link
            href="/blog/new"
            className="btn-primary"
          >
            Write your first write
          </Link>
        </div>
      ) : (
        <div>
          <div className="flex justify-between items-center mb-8">
            <p className="">
              {posts.length} {posts.length === 1 ? 'write' : 'writes'}
            </p>
            <Link
              href="/blog/new"
              className="btn-primary link"
            >
              New Post
            </Link>
          </div>

          <div className="space-y-6">
            {posts.map((p) => (
              <article key={p.id} className="border rounded p-6">
                {p.image && (
                  <Image
                    src={p.image}
                    alt={p.title}
                    width={600}
                    height={200}
                    className="w-full h-48 object-cover rounded mb-4"
                  />
                )}
                <div className="flex justify-between items-start mb-2">
                  <h2 className="font-rubik text-2xl">{p.title}</h2>
                  <button
                    onClick={() => { deletePost(p.id); }}
                    className="text-sm transition-colors"
                    title="Delete post"
                  >
                    ×
                  </button>
                </div>
                <p className="mb-4">{p.excerpt}</p>
                <p className="text-sm">
                  {p.createdAt && formatDate(p.createdAt)}
                </p>
              </article>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
