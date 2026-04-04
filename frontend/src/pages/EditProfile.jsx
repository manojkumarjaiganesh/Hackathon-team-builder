import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function EditProfile() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    bio: "",
    skills: "",
    github: "",
  });

  const [saving, setSaving] = useState(false);

  // Load user data
  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || "",
        bio: user.bio || "",
        skills: user.skills?.join(", ") || "",
        github: user.github || "",
      });
    }
  }, [user]);

  if (loading) {
    return <div className="text-center mt-20 text-gray-400">Loading...</div>;
  }

  if (!user) {
    navigate("/login");
    return null;
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const updatedData = {
        ...form,
        skills: form.skills.split(",").map((s) => s.trim()),
      };

      await API.put("/users/profile", updatedData);

      navigate(`/profile/${user._id}`);
    } catch (err) {
      console.error(err);
      alert("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white flex justify-center items-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-gray-900 p-6 rounded-xl border border-gray-800 space-y-4"
      >
        <h2 className="text-xl font-bold text-cyan-400">Edit Profile</h2>

        {/* Name */}
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          className="w-full p-2 rounded bg-gray-800 border border-gray-700"
        />

        {/* Bio */}
        <textarea
          name="bio"
          placeholder="Bio"
          value={form.bio}
          onChange={handleChange}
          className="w-full p-2 rounded bg-gray-800 border border-gray-700"
        />

        {/* Skills */}
        <input
          type="text"
          name="skills"
          placeholder="Skills (comma separated)"
          value={form.skills}
          onChange={handleChange}
          className="w-full p-2 rounded bg-gray-800 border border-gray-700"
        />

        {/* GitHub */}
        <input
          type="text"
          name="github"
          placeholder="GitHub URL"
          value={form.github}
          onChange={handleChange}
          className="w-full p-2 rounded bg-gray-800 border border-gray-700"
        />

        {/* Button */}
        <button
          type="submit"
          disabled={saving}
          className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-semibold py-2 rounded"
        >
          {saving ? "Saving..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
}
