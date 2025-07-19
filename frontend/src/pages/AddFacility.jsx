import { useState } from 'react';
import API from '../services/api';

export default function AddFacility() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [capacity, setCapacity] = useState('');
  const [inCharge, setInCharge] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/facility/add', { name, description, location, capacity, inCharge });
      alert('Facility added!');
      setName('');
      setDescription('');
      setLocation('');
      setCapacity('');
      setInCharge('');
    } catch (err) {
      alert(err.response?.data?.message || 'Error adding facility');
    }
  };

  return (
    <div className="outer-container">
      <div className="form-card">
        <h2 className="form-title">Add Facility</h2>
        <form onSubmit={handleSubmit}>
          <label className="form-label">Name</label>
          <input
            placeholder="Name"
            value={name}
            onChange={e => setName(e.target.value)}
            className="form-input"
            required
          />
          <label className="form-label">Description</label>
          <textarea
            placeholder="Description"
            value={description}
            onChange={e => setDescription(e.target.value)}
            className="form-input"
            required
          />
          <label className="form-label">Location</label>
          <input
            placeholder="Location"
            value={location}
            onChange={e => setLocation(e.target.value)}
            className="form-input"
          />
          <label className="form-label">Capacity</label>
          <input
            type="number"
            placeholder="Capacity"
            value={capacity}
            onChange={e => setCapacity(e.target.value)}
            className="form-input"
          />
          <label className="form-label">In-Charge Person</label>
          <input
            placeholder="In-Charge Person"
            value={inCharge}
            onChange={e => setInCharge(e.target.value)}
            className="form-input"
          />
          <button type="submit" className="form-btn">
            Add Facility
          </button>
        </form>
      </div>
    </div>
  );
}
