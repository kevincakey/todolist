import { createClient } from "@/utils/supabase/server";
import Todo from "../types";

export default async function Index() {
  const supabase = createClient();

  // Fetch data from the 'todos' table
  const { data: todos } = await supabase.from("todos").select();

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
