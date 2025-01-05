const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');  // Importing cors

const app = express();
const port = 3000;

// MongoDB Atlas connection string
const mongoDBURL = 'mongodb+srv://root:12345@cluster0.gbzdemx.mongodb.net/nike_shop?retryWrites=true&w=majority';

// Connect to MongoDB
mongoose.connect(mongoDBURL)
  .then(() => {
    console.log('Connected to MongoDB');
 
  })
  .catch(err => console.error('Failed to connect to MongoDB', err));

// Define the schema for the "items" collection
const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
  qtty: { type: Number, default: null }
});

// Create the Item model
const Item = mongoose.model('Item', itemSchema);

// Insert initial data into MongoDB
const insertInitialData = async () => {
  const items = [
    { name: "Nike Air Force 1 '07", price: 110, category: 'shoes', image: 'images/airforce07.jpg', qtty: 20 },
    { name: 'Nike Sportswear Club Fleece', price: 50, category: 'pants', image: 'images/fleecepants.png', qtty: 15 },
    { name: 'Nike Windrunner Running Energy', price: 40, category: 'jackets', image: 'images/windrunner.jpg', qtty: 0 },
    { name: 'Nike Sportswear Solo Swoosh', price: 35, category: 'jackets', image: 'images/solojacket.webp', qtty: 50 },
    { name: 'LeBron', price: 37, category: 'pants', image: 'images/lebron.webp', qtty: 33 },
    { name: 'Ja Standard Issue', price: 40, category: 'pants', image: 'images/ja.png', qtty: 11 },
    { name: 'Air Jordan 1 High OG ', price: 150, category: 'shoes', image: 'images/jordanhigh.jpg', qtty: 12 },
    { name: 'Air Jordan 1 Low', price: 98, category: 'shoes', image: 'images/jordanlow.jpg', qtty: 5 },
    { name: 'shoes1', price: 122, category: 'shoes', image: 'airfocre07.jpg', qtty: 78 }
  ];

  try {
    // Insert items into MongoDB
    await Item.insertMany(items);
    console.log('Initial data inserted');
  } catch (err) {
    console.error('Error inserting data:', err);
  }
};

// Use cors middleware
app.use(cors());  // Enabling CORS for all routes

// Create an endpoint to get all items
app.get('/items', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching items' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
