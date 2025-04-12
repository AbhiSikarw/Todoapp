import { notFound } from 'next/navigation';
import { connectToDatabase } from '../../lib/mongodb';
import { ObjectId } from 'mongodb';
import TodoList from '../../components/TodoList';
import CreateTodoButton from '../../components/CreateTodoButton';
import TodoActions from '../../components/TodoActions';

// Number of todos per page
const LIMIT = 8;

export default async function TodoPage({ params, searchParams }) {
  const page = Number(searchParams?.page) || 1;
  const id = params.id;
  
  if (!ObjectId.isValid(id)) {
    notFound();
  }
  
  // Connect to database
  const { db } = await connectToDatabase();
  
  // Get the selected todo
  const todo = await db.collection('todos').findOne({
    _id: new ObjectId(id)
  });
  
  if (!todo) {
    notFound();
  }
  
  // Serialize the todo
  const serializedTodo = {
    ...todo,
    _id: todo._id.toString()
  };
  
  // Get todos for the sidebar with pagination
  const skip = (page - 1) * LIMIT;
  const todos = await db.collection('todos')
    .find({})
    .sort({ date: -1 })
    .skip(skip)
    .limit(LIMIT)
    .toArray();
  
  const totalCount = await db.collection('todos').countDocuments();
  const totalPages = Math.ceil(totalCount / LIMIT);
  
  // Serialize the todos list
  const serializedTodos = todos.map(todo => ({
    ...todo,
    _id: todo._id.toString()
  }));
  
  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };
  
  return (
    <main>
      <div className="todo-container">
        <div className="todo-list-container">
          <CreateTodoButton />
          <TodoList 
            todos={serializedTodos} 
            selectedTodoId={id}
            page={page} 
            totalPages={totalPages} 
          />
        </div>
        
        <div className="todo-detail">
          <h2>{serializedTodo.title}</h2>
          <p>{serializedTodo.description}</p>
          <div className="date">{formatDate(serializedTodo.date)}</div>
          
          <TodoActions todo={serializedTodo} />
        </div>
      </div>
    </main>
  );
}
