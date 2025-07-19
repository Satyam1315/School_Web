import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import API from '../services/api'

export default function LoginPage({ setToken }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [logoutMsg, setLogoutMsg] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      localStorage.removeItem('token');
      setToken(null);
      setLogoutMsg('You have been logged out. Please log in again.');
    }
  }, [setToken]);

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const res = await API.post('/auth/login', { email, password })
      if (res.data.user && res.data.user.role === 'staff') {
        localStorage.setItem('token', res.data.token)
        setToken(res.data.token)
        navigate('/dashboard', { replace: true })
      } else {
        alert('Only staff members can log in.')
      }
    } catch (err) {
      alert('Login failed')
    }
  }

  return (
    <div className="outer-container">
      <form onSubmit={handleLogin} className="bg-white p-10 rounded-xl shadow-lg w-full max-w-md space-y-6 border border-gray-200">
        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-2">Staff Login</h2>
        <p className="text-center text-gray-500 mb-6">Enter your credentials to continue</p>
        {logoutMsg && <div className="mb-4 text-green-600 text-center font-semibold">{logoutMsg}</div>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none transition mb-3 shadow-sm"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none transition mb-6 shadow-sm"
          required
        />
        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg shadow transition-all text-lg tracking-wide"
        >
          Login
        </button>
        <div className="text-center mt-4">
          <span className="text-gray-600">New user? </span>
          <a href="/register" className="text-indigo-600 hover:underline font-semibold">Register here</a>
        </div>
      </form>
    </div>
  )
}
