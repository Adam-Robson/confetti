import type { PostFormData, PostApiResponse } from '@/lib/types/posts';

async function createPost(
  postData: PostFormData
): Promise<PostApiResponse> {
  try {
    const res = await fetch('/api/v1/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: postData.title,
        content: postData.content,
        excerpt: postData.excerpt,
        image: postData.image,
        tags: postData.tags
      })
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(
        `Error creating post: 
        ${String(res.status)} ${res.statusText}
        - ${errorText}
      `);
    }

    const result = (await res.json()) as PostApiResponse;
    return result;

  } catch (error) {
    console.error('Error in createPost:', error);
    throw error;
  }
}
export { createPost };
