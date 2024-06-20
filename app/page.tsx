import { createClient } from "@/utils/supabase/server"; // Adjust the import as necessary based on your project structure

// Define the Todo type
interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

export default async function Index() {
  const supabase = createClient();

  // Fetch data from the 'todos' table
  const { data: todos, error } = await supabase.from("todos").select();

  // Check for errors
  if (error) {
    console.error("Error fetching todos list:", error);
    return <div>Error loading todos.</div>;
  }

  // Ensure 'todos' is defined and an array
  if (!todos) {
    return <div>No todos found.</div>;
  }

  if (todos.length === 0) {
    return <div>0 todos found.</div>;
  }

  // Render the list of todos
  return (
    <div>
      <h1>Todos List</h1>
      {todos.map((todo: Todo) => (
        <div key={todo.id}>
          <h2>{todo.title}</h2>
          <p>Status: {todo.completed ? "Completed" : "Pending"}</p>
        </div>
      ))}
    </div>
  );
}
