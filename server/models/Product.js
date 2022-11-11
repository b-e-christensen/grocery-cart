const { Schema, model } = require('mongoose');


const productSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
  }
});

const Product = model('Product', productSchema);

module.exports = Product;
