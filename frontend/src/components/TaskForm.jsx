import { useState, useEffect } from "react";

function TaskForm({ onTaskAdded, editTask, onTaskUpdated, onCancel }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("todo");
  const [error, setError] = useState("");

  useEffect(() => {
    if (editTask) {
      setTitle(editTask.title);
      setDescription(editTask.description || "");
      setStatus(editTask.status);
    } else {
      setTitle("");
      setDescription("");
      setStatus("todo");
    }
  }, [editTask]);

  const handleSubmit = async () => {
    if (!title.trim()) {
      setError("Title is required");
      return;
    }

    const taskData = { title, description, status };

    if (editTask) {
      const res = await fetch(`https://task-tracker-k6u4.onrender.com/api/tasks/${editTask._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(taskData),
      });
      const updated = await res.json();
      onTaskUpdated(updated);
    } else {
      const res = await fetch("https://task-tracker-k6u4.onrender.com/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(taskData),
      });
      const created = await res.json();
      onTaskAdded(created);
    }

    setError("");
  };

  return (
    <div className="task-form">
      {error && <p className="error">{error}</p>}
      <input
        type="text"
        placeholder="Task title *"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={3}
      />
      <div className="form-row">
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="todo">Todo</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>
      </div>
      {editTask && (
        <button className="cancel-btn" onClick={onCancel}>
          Cancel
        </button>
      )}
      <button onClick={handleSubmit}>
        {editTask ? "Update Task" : "Add Task"}
      </button>
    </div>
  );
}

export default TaskForm;