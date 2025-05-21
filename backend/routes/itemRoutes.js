const express = require('express'); 
const Item = require('../models/itemModel'); 
const router = express.Router(); 
 
// POST /items - Create a new item 
router.post('/items', async (req, res) => { 
  try { 
    const { name, description } = req.body; 
    console.log('Received request to create item:', { name, description }); 
 
    const newItem = new Item({ name, description }); 
    await newItem.save(); 
 
    console.log('Item created successfully:', newItem); 
    res.status(201).json(newItem); 
  } catch (error) { 
    console.error('Error creating item:', error.message); 
    console.error('Error stack:', error.stack); 
 
    if (error.code === 11000) { 
      res.status(400).json({ message: 'Item already exists' }); 
    } else { 
      res.status(500).json({ message: 'Error creating item', error: error.message }); 
    } 
  } 
}); 
 
// GET /items - Retrieve items with pagination and search 
router.get('/items', async (req, res) => { 
  try { 
    const { page = 1, limit = 10, search = '' } = req.query; 
    const query = search ? { name: { $regex: search, $options: 'i' } } : {}; 
 
    const options = { 
      page: parseInt(page, 10), 
      limit: parseInt(limit, 10), 
      sort: { name: 1 } 
    }; 
 
    console.log('Fetching items with options:', { page, limit, search }); 
 
    const result = await Item.paginate(query, options); 
    console.log('Items fetched successfully:', result); 
    res.json(result); 
  } catch (error) { 
    console.error('Error fetching items:', error.message); 
    console.error('Error stack:', error.stack); 
    res.status(500).json({ message: 'Error fetching items', error: error.message }); 
  } 
}); 
 
// PUT /items/:id - Update an existing item 
router.put('/items/:id', async (req, res) => { 
  try { 
    const { id } = req.params; 
    const updateData = req.body; 
 
    console.log('Received request to update item:', { id, updateData }); 
 
    const updatedItem = await Item.findByIdAndUpdate(id, updateData, { new: true, runValidators: true }); 
 
    if (!updatedItem) { 
      return res.status(404).json({ message: 'Item not found' }); 
    } 
 
    console.log('Item updated successfully:', updatedItem); 
    res.json(updatedItem); 
  } catch (error) { 
    console.error('Error updating item:', error.message); 
    console.error('Error stack:', error.stack); 
    res.status(500).json({ message: 'Error updating item', error: error.message }); 
  } 
}); 
 
// DELETE /items/:id - Delete an item 
router.delete('/items/:id', async (req, res) => { 
  try { 
    const { id } = req.params; 
    console.log('Received request to delete item:', id); 
 
    const deletedItem = await Item.findByIdAndDelete(id); 
 
    if (!deletedItem) { 
      return res.status(404).json({ message: 'Item not found' }); 
    } 
 
    console.log('Item deleted successfully:', deletedItem); 
    res.json({ message: 'Item deleted successfully', item: deletedItem }); 
  } catch (error) { 
    console.error('Error deleting item:', error.message); 
    console.error('Error stack:', error.stack); 
    res.status(500).json({ message: 'Error deleting item', error: error.message }); 
  } 
}); 
 
module.exports = router;