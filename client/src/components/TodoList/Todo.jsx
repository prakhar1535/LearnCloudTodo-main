import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

const Todo = ({ handleToggle, todo, onDelete, index }) => {
  return (
    <Draggable draggableId={todo._id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`flex items-center p-4 border rounded-lg cursor-move bg-gray-800 ${
            todo.isChecked ? 'opacity-50' : ''
          }`}
        >
          <div className="flex flex-col gap-2 flex-grow pr-4">
            <h2>Title: <strong>{todo.title}</strong> </h2>
            
            <h3>Description: {todo.description}</h3>
          </div>
          <div className="flex flex-col gap-2 items-end">
            <input
              type="checkbox"
              checked={todo.isChecked}
              onChange={() => handleToggle(todo)}
              className="mr-2 h-5 w-5  cursor-pointer"
            />
            <button
              onClick={() => onDelete(todo._id)}
              className="bg-red-500 text-white px-2 py-1 rounded"
            >
              Delete
            </button>
          </div>
          
        </div>
      )}
    </Draggable>
  );
};

export default Todo;
