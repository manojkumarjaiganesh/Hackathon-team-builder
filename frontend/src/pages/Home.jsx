import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center px-6 text-center">
      {/* Title */}
      <h1 className="text-4xl md:text-5xl font-bold text-cyan-400 mb-4">
        Build Projects. Find Teammates.
      </h1>

      {/* Subtitle */}
      <p className="text-gray-400 max-w-xl mb-6">
        HackTeam helps developers connect, collaborate, and build amazing
        projects together.
      </p>

      {/* Buttons */}
      <div className="flex gap-4">
        <Link
          to="/projects"
          className="bg-cyan-500 hover:bg-cyan-400 text-black px-5 py-2 rounded-lg font-semibold"
        >
          Explore Projects
        </Link>

        {!user && (
          <Link
            to="/register"
            className="border border-gray-700 hover:border-white px-5 py-2 rounded-lg"
          >
            Get Started
          </Link>
        )}
      </div>
    </div>
  );
}
