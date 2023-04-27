const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

app.use(express.json());
app.use(cors());

// Define the Todo schema
const todoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  completed: { type: Boolean, default: false },
});

// Define the Todo model
const Todo = mongoose.model("Todo", todoSchema);

app.get("/api/v1/todos", (req, res) => {
  Todo.find()
    .then((todos) => res.json(todos))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

app.get("/api/v1/todos/:id", (req, res) => {
  Todo.findById(req.params.id)
    .then((todo) => res.json(todo))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

app.post("/api/v1/todos", (req, res) => {
  const newTodo = new Todo({
    title: req.body.title,
    description: req.body.description,
    completed: req.body.completed,
  });

  newTodo
    .save()
    .then(() => res.json("Todo added!"))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

app.put("/api/v1/todos/:id", (req, res) => {
  Todo.findById(req.params.id)
    .then((todo) => {
      todo.title = req.body.title;
      todo.description = req.body.description;
      todo.completed = req.body.completed;

      todo
        .save()
        .then(() => res.json("Todo updated!"))
        .catch((err) => res.status(400).json(`Error: ${err}`));
    })
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

app.delete("/api/v1/todos/:id", (req, res) => {
  Todo.findByIdAndDelete(req.params.id)
    .then(() => res.json("Todo deleted."))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

module.exports = app;
