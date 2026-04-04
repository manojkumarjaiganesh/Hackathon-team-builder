import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import API from '../api/axios';
import { useAuth } from '../context/AuthContext';
import SkillBadge from '../components/SkillBadge';
import ProjectCard from '../components/ProjectCard';
import { Edit } from 'lucide-react';

export default function Profile() {
  const { id } = useParams();
  const { user: currentUser } = useAuth();
  const [profile, setProfile]   = useState(null);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    API.get(`/users/${id}`).then(res => setProfile(res.data));
    API.get(`/projects?owner=${id}`).then(res => setProjects(res.data));
  }, [id]);

  if (!profile) return <p className="text-center mt-20 text-gray-500">Loading...</p>;

  const isOwner = currentUser?._id === id;

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 mb-8">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 rounded-full bg-cyan-800 flex items-center justify-center text-3xl font-bold text-white">
              {profile.name[0]}
            </div>
            <div>
              <h1 className="text-2xl font-bold">{profile.name}</h1>
              <p className="text-cyan-400 font-medium">{profile.role || 'Builder'}</p>
              {profile.available && (
                <span className="text-xs bg-green-900 text-green-400 border border-green-700 px-2 py-0.5 rounded-full mt-1 inline-block">
                  Open to teams
                </span>
              )}
            </div>
          </div>

          {isOwner && (
            <Link to="/profile/edit"
              className="flex items-center gap-1.5 text-sm bg-gray-800 hover:bg-gray-700 border border-gray-700 px-3 py-2 rounded-lg transition">
              <Edit size={15} /> Edit Profile
            </Link>
          )}
        </div>

        {profile.bio && <p className="text-gray-300 mt-5 text-sm leading-relaxed">{profile.bio}</p>}

        <div className="mt-5">
          <h3 className="text-sm text-gray-500 mb-2 uppercase tracking-wider">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {profile.skills?.map(s => <SkillBadge key={s} skill={s} />)}
          </div>
        </div>
      </div>

      {projects.length > 0 && (
        <div>
          <h2 className="text-xl font-bold mb-4">Projects by {profile.name.split(' ')[0]}</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {projects.map(p => <ProjectCard key={p._id} project={p} />)}
          </div>
        </div>
      )}
    </div>
  );
}