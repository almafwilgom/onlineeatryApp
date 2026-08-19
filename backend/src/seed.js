/**
 * seed.js — Database Seed Script for Online Eatery.
 * Seeds initial admin user and sample Nigerian & Continental menu items.
 *
 * Run: node src/seed.js
 */
require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const Menu = require('./models/Menu');
const { MONGO_URI } = require('./config/env');

const sampleMenuItems = [
  {
    name: 'Special Nigerian Party Jollof',
    description: 'Smoky party Jollof rice cooked with rich tomatoes, peppers, and authentic spices, served with fried plantain.',
    price: 3500,
    category: 'Rice',
    imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
    isAvailable: true,
  },
  {
    name: 'Rich Egusi Soup & Pounded Yam',
    description: 'Traditional melon seed soup cooked with stockfish, beef, and bitter leaf, served with fluffy pounded yam.',
    price: 4200,
    category: 'Soup',
    imageUrl: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=800&q=80',
    isAvailable: true,
  },
  {
    name: 'Suya Grill Platter',
    description: 'Tender beef skewers coated in authentic northern Kankankan spice, served with sliced onions and tomatoes.',
    price: 3800,
    category: 'Grills',
    imageUrl: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80',
    isAvailable: true,
  },
  {
    name: 'Efo Riro & Goat Meat',
    description: 'Rich spinach vegetable stew cooked with assorted meat, dried fish, and palm oil, served with semovita.',
    price: 4500,
    category: 'Soup',
    imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80',
    isAvailable: true,
  },
  {
    name: 'Chilled Zobo Hibiscus Drink',
    description: 'Refreshing organic hibiscus flower drink infused with ginger, pineapple, and cloves.',
    price: 1200,
    category: 'Drinks',
    imageUrl: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80',
    isAvailable: true,
  },
  {
    name: 'Chocolate Velvet Cake Slice',
    description: 'Decadent chocolate cake slice layered with rich dark chocolate fudge frosting.',
    price: 2000,
    category: 'Desserts',
    imageUrl: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80',
    isAvailable: true,
  },
];

const seedDatabase = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGO_URI);
    console.log('✅ MongoDB connected.');

    // Seed Admin User
    let admin = await User.findOne({ email: 'admin@eatery.com' });
    if (!admin) {
      admin = await User.create({
        name: 'Eatery Admin',
        email: 'admin@eatery.com',
        password: 'admin1234',
        role: 'admin',
      });
      console.log('✅ Admin user created: admin@eatery.com / admin1234');
    } else {
      console.log('ℹ️ Admin user already exists.');
    }

    // Seed Menu Items if collection is empty or sparse
    const count = await Menu.countDocuments();
    if (count === 0) {
      await Menu.insertMany(sampleMenuItems);
      console.log(`✅ Seeded ${sampleMenuItems.length} menu items.`);
    } else {
      console.log(`ℹ️ Menu collection already contains ${count} items.`);
    }

    console.log('\n🎉 Seeding complete!');
  } catch (error) {
    console.error('❌ Seeding failed:', error.message);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
};

seedDatabase();
