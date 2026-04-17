import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import ProjectDetail from "./pages/ProjectDetail";
import CreateProject from "./pages/CreateProject";
import Projects from "./pages/Projects";
import HowItWorks from "./pages/HowItWorks";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreateHackathon from "./pages/CreateHackathon";
import EditHackathon from "./pages/EditHackathon";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Toaster position="top-right" />

      <main className="min-h-screen bg-gray-950 text-white pt-16">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/projects/:id" element={<ProjectDetail />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/projects" element={<Projects />} />

          {/* 👇 TEMP: move outside for testing */}
          <Route path="/how-it-works" element={<HowItWorks />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/profile/edit" element={<EditProfile />} />
            <Route path="/create-project" element={<CreateProject />} />
            <Route path="/create-hackathon" element={<CreateHackathon />} />
            <Route path="/edit-hackathon/:id" element={<EditHackathon />} />
          </Route>
        </Routes>
      </main>
    </BrowserRouter>
  );
}
