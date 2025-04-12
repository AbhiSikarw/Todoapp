import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../lib/mongodb';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '8');
    const skip = (page - 1) * limit;

    const { db } = await connectToDatabase();
    const collection = db.collection('todos');

    // Get todos with pagination
    const todos = await collection
      .find({})
      .sort({ date: -1 }) // Sort by date, newest first
      .skip(skip)
      .limit(limit)
      .toArray();
      
    // Convert MongoDB ObjectIds to strings
    const serializedTodos = todos.map(todo => ({
      ...todo,
      _id: todo._id.toString()
    }));
      
    // Get total count for pagination
    const total = await collection.countDocuments();

    return NextResponse.json({ todos: serializedTodos, total });
  } catch (error) {
    console.error('Error fetching todos:', error);
    return NextResponse.json(
      { error: 'Failed to fetch todos' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const { title, description, date } = await request.json();

    // Basic validation
    if (!title) {
      return NextResponse.json(
        { error: 'Title is required' },
        { status: 400 }
      );
    }

    const { db } = await connectToDatabase();
    const collection = db.collection('todos');

    // Create new todo
    const result = await collection.insertOne({
      title,
      description: description || '',
      date: date || new Date().toISOString(),
    });

    return NextResponse.json(
      { id: result.insertedId.toString(), success: true },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating todo:', error);
    return NextResponse.json(
      { error: 'Failed to create todo' },
      { status: 500 }
    );
  }
}