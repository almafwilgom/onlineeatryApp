/**
 * seed.js — Database Seed Script for Online Eatery.
 * Seeds admin user and sample Nigerian & Continental menu items with high quality food pictures.
 */
require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const Menu = require('./models/Menu');
const { MONGO_URI } = require('./config/env');

const sampleMenuItems = [
  {
    name: 'Special Nigerian Party Jollof',
    description: 'Smoky party Jollof rice cooked with rich tomato-pepper reduction, served with fried plantain and grilled chicken.',
    price: 3500,
    category: 'Rice',
    imageUrl: 'https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?auto=format&fit=crop&w=800&q=80',
    isAvailable: true,
  },
  {
    name: 'Fried Rice & Crispy Chicken',
    description: 'Savory Nigerian fried rice loaded with diced vegetables, sweet corn, liver, and seasoned fried chicken.',
    price: 3800,
    category: 'Rice',
    imageUrl: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=800&q=80',
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
    name: 'Efo Riro & Goat Meat',
    description: 'Rich spinach vegetable stew cooked with assorted meat, dried fish, and palm oil, served with semovita.',
    price: 4500,
    category: 'Soup',
    imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80',
    isAvailable: true,
  },
  {
    name: 'Spicy Catfish Pepper Soup',
    description: 'Hot and aromatic fish broth spiced with traditional herbs, calabash nutmeg, and chili peppers.',
    price: 4000,
    category: 'Soup',
    imageUrl: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=80',
    isAvailable: true,
  },
  {
    name: 'Suya Beef Grill Platter',
    description: 'Tender beef skewers coated in authentic northern Kankankan peanut spice, served with sliced onions and tomatoes.',
    price: 3800,
    category: 'Grills',
    imageUrl: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80',
    isAvailable: true,
  },
  {
    name: 'Barbecue Grilled Chicken & Chips',
    description: 'Flame-grilled quarter chicken brushed with sticky BBQ sauce, served with golden French fries.',
    price: 4200,
    category: 'Grills',
    imageUrl: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=800&q=80',
    isAvailable: true,
  },
  {
    name: 'Chilled Zobo Hibiscus Drink',
    description: 'Refreshing organic hibiscus flower drink infused with fresh ginger, pineapple juice, and cloves.',
    price: 1200,
    category: 'Drinks',
    imageUrl: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80',
    isAvailable: true,
  },
  {
    name: 'Fresh Pineapple Mint Juice',
    description: 'Cold-pressed fresh pineapple juice blended with crushed mint leaves and natural honey.',
    price: 1500,
    category: 'Drinks',
    imageUrl: 'https://images.unsplash.com/photo-1621263764928-df1444c5e859?auto=format&fit=crop&w=800&q=80',
    isAvailable: true,
  },
  {
    name: 'Chocolate Fudge Cake Slice',
    description: 'Decadent chocolate cake slice layered with rich dark chocolate fudge frosting.',
    price: 2200,
    category: 'Desserts',
    imageUrl: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80',
    isAvailable: true,
  },
  {
    name: 'Creamy Vanilla Ice Cream Waffle',
    description: 'Fresh Belgian waffle topped with double scoop vanilla ice cream and chocolate drizzle.',
    price: 2500,
    category: 'Desserts',
    imageUrl: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=800&q=80',
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

    // Refresh menu items with pictures
    await Menu.deleteMany({});
    await Menu.insertMany(sampleMenuItems);
    console.log(`✅ Seeded ${sampleMenuItems.length} menu items with food images.`);

    console.log('\n🎉 Seeding complete!');
  } catch (error) {
    console.error('❌ Seeding failed:', error.message);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
};

seedDatabase();
