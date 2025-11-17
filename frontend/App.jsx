frontend/App.jsximport React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

function App() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    address: ''
  });

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/patients`);
      setPatients(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch patients');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddPatient = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/patients`, formData);
      setFormData({ name: '', email: '', phone: '', dateOfBirth: '', address: '' });
      fetchPatients();
    } catch (err) {
      setError('Failed to add patient');
      console.error(err);
    }
  };

  const handleDeletePatient = async (id) => {
    try {
      await axios.delete(`${API_URL}/patients/${id}`);
      fetchPatients();
    } catch (err) {
      setError('Failed to delete patient');
      console.error(err);
    }
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>Hospital Management System</h1>
        <p>Patient Management Portal</p>
      </header>

      <div className="container">
        <div className="form-section">
          <h2>Add New Patient</h2>
          <form onSubmit={handleAddPatient}>
            <input
              type="text"
              name="name"
              placeholder="Patient Name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
            />
            <input
              type="date"
              name="dateOfBirth"
              placeholder="Date of Birth"
              value={formData.dateOfBirth}
              onChange={handleInputChange}
              required
            />
            <textarea
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleInputChange}
              required
            />
            <button type="submit">Add Patient</button>
          </form>
        </div>

        <div className="patients-section">
          <h2>Registered Patients</h2>
          {error && <div className="error">{error}</div>}
          {loading ? (
            <div className="loading">Loading...</div>
          ) : patients.length > 0 ? (
            <table className="patients-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>DOB</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {patients.map(patient => (
                  <tr key={patient._id}>
                    <td>{patient.name}</td>
                    <td>{patient.email}</td>
                    <td>{patient.phone}</td>
                    <td>{new Date(patient.dateOfBirth).toLocaleDateString()}</td>
                    <td>
                      <button onClick={() => handleDeletePatient(patient._id)} className="delete-btn">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No patients registered yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
