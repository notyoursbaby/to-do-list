import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Check, X, Filter, ArrowUpDown } from 'lucide-react';

const TodoList = () => {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Sample completed task', completed: true, createdAt: new Date('2024-12-01') },
    { id: 2, text: 'Sample pending task', completed: false, createdAt: new Date('2024-12-02') }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [filter, setFilter] = useState('all'); // all, active, completed
  const [sortBy, setSortBy] = useState('newest'); // newest, oldest, alphabetical
  const [inputError, setInputError] = useState('');

  // Task validation
  const validateTask = (text) => {
    if (!text.trim()) {
      return 'Task cannot be empty';
    }
    if (text.trim().length < 2) {
      return 'Task must be at least 2 characters long';
    }
    if (text.trim().length > 100) {
      return 'Task must be less than 100 characters';
    }
    if (tasks.some(task => task.text.toLowerCase() === text.trim().toLowerCase())) {
      return 'Task already exists';
    }
    return '';
  };

  // Add new task
  const addTask = () => {
    const trimmedInput = inputValue.trim();
    const error = validateTask(trimmedInput);
    
    if (error) {
      setInputError(error);
      return;
    }

    const newTask = {
      id: Date.now(),
      text: trimmedInput,
      completed: false,
      createdAt: new Date()
    };

    setTasks(prev => [...prev, newTask]);
    setInputValue('');
    setInputError('');
  };

  // Remove task
  const removeTask = (id) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  // Toggle task completion
  const toggleTask = (id) => {
    setTasks(prev => prev.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  // Handle input change
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    if (inputError) setInputError('');
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTask();
    }
  };

  // Filter tasks
  const getFilteredTasks = () => {
    switch (filter) {
      case 'active':
        return tasks.filter(task => !task.completed);
      case 'completed':
        return tasks.filter(task => task.completed);
      default:
        return tasks;
    }
  };

  // Sort tasks
  const getSortedTasks = (filteredTasks) => {
    switch (sortBy) {
      case 'oldest':
        return [...filteredTasks].sort((a, b) => a.createdAt - b.createdAt);
      case 'alphabetical':
        return [...filteredTasks].sort((a, b) => a.text.localeCompare(b.text));
      case 'newest':
      default:
        return [...filteredTasks].sort((a, b) => b.createdAt - a.createdAt);
    }
  };

  const displayedTasks = getSortedTasks(getFilteredTasks());
  const completedCount = tasks.filter(task => task.completed).length;
  const totalCount = tasks.length;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white min-h-screen">
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-6 mb-6 text-white">
        <h1 className="text-3xl font-bold mb-2">My To-Do List</h1>
        <p className="text-blue-100">
          {totalCount} total tasks • {completedCount} completed • {totalCount - completedCount} remaining
        </p>
      </div>

      {/* Add Task Section */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder="Enter a new task..."
            className={`flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
              inputError 
                ? 'border-red-300 focus:ring-red-500' 
                : 'border-gray-300 focus:ring-blue-500'
            }`}
            maxLength={100}
          />
          <button
            onClick={addTask}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors flex items-center gap-2"
          >
            <Plus size={18} />
            Add
          </button>
        </div>
        {inputError && (
          <p className="text-red-500 text-sm flex items-center gap-1">
            <X size={16} />
            {inputError}
          </p>
        )}
        <p className="text-gray-500 text-xs mt-1">
          {inputValue.length}/100 characters
        </p>
      </div>

      {/* Controls Section */}
      <div className="flex flex-wrap gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center gap-2">
          <Filter size={18} className="text-gray-600" />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-3 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Tasks</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        
        <div className="flex items-center gap-2">
          <ArrowUpDown size={18} className="text-gray-600" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="alphabetical">Alphabetical</option>
          </select>
        </div>
      </div>

      {/* Tasks List */}
      <div className="space-y-2">
        {displayedTasks.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <div className="text-6xl mb-4">📝</div>
            <p className="text-lg">
              {filter === 'active' ? 'No active tasks!' :
               filter === 'completed' ? 'No completed tasks yet.' :
               'No tasks yet. Add one above!'}
            </p>
          </div>
        ) : (
          displayedTasks.map(task => (
            <div
              key={task.id}
              className={`flex items-center gap-3 p-4 border rounded-lg transition-all hover:shadow-md ${
                task.completed 
                  ? 'bg-green-50 border-green-200' 
                  : 'bg-white border-gray-200 hover:border-blue-300'
              }`}
            >
              <button
                onClick={() => toggleTask(task.id)}
                className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                  task.completed
                    ? 'bg-green-500 border-green-500 text-white'
                    : 'border-gray-300 hover:border-green-400'
                }`}
              >
                {task.completed && <Check size={14} />}
              </button>
              
              <span
                className={`flex-1 transition-all ${
                  task.completed 
                    ? 'text-gray-500 line-through' 
                    : 'text-gray-900'
                }`}
              >
                {task.text}
              </span>
              
              <span className="text-xs text-gray-400 flex-shrink-0">
                {task.createdAt.toLocaleDateString()}
              </span>
              
              <button
                onClick={() => removeTask(task.id)}
                className="flex-shrink-0 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
                title="Delete task"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))
        )}
      </div>

      {/* Quick Actions */}
      {tasks.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-2 justify-center">
          <button
            onClick={() => setTasks(prev => prev.map(task => ({ ...task, completed: true })))}
            className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors text-sm"
          >
            Complete All
          </button>
          <button
            onClick={() => setTasks(prev => prev.filter(task => !task.completed))}
            className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-sm"
          >
            Clear Completed
          </button>
          <button
            onClick={() => setTasks([])}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm"
          >
            Clear All
          </button>
        </div>
      )}
    </div>
  );
};

export default TodoList;
