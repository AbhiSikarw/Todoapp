import { connectToDatabase } from './lib/mongodb';
import TodoList from './components/TodoList';
import CreateTodoButton from './components/CreateTodoButton';

// Number of todos per page
const LIMIT = 8;

export default async function Home({ searchParams }) {
  const page = Number(searchParams?.page) || 1;
  
  // Get todos with pagination
  const { db } = await connectToDatabase();
  const skip = (page - 1) * LIMIT;
  
  const todos = await db.collection('todos')
    .find({})
    .sort({ date: -1 })
    .skip(skip)
    .limit(LIMIT)
    .toArray();
  
  const totalCount = await db.collection('todos').countDocuments();
  const totalPages = Math.ceil(totalCount / LIMIT);

  // Convert MongoDB ObjectId to string
  const serializedTodos = todos.map(todo => ({
    ...todo,
    _id: todo._id.toString()
  }));
  
  return (
    <main>
      <div className="todo-container">
        <div className="todo-list-container">
          <CreateTodoButton />
          <TodoList 
            todos={serializedTodos} 
            page={page} 
            totalPages={totalPages} 
          />
        </div>
        
        <div className="todo-detail">
          <h2>Select a todo to view details</h2>
        </div>
      </div>
    </main>
  );
}