'use client';

import { JSX, useState, useEffect } from 'react';
import { getClient } from '@/lib/utils/api-client';
import Link from 'next/link';
import Image from 'next/image';
import type { PostType } from '@/lib/types/post';

export default function PostsPage(): JSX.Element {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const res = await getClient<{
          success: boolean;
          data: PostType[];
          error?: string;
        }>('/posts');
        if (res.success) {
          setPosts(res.data);
        } else {
          setError(res.error ?? 'Failed to fetch posts');
        }
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    void fetchPosts();
  }, []);

  const deletePost = (postId: string) => {
    setPosts(posts.filter(post => post.id !== postId));
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
        <h1 className="font-rubik text-4xl mb-4">Posts</h1>
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

      {loading ? (
        <div className="text-center py-12">Loading posts…</div>
      ) : error ? (
        <div className="text-center py-12 text-red-500">{error}</div>
      ) : posts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg mb-6">
            No posts yet. Ready to share your thoughts?
          </p>
          <Link
            href="/blog/new"
            className="btn-primary"
          >
            Write your first post
          </Link>
        </div>
      ) : (
        <div>
          <div className="flex justify-between items-center mb-8">
            <p className="">
              {posts.length} {posts.length === 1 ? 'post' : 'posts'}
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
