import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('staff');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      await API.post('/auth/register', { name, email, password, role });
      setSuccess('Registration successful! You can now log in.');
      setTimeout(() => navigate('/'), 1500);
    } catch (err) {
      const msg = err.response?.data?.errors?.[0]?.msg || 'Registration failed';
      setError(msg);
    }
  };

  return (
    <div className="outer-container">
      <form onSubmit={handleSubmit} className="bg-white p-10 rounded-xl shadow-lg w-full max-w-md space-y-6 border border-gray-200">
        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-2">Register</h2>
        <p className="text-center text-gray-500 mb-6">Create your account</p>
        {error && <div className="mb-4 text-red-600 text-center font-semibold">{error}</div>}
        {success && <div className="mb-4 text-green-600 text-center font-semibold">{success}</div>}
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none transition mb-3 shadow-sm"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none transition mb-3 shadow-sm"
          required
        />
        <input
          type="password"
          placeholder="Password (min 6 chars)"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none transition mb-3 shadow-sm"
          required
        />
        <select
          value={role}
          onChange={e => setRole(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none transition mb-3 shadow-sm"
        >
          <option value="staff">Staff</option>
          <option value="teacher">Teacher</option>
          <option value="student">Student</option>
          <option value="admin">Admin</option>
        </select>
        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg shadow transition-all text-lg tracking-wide"
        >
          Register
        </button>
        <div className="text-center mt-4">
          <span className="text-gray-600">Already have an account? </span>
          <a href="/" className="text-indigo-600 hover:underline font-semibold">Login here</a>
        </div>
      </form>
    </div>
  );
} 