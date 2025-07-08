import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';


export default function Navbar() {
  return (
    <nav className="bg-white dark:bg-gray-900 shadow px-6 py-4 mb-6 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold text-black dark:text-white">MERN Blog</Link>
      <div className="space-x-2 flex items-center">
        <Button asChild><Link to="/">Home</Link></Button>
        <Button asChild><Link to="/create">Create Post</Link></Button>
      </div>
    </nav>
  );
}
