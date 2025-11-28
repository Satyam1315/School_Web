import { useEffect, useState } from 'react';

function ClassesList() {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5000/api/class', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error('Failed to fetch classes');
      const data = await res.json();
      setClasses(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this class?')) return;
    try {
      const token = localStorage.getItem('token');
      await fetch(`http://localhost:5000/api/class/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setClasses(classes.filter(c => c._id !== id));
    } catch (err) {
      alert('Failed to delete class');
    }
  };

  const handleEdit = (cls) => {
    setEditId(cls._id);
    setEditData({
      ...cls,
      teacherId: cls.teacherId?._id || cls.teacherId || ''
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({ ...prev, [name]: value }));
  };

  const handleEditSave = async () => {
    try {
      const token = localStorage.getItem('token');
      await fetch(`http://localhost:5000/api/class/${editId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editData),
      });
      setEditId(null);
      setEditData({});
      fetchClasses();
    } catch (err) {
      alert('Failed to update class');
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
        <h2>Classes List</h2>
        <div className="count">Total Classes: {classes.length}</div>
        <div className="overflow-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2 text-left">Name</th>
                <th className="border p-2 text-left">Section</th>
                <th className="border p-2 text-left">Class Teacher</th>
                <th className="border p-2 text-left">Room Number</th>
                <th className="border p-2 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {classes.map((cls) => (
                <tr key={cls._id}>
                  {editId === cls._id ? (
                    <>
                      <td className="border p-2"><input name="name" value={editData.name} onChange={handleEditChange} className="w-full p-1 border rounded" /></td>
                      <td className="border p-2"><input name="section" value={editData.section} onChange={handleEditChange} className="w-full p-1 border rounded" /></td>
                      <td className="border p-2"><input name="teacherId" value={editData.teacherId || ''} onChange={handleEditChange} className="w-full p-1 border rounded" /></td>
                      <td className="border p-2"><input name="roomNumber" value={editData.roomNumber || ''} onChange={handleEditChange} className="w-full p-1 border rounded" /></td>
                      <td className="border p-2 flex gap-2">
                        <button onClick={handleEditSave} className="save-btn">Save</button>
                        <button onClick={handleEditCancel} className="cancel-btn">Cancel</button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="border p-2">{cls.name}</td>
                      <td className="border p-2">{cls.section}</td>
                      <td className="border p-2">{cls.teacherId?.name || ''}</td>
                      <td className="border p-2">{cls.roomNumber}</td>
                      <td className="border p-2 flex gap-2">
                        <button onClick={() => handleEdit(cls)} className="edit-btn">Edit</button>
                        <button onClick={() => handleDelete(cls._id)} className="delete-btn">Delete</button>
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

export default ClassesList; 