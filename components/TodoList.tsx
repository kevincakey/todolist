"use client"; // Required to use client-side hooks or interactivity

import React, { useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient";
import TodoItem from "./TodoItem";

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
      setTodos(data || []);
    }
  };

  const addTodo = async () => {
    if (newTodo.trim() === "") return;

    const { data, error } = await supabase
      .from("todos")
      .insert([{ title: newTodo, completed: false }]);
    if (error) {
      console.error("Error adding todo:", error);
    } else {
      setTodos([...todos, ...(data || [])]);
      fetchTodos();
      setNewTodo("");
    }
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
    <div style={styles.container}>
      <h1>To-Do List</h1>
      <div style={styles.inputContainer}>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Enter new todo"
          style={styles.input}
        />
        <button onClick={addTodo} style={styles.addButton}>
          Add
        </button>
      </div>
      <div style={styles.listContainer}>
        {todos.map((todo) => (
          <TodoItem
            id={todo.id}
            title={todo.title}
            completed={todo.completed}
            onDelete={deleteTodo}
          />
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    width: "400px",
    margin: "auto",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
  },
  inputContainer: {
    display: "flex",
    marginBottom: "20px",
  },
  input: {
    flexGrow: 1,
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #ddd",
    marginRight: "10px",
  },
  addButton: {
    padding: "10px",
    borderRadius: "4px",
    border: "none",
    backgroundColor: "green",
    color: "white",
    cursor: "pointer",
  },
  listContainer: {
    marginTop: "20px",
  },
};

export default TodoList;
