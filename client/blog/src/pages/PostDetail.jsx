import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useApi from '../hooks/useApi';

export default function PostDetail() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const api = useApi();

  useEffect(() => {
    api.get(`/posts/${slug}`).then((res) => setPost(res.data));
  }, [slug]);

  if (!post) return <p>Loading...</p>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
      <p className="text-gray-700 dark:text-gray-300 mb-4">{post.content}</p>
      <p className="text-sm text-gray-500 dark:text-gray-400">Views: {post.viewCount}</p>
    </div>
  );
}

