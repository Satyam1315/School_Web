import { useEffect, useState } from 'react';

function TeachersList() {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5000/api/teacher', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error('Failed to fetch teachers');
      const data = await res.json();
      setTeachers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this teacher?')) return;
    try {
      const token = localStorage.getItem('token');
      await fetch(`http://localhost:5000/api/teacher/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTeachers(teachers.filter(t => t._id !== id));
    } catch (err) {
      alert('Failed to delete teacher');
    }
  };

  const handleEdit = (teacher) => {
    setEditId(teacher._id);
    setEditData({
      ...teacher,
      dob: teacher.dob ? teacher.dob.slice(0, 10) : ''
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({ ...prev, [name]: value }));
  };

  const handleEditSave = async () => {
    try {
      const token = localStorage.getItem('token');
      await fetch(`http://localhost:5000/api/teacher/${editId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editData),
      });
      setEditId(null);
      setEditData({});
      fetchTeachers();
    } catch (err) {
      alert('Failed to update teacher');
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
        <h2>Teachers List</h2>
        <div className="count">Total Teachers: {teachers.length}</div>
        <div className="overflow-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2 text-left">Name</th>
                <th className="border p-2 text-left">Subject</th>
                <th className="border p-2 text-left">Email</th>
                <th className="border p-2 text-left">Phone</th>
                <th className="border p-2 text-left">Address</th>
                <th className="border p-2 text-left">Gender</th>
                <th className="border p-2 text-left">DOB</th>
                <th className="border p-2 text-left">Qualification</th>
                <th className="border p-2 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {teachers.map((teacher) => (
                <tr key={teacher._id}>
                  {editId === teacher._id ? (
                    <>
                      <td className="border p-2"><input name="name" value={editData.name} onChange={handleEditChange} className="w-full p-1 border rounded" /></td>
                      <td className="border p-2"><input name="subject" value={editData.subject} onChange={handleEditChange} className="w-full p-1 border rounded" /></td>
                      <td className="border p-2"><input name="email" value={editData.email || ''} onChange={handleEditChange} className="w-full p-1 border rounded" /></td>
                      <td className="border p-2"><input name="phone" value={editData.phone || ''} onChange={handleEditChange} className="w-full p-1 border rounded" /></td>
                      <td className="border p-2"><input name="address" value={editData.address || ''} onChange={handleEditChange} className="w-full p-1 border rounded" /></td>
                      <td className="border p-2">
                        <select name="gender" value={editData.gender || ''} onChange={handleEditChange} className="w-full p-1 border rounded">
                          <option value="">Select Gender</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </select>
                      </td>
                      <td className="border p-2"><input name="dob" type="date" value={editData.dob || ''} onChange={handleEditChange} className="w-full p-1 border rounded" /></td>
                      <td className="border p-2"><input name="qualification" value={editData.qualification || ''} onChange={handleEditChange} className="w-full p-1 border rounded" /></td>
                      <td className="border p-2 flex gap-2">
                        <button onClick={handleEditSave} className="save-btn">Save</button>
                        <button onClick={handleEditCancel} className="cancel-btn">Cancel</button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="border p-2">{teacher.name}</td>
                      <td className="border p-2">{teacher.subject}</td>
                      <td className="border p-2">{teacher.email}</td>
                      <td className="border p-2">{teacher.phone}</td>
                      <td className="border p-2">{teacher.address}</td>
                      <td className="border p-2">{teacher.gender}</td>
                      <td className="border p-2">{teacher.dob ? new Date(teacher.dob).toLocaleDateString() : ''}</td>
                      <td className="border p-2">{teacher.qualification}</td>
                      <td className="border p-2 flex gap-2">
                        <button onClick={() => handleEdit(teacher)} className="edit-btn">Edit</button>
                        <button onClick={() => handleDelete(teacher._id)} className="delete-btn">Delete</button>
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

export default TeachersList; 