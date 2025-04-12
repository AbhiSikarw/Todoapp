'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import EditTodoForm from './EditTodoForm';
import { deleteTodo } from '../actions/todoActions';

export default function TodoActions({ todo }) {
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();
  
  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this todo?')) {
      const result = await deleteTodo(todo._id);
      if (result.success) {
        router.push('/');
      }
    }
  };
  
  if (isEditing) {
    return (
      <EditTodoForm 
        todo={todo}
        onCancel={() => setIsEditing(false)}
      />
    );
  }
  
  return (
    <>
      <button 
        className="delete-button" 
        onClick={handleDelete}
      >
        🗑️
      </button>
      
      <div className="toolbar">
        <button onClick={() => setIsEditing(true)}>Edit</button>
      </div>
    </>
  );
}