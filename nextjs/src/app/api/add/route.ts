import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/database';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const task = formData.get('task') as string;
    
    if (!task?.trim()) {
      return NextResponse.json({ error: 'Task is required' }, { status: 400 });
    }

    const db = getDatabase();
    await db.addTodo(task.trim());
    const todos = await db.getTodos();
    
    return NextResponse.json(todos);
  } catch (error) {
    console.error('Failed to add todo:', error);
    return NextResponse.json({ error: 'Failed to add todo' }, { status: 500 });
  }
} 