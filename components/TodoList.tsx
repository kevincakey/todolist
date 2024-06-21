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
      // Assuming id is a number
      setTodos((data || []).sort((a, b) => a.id - b.id));
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

  const toggleTodo = async (id: string) => {
    const todo = todos.find((t) => t.id === id);
    if (todo) {
      const { data, error } = await supabase
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
    // Update the todo in the database
    const { data, error } = await supabase
      .from("todos")
      .update({ title: newTitle })
      .eq("id", id);

    if (error) {
      console.error("Error updating todo title:", error);
      return;
    }

    // Update the local state to reflect the new title, preserving order
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
            onToggle={toggleTodo}
            onEdit={editTodo}
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
    color: "black",
  },
  addButton: {
    backgroundColor: "green",
    color: "white",
    border: "none",
    borderRadius: "4px",
    padding: "10px 20px",
    cursor: "pointer",
  },
  listContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
};

export default TodoList;
