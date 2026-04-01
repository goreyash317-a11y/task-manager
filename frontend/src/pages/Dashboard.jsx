import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';
import './Dashboard.css';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/tasks`, { 
        headers: { Authorization: `Bearer ${token}` } 
      });
      setTasks(res.data);
      setError('');
    } catch (error) {
      setError(error.response?.data?.error || 'Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (task) => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/tasks`, task, { 
        headers: { Authorization: `Bearer ${token}` } 
      });
      fetchTasks();
    } catch (error) {
      setError(error.response?.data?.error || 'Failed to create task');
    }
  };

  const updateTask = async (id, updates) => {
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/api/tasks/${id}`, updates, { 
        headers: { Authorization: `Bearer ${token}` } 
      });
      fetchTasks();
    } catch (error) {
      setError(error.response?.data?.error || 'Failed to update task');
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/tasks/${id}`, { 
        headers: { Authorization: `Bearer ${token}` } 
      });
      fetchTasks();
    } catch (error) {
      setError(error.response?.data?.error || 'Failed to delete task');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const filteredTasks = tasks.filter(task => !filter || task.status === filter || task.priority === filter);

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Task Manager</h1>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>
      
      {error && <div className="error-message">{error}</div>}
      
      <TaskForm onAdd={addTask} />
      
      <div className="filter-section">
        <label htmlFor="filter">Filter Tasks:</label>
        <select id="filter" value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="">All Tasks</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>
      </div>

      {loading ? (
        <p className="loading">Loading tasks...</p>
      ) : (
        <>
          <p className="task-count">{filteredTasks.length} task(s)</p>
          <TaskList tasks={filteredTasks} onUpdate={updateTask} onDelete={deleteTask} />
        </>
      )}
    </div>
  );
};

export default Dashboard;