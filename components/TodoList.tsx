"use client";
import React, { useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient";
import TodoItem from "./TodoItem";

// Define the type for the todo items
interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const { data, error } = await supabase.from("todos").select("*");
    if (error) {
      console.error("Error fetching todos:", error);
    } else {
      setTodos((data || []).sort((a, b) => a.id.localeCompare(b.id)));
    }
  };

  const addTodo = async () => {
    if (newTodo.trim() === "") return;

    const { error } = await supabase
      .from("todos")
      .insert([{ title: newTodo, completed: false }]);
    if (error) {
      console.error("Error adding todo:", error);
    } else {
      fetchTodos();
      setNewTodo("");
    }
  };

  const toggleTodo = async (id: string) => {
    const todo = todos.find((t) => t.id === id);
    if (todo) {
      const { error } = await supabase
        .from("todos")
        .update({ completed: !todo.completed })
        .eq("id", id);
      if (error) {
        console.error("Error updating todo:", error);
      } else {
        setTodos(
          todos.map((t) =>
            t.id === id ? { ...t, completed: !t.completed } : t
          )
        );
      }
    }
  };

  const editTodo = async (id: string, newTitle: string) => {
    const { error } = await supabase
      .from("todos")
      .update({ title: newTitle })
      .eq("id", id);

    if (error) {
      console.error("Error updating todo title:", error);
      return;
    }
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, title: newTitle } : todo
      )
    );
  };

  const deleteTodo = async (id: string) => {
    const { error } = await supabase.from("todos").delete().eq("id", id);
    if (error) {
      console.error("Error deleting todo:", error);
    } else {
      setTodos(todos.filter((t) => t.id !== id));
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-5">
      <h1 className="text-2xl font-bold mb-5">To-Do List</h1>
      <div className="flex mb-5">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Enter new todo"
          className="flex-grow p-2 border text-black border-gray-300 rounded mr-2"
        />
        <button
          onClick={addTodo}
          className="bg-green-500 text-white rounded px-4 py-2 hover:bg-green-600 transition"
        >
          Add
        </button>
      </div>
      <div className="flex flex-col gap-3">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            id={todo.id}
            title={todo.title}
            completed={todo.completed}
            onToggle={toggleTodo}
            onEdit={editTodo}
            onDelete={deleteTodo}
          />
        ))}
      </div>
    </div>
  );
};

export default TodoList;
