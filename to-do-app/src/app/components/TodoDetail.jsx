// app/components/TodoDetail.jsx
'use client'

import Link from 'next/link';
import TodoActions from './TodoActions';
import { useEffect } from 'react';

export default function TodoDetail({ todo, isDetailPage }) {
  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  // Set body class for mobile view control
  useEffect(() => {
    if (isDetailPage) {
      document.body.classList.add('detail-view');
      document.body.classList.remove('list-view');
    } else {
      document.body.classList.add('list-view');
      document.body.classList.remove('detail-view');
    }

    // Cleanup when component unmounts
    return () => {
      document.body.classList.remove('detail-view');
      document.body.classList.remove('list-view');
    };
  }, [isDetailPage]);
  
  if (!todo) {
    return (
      <div className="todo-detail">
        <h2>Select a todo to view details</h2>
      </div>
    );
  }

  return (
    <div className="todo-detail">
      {isDetailPage && (
        <Link href="/" className="back-button">
          ← Back
        </Link>
      )}

      <h2>{todo.title}</h2>
      <p>{todo.description}</p>
      <div className="date">{formatDate(todo.date)}</div>
      
      {/* Show formatting toolbar when editing is needed */}
      {isDetailPage && (
        <div className="formatting-toolbar">
          <button>B</button>
          <button>I</button>
          <button>U</button>
          <button>S</button>
          <button>≡</button>
          <button>•</button>
          <button>1.</button>
          <button>↓</button>
          <button>T</button>
        </div>
      )}
      
      <TodoActions todo={todo} />
    </div>
  );
}