import { useState } from 'react';
import './App.css'
import TodoForm from './components/Todo/TodoForm';

function App() {
  const handleAddTodo = (todoData) => {
    console.log('Nueva tarea creada:', todoData);
    console.log('Texto:', todoData.text);
    console.log('Prioridad:', todoData.priority);
    console.log('Fecha límite:', todoData.deadline);
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '2rem'
    }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <TodoForm onAddTodo={handleAddTodo} />
      </div>
    </div>
  );
}

export default App;
