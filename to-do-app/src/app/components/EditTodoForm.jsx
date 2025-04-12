'use client'

import { useState } from 'react';
import { updateTodo } from '../actions/todoActions';

export default function EditTodoForm({ todo, onCancel }) {
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    
    const result = await updateTodo(todo._id, formData);
    
    if (result.success) {
      onCancel();
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Todo title"
          required
        />
      </div>
      
      <div className="form-group">
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Todo description"
        />
      </div>
      
      <div className="form-actions">
        <button 
          type="submit"
          className="btn btn-primary"
        >
          Save
        </button>
        <button 
          type="button"
          className="btn btn-secondary"
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
