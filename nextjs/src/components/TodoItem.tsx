'use client';

import { Todo } from '@/lib/database';
import { useState } from 'react';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

export default function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleToggle = async () => {
    onToggle(todo.id);
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this todo?')) {
      setIsDeleting(true);
      onDelete(todo.id);
    }
  };

  return (
    <li className="flex items-center justify-between p-3 border border-gray-700 rounded-md bg-slate-800">
      <button 
        onClick={handleToggle}
        className="flex items-center justify-between w-full text-left"
      >
        <span className={`${todo.done ? 'line-through text-gray-500' : 'text-white'}`}>
          {todo.task}
        </span>
        <span className={`text-sm ${todo.done ? 'text-green-400' : 'text-yellow-400'} font-medium`}>
          {todo.done ? '✓ Done' : '⏳ Pending'}
        </span>
      </button>
      <button
        onClick={handleDelete}
        disabled={isDeleting}
        className="text-red-400 hover:text-red-300 px-2 py-1 rounded ml-2"
      >
        ✕
      </button>
    </li>
  );
} 