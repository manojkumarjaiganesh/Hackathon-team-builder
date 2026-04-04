import { useState, useEffect } from 'react';
import API from '../api/axios';
import ProjectCard from '../components/ProjectCard';
import { Search } from 'lucide-react';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [search, setSearch]     = useState('');
  const [filter, setFilter]     = useState('all'); // 'all' | 'open'
  const [loading, setLoading]   = useState(true);

  useEffect(() => {
    API.get('/projects')
      .then(res => setProjects(res.data))
      .finally(() => setLoading(false));
  }, []);

  const filtered = projects.filter(p => {
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) ||
                        p.tags?.some(t => t.toLowerCase().includes(search.toLowerCase()));
    const matchFilter = filter === 'all' || p.status === 'open';
    return matchSearch && matchFilter;
  });

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">Find Your Team</h1>
          <p className="text-gray-400 mt-1">Browse hackathon projects looking for builders</p>
        </div>

        <div className="flex gap-3">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              className="bg-gray-800 border border-gray-700 rounded-lg pl-9 pr-4 py-2 text-sm focus:outline-none focus:border-cyan-500 w-60"
              placeholder="Search projects or tags..."
              value={search}
              onChange={e => setSearch(e.target.value)} />
          </div>
          <select
            className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cyan-500"
            value={filter}
            onChange={e => setFilter(e.target.value)}>
            <option value="all">All</option>
            <option value="open">Open only</option>
          </select>
        </div>
      </div>

      {loading ? (
        <p className="text-center text-gray-500 mt-20">Loading projects...</p>
      ) : filtered.length === 0 ? (
        <p className="text-center text-gray-500 mt-20">No projects found.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map(p => <ProjectCard key={p._id} project={p} />)}
        </div>
      )}
    </div>
  );
}