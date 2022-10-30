import express from 'express'
import Product from '../models/productModel.js'
import User from '../models/UserModel.js'
import data from '../data.js'
const seedRouter = express.Router()

seedRouter.get('/', async (req, res) => {
  await Product.remove({})
  const createProducts = await Product.insertMany(data.products)
  await User.remove({})
  const createUser = await User.insertMany(data.users)
  res.send({ createUser, createProducts })
})

export default seedRouter