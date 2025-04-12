import TodoItem from './TodoItem';
import Link from 'next/link';

export default function TodoList({ todos, selectedTodoId, page, totalPages }) {
  return (
    <div className="todo-list">
      <div className="search-container">
        <input type="text" placeholder="Search todos..." />
        <span className="search-icon">🔍</span>
      </div>
      
      {todos.length === 0 ? (
        <p>No todos found. Create a new one!</p>
      ) : (
        <>
          {todos.map((todo) => (
            <TodoItem 
              key={todo._id.toString()} 
              todo={todo}
              isSelected={selectedTodoId === todo._id.toString()}
            />
          ))}
          
          {totalPages > 1 && (
            <div className="pagination">
              <Link 
                href={page > 1 ? `/?page=${page - 1}` : ''}
                className={page <= 1 ? 'disabled' : ''}
              >
                Prev
              </Link>
              
              {[...Array(totalPages)].map((_, index) => (
                <Link
                  key={index}
                  href={`/?page=${index + 1}`}
                  className={page === index + 1 ? 'active' : ''}
                >
                  {index + 1}
                </Link>
              ))}
              
              <Link 
                href={page < totalPages ? `/?page=${page + 1}` : ''}
                className={page >= totalPages ? 'disabled' : ''}
              >
                Next
              </Link>
            </div>
          )}
        </>
      )}
    </div>
  );
}