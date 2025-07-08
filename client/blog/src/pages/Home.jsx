import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useApi from '../hooks/useApi';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const api = useApi();

  useEffect(() => {
    api.get('/posts').then((res) => setPosts(res.data));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Latest Posts</h1>
      {posts.map((post) => (
        <div key={post._id} className="mb-4 p-4 border dark:border-gray-700 rounded-lg">
          <Link to={`/posts/${post.slug}`} className="text-xl font-semibold hover:underline">
            {post.title}
          </Link>
          <p className="text-gray-600 dark:text-gray-300">{post.excerpt}</p>
        </div>
      ))}
    </div>
  );
}
