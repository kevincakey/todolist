"use client"; // Required to use client-side hooks or interactivity

import React from "react";

interface TodoItemProps {
  id: string;
  title: string;
  completed: boolean;
  onDelete?: (id: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
  id,
  title,
  completed,
  onDelete,
}) => {
  return (
    <div style={styles.todoItem}>
      {title}
      {onDelete && (
        <button onClick={() => onDelete(id)} style={styles.deleteButton}>
          Delete
        </button>
      )}
    </div>
  );
};

const styles = {
  todoItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px",
    borderBottom: "1px solid #ddd",
  },
  checkbox: {
    marginRight: "10px",
  },
  title: {
    flexGrow: 1,
  },
  deleteButton: {
    backgroundColor: "red",
    color: "white",
    border: "none",
    borderRadius: "4px",
    padding: "5px 10px",
    cursor: "pointer",
  },
};

export default TodoItem;
