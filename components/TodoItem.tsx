"use client"; // Required to use client-side hooks or interactivity

import React from "react";

const TodoItem: React.FC<TodoItemProps> = ({
  id,
  title,
  completed,
  onToggle,
  onEdit,
  onDelete,
}) => {
  return (
    <div style={styles.todoItem}>
      <input
        type="checkbox"
        checked={completed}
        onChange={() => onToggle(id)}
        style={styles.checkbox}
      />
      <span
        style={{
          ...styles.title,
          textDecoration: completed ? "line-through" : "none",
        }}
      >
        {title}
      </span>
      <button onClick={() => onEdit(id)} style={styles.editButton}>
        Save Edit
      </button>
      <button onClick={() => onDelete(id)} style={styles.deleteButton}>
        Delete
      </button>
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
  editButton: {
    backgroundColor: "blue",
    color: "white",
    border: "none",
    borderRadius: "4px",
    padding: "5px 10px",
    cursor: "pointer",
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
