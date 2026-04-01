import { useState } from 'react';
import './Tasks.css';

const TaskForm = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');
  const [deadline, setDeadline] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!title.trim()) {
      setError('Task title is required');
      return;
    }

    onAdd({ title, description, priority, deadline });
    setTitle('');
    setDescription('');
    setPriority('medium');
    setDeadline('');
    setError('');
  };

  return (
    <div className="task-form">
      <h3>Add New Task</h3>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title *</label>
          <input 
            id="title"
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            placeholder="Enter task title" 
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea 
            id="description"
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            placeholder="Enter task description (optional)" 
          />
        </div>

        <div className="form-group">
          <label htmlFor="priority">Priority</label>
          <select 
            id="priority"
            value={priority} 
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="deadline">Deadline</label>
          <input 
            id="deadline"
            type="date" 
            value={deadline} 
            onChange={(e) => setDeadline(e.target.value)} 
          />
        </div>

        <div className="button-group">
          <button className="btn btn-primary" type="submit">Add Task</button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;