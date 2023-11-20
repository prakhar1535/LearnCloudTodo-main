import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { Oval } from 'react-loader-spinner';
import Todo from './Todo';

const TodoList = ({ loading, todos, handleToggle, onDelete }) => {
  return (
    <div>
      {loading ? (
        <div style={{position:'absolute',top:'50%',left:'50%',transform:'translate(-50,-50)'}}>
        <Oval 
          color="#00BFFF" 
          height={50} 
          width={50} 
        />
        </div>
      ) : (
        <Droppable droppableId="todos">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="flex flex-col gap-4"
            >
              {todos.length >0 ?todos.map((todo, index) => (
                <Todo
                  key={todo._id}
                  todo={todo}
                  index={index}
                  handleToggle={handleToggle}
                  onDelete={onDelete}
                />
              )):'No Todos. Add Some!'}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      )}
    </div>
  );
};

export default TodoList;
