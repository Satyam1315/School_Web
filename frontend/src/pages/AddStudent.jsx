import { useState, useEffect } from 'react'
import API from '../services/api'

export default function AddStudent() {
  const [name, setName] = useState('')
  const [rollNo, setRollNo] = useState('')
  const [classId, setClassId] = useState('')
  const [email, setEmail] = useState('')
  const [dob, setDob] = useState('')
  const [address, setAddress] = useState('')
  const [phone, setPhone] = useState('')
  const [gender, setGender] = useState('')
  const [classes, setClasses] = useState([])

  useEffect(() => {
    API.get('/class').then(res => setClasses(res.data))
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await API.post('/student/add', {
        name, rollNo, classId, email, dob, address, phone, gender
      })
      alert('Student added!')
      setName('')
      setRollNo('')
      setClassId('')
      setEmail('')
      setDob('')
      setAddress('')
      setPhone('')
      setGender('')
    } catch (err) {
      alert(err.response?.data?.message || 'Error adding student')
    }
  }

  return (
    <div className="outer-container">
      <div className="form-card">
        <h2 className="form-title">Add Student</h2>
        <form onSubmit={handleSubmit}>
          <label className="form-label">Student Name</label>
          <input
            placeholder="Student Name"
            value={name}
            onChange={e => setName(e.target.value)}
            className="form-input"
            required
          />
          <label className="form-label">Roll No</label>
          <input
            placeholder="Roll No"
            value={rollNo}
            onChange={e => setRollNo(e.target.value)}
            className="form-input"
            required
          />
          <label className="form-label">Class</label>
          <select
            value={classId}
            onChange={e => setClassId(e.target.value)}
            className="form-input"
            required
          >
            <option value="">Select Class</option>
            {classes.map(cls => (
              <option key={cls._id} value={cls._id}>
                {cls.name} {cls.section}
              </option>
            ))}
          </select>
          <label className="form-label">Email</label>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="form-input"
          />
          <label className="form-label">Date of Birth</label>
          <input
            type="date"
            placeholder="Date of Birth"
            value={dob}
            onChange={e => setDob(e.target.value)}
            className="form-input"
          />
          <label className="form-label">Address</label>
          <input
            placeholder="Address"
            value={address}
            onChange={e => setAddress(e.target.value)}
            className="form-input"
          />
          <label className="form-label">Phone Number</label>
          <input
            placeholder="Phone Number"
            value={phone}
            onChange={e => setPhone(e.target.value)}
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
          <button type="submit" className="form-btn">
            Add Student
          </button>
        </form>
      </div>
    </div>
  )
}
