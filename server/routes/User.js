const express = require('express')
const router = express.Router()
const Todo = require('../schemas/Todo')



router.route('/todos')
.post(async (req, res) => {
  try {
    const { title,description } = req.body;
    const todos=  await Todo.find({});
    let length =  todos.length

    if(!todos){
      const todo = new Todo({ title,description, isChecked: false, position: 0 });
      await todo.save();
      res.json({ success: true, message: 'Todo added successfully', todo });
    }else{
      const todo = new Todo({ title,description, isChecked: false, position: length  });
      await todo.save();
      res.json({ success: true, message: 'Todo added successfully', todo });
    }
    
 
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
})
.get(async (req, res) => {
  try {
    const todos = await Todo.find().sort({ position: 1 });
    res.json({ success: true, todos });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
})

router.put('/todos/update-position/:id', async (req, res) => {
  try {
    const { position } = req.body;
    const todoId = req.params.id;


    const draggedTodo = await Todo.findById(todoId);

  
    const destinationTodo = await Todo.findOne({ position });

    const originalDraggedPosition = draggedTodo.position;

 
    draggedTodo.position = position;
    await draggedTodo.save();

    if (destinationTodo) {
      destinationTodo.position = originalDraggedPosition;
      await destinationTodo.save();
    }

    res.json({ success: true, message: 'Todo position updated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});
router.put('/todos/update-state/:id', async (req, res) => {
  try {
    const { isChecked } = req.body;
   const todo= await Todo.findByIdAndUpdate(req.params.id, { isChecked });
    res.json({ success: true, message: 'Todo state updated successfully',todo });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});
router.delete('/todos/:id',async (req,res)=>{
  try {
    const id = req.params.id;

    await Todo.findByIdAndDelete(id)
    res.json({ success: true, message: 'Todo deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }

})

module.exports = router;
