import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import AddStudent from './pages/AddStudent';
import AddTeacher from './pages/AddTeacher';
import AddClass from './pages/AddClass';
import AddFacility from './pages/AddFacility';
import StudentsList from './pages/StudentsList';
import TeachersList from './pages/TeachersList';
import ClassesList from './pages/ClassesList';
import FacilitiesList from './pages/FacilitiesList';
import Navbar from './components/Navbar';
import RegisterPage from './pages/RegisterPage';

function App() {
  const [token, setToken] = useState(() => localStorage.getItem('token'));

  return (
    <>
      <Navbar token={token} setToken={setToken} />
      <Routes>
        <Route path="/" element={<LoginPage setToken={setToken} />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={token ? <Dashboard /> : <Navigate to="/" />} />
        <Route path="/students/add" element={token ? <AddStudent /> : <Navigate to="/" />} />
        <Route path="/students/list" element={token ? <StudentsList /> : <Navigate to="/" />} />
        <Route path="/teachers/add" element={token ? <AddTeacher /> : <Navigate to="/" />} />
        <Route path="/teachers/list" element={token ? <TeachersList /> : <Navigate to="/" />} />
        <Route path="/classes/add" element={token ? <AddClass /> : <Navigate to="/" />} />
        <Route path="/classes/list" element={token ? <ClassesList /> : <Navigate to="/" />} />
        <Route path="/facilities/add" element={token ? <AddFacility /> : <Navigate to="/" />} />
        <Route path="/facilities/list" element={token ? <FacilitiesList /> : <Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
