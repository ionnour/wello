const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config();

// process.env.JWT_SECRET = 'e237920e88165bd0090b1c6b544cf7'

const app = express();

(async function conectDB(){
  try {
    await mongoose.connect(process.env.MDB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log('MongoDB is connected ...');
  } catch (err){
    console.error(err.message);
    process.exit(1);
  }
})();

app.use(express.json({ extended: false }));

//routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/boards', require('./routes/api/boards'));
app.use('/api/lists', require('./routes/api/lists'));
app.use('/api/cards', require('./routes/api/cards'));
app.use('/api/checklists', require('./routes/api/checklists'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}


const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{console.log("Server runing on port " + PORT);})