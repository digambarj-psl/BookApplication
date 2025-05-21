import React, { useState } from 'react'; 
import axios from 'axios'; 
 
function CreateItemForm() { 
  const [name, setName] = useState(''); 
  const [description, setDescription] = useState(''); 
  const [message, setMessage] = useState(''); 
 
  const handleSubmit = async (e) => { 
    e.preventDefault(); 
    try { 
      console.log('Submitting form with data:', { name, description }); 
      const response = await axios.post('http://localhost:4000/api/items', { name, description }); 
      console.log('Item created successfully:', response.data); 
      setMessage(`Item created: ${response.data.name}`); 
      setName(''); 
      setDescription(''); 
    } catch (error) { 
      console.error('Error creating item:', error.response?.data?.message || error.message); 
      console.error('Error stack:', error.stack); 
      setMessage(error.response?.data?.message || 'Error creating item'); 
    } 
  }; 
 
  return ( 
    <div> 
      <h2>Create a New Item</h2> 
      <form onSubmit={handleSubmit}> 
        <div> 
          <label>Name:</label> 
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required /> 
        </div> 
        <div> 
          <label>Description:</label> 
          <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} required /> 
        </div> 
        <button type="submit">Create Item</button> 
      </form> 
      {message && <p>{message}</p>} 
    </div> 
  ); 
} 
 
export default CreateItemForm;