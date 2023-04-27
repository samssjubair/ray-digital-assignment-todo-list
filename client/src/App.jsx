import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:4999/api/v1/todos")
      .then((res) => setTodos(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleTitleChange = (e) => setTitle(e.target.value);

  const handleDescriptionChange = (e) => setDescription(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTodo = { title, description };

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

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6  lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <div className="flex justify-between mb-6">
          <h1 className="text-2xl font-bold">Todo List</h1>
          <button
            className="btn btn-primary"
            onClick={() => window.location.reload()}
          >
            Refresh
          </button>
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
          <button className="btn btn-primary" type="submit">
            Add Todo
          </button>
        </form>
        <div className="mt-8">
          {todos.map((todo) => (
            <div className="mb-4" key={todo._id}>
              <div className="flex justify-between">
                <h2 className="text-lg font-bold">{todo.title}</h2>
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

export default App;
