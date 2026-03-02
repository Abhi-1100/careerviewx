// MongoDB Database Helper Script
// Run with: node server/dbHelper.js

require('dotenv').config({ path: './server/.env' });
const mongoose = require('mongoose');

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB Atlas');
    console.log('📦 Database:', mongoose.connection.name);
    console.log('🌐 Host:', mongoose.connection.host);
    console.log('\n--- Available Collections ---');
    
    const collections = await mongoose.connection.db.listCollections().toArray();
    collections.forEach((col, index) => {
      console.log(`${index + 1}. ${col.name}`);
    });
    
    // Example: Count documents in each collection
    console.log('\n--- Document Counts ---');
    for (const col of collections) {
      const count = await mongoose.connection.db.collection(col.name).countDocuments();
      console.log(`${col.name}: ${count} documents`);
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await mongoose.connection.close();
    console.log('\n✅ Connection closed');
  }
}

connectDB();
