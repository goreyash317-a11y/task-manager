import { useState } from 'react';
import './Tasks.css';

const TaskItem = ({ task, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description || '');
  const [priority, setPriority] = useState(task.priority || 'medium');
  const [deadline, setDeadline] = useState(task.deadline ? task.deadline.split('T')[0] : '');

  const handleSave = () => {
    onUpdate(task._id, { title, description, priority, deadline });
    setIsEditing(false);
  };

  const handleComplete = () => {
    onUpdate(task._id, { status: task.status === 'completed' ? 'pending' : 'completed' });
  };

  const getPriorityBadge = (priority) => {
    return `badge-${priority}`;
  };

  const getStatusBadge = (status) => {
    return `badge-${status}`;
  };

  return (
    <li className={`task-item ${task.status}`}>
      {isEditing ? (
        <div className="edit-form">
          <div className="form-group">
            <label htmlFor="edit-title">Title</label>
            <input 
              id="edit-title"
              type="text" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
            />
          </div>
          <div className="form-group">
            <label htmlFor="edit-desc">Description</label>
            <textarea 
              id="edit-desc"
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
            />
          </div>
          <div className="form-group">
            <label htmlFor="edit-priority">Priority</label>
            <select 
              id="edit-priority"
              value={priority} 
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="edit-deadline">Deadline</label>
            <input 
              id="edit-deadline"
              type="date" 
              value={deadline} 
              onChange={(e) => setDeadline(e.target.value)} 
            />
          </div>
          <div className="button-group">
            <button className="btn btn-success" onClick={handleSave}>Save</button>
            <button className="btn btn-secondary" onClick={() => setIsEditing(false)}>Cancel</button>
          </div>
        </div>
      ) : (
        <div>
          <div className="task-header">
            <h3 className="task-title">{task.title}</h3>
          </div>
          
          <div className="task-meta">
            <span className={`task-badge ${getStatusBadge(task.status)}`}>
              {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
            </span>
            <span className={`task-badge ${getPriorityBadge(task.priority)}`}>
              {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
            </span>
          </div>

          {task.description && <p className="task-description">{task.description}</p>}
          
          {task.deadline && (
            <p className="task-deadline">
              Deadline: {new Date(task.deadline).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          )}

          <div className="task-actions">
            <button 
              className="btn btn-success" 
              onClick={handleComplete}
            >
              {task.status === 'completed' ? 'Mark Pending' : 'Mark Complete'}
            </button>
            <button 
              className="btn btn-primary" 
              onClick={() => setIsEditing(true)}
            >
              Edit
            </button>
            <button 
              className="btn btn-danger" 
              onClick={() => onDelete(task._id)}
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </li>
  );
};

export default TaskItem;