import { useState } from 'react';
import API from '../services/api';

export default function AddTeacher() {
  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [gender, setGender] = useState('');
  const [dob, setDob] = useState('');
  const [qualification, setQualification] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/teacher/add', {
        name, subject, email, phone, address, gender, dob, qualification
      });
      alert('Teacher added!');
      setName('');
      setSubject('');
      setEmail('');
      setPhone('');
      setAddress('');
      setGender('');
      setDob('');
      setQualification('');
    } catch (err) {
      alert(err.response?.data?.message || 'Error adding teacher');
    }
  };

  return (
    <div className="outer-container">
      <div className="form-card">
        <h2 className="form-title">Add Teacher</h2>
        <form onSubmit={handleSubmit}>
          <label className="form-label">Name</label>
          <input
            placeholder="Name"
            value={name}
            onChange={e => setName(e.target.value)}
            className="form-input"
            required
          />
          <label className="form-label">Subject</label>
          <input
            placeholder="Subject"
            value={subject}
            onChange={e => setSubject(e.target.value)}
            className="form-input"
            required
          />
          <label className="form-label">Email</label>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="form-input"
          />
          <label className="form-label">Phone Number</label>
          <input
            placeholder="Phone Number"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            className="form-input"
          />
          <label className="form-label">Address</label>
          <input
            placeholder="Address"
            value={address}
            onChange={e => setAddress(e.target.value)}
            className="form-input"
          />
          <label className="form-label">Gender</label>
          <select
            value={gender}
            onChange={e => setGender(e.target.value)}
            className="form-input"
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <label className="form-label">Date of Birth</label>
          <input
            type="date"
            placeholder="Date of Birth"
            value={dob}
            onChange={e => setDob(e.target.value)}
            className="form-input"
          />
          <label className="form-label">Qualification</label>
          <input
            placeholder="Qualification"
            value={qualification}
            onChange={e => setQualification(e.target.value)}
            className="form-input"
          />
          <button type="submit" className="form-btn">
            Add Teacher
          </button>
        </form>
      </div>
    </div>
  );
}
