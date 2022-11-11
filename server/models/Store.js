const { Schema, model } = require('mongoose');
const Product = require('./Product')

const storeSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  products: {
    type: Array,
    ref: Product
  }
});

const Store = model('Store', storeSchema);

module.exports = Store;
