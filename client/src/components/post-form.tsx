import usePost from '@/hooks/use-post';
import { ChangeEvent } from 'react';

export default function WriteForm() {
  const {
    tags,
    setTags,
    title,
    setTitle,
    handleSubmit,
    content,
    setContent
  } = usePost();
  return (
    <div>

      <form onSubmit={(e) => void handleSubmit(e)} className='form'>
        <label>
          <input
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            placeholder="Write your title here..."
            required
            className="form-input"
          />
        </label>
        <label>
          <textarea
            placeholder="Write your content here..."
            className="form-textarea"
            required
            name="content"
            rows={10}
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
            }}
          />
        </label>
        <label>
          <input
            value={tags.join(', ')}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setTags(e.target.value.split(',').map(t => t.trim()));
            }}
            placeholder="Tags (comma-separated)"
            className="form-input"
          />
        </label>
        <label>
          <button type="submit" className="form-button">
            Submit
          </button>
        </label>
      </form>
    </div>
  );
}
