import { Link } from 'react-router-dom';
import { Users } from 'lucide-react';
import SkillBadge from './SkillBadge';

export default function ProjectCard({ project }) {
  const statusColor = {
    open:   'text-green-400 bg-green-900 border-green-700',
    full:   'text-yellow-400 bg-yellow-900 border-yellow-700',
    closed: 'text-gray-400  bg-gray-800   border-gray-600',
  };

  return (
    <Link to={`/projects/${project._id}`}
      className="bg-gray-900 border border-gray-800 rounded-xl p-5 hover:border-cyan-700 transition-all hover:-translate-y-1 block">
      
      <div className="flex items-start justify-between mb-2">
        <h3 className="font-semibold text-white text-lg">{project.title}</h3>
        <span className={`text-xs border px-2 py-0.5 rounded-full ml-2 shrink-0 ${statusColor[project.status]}`}>
          {project.status}
        </span>
      </div>

      <p className="text-sm text-gray-400 mb-4 line-clamp-2">{project.description}</p>

      <div className="flex flex-wrap gap-1.5 mb-3">
        {project.tags?.map(tag => <SkillBadge key={tag} skill={tag} />)}
      </div>

      <div className="flex items-center gap-1.5 text-xs text-gray-500">
        <Users size={13} />
        <span>Looking for: {project.rolesNeeded?.join(', ')}</span>
      </div>
    </Link>
  );
}