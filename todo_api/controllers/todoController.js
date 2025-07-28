// controllers/todoController.js

// این آرایه برای ذخیره موقت وظایف در حافظه استفاده میشه
// با هر بار ریستارت سرور، این لیست پاک میشه
let todos = [];
let nextId = 1; // برای ساخت ID منحصر به فرد برای هر وظیفه

// @desc    Get all todos
// @route   GET /api/todos
// @access  Public
const getTodos = (req, res) => {
  res.status(200).json(todos);
};

// @desc    Get single todo by ID
// @route   GET /api/todos/:id
// @access  Public
const getTodoById = (req, res) => {
  const todo = todos.find((t) => t.id === parseInt(req.params.id));
  if (todo) {
    res.status(200).json(todo);
  } else {
    res.status(404).json({ message: 'Todo not found' });
  }
};

// @desc    Create a new todo
// @route   POST /api/todos
// @access  Public
const createTodo = (req, res) => {
  const { title, description } = req.body;

  if (!title) {
    return res.status(400).json({ message: 'Title is required' });
  }

  const newTodo = {
    id: nextId++, // ID رو اختصاص میدیم و برای بعدی افزایش میدیم
    title,
    description: description || '', // اگه description نبود، رشته خالی قرار میدیم
    completed: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  todos.push(newTodo);
  res.status(201).json(newTodo);
};

// @desc    Update a todo
// @route   PUT /api/todos/:id
// @access  Public
const updateTodo = (req, res) => {
  const { title, description, completed } = req.body;
  const todo = todos.find((t) => t.id === parseInt(req.params.id));

  if (todo) {
    todo.title = title !== undefined ? title : todo.title;
    todo.description = description !== undefined ? description : todo.description;
    todo.completed = completed !== undefined ? completed : todo.completed;
    todo.updatedAt = new Date().toISOString();
    res.status(200).json(todo);
  } else {
    res.status(404).json({ message: 'Todo not found' });
  }
};

// @desc    Delete a todo
// @route   DELETE /api/todos/:id
// @access  Public
const deleteTodo = (req, res) => {
  const initialLength = todos.length;
  todos = todos.filter((t) => t.id !== parseInt(req.params.id));

  if (todos.length < initialLength) {
    res.status(200).json({ message: 'Todo removed' });
  } else {
    res.status(404).json({ message: 'Todo not found' });
  }
};

module.exports = {
  getTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
};