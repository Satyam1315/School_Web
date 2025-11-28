import { useEffect, useState } from 'react';

function FacilitiesList() {
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    fetchFacilities();
  }, []);

  const fetchFacilities = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5000/api/facility', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error('Failed to fetch facilities');
      const data = await res.json();
      setFacilities(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this facility?')) return;
    try {
      const token = localStorage.getItem('token');
      await fetch(`http://localhost:5000/api/facility/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setFacilities(facilities.filter(f => f._id !== id));
    } catch (err) {
      alert('Failed to delete facility');
    }
  };

  const handleEdit = (facility) => {
    setEditId(facility._id);
    setEditData({ ...facility });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({ ...prev, [name]: value }));
  };

  const handleEditSave = async () => {
    try {
      const token = localStorage.getItem('token');
      await fetch(`http://localhost:5000/api/facility/${editId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editData),
      });
      setEditId(null);
      setEditData({});
      fetchFacilities();
    } catch (err) {
      alert('Failed to update facility');
    }
  };

  const handleEditCancel = () => {
    setEditId(null);
    setEditData({});
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="outer-container">
      <div className="inner-container">
        <h2>Facilities List</h2>
        <div className="count">Total Facilities: {facilities.length}</div>
        <div className="overflow-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2 text-left">Name</th>
                <th className="border p-2 text-left">Description</th>
                <th className="border p-2 text-left">Location</th>
                <th className="border p-2 text-left">Capacity</th>
                <th className="border p-2 text-left">In-Charge</th>
                <th className="border p-2 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {facilities.map((facility) => (
                <tr key={facility._id}>
                  {editId === facility._id ? (
                    <>
                      <td className="border p-2"><input name="name" value={editData.name} onChange={handleEditChange} className="w-full p-1 border rounded" /></td>
                      <td className="border p-2"><input name="description" value={editData.description || ''} onChange={handleEditChange} className="w-full p-1 border rounded" /></td>
                      <td className="border p-2"><input name="location" value={editData.location || ''} onChange={handleEditChange} className="w-full p-1 border rounded" /></td>
                      <td className="border p-2"><input name="capacity" value={editData.capacity || ''} onChange={handleEditChange} className="w-full p-1 border rounded" /></td>
                      <td className="border p-2"><input name="inCharge" value={editData.inCharge || ''} onChange={handleEditChange} className="w-full p-1 border rounded" /></td>
                      <td className="border p-2 flex gap-2">
                        <button onClick={handleEditSave} className="save-btn">Save</button>
                        <button onClick={handleEditCancel} className="cancel-btn">Cancel</button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="border p-2">{facility.name}</td>
                      <td className="border p-2">{facility.description}</td>
                      <td className="border p-2">{facility.location}</td>
                      <td className="border p-2">{facility.capacity}</td>
                      <td className="border p-2">{facility.inCharge}</td>
                      <td className="border p-2 flex gap-2">
                        <button onClick={() => handleEdit(facility)} className="edit-btn">Edit</button>
                        <button onClick={() => handleDelete(facility._id)} className="delete-btn">Delete</button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default FacilitiesList; 