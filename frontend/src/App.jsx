import { useState, useEffect } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

function App() {
  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("newest");
  const [search, setSearch] = useState("");
  const [editTask, setEditTask] = useState(null);
  const [toast, setToast] = useState("");

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(""), 3000);
  };

  const fetchTasks = async () => {
    setLoading(true);
    const res = await fetch("https://task-tracker-k6u4.onrender.com/api/tasks");
    const data = await res.json();
    setTasks(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleTaskAdded = (newTask) => {
    setTasks((prev) => [newTask, ...prev]);
    showToast("Task added successfully!");
  };

  const handleTaskUpdated = (updatedTask) => {
    setTasks((prev) =>
      prev.map((t) => (t._id === updatedTask._id ? updatedTask : t))
    );
    setEditTask(null);
    showToast("Task updated successfully!");
  };

  const handleDelete = async (id) => {
    await fetch(`https://task-tracker-k6u4.onrender.com/api/tasks/${id}`, { method: "DELETE" });
    setTasks((prev) => prev.filter((t) => t._id !== id));
    showToast("Task deleted!");
  };

  const handleStatusChange = async (id, newStatus) => {
    const res = await fetch(`https://task-tracker-k6u4.onrender.com/api/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });
    const updated = await res.json();
    setTasks((prev) => prev.map((t) => (t._id === updated._id ? updated : t)));
    showToast("Status updated!");
  };

  // Filter
  const filteredTasks = filter === "all"
    ? tasks
    : tasks.filter((t) => t.status === filter);

  // Search
  const searchedTasks = filteredTasks.filter((t) =>
    t.title.toLowerCase().includes(search.toLowerCase())
  );

  // Sort
  const sortedTasks = [...searchedTasks].sort((a, b) => {
    if (sort === "newest") return new Date(b.createdAt) - new Date(a.createdAt);
    if (sort === "oldest") return new Date(a.createdAt) - new Date(b.createdAt);
    return 0;
  });

  // Stats
  const total = tasks.length;
  const todoCount = tasks.filter((t) => t.status === "todo").length;
  const progressCount = tasks.filter((t) => t.status === "in-progress").length;
  const doneCount = tasks.filter((t) => t.status === "done").length;

  return (
    <>
      <div className="header">
        <div>
          <h1>Task Tracker</h1>
        </div>
      </div>

      <div className="container">
        {/* Stats */}
        <div className="stats">
          <div className="stat-card total">
            <div className="stat-number">{total}</div>
            <div className="stat-label">Total</div>
          </div>
          <div className="stat-card todo">
            <div className="stat-number">{todoCount}</div>
            <div className="stat-label">Todo</div>
          </div>
          <div className="stat-card progress">
            <div className="stat-number">{progressCount}</div>
            <div className="stat-label">In Progress</div>
          </div>
          <div className="stat-card done">
            <div className="stat-number">{doneCount}</div>
            <div className="stat-label">Done</div>
          </div>
        </div>

        {/* Form */}
        <TaskForm
          onTaskAdded={handleTaskAdded}
          editTask={editTask}
          onTaskUpdated={handleTaskUpdated}
          onCancel={() => setEditTask(null)}
        />

        {/* Controls */}
        <div className="controls">
          <div className="filters">
            {["all", "todo", "in-progress", "done"].map((f) => (
              <button
                key={f}
                className={filter === f ? "active" : ""}
                onClick={() => {
                  setFilter(f);
                  setEditTask(null);
                }}
              >
                {f === "in-progress"
                  ? "In Progress"
                  : f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>

          <input
            className="search-input"
            type="text"
            placeholder="🔍 Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="sort-select"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>

        {loading ? (
          <div className="spinner-container">
            <div className="spinner"></div>
          </div>
        ) : (
          <TaskList
            tasks={sortedTasks}
            onDelete={handleDelete}
            onEdit={setEditTask}
            onStatusChange={handleStatusChange}
          />
        )}

        {toast && <div className="toast">{toast}</div>}
      </div>
    </>
  );
}

export default App;