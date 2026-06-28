import TaskCard from "./TaskCard";

function TaskList({ tasks, onDelete, onEdit, onStatusChange }) {
  if (tasks.length === 0) {
    return <p className="no-tasks">No tasks found. Add one above!</p>;
  }

  return (
    <div>
      {tasks.map((task) => (
        <TaskCard
          key={task._id}
          task={task}
          onDelete={onDelete}
          onEdit={onEdit}
          onStatusChange={onStatusChange}
        />
      ))}
    </div>
  );
}

export default TaskList;