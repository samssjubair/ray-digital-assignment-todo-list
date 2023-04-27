import React, { useState, useEffect } from "react";
import axios from "axios";

function Todo({ userName, email}) {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:4999/api/v1/allTodos/${email}`)
      .then((res) => setTodos(res.data))
      .catch((err) => console.log(err));
  });

  // const userTodos = todos.filter((todo) => todo.user === email);

  const handleComplete = (todo) => {
    const updatedTodo = { ...todo, completed: !todo.completed };
    axios
      .put(`http://localhost:4999/api/v1/todos/${todo._id}`, updatedTodo)
      .then(() => {
        const updatedTodos = todos.map((t) => {
          if (t._id === todo._id) {
            return updatedTodo;
          }
          return t;
        });
        setTodos(updatedTodos);
      })
      .catch((err) => console.log(err));
  };
  

  const handleTitleChange = (e) => setTitle(e.target.value);

  const handleDescriptionChange = (e) => setDescription(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTodo = { user: email,title, description, completed: false, email: email };

    axios
      .post("http://localhost:4999/api/v1/todos", newTodo)
      .then(() => {
        setTodos([...todos, newTodo]);
        setTitle("");
        setDescription("");
      })
      .catch((err) => console.log(err));
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:4999/api/v1/todos/${id}`)
      .then(() => {
        const updatedTodos = todos.filter((todo) => todo._id !== id);
        setTodos(updatedTodos);
      })
      .catch((err) => console.log(err));
  };

  const handleLogout = () => {
    // Call your logout function here
    localStorage.clear();
    location.reload();
  }
  

  return (
    
    <div className="max-w-7xl mx-auto py-6 sm:px-6  lg:px-8">
      <div className="px-4 py-6 sm:px-0 ">
      <div className="flex justify-end">
        <button className=" text-black font-bold py-2 px-4 rounded-full mt-4" onClick={handleLogout}>
          Log Out
        </button>
      </div>
      
      <div className="pb-4">
        <h2 className="text-xl font-medium text-center">
          Hello {userName}
        </h2>
        
      </div>
        <div className="flex justify-between mb-6">
          <h1 className="text-3xl mx-auto font-bold">Welcome to Todo List</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="title"
            >
              Title
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="title"
              type="text"
              placeholder="Enter a title"
              value={title}
              onChange={handleTitleChange}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="description"
              rows="3"
              placeholder="Enter a description"
              value={description}
              onChange={handleDescriptionChange}
            ></textarea>
          </div>
          <button type="submit" class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full">
            Add Todo
          </button>

        </form>
        <div className="mt-8">
          {todos.map((todo) => (
            <div className="mb-4" key={todo._id}>
              <div className="flex justify-between">
                <div className="flex">
                  <input
                  type="checkbox"
                  className="mr-2"
                  checked={todo.completed}
                  onChange={() => handleComplete(todo)}
                />
                  <h2 className="text-lg font-bold">{todo.title}</h2>
                </div>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(todo._id)}
                >
                  Delete
                </button>
              </div>
              <p className="text-gray-700">{todo.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Todo;
