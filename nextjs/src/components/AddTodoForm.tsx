'use client';

import { useState } from 'react';

interface AddTodoFormProps {
  onAdd: (task: string) => void;
}

export default function AddTodoForm({ onAdd }: AddTodoFormProps) {
  const [task, setTask] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!task.trim()) return;

    setIsSubmitting(true);
    try {
      await onAdd(task.trim());
      setTask(''); // Clear input after successful add
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        className="border border-gray-700 rounded bg-slate-900 p-2 mr-2"
        placeholder="New task"
        required
        disabled={isSubmitting}
      />
      <button
        type="submit"
        disabled={isSubmitting || !task.trim()}
        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Adding...' : 'Add'}
      </button>
    </form>
  );
} 