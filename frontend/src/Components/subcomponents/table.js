import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Table() {
  const navigate = useNavigate();
  const [drivers, setDrivers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    async function fetchDrivers() {
      try {
        const response = await axios.get('/api/getFormData');
        setDrivers(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchDrivers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/deleteFormData/${id}`);
      const newDrivers = drivers.filter((driver) => driver._id !== id);
      setDrivers(newDrivers);
    } catch (error) {
      console.error('Error deleting data:', error.response || error);
    }
  };

  const handleUpdateClick = (id) => {
    navigate(`/updateDriver/${id}`);
  };

  function renderRating(rating) {
    const fullStar = '★';
    const emptyStar = '☆';
    let stars = '';
    for (let i = 0; i < Math.floor(rating); i++) {
      stars += fullStar;
    }
    if (rating % 1 !== 0) stars += '½';
    while (stars.length < 5) {
      stars += emptyStar;
    }
    return stars;
  }

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredDrivers = searchTerm
    ? drivers.filter((driver) =>
        driver.licenseNumber.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : drivers;

  return (
    <div>
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search by Item No..."
        value={searchTerm}
        onChange={handleSearchChange}
        style={{
          width: '100%',
        
          marginBottom: '20px',
          padding: '10px 15px',
          border: '1px solid #ced4da',
          borderRadius: '25px', // Gives rounded corners
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)', // Adds a subtle shadow
          transition: 'all 0.2s ease-in-out', // Smooth transition for focus effect
        }}
      />

<table className='table table-hover' style={{ backgroundColor: '#b2bec3', marginTop: '100px', width: '100%', padding: '1em', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', borderCollapse: 'collapse' }}>
    <thead>
        <tr style={{ backgroundColor: '#636e72', color: '#ffffff', borderBottom: '2px solid #1A1717' }}>
            <th scope='col' style={{ padding: '10px', textAlign: 'center' }}>#</th>
            <th scope='col' style={{ padding: '10px', textAlign: 'center' }}>Item No</th>
            <th scope='col' style={{ padding: '10px', textAlign: 'center' }}>Name</th>
            <th scope='col' style={{ padding: '10px', textAlign: 'center' }}>Price</th>
            <th scope='col' style={{ padding: '10px', textAlign: 'center' }}>Quantity</th>
            <th scope='col' style={{ padding: '10px', textAlign: 'center' }}>Availability Status</th>
            <th scope='col' style={{ padding: '10px', textAlign: 'center' }}>Rating</th>
            <th scope='col' style={{ padding: '10px', textAlign: 'center' }}>Update</th>
            <th scope='col' style={{ padding: '10px', textAlign: 'center' }}>Delete</th>
        </tr>
    </thead>
    <tbody>
        {filteredDrivers.map((driver, index) => (
            <tr key={driver._id} style={{ borderBottom: '1px solid #1A1717' }}>
                <th scope='row' style={{ padding: '10px', textAlign: 'center' }}>{index + 1}</th>
                <td style={{ padding: '10px', textAlign: 'center' }}>{driver.licenseNumber}</td>
                <td style={{ padding: '10px', textAlign: 'center' }}>{driver.fullName}</td>
                <td style={{ padding: '10px', textAlign: 'center' }}>{driver.price}</td>
                <td style={{ padding: '10px', textAlign: 'center' }}>{driver.quantity}</td>
                <td style={{ padding: '10px', textAlign: 'center' }}>{driver.availabilityStatus}</td>
                <td style={{ padding: '10px', textAlign: 'center' }}>{renderRating(driver.rating)}</td>
                <td style={{ padding: '10px', textAlign: 'center' }}>
                    <button
                        type='button'
                        className='btn btn-primary'
                        onClick={() => handleUpdateClick(driver._id)}
                        style={{ borderRadius: '4px', padding: '0.5em 1em', fontSize: '0.9em' }}
                    >
                        Update
                    </button>
                </td>
                <td style={{ padding: '10px', textAlign: 'center' }}>
                    <button
                        type='button'
                        className='btn btn-danger'
                        onClick={() => handleDelete(driver._id)}
                        style={{ borderRadius: '4px', padding: '0.5em 1em', fontSize: '0.9em' }}
                    >
                        Delete
                    </button>
                </td>
            </tr>
        ))}
    </tbody>
</table>


    </div>
  );
}
