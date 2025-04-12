import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import { connectToDatabase } from '../../../lib/mongodb';

export async function GET(request, { params }) {
  try {
    const id = params.id;
    
    // Validate the id
    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'Invalid todo ID' },
        { status: 400 }
      );
    }

    const { db } = await connectToDatabase();
    const collection = db.collection('todos');

    // Find the todo
    const todo = await collection.findOne({ _id: new ObjectId(id) });

    if (!todo) {
      return NextResponse.json(
        { error: 'Todo not found' },
        { status: 404 }
      );
    }

    // Convert MongoDB ObjectId to string
    const serializedTodo = {
      ...todo,
      _id: todo._id.toString()
    };

    return NextResponse.json(serializedTodo);
  } catch (error) {
    console.error('Error fetching todo:', error);
    return NextResponse.json(
      { error: 'Failed to fetch todo' },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const id = params.id;
    const { title, description } = await request.json();
    
    // Validate the id
    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'Invalid todo ID' },
        { status: 400 }
      );
    }

    // Basic validation
    if (!title) {
      return NextResponse.json(
        { error: 'Title is required' },
        { status: 400 }
      );
    }

    const { db } = await connectToDatabase();
    const collection = db.collection('todos');

    // Update the todo
    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { title, description: description || '' } }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: 'Todo not found' },
        { status: 404 }
      );
    }

    // Get the updated todo
    const updatedTodo = await collection.findOne({ _id: new ObjectId(id) });
    
    // Convert MongoDB ObjectId to string
    const serializedTodo = {
      ...updatedTodo,
      _id: updatedTodo._id.toString()
    };

    return NextResponse.json(serializedTodo);
  } catch (error) {
    console.error('Error updating todo:', error);
    return NextResponse.json(
      { error: 'Failed to update todo' },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const id = params.id;
    
    // Validate the id
    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'Invalid todo ID' },
        { status: 400 }
      );
    }

    const { db } = await connectToDatabase();
    const collection = db.collection('todos');

    // Delete the todo
    const result = await collection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: 'Todo not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting todo:', error);
    return NextResponse.json(
      { error: 'Failed to delete todo' },
      { status: 500 }
    );
  }
}