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
    <div className="flex items-center justify-between p-2 border-b border-gray-300">
      <input
        type="checkbox"
        checked={completed}
        onChange={() => onToggle(id)}
        className="mr-2"
      />
      {isEditing ? (
        <input
          type="text"
          value={newTitle}
          onChange={handleTitleChange}
          className="flex-grow mr-2 px-2 py-1 border border-gray-300 rounded text-black"
        />
      ) : (
        <span
          className={`flex-grow mr-2 px-2 py-1 ${
            completed ? "line-through" : ""
          }`}
        >
          {title}
        </span>
      )}
      <button
        onClick={handleEditClick}
        className="bg-blue-500 text-white rounded px-3 py-1 mr-2 hover:bg-blue-600 transition"
      >
        {isEditing ? "Save" : "Edit"}
      </button>
      {isEditing && (
        <button
          onClick={handleCancelEdit}
          className="bg-gray-500 text-white rounded px-3 py-1 mr-2 hover:bg-gray-600 transition"
        >
          Cancel
        </button>
      )}
      <button
        onClick={() => onDelete(id)}
        className="bg-red-500 text-white rounded px-3 py-1 hover:bg-red-600 transition"
      >
        Delete
      </button>
    </div>
  );
};

export default TodoItem;
