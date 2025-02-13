import { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faSave, faTimes, faGripVertical } from '@fortawesome/free-solid-svg-icons';
import { v4 as uuidv4 } from 'uuid';
import HeaderProject from '../../components/layouts/ProjectHeader';
import Footer from '../../components/layouts/Footer';
import './TodoList.css';

const TodoList = () => {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [input, setInput] = useState('');
  const [category, setCategory] = useState('personal');
  const [filter, setFilter] = useState('all');
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState('');

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (e) => {
    e.preventDefault();
    if (input.trim()) {
      const newTodo = {
        id: uuidv4(),
        text: input,
        completed: false,
        category,
        createdAt: new Date().toISOString()
      };
      setTodos([...todos, newTodo]);
      setInput('');
    }
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const startEdit = (todo) => {
    setEditId(todo.id);
    setEditText(todo.text);
  };

  const saveEdit = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, text: editText } : todo
    ));
    setEditId(null);
    setEditText('');
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditText('');
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(todos);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setTodos(items);
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'all') return true;
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return todo.category === filter;
  });

  return (
    <div className="app">
      <HeaderProject 
        title="Enhanced Todo List" 
        description="A feature-rich task management app with drag-and-drop functionality"
      />
      <main className="todo-main">
        <div className="todo-container">
          <form onSubmit={addTodo} className="todo-form">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Add a new task..."
              className="todo-input"
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="category-select"
            >
              <option value="personal">Personal</option>
              <option value="work">Work</option>
              <option value="shopping">Shopping</option>
              <option value="health">Health</option>
            </select>
            <button type="submit" className="add-button">Add Task</button>
          </form>

          <div className="filters">
            <button
              className={`filter-button ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              All
            </button>
            <button
              className={`filter-button ${filter === 'active' ? 'active' : ''}`}
              onClick={() => setFilter('active')}
            >
              Active
            </button>
            <button
              className={`filter-button ${filter === 'completed' ? 'active' : ''}`}
              onClick={() => setFilter('completed')}
            >
              Completed
            </button>
            <button
              className={`filter-button ${filter === 'personal' ? 'active' : ''}`}
              onClick={() => setFilter('personal')}
            >
              Personal
            </button>
            <button
              className={`filter-button ${filter === 'work' ? 'active' : ''}`}
              onClick={() => setFilter('work')}
            >
              Work
            </button>
          </div>

          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="todos">
              {(provided) => (
                <ul
                  className="todo-list"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {filteredTodos.map((todo, index) => (
                    <Draggable
                      key={todo.id}
                      draggableId={todo.id}
                      index={index}
                    >
                      {(provided) => (
                        <li
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          className={`todo-item ${todo.completed ? 'completed' : ''}`}
                        >
                          <div {...provided.dragHandleProps} className="drag-handle">
                            <FontAwesomeIcon icon={faGripVertical} />
                          </div>
                          <input
                            type="checkbox"
                            checked={todo.completed}
                            onChange={() => toggleTodo(todo.id)}
                          />
                          {editId === todo.id ? (
                            <div className="edit-container">
                              <input
                                type="text"
                                value={editText}
                                onChange={(e) => setEditText(e.target.value)}
                                className="edit-input"
                              />
                              <button
                                onClick={() => saveEdit(todo.id)}
                                className="edit-button"
                              >
                                <FontAwesomeIcon icon={faSave} />
                              </button>
                              <button
                                onClick={cancelEdit}
                                className="cancel-button"
                              >
                                <FontAwesomeIcon icon={faTimes} />
                              </button>
                            </div>
                          ) : (
                            <>
                              <span className="todo-text">{todo.text}</span>
                              <span className="todo-category">{todo.category}</span>
                              <div className="todo-actions">
                                <button
                                  onClick={() => startEdit(todo)}
                                  className="edit-button"
                                >
                                  <FontAwesomeIcon icon={faEdit} />
                                </button>
                                <button
                                  onClick={() => deleteTodo(todo.id)}
                                  className="delete-button"
                                >
                                  <FontAwesomeIcon icon={faTrash} />
                                </button>
                              </div>
                            </>
                          )}
                        </li>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TodoList;