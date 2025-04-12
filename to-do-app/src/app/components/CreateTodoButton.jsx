'use client'

import { useState } from 'react';
import { createTodo } from '../actions/todoActions';

export default function CreateTodoButton() {
  const [isCreating, setIsCreating] = useState(false);
  
  const handleCreateFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const result = await createTodo(formData);
    
    if (result.success) {
      setIsCreating(false);
      e.target.reset();
    }
  };
  
  if (!isCreating) {
    return (
      <button 
        onClick={() => setIsCreating(true)}
        className="btn btn-dark"
      >
        <span>+</span> TODO
      </button>
    );
  }
  
  return (
    <div className="create-form">
      <form onSubmit={handleCreateFormSubmit}>
        <div className="form-group">
          <input
            type="text"
            name="title"
            placeholder="Todo title"
            required
          />
        </div>
        
        <div className="form-group">
          <textarea
            name="description"
            placeholder="Todo description"
          />
        </div>
        
        <div className="form-actions">
          <button 
            type="submit"
            className="btn btn-primary"
          >
            Create
          </button>
          <button 
            type="button"
            className="btn btn-secondary"
            onClick={() => setIsCreating(false)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}