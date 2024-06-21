import { createClient } from "@/utils/supabase/server";
import TodoItem from "../components/TodoItem";
import TodoList from "../components/TodoList";
import Todo from "../types";

export default async function Index() {
  const supabase = createClient();

  // Fetch data from the 'todos' table
  const { data: todos } = await supabase.from("todos").select();

  return (
    <div>
      <TodoList />
    </div>
  );
}
