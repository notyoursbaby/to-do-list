# React To-Do List Application

A feature-rich, responsive To-Do List application built with React and Tailwind CSS.

## Features

### Core Functionality
- ✅ Add new tasks with validation
- ✅ Mark tasks as complete/incomplete
- ✅ Remove individual tasks
- ✅ Dynamic task display with real-time updates

### Advanced Features
- 🔍 **Filtering**: View all, active, or completed tasks
- 🔤 **Sorting**: Sort by newest, oldest, or alphabetical order
- 📊 **Statistics**: Track total, completed, and remaining tasks
- ✏️ **Input Validation**: 
  - Empty task prevention
  - Minimum length (2 characters)
  - Maximum length (100 characters)
  - Duplicate task prevention
- 🎨 **Responsive Design**: Works on desktop and mobile
- ⚡ **Quick Actions**: Complete all, clear completed, clear all

### LocalStorage Integration (for your implementation)
The component is designed to work with localStorage. To enable persistence:

```javascript
// Add this useEffect to load from localStorage
useEffect(() => {
  const savedTasks = localStorage.getItem('todoTasks');
  if (savedTasks) {
    setTasks(JSON.parse(savedTasks));
  }
}, []);

// Add this useEffect to save to localStorage
useEffect(() => {
  localStorage.setItem('todoTasks', JSON.stringify(tasks));
}, [tasks]);
```


## Testing Guidance

### Manual Testing Checklist

#### Basic Functionality
- [ ] **Add Task**: Enter text and click "Add" or press Enter
- [ ] **Add Empty Task**: Try adding empty/whitespace-only task (should show error)
- [ ] **Add Short Task**: Try adding 1-character task (should show error)
- [ ] **Add Long Task**: Try adding 100+ character task (should show error)
- [ ] **Add Duplicate**: Try adding same task twice (should show error)
- [ ] **Complete Task**: Click circle button to mark as complete
- [ ] **Uncomplete Task**: Click completed task circle to mark as active
- [ ] **Delete Task**: Click trash icon to remove task

#### Advanced Features
- [ ] **Filter All**: Should show all tasks
- [ ] **Filter Active**: Should show only incomplete tasks
- [ ] **Filter Completed**: Should show only completed tasks
- [ ] **Sort Newest**: Tasks ordered by creation date (newest first)
- [ ] **Sort Oldest**: Tasks ordered by creation date (oldest first)
- [ ] **Sort Alphabetical**: Tasks ordered alphabetically
- [ ] **Quick Actions**: Test "Complete All", "Clear Completed", "Clear All"

#### UI/UX Testing
- [ ] **Responsive Design**: Test on different screen sizes
- [ ] **Visual States**: Completed tasks have different styling
- [ ] **Statistics**: Counter updates correctly
- [ ] **Empty States**: Appropriate messages when no tasks match filter
- [ ] **Character Counter**: Shows current/max characters while typing

### Automated Testing (Recommended)

Create test files using Jest and React Testing Library:

```javascript
// TodoList.test.js
import { render, screen, fireEvent } from '@testing-library/react';
import TodoList from './TodoList';

describe('TodoList Component', () => {
  test('renders todo list title', () => {
    render(<TodoList />);
    expect(screen.getByText('My To-Do List')).toBeInTheDocument();
  });

  test('adds a new task', () => {
    render(<TodoList />);
    const input = screen.getByPlaceholderText('Enter a new task...');
    const addButton = screen.getByText('Add');
    
    fireEvent.change(input, { target: { value: 'Test task' } });
    fireEvent.click(addButton);
    
    expect(screen.getByText('Test task')).toBeInTheDocument();
  });

  test('validates empty task input', () => {
    render(<TodoList />);
    const addButton = screen.getByText('Add');
    
    fireEvent.click(addButton);
    
    expect(screen.getByText('Task cannot be empty')).toBeInTheDocument();
  });

  test('toggles task completion', () => {
    render(<TodoList />);
    const checkbox = screen.getAllByRole('button')[1]; // First task checkbox
    
    fireEvent.click(checkbox);
    
    // Check if task styling changed (implementation-specific)
  });
});
```

## Project Structure

```
src/
├── components/
│   └── TodoList.js          # Main component
├── styles/
│   └── tailwind.config.js   # Tailwind configuration
├── App.js                   # App entry point
└── index.js                 # React entry point
```



## Performance Considerations

- Uses React hooks for optimal re-rendering
- Efficient filtering and sorting algorithms
- Minimal DOM manipulations
- Responsive design with CSS optimizations

## Browser Compatibility

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Android Chrome)
- Requires ES6+ support

## Contributing

1. Fork the repository
2. Create your feature branch
3. Follow the testing guidelines
4. Submit a pull request with clear description

## License

MIT License - feel free to use this project for learning and development.
