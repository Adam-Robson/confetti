import { useState, FormEvent } from 'react';
import { createPost } from '@/lib/utils/create-post';
import type { UsePostReturn, PostFormData } from '@/lib/types/posts';

export default function usePost(): UsePostReturn {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [tags, setTags] = useState<string[]>([]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const writeData: PostFormData = {
        title,
        content,
        excerpt,
        image,
        tags
      };

      const result = await createPost(writeData);

      console.info('Post created successfully:', result);
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return {
    title,
    setTitle,
    content,
    setContent,
    excerpt,
    setExcerpt,
    image,
    setImage,
    tags,
    setTags,
    handleSubmit
  };
}
