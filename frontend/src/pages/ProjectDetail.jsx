import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";

export default function ProjectDetail() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get(`/projects/${id}`)
      .then((res) => setProject(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <div className="text-center mt-20 text-gray-400">Loading...</div>;
  }

  if (!project) {
    return (
      <div className="text-center mt-20 text-red-400">Project not found</div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white px-6 py-10">
      <div className="max-w-3xl mx-auto bg-gray-900 p-6 rounded-xl border border-gray-800">
        <h1 className="text-2xl font-bold text-cyan-400 mb-2">
          {project.title}
        </h1>

        <p className="text-gray-400 mb-4">{project.description}</p>

        {/* Tech Stack */}
        <div className="mb-4">
          <h3 className="text-sm text-gray-500 mb-1">Tech Stack</h3>
          <div className="flex flex-wrap gap-2">
            {project.techStack?.map((tech, i) => (
              <span key={i} className="bg-gray-800 px-2 py-1 rounded text-sm">
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Owner */}
        <div className="text-sm text-gray-400">
          Created by: <span className="text-white">{project.owner?.name}</span>
        </div>
      </div>
    </div>
  );
}
