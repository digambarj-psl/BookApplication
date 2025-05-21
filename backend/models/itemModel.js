const mongoose = require('mongoose'); 
const mongoosePaginate = require('mongoose-paginate-v2'); 
 
const itemSchema = new mongoose.Schema({ 
  name: { 
    type: String, 
    required: true, 
    unique: true 
  }, 
  description: { 
    type: String, 
    required: true 
  } 
}); 
 
itemSchema.plugin(mongoosePaginate); 
 
const Item = mongoose.model('Item', itemSchema); 
 
module.exports = Item;