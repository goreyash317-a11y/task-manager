import TaskItem from './TaskItem';
import './Tasks.css';

const TaskList = ({ tasks, onUpdate, onDelete }) => {
  if (tasks.length === 0) {
    return <p style={{ textAlign: 'center', color: '#999', padding: '40px' }}>No tasks found. Create one to get started!</p>;
  }

  return (
    <ul className="task-list">
      {tasks.map(task => (
        <TaskItem key={task._id} task={task} onUpdate={onUpdate} onDelete={onDelete} />
      ))}
    </ul>
  );
};

export default TaskList;