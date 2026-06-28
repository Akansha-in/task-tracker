function TaskCard({ task, onDelete, onEdit, onStatusChange }) {
  return (
    <div className="task-card">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h3>{task.title}</h3>
        <span className={`badge ${task.status}`}>
          {task.status === "in-progress" ? "In Progress" : task.status.charAt(0).toUpperCase() + task.status.slice(1)}
        </span>
      </div>

      {task.description && <p>{task.description}</p>}
      <div style={{ marginBottom: "12px" }}>
        <span className={`priority-badge ${task.priority}`}>
          {task.priority === "high" ? "🔴 High" : task.priority === "medium" ? "🟡 Medium" : "🟢 Low"}
        </span>
      </div>

      <div className="actions">
        <select
          value={task.status}
          onChange={(e) => onStatusChange(task._id, e.target.value)}
        >
          <option value="todo">Todo</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>

        <button className="btn-edit" onClick={() => onEdit(task)}>
          Edit
        </button>
        <button className="btn-delete" onClick={() => onDelete(task._id)}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default TaskCard;