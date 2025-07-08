import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useApi from '../hooks/useApi';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

export default function CreatePost() {
  const [form, setForm] = useState({ title: '', content: '', category: '', excerpt: '' });
  const api = useApi();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await api.post('/posts', form);
    navigate(`/posts/${res.data.slug}`);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto">
      <Input name="title" placeholder="Title" value={form.title} onChange={handleChange} required />
      <Textarea name="excerpt" placeholder="Excerpt" value={form.excerpt} onChange={handleChange} />
      <Textarea name="content" placeholder="Content" value={form.content} onChange={handleChange} required />
      <Input name="category" placeholder="Category ID" value={form.category} onChange={handleChange} required />
      <Button type="submit">Publish</Button>
    </form>
  );
}
