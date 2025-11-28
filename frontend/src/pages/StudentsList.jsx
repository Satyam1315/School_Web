import { useState, useEffect } from 'react'
import API from '../services/api'

function StudentsList() {
  const [students, setStudents] = useState([])
  const [editId, setEditId] = useState(null)
  const [editData, setEditData] = useState({})
  const [classes, setClasses] = useState([])

  useEffect(() => {
    fetchStudents();
    API.get('/class').then(res => setClasses(res.data))
  }, [])

  const fetchStudents = () => {
    API.get('/class').then(async res => {
      let all = []
      for (let c of res.data) {
        const res2 = await API.get(`/student/class/${c._id}`)
        all = [...all, ...res2.data]
      }
      setStudents(all)
    })
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this student?')) return;
    try {
      await API.delete(`/student/${id}`);
      setStudents(students.filter(s => s._id !== id));
    } catch (err) {
      alert('Failed to delete student');
    }
  }

  const handleEdit = (student) => {
    setEditId(student._id);
    setEditData({
      ...student,
      dob: student.dob ? student.dob.slice(0, 10) : '',
      classId: student.classId?._id || student.classId || ''
    });
  }

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({ ...prev, [name]: value }));
  }

  const handleEditSave = async () => {
    try {
      await API.put(`/student/${editId}`, editData);
      setEditId(null);
      setEditData({});
      fetchStudents();
    } catch (err) {
      alert('Failed to update student');
    }
  }

  const handleEditCancel = () => {
    setEditId(null);
    setEditData({});
  }

  return (
    <div className="outer-container">
      <div className="inner-container">
        <h2>Students List</h2>
        <div className="count">Total Students: {students.length}</div>
        <div className="overflow-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2 text-left">Name</th>
                <th className="border p-2 text-left">Roll No</th>
                <th className="border p-2 text-left">Class</th>
                <th className="border p-2 text-left">Email</th>
                <th className="border p-2 text-left">DOB</th>
                <th className="border p-2 text-left">Address</th>
                <th className="border p-2 text-left">Phone</th>
                <th className="border p-2 text-left">Gender</th>
                <th className="border p-2 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {students.map(s => (
                <tr key={s._id}>
                  {editId === s._id ? (
                    <>
                      <td className="border p-2"><input name="name" value={editData.name} onChange={handleEditChange} className="w-full p-1 border rounded" /></td>
                      <td className="border p-2"><input name="rollNo" value={editData.rollNo} onChange={handleEditChange} className="w-full p-1 border rounded" /></td>
                      <td className="border p-2">
                        <select name="classId" value={editData.classId} onChange={handleEditChange} className="w-full p-1 border rounded">
                          <option value="">Select Class</option>
                          {classes.map(cls => (
                            <option key={cls._id} value={cls._id}>{cls.name} {cls.section}</option>
                          ))}
                        </select>
                      </td>
                      <td className="border p-2"><input name="email" value={editData.email || ''} onChange={handleEditChange} className="w-full p-1 border rounded" /></td>
                      <td className="border p-2"><input name="dob" type="date" value={editData.dob || ''} onChange={handleEditChange} className="w-full p-1 border rounded" /></td>
                      <td className="border p-2"><input name="address" value={editData.address || ''} onChange={handleEditChange} className="w-full p-1 border rounded" /></td>
                      <td className="border p-2"><input name="phone" value={editData.phone || ''} onChange={handleEditChange} className="w-full p-1 border rounded" /></td>
                      <td className="border p-2">
                        <select name="gender" value={editData.gender || ''} onChange={handleEditChange} className="w-full p-1 border rounded">
                          <option value="">Select Gender</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </select>
                      </td>
                      <td className="border p-2 flex gap-2">
                        <button onClick={handleEditSave} className="save-btn">Save</button>
                        <button onClick={handleEditCancel} className="cancel-btn">Cancel</button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="border p-2">{s.name}</td>
                      <td className="border p-2">{s.rollNo}</td>
                      <td className="border p-2">{s.classId?.name} {s.classId?.section}</td>
                      <td className="border p-2">{s.email}</td>
                      <td className="border p-2">{s.dob ? new Date(s.dob).toLocaleDateString() : ''}</td>
                      <td className="border p-2">{s.address}</td>
                      <td className="border p-2">{s.phone}</td>
                      <td className="border p-2">{s.gender}</td>
                      <td className="border p-2 flex gap-2">
                        <button onClick={() => handleEdit(s)} className="edit-btn">Edit</button>
                        <button onClick={() => handleDelete(s._id)} className="delete-btn">Delete</button>
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
  )
}
export default StudentsList;