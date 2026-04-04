import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

import Home          from './pages/Home';
import Login         from './pages/Login';
import Register      from './pages/Register';
import Profile       from './pages/Profile';
import EditProfile   from './pages/EditProfile';
import Projects      from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import CreateProject from './pages/CreateProject';

export default function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <Navbar />
      <main className="min-h-screen bg-gray-950 text-white pt-16">
        <Routes>
          <Route path="/"                element={<Home />} />
          <Route path="/login"           element={<Login />} />
          <Route path="/register"        element={<Register />} />
          <Route path="/projects"        element={<Projects />} />
          <Route path="/projects/:id"    element={<ProjectDetail />} />
          <Route path="/profile/:id"     element={<Profile />} />

          {/* Protected Routes — require login */}
          <Route element={<ProtectedRoute />}>
            <Route path="/profile/edit"    element={<EditProfile />} />
            <Route path="/create-project"  element={<CreateProject />} />
          </Route>
        </Routes>
      </main>
    </BrowserRouter>
  );
}