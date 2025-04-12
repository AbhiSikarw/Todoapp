export default function TodoItem({ todo, isSelected }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.toLocaleDateString()}`;
  };
  
  return (
    <a 
      href={`/todos/${todo._id}`}
      className={`todo-item ${isSelected ? 'selected' : ''}`}
      style={{ textDecoration: 'none', color: 'inherit' }}
    >
      <h3>{todo.title}</h3>
      <p>{todo.description}</p>
      <div className="date">{formatDate(todo.date)}</div>
    </a>
  );
}