import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Table() {
    const navigate = useNavigate();
    const [items, setItems] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        async function fetchItems() {
            try {
                const response = await axios.get('/api/getEmployees');
                setItems(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchItems();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/api/deleteEmployee/${id}`);
            const newItems = items.filter((item) => item._id !== id);
            setItems(newItems);
        } catch (error) {
            console.error('Error deleting employee:', error);
        }
    };

    const handleUpdateClick = (id) => {
        navigate(`/updateItememp/${id}`);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredItems = searchTerm
        ? items.filter((item) =>
            item.licenseNumber.toLowerCase().includes(searchTerm.toLowerCase())
        )
        : items;

    return (
        <div>
            <input
                type="text"
                className="form-control mb-3"
                placeholder="Search by Employee ID..."
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

<table className='table table-hover' style={{ backgroundColor: '#f8f9fa', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', marginTop: '100px', width: '100%', padding: '1em', borderCollapse: 'collapse' }}>
    <thead>
        <tr style={{ backgroundColor: '#dfe6e9', color: '#2d3436', borderBottom: '2px solid #b2bec3' }}>
            <th scope='col' style={{ padding: '10px' }}>#</th>
            <th scope='col' style={{ padding: '10px' }}>Employee ID</th>
            <th scope='col' style={{ padding: '10px' }}>Name</th>
            <th scope='col' style={{ padding: '10px' }}>Phone No</th>
            <th scope='col' style={{ padding: '10px' }}>Department</th>
            <th scope='col' style={{ padding: '10px' }}>Availability Status</th>
            <th scope='col' style={{ padding: '10px' }}>Update</th>
            <th scope='col' style={{ padding: '10px' }}>Delete</th>
        </tr>
    </thead>
    <tbody>
        {filteredItems.map((item, index) => (
            <tr key={item._id} style={{ backgroundColor: index % 2 === 0 ? '#ecf0f1' : '#ffffff', borderBottom: '1px solid #b2bec3' }}>
                <td style={{ padding: '10px' }}>{index + 1}</td>
                <td style={{ padding: '10px' }}>{item.licenseNumber}</td>
                <td style={{ padding: '10px' }}>{item.fullName}</td>
                <td style={{ padding: '10px' }}>{item.phoneNo}</td>
                <td style={{ padding: '10px' }}>{item.department}</td>
                <td style={{ padding: '10px' }}>{item.availabilityStatus}</td>
                <td style={{ padding: '10px' }}>
                    <button
                        type='button'
                        className='btn btn-primary'
                        onClick={() => handleUpdateClick(item._id)}
                        style={{ borderRadius: '4px', padding: '0.5em 1em', fontSize: '0.9em' }}
                    >
                        Update
                    </button>
                </td>
                <td style={{ padding: '10px' }}>
                    <button
                        type='button'
                        className='btn btn-danger'
                        onClick={() => handleDelete(item._id)}
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
