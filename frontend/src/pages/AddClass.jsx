import { useState, useEffect } from 'react';
import API from '../services/api';

export default function AddClass() {
  const [name, setName] = useState('');
  const [section, setSection] = useState('');
  const [teacherId, setTeacherId] = useState('');
  const [roomNumber, setRoomNumber] = useState('');
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    API.get('/teacher').then(res => setTeachers(res.data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/class/add', { name, section, teacherId, roomNumber });
      alert('Class added!');
      setName('');
      setSection('');
      setTeacherId('');
      setRoomNumber('');
    } catch (err) {
      alert(err.response?.data?.message || 'Error adding class');
    }
  };

  return (
    <div className="outer-container">
      <div className="form-card">
        <h2 className="form-title">Add Class</h2>
        <form onSubmit={handleSubmit}>
          <label className="form-label">Name</label>
          <input
            placeholder="Name"
            value={name}
            onChange={e => setName(e.target.value)}
            className="form-input"
            required
          />
          <label className="form-label">Section</label>
          <input
            placeholder="Section"
            value={section}
            onChange={e => setSection(e.target.value)}
            className="form-input"
            required
          />
          <label className="form-label">Class Teacher</label>
          <select
            value={teacherId}
            onChange={e => setTeacherId(e.target.value)}
            className="form-input"
            required
            disabled={teachers.length === 0}
          >
            {teachers.length === 0 ? (
              <option value="">No teacher added</option>
            ) : (
              <>
                <option value="">Select Class Teacher</option>
                {teachers.map(teacher => (
                  <option key={teacher._id} value={teacher._id}>{teacher.name}</option>
                ))}
              </>
            )}
          </select>
          <label className="form-label">Room Number</label>
          <input
            placeholder="Room Number"
            value={roomNumber}
            onChange={e => setRoomNumber(e.target.value)}
            className="form-input"
          />
          <button type="submit" className="form-btn">
            Add Class
          </button>
        </form>
      </div>
    </div>
  );
}
