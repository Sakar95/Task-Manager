import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createTask, editTask, removeTaskAsync } from "../operations/taskApi";
import { setLoading, setTasks } from '../slices/taskSlice'; 
import axios from 'axios';

const Task = () => {
  const dispatch = useDispatch();
  const { tasks, loading, error } = useSelector((state) => state.tasks);
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [duedate, setDueDate] = useState('');
  const [editTaskId, setEditTaskId] = useState(null);


 
  useEffect(() => {
    const fetchTasks = async () => {
      if (user?._id) {  
        dispatch(setLoading(true));
        try {
          const response = await axios.get(`${process.env.REACT_APP_API}/api/v1/task/${user?._id}`,{ headers: { Authorization: `Bearer ${token}` } });
          dispatch(setTasks(response.data.data)); 
        } catch (err) {
          console.error(err);
        } finally {
          dispatch(setLoading(false));
        }
      }
    };

    fetchTasks(); 
  }, [dispatch, user?._id]);

  const handleAddTask = () => {
    if (title && description && duedate) {
      if (editTaskId) {
        dispatch(editTask(editTaskId, title, description, duedate, "pending", user?._id,token));
        setEditTaskId(null);  
      } else {
        dispatch(createTask(title, description, duedate, user?._id,token));
      }

     
      setTitle('');
      setDescription('');
      setDueDate('');
    } else {
      console.error("All fields are required!");
    }
  };

  const handleEdit = (task) => {
    setEditTaskId(task._id);
    setTitle(task.title);
    setDescription(task.description);
    setDueDate(task.duedate);
  };

  const handleDelete = (taskId) => {
    dispatch(removeTaskAsync(taskId, user?._id,token));
  };

  if (!user?._id) {
    return (
      <div className="container mx-auto p-6">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h2 className="text-2xl mb-4">Please Log In</h2>
          <p className="text-gray-700">You need to log in to manage your tasks.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
        
      <div className="flex flex-wrap">
        <div className="w-full md:w-1/2 pr-4">
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h2 className="text-2xl mb-4">Task List</h2>
            {loading ? (
              <p>Loading tasks...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : tasks?.length === 0 ? (
              <p>No tasks found.</p>
            ) : (
              <table className="min-w-full table-auto">
                <thead>
                  <tr>
                    <th className="px-4 py-2">Title</th>
                    <th className="px-4 py-2">Description</th>
                    <th className="px-4 py-2">Due Date</th>
                    <th className="px-4 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {tasks?.map((task) => (
                    <tr key={task._id}>
                      <td className="border px-4 py-2">{task.title}</td>
                      <td className="border px-4 py-2">{task.description}</td>
                      <td className="border px-4 py-2">{new Date(task.duedate).toLocaleDateString()}</td>
                      <td className="border px-4 py-2">
                        <button
                          className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-3 rounded mr-2"
                          onClick={() => handleEdit(task)}
                        >
                          Edit
                        </button>
                        <button
                          className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
                          onClick={() => handleDelete(task._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
        <div className="w-full md:w-1/2 pl-4">
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h2 className="text-2xl mb-4">{editTaskId ? 'Edit Task' : 'Add New Task'}</h2>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Title</label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Task Title"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
              <textarea
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Task Description"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Due Date</label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="date"
                value={duedate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>
            <button
              onClick={handleAddTask}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              {editTaskId ? 'Update Task' : 'Add Task'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Task;
