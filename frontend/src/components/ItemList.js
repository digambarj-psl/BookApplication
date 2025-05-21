import React, { useEffect, useState } from 'react'; 
import axios from 'axios'; 
import UpdateItemForm from './UpdateItemForm'; 
 
function ItemList() { 
  const [items, setItems] = useState([]); 
  const [search, setSearch] = useState(''); 
  const [page, setPage] = useState(1); 
  const [totalPages, setTotalPages] = useState(1); 
  const [editingItem, setEditingItem] = useState(null); 
 
  useEffect(() => { 
    const fetchItems = async () => { 
      try { 
        console.log('Fetching items from server with page:', page, 'and search:', search); 
        const response = await axios.get('http://localhost:4000/api/items', { 
          params: { page, search } 
        }); 
        setItems(response.data.docs); 
        setTotalPages(response.data.totalPages); 
        console.log('Items fetched successfully:', response.data.docs); 
      } catch (error) { 
        console.error('Error fetching items:', error.message); 
        console.error('Error stack:', error.stack); 
      } 
    }; 
 
    fetchItems(); 
  }, [page, search]); 
 
  const handleSearchChange = (e) => { 
    setSearch(e.target.value); 
    setPage(1); // Reset to first page on search change 
  }; 
 
  const handlePageChange = (newPage) => { 
    setPage(newPage); 
  }; 
 
  const handleEditClick = (item) => { 
    setEditingItem(item); 
  }; 
 
  const handleUpdateSuccess = (updatedItem) => { 
    setItems(items.map(item => item._id === updatedItem._id ? updatedItem : item)); 
    setEditingItem(null); 
  }; 
 
  const handleDeleteClick = async (itemId) => { 
    const confirmDelete = window.confirm('Are you sure you want to delete this item?'); 
    if (confirmDelete) { 
      try { 
        console.log('Deleting item with ID:', itemId); 
        await axios.delete(`http://localhost:4000/api/items/${itemId}`); 
        setItems(items.filter(item => item._id !== itemId)); 
        console.log('Item deleted successfully'); 
      } catch (error) { 
        console.error('Error deleting item:', error.message); 
        console.error('Error stack:', error.stack); 
      } 
    } 
  }; 
 
  return ( 
    <div> 
      <h2>Items List</h2> 
      <input 
        type="text" 
        placeholder="Search items..." 
        value={search} 
        onChange={handleSearchChange} 
      /> 
      <ul> 
        {items.map(item => ( 
          <li key={item._id}> 
            {item.name}: {item.description} 
            <button onClick={() => handleEditClick(item)}>Edit</button> 
            <button onClick={() => handleDeleteClick(item._id)}>Delete</button> 
          </li> 
        ))} 
      </ul> 
      <div> 
        {Array.from({ length: totalPages }, (_, i) => ( 
          <button 
            key={i} 
            onClick={() => handlePageChange(i + 1)} 
            disabled={page === i + 1} 
          > 
            {i + 1} 
          </button> 
        ))} 
      </div> 
 
      {editingItem && ( 
        <UpdateItemForm item={editingItem} onUpdateSuccess={handleUpdateSuccess} /> 
      )} 
    </div> 
  ); 
} 
 
export default ItemList;