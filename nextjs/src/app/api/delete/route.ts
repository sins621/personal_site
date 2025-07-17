import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/database';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const idStr = formData.get('id') as string;
    
    if (!idStr) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }
    
    const id = parseInt(idStr, 10);
    if (isNaN(id)) {
      return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
    }

    const db = getDatabase();
    await db.deleteTodo(id);
    const todos = await db.getTodos();
    
    return NextResponse.json(todos);
  } catch (error) {
    console.error('Failed to delete todo:', error);
    return NextResponse.json({ error: 'Failed to delete todo' }, { status: 500 });
  }
} 