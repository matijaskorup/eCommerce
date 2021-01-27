import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';
import users from './data/users.js';
import products from './data/products.js';
import User from './models/userModel.js';
import Product from './models/productModel.js';
import Order from './models/orderModel.js';
import connectDB from './config/db.js';

dotenv.config();
connectDB();

async function importData() {
  try {
    await User.deleteMany();
    await Product.deleteMany();
    await Order.deleteMany();

    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id;

    //ovo radimo zato sto nam je u product modelu user required pa smo postavili usera da ne dobijemo error
    const sampleProducts = products.map((product) => {
      return {
        ...product,
        user: adminUser,
      };
    });

    await Product.insertMany(sampleProducts);
    console.log(`data imported`.green.inverse);

    //ovaj proces exit bez jedinice znaci da zelimo exit bez errora, da smo stavili 1 znacilo bi exit sa errorom
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.bold);
    process.exit(1);
  }
}

async function destroyData() {
  try {
    await User.deleteMany();
    await Product.deleteMany();
    await Order.deleteMany();

    console.log(`data destroyed`.red.inverse);

    //ovaj proces exit bez jedinice znaci da zelimo exit bez errora, da smo stavili 1 znacilo bi exit sa errorom
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.bold);
    process.exit(1);
  }
}

if (process.argv[2] === '-delete') {
  destroyData();
} else if (process.argv[2] === '-insert') {
  importData();
}
