// ===== CA2: Mongo database connection =====
// added central DB connection so my Users API and Reviews API can store user-specific data

import mongoose from 'mongoose';

if (!process.env.MONGO_DB) {
  console.log('MONGO_DB missing in .env');
} else {
  mongoose.connect(process.env.MONGO_DB);
}

const db = mongoose.connection;

db.on('error', (err) => {
  console.log(`database connection error: ${err}`);
});
db.on('disconnected', () => {
  console.log('database disconnected');
});
db.once('open', () => {
  console.log(`database connected to ${db.name} on ${db.host}`);
});
