import React, { useState } from 'react'; 
import axios from 'axios'; 
 
function UpdateItemForm({ item, onUpdateSuccess }) { 
  const [name, setName] = useState(item.name); 
  const [description, setDescription] = useState(item.description); 
  const [message, setMessage] = useState(''); 
 
  const handleSubmit = async (e) => { 
    e.preventDefault(); 
    try { 
      console.log('Submitting update form with data:', { name, description }); 
      const response = await axios.put(`http://localhost:4000/api/items/${item._id}`, { name, description }); 
      console.log('Item updated successfully:', response.data); 
      setMessage(`Item updated: ${response.data.name}`); 
      onUpdateSuccess(response.data); 
    } catch (error) { 
      console.error('Error updating item:', error.response?.data?.message || error.message); 
      console.error('Error stack:', error.stack); 
      setMessage(error.response?.data?.message || 'Error updating item'); 
    } 
  }; 
 
  return ( 
    <div> 
      <h2>Update Item</h2> 
      <form onSubmit={handleSubmit}> 
        <div> 
          <label>Name:</label> 
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required /> 
        </div> 
        <div> 
          <label>Description:</label> 
          <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} required /> 
        </div> 
        <button type="submit">Update Item</button> 
      </form> 
      {message && <p>{message}</p>} 
    </div> 
  ); 
} 
 
export default UpdateItemForm;