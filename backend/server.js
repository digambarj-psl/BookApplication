const express = require('express'); 
const mongoose = require('mongoose'); 
const cors = require('cors'); 
const itemRoutes = require('./routes/itemRoutes'); 
 
const app = express(); 
const PORT = 4000; // Use port 4000 for the backend 
 
app.use(cors()); 
app.use(express.json()); 
 
// Connect to MongoDB (ensure MongoDB is running locally or provide a connection string to MongoDB Atlas) 
mongoose.connect('mongodb://localhost:27017/itemsDB') 
  .then(() => { 
    console.log('Connected to MongoDB'); 
  }) 
  .catch((error) => { 
    console.error('Error connecting to MongoDB:', error.message); 
    console.error('Error stack:', error.stack); 
  }); 
 
// A simple test route 
app.get('/api', (req, res) => { 
  res.send('API is working'); 
}); 
 
// Use item routes 
app.use('/api', itemRoutes); 
 
app.listen(PORT, () => { 
  console.log(`Server is running on http://localhost:${PORT}`); 
});