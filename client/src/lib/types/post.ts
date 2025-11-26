import { FormEvent } from 'react';

export interface PostType {
  id: string;
  title: string;
  content: string;
  excerpt?: string;
  image?: string | null;
  tags?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface PostFormData {
  title: string;
  content: string;
  excerpt?: string;
  image?: string | null;
  tags?: string[];
}

export interface UsePostReturn {
  title: string;
  setTitle: (title: string) => void;
  content: string;
  setContent: (content: string) => void;
  excerpt: string;
  setExcerpt: (excerpt: string) => void;
  image: string | null;
  setImage: (image: string | null) => void;
  tags: string[];
  setTags: (tags: string[]) => void;
  handleSubmit: (e: FormEvent) => Promise<void>;
}
