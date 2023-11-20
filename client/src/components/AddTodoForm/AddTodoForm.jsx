
import React, { useState } from 'react';


const AddTodoForm = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [description,setdescription]=useState('')

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      onAdd(title,description);
      setTitle('');
      setdescription('')
    }
  };

  return (
    <form className="mb-4" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Todo Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border text-black border-gray-300 rounded p-2 mr-2"
      />
      <input
        type="text"
        placeholder="Todo Description"
        value={description}
        onChange={(e) => setdescription(e.target.value)}
        className="border text-black border-gray-300 rounded p-2 mr-2"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Add
      </button>
    </form>
  );
};

export default AddTodoForm;
