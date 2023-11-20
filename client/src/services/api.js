
// const BASE_URL= process.env.BASE_URL
const BASE_URL = import.meta.env.VITE_BASE_URL;


export const fetchTodos = async () => {
    const response = await fetch(BASE_URL);
    const data = await response.json();
    return data.todos;
};

export const addTodo = async (title, description) => {
    const response = await fetch(BASE_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description }),
    });
    const data = await response.json()
    return data.todo;

};
export const deleteTodo = async (id) => {
    try {

        const response = await fetch(`${BASE_URL}/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }

        })
    } catch (error) {
        console.log(error);
    }
}

export const updateTodoPosition = async (id, position) => {
    await fetch(`${BASE_URL}/update-position/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ position }),
    });
    ;
    // alert('update done')
};
export const updateTodoChecked = async (todo) => {
   const response= await fetch(`${BASE_URL}/update-state/${todo._id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isChecked:!todo.isChecked }),
    });
    const data= await response.json()
    console.log(data);
};
