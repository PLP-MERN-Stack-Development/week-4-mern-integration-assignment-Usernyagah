import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useApi from '../hooks/useApi';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

export default function EditPost() {
  const { id } = useParams();
  const [form, setForm] = useState({ title: '', content: '', excerpt: '', category: '' });
  const api = useApi();
  const navigate = useNavigate();

  useEffect(() => {
    api.get(`/posts/${id}`).then((res) => setForm(res.data));
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.put(`/posts/${id}`, form);
    navigate(`/posts/${form.slug}`);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto">
      <Input name="title" value={form.title} onChange={handleChange} />
      <Textarea name="excerpt" value={form.excerpt} onChange={handleChange} />
      <Textarea name="content" value={form.content} onChange={handleChange} />
      <Input name="category" value={form.category} onChange={handleChange} />
      <Button type="submit">Update Post</Button>
    </form>
  );
}
