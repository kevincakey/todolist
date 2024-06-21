"use client";
import React, { useState } from "react";
import { supabase } from "../utils/supabaseClient";

const TodoItem: React.FC<TodoItemProps> = ({
  id,
  title,
  completed,
  onToggle,
  onEdit,
  onDelete,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);

  const handleEditClick = async () => {
    if (isEditing && newTitle.trim() !== "") {
      const { data, error } = await supabase
        .from("todos")
        .update({ title: newTitle })
        .eq("id", id);

      if (error) {
        console.error("Error updating todo title:", error);
      } else {
        onEdit(id, newTitle);
        setIsEditing(false);
      }
    } else {
      setIsEditing(true);
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.target.value);
  };

  const handleCancelEdit = () => {
    setNewTitle(title);
    setIsEditing(false);
  };

  return (
    <div style={styles.todoItem}>
      <input
        type="checkbox"
        checked={completed}
        onChange={() => onToggle(id)}
        style={styles.checkbox}
      />
      {isEditing ? (
        <input
          type="text"
          value={newTitle}
          onChange={handleTitleChange}
          style={styles.inputtitle}
        />
      ) : (
        <span
          style={{
            ...styles.title,
            textDecoration: completed ? "line-through" : "none",
          }}
        >
          {title}
        </span>
      )}
      <button onClick={handleEditClick} style={styles.editButton}>
        {isEditing ? "Save" : "Edit"}
      </button>
      {isEditing && (
        <button onClick={handleCancelEdit} style={styles.cancelButton}>
          Cancel
        </button>
      )}
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
  },
  checkbox: {
    marginRight: "10px",
  },
  inputtitle: {
    flexGrow: 1,
    marginRight: "10px",
    padding: "5px",
    color: "black",
  },
  title: {
    flexGrow: 1,
    marginRight: "10px",
    padding: "5px",
  },
  editButton: {
    backgroundColor: "blue",
    color: "white",
    border: "none",
    borderRadius: "4px",
    padding: "5px 10px",
    cursor: "pointer",
    marginRight: "10px",
  },
  cancelButton: {
    backgroundColor: "gray",
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
