import axios from "axios";
import { toast } from "react-hot-toast";
import {
  setLoading,
  addTask,
  setError,
  updateTask,
  removeTask,
  setTasks
} from "../slices/taskSlice";

// Base API URL
const API_BASE_URL = process.env.REACT_APP_API || "http://localhost:5000";

// Create a new task
export function createTask(title, description, duedate,status, userId,token) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      if (!title || !description || !duedate) {
        throw new Error("All fields are required");
      }

      const response = await axios.post(
        `${API_BASE_URL}/api/v1/task/create-task`,
        { title, description, duedate, userId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      console.log(response.data.data)

      dispatch(addTask(response.data.data));
      toast.success("Task created successfully!");
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      dispatch(setError(errorMessage));
      toast.error("Failed to create task");
    } finally {
      dispatch(setLoading(false));
    }
  };
}

// Update an existing task
export function editTask(taskId, title, description, duedate, status, userId,token) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
        console.log(taskId)
      const response = await axios.put(
        `${API_BASE_URL}/api/v1/task/edit-task/${taskId}`,
        { title, description, duedate, status, userId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (!response.data.success) {
        throw new Error("Helooo",response.data.message);
      }

      dispatch(updateTask(response.data.data)); 
      toast.success("Task updated successfully!");
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      dispatch(setError(errorMessage));
      toast.error("Failed to update task");
    } finally {
      dispatch(setLoading(false));
    }
  };
}

// Delete a task
export function removeTaskAsync(taskId, userId,token) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/api/v1/task/delete-task/${taskId}/${userId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      dispatch(removeTask(taskId)); // Use removeTask from taskSlice
      toast.success("Task deleted successfully!");
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      dispatch(setError(errorMessage));
      toast.error("Failed to delete task");
    } finally {
      dispatch(setLoading(false));
    }
  };
}

export const fetchTasks =(userId,token) => {
    return async (dispatch) => {
    if (userId) {
        dispatch(setLoading(true));
        try {
            const response = await axios.get(`${process.env.REACT_APP_API}/api/v1/task/${userId}`, { headers: { Authorization: `Bearer ${token}` } });
            dispatch(setTasks(response.data.data));
            // console.log(tasks);
        } catch (err) {
            console.error(err);
        } finally {
            dispatch(setLoading(false));
        }
    }
}
};
