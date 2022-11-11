const { AuthenticationError } = require('apollo-server-express');
const { User, Store, Product } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    user: async (parent, args) => {
      return await User.find({}).populate('stores').populate({ path: 'stores', populate: 'products' })
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return await User.findOne({ _id: context.user._id })
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    stores: async (parent, args, context) => {
      return await Store.find({})
    },
    products: async (parent, args, context) => {
      return await Product.find({})
    }
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },
    addStoreDev: async (parent, { name, user_id }) => {
      const store = await Store.create({ name })
      await User.findOneAndUpdate(
        { _id: user_id },
        { $addToSet: { stores: store.id }}
      )
      return store
    },
    updateStoreDev: async (parent, { name, store_id }) => {
      return await Store.findOneAndUpdate(
        { _id: store_id }, 
        { name },
        { runValidators: true, new: true }
      )
    },
    deleteStoreDev: async (parent, { store_id, user_id }) => {
      await Store.findOneAndDelete({ _id: store_id })
      await User.findOneAndUpdate(
        { _id: user_id },
        { $pull: { stores: store_id }})
    },


    addProductDev: async (parent, { name, price, store_id }) => {
      const product = await Product.create({ name, price })
      await Store.findOneAndUpdate(
        { _id: store_id },
        { $addToSet: { products: product.id }}
      )
      return product
    },
    updateProductDev: async (parent, { name, price, product_id }) => {
      return await Product.findOneAndUpdate(
        { _id: product_id }, 
        { name, price },
        { runValidators: true, new: true }
      )
    },
    deleteProductDev: async (parent, { product_id }) => {
      return await Product.findOneAndDelete({ _id: product_id })
    },
  },
};

module.exports = resolvers;
