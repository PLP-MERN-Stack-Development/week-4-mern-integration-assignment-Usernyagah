import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useApi from '../hooks/useApi';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

export default function CreatePost() {
  const [form, setForm] = useState({ title: '', content: '', category: '', excerpt: '' });
  const [error, setError] = useState(null);
  const api = useApi();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const slugify = (str) =>
    str.toLowerCase().replace(/[^\w ]+/g, '').replace(/ +/g, '-');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const slug = slugify(form.title);
    const postData = {
      ...form,
      slug,
      author: '64f7e859acb45ab8a2e4dba0', // Replace with real user ID from your DB
    };

    try {
      const res = await api.post('/posts', postData);
      navigate(`/posts/${res.data.slug}`);
    } catch (err) {
      console.error('Error creating post:', err.response?.data || err.message);
      setError(err.response?.data?.error || 'Something went wrong');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto">
      {error && <p className="text-red-500">{error}</p>}
      <Input
        name="title"
        placeholder="Title"
        value={form.title}
        onChange={handleChange}
        required
      />
      <Textarea
        name="excerpt"
        placeholder="Excerpt"
        value={form.excerpt}
        onChange={handleChange}
      />
      <Textarea
        name="content"
        placeholder="Content"
        value={form.content}
        onChange={handleChange}
        required
      />
      <Input
        name="category"
        placeholder="Category ID"
        value={form.category}
        onChange={handleChange}
        required
      />
      <Button type="submit">Publish</Button>
    </form>
  );
}

