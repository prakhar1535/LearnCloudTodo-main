const express = require('express');
const mongoose = require('mongoose');
const cors=require('cors')
const app = express();
const PORT = process.env.PORT || 3001;
const TodoRouter= require('./routes/User')

require('dotenv').config()

app.use(cors());
app.use(express.json())

// MongoDB Connection
console.log(process.env.MONGO_URL);
mongoose.connect(process.env.MONGO_URL,{dbName:'Todos'});

app.use('/api',TodoRouter)
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

