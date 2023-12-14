// File: db.js
import mongoose from 'mongoose';
const db=()=>{
  mongoose.connect('mongodb://localhost:27017/jswDb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'MongoDB connection error:'));
  db.once('open', () => {
    console.log('Connected to MongoDB');
  });
  return db
}


export default db;
