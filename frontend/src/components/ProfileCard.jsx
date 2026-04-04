import { Link } from 'react-router-dom';
import SkillBadge from './SkillBadge';

export default function ProfileCard({ user }) {
  return (
    <Link to={`/profile/${user._id}`}
      className="bg-gray-900 border border-gray-800 rounded-xl p-5 hover:border-cyan-700 transition-all hover:-translate-y-1 block">
      
      <div className="flex items-center gap-3 mb-3">
        <div className="w-12 h-12 rounded-full bg-cyan-800 flex items-center justify-center text-xl font-bold text-white">
          {user.name[0]}
        </div>
        <div>
          <h3 className="font-semibold text-white">{user.name}</h3>
          <p className="text-sm text-gray-400">{user.role || 'Hackathon Builder'}</p>
        </div>
        {user.available && (
          <span className="ml-auto text-xs bg-green-900 text-green-400 border border-green-700 px-2 py-0.5 rounded-full">
            Available
          </span>
        )}
      </div>

      <p className="text-sm text-gray-400 mb-3 line-clamp-2">{user.bio || 'No bio yet.'}</p>

      <div className="flex flex-wrap gap-1.5">
        {user.skills?.slice(0, 4).map(skill => (
          <SkillBadge key={skill} skill={skill} />
        ))}
        {user.skills?.length > 4 && (
          <span className="text-xs text-gray-500">+{user.skills.length - 4} more</span>
        )}
      </div>
    </Link>
  );
}