const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  title: String,
  description:String,
  isChecked: Boolean,
  position: Number,
});

const Todo = mongoose.model('Todo', todoSchema);
module.exports=Todo;
