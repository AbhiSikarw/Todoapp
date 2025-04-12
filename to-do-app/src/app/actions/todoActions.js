'use server'

import { connectToDatabase } from '../lib/mongodb';
import { ObjectId } from 'mongodb';
import { revalidatePath } from 'next/cache';

export async function createTodo(formData) {
  try {
    const title = formData.get('title');
    const description = formData.get('description');
    
    if (!title) {
      return { error: 'Title is required' };
    }
    
    const { db } = await connectToDatabase();
    const collection = db.collection('todos');
    
    await collection.insertOne({
      title,
      description: description || '',
      date: new Date().toISOString(),
    });
    
    revalidatePath('/');
    return { success: true };
  } catch (error) {
    console.error('Error creating todo:', error);
    return { error: 'Failed to create todo' };
  }
}

export async function updateTodo(id, formData) {
  try {
    const title = formData.get('title');
    const description = formData.get('description');
    
    if (!title) {
      return { error: 'Title is required' };
    }
    
    if (!ObjectId.isValid(id)) {
      return { error: 'Invalid todo ID' };
    }
    
    const { db } = await connectToDatabase();
    const collection = db.collection('todos');
    
    await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { 
          title,
          description: description || '' 
        } 
      }
    );
    
    revalidatePath(`/todos/${id}`);
    revalidatePath('/');
    return { success: true };
  } catch (error) {
    console.error('Error updating todo:', error);
    return { error: 'Failed to update todo' };
  }
}

export async function deleteTodo(id) {
  try {
    if (!ObjectId.isValid(id)) {
      return { error: 'Invalid todo ID' };
    }
    
    const { db } = await connectToDatabase();
    const collection = db.collection('todos');
    
    await collection.deleteOne({ _id: new ObjectId(id) });
    
    revalidatePath('/');
    return { success: true };
  } catch (error) {
    console.error('Error deleting todo:', error);
    return { error: 'Failed to delete todo' };
  }
}