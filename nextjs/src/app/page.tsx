'use client';

import { useState, useEffect } from 'react';
import { Todo } from '@/lib/database';
import AddTodoForm from '@/components/AddTodoForm';
import TodoList from '@/components/TodoList';

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch todos on component mount
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/todos');
      if (!response.ok) {
        throw new Error('Failed to fetch todos');
      }
      const data = await response.json();
      setTodos(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const addTodo = async (task: string) => {
    try {
      const formData = new FormData();
      formData.append('task', task);
      
      const response = await fetch('/api/add', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error('Failed to add todo');
      }
      
      const data = await response.json();
      setTodos(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add todo');
    }
  };

  const toggleTodo = async (id: number) => {
    try {
      const formData = new FormData();
      formData.append('id', id.toString());
      
      const response = await fetch('/api/toggle', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error('Failed to toggle todo');
      }
      
      const data = await response.json();
      setTodos(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to toggle todo');
    }
  };

  const deleteTodo = async (id: number) => {
    try {
      const formData = new FormData();
      formData.append('id', id.toString());
      
      const response = await fetch('/api/delete', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete todo');
      }
      
      const data = await response.json();
      setTodos(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete todo');
    }
  };

  if (loading) {
    return (
      <div className="p-8 bg-slate-950 text-white min-h-screen">
        <h1 className="text-2xl mb-4">My Todo List</h1>
        <div className="text-center text-gray-400 py-8">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 bg-slate-950 text-white min-h-screen">
      <h1 className="text-2xl mb-4">My Todo List</h1>
      
      {error && (
        <div className="mb-4 p-3 bg-red-900 border border-red-700 rounded text-red-200">
          {error}
        </div>
      )}
      
      <AddTodoForm onAdd={addTodo} />
      <TodoList todos={todos} onToggle={toggleTodo} onDelete={deleteTodo} />
    </div>
  );
}
