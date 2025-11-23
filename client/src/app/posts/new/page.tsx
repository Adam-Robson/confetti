'use client';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

import generateExcerpt from '@/lib/utils/generate-excerpt';
import { createPost } from '@/lib/utils/create-post';
import type { PostFormData } from '@/lib/types/posts';

export default function NewWritePage() {
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const convertImageToBase64 = async (file: File): Promise<string> => {
    const buffer = await file.arrayBuffer();
    const bytes = new Uint8Array(buffer);
    let binary = '';
    bytes.forEach((b) => (binary += String.fromCharCode(b)));
    return `data:${file.type};base64,${btoa(binary)}`;
  };

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSaving(true);

    try {
      let imageData: string | null = null;
      if (image) {
        try {
          imageData = await convertImageToBase64(image);
        } catch (err) {
          console.error('Error processing image:', err);
          setError('Failed to process image');
          setSaving(false);
          return;
        }
      }

      const postData: PostFormData = {
        title: title.trim(),
        content: content.trim(),
        excerpt: generateExcerpt(content),
        image: imageData,
        tags: [],
      };

      await createPost(postData);

      router.push('/posts');
    } catch (err) {
      console.error('Error saving write:', err);
      setError((err as Error).message || 'Failed to save');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <form
        className="flex items-center justify-between mb-8"
        onSubmit={(e) => void handleSave(e)}
      >
        <div>
          <h1 className="font-rubik text-4xl font-bold mb-2">New Post</h1>
          <p>Share your thoughts with the world</p>
        </div>
        <Link href="/posts" className="font-medium">
          ← Back to Blog
        </Link>
      </form>

      <div className="rounded p-6">
        {error && (
          <div role="alert" className="mb-4 text-red-600">
            {error}
          </div>
        )}

        <div className="mb-6">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            placeholder="Enter your post title..."
            className="w-full"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
            }}
            placeholder='
              Write your post
              content here...
              (Markdown supported)
            '
            rows={20}
            className="font-mono text-sm leading-relaxed w-full"
          />
          <p className="mt-2 text-sm">
            {`
              You can use Markdown 
              formatting (# for headers, 
              **bold**, *italic*, etc.)`}
          </p>
        </div>

        <div className="mb-6">
          <label htmlFor="image">Image</label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={(e) => {
              setImage(e.target.files?.[0] ?? null);
            }}
          />
        </div>

        <div className="flex justify-end space-x-4">
          <Link href="/write" className="btn">
            Cancel
          </Link>
          <button
            type="submit"
            disabled={saving || !title.trim() || !content.trim()}
            className="btn"
          >
            {saving ? 'Saving...' : 'Publish Post'}
          </button>
        </div>
      </div>
    </div>
  );
}
