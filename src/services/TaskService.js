import axiosInstance from "./authService/axios";
import { isToday } from "date-fns";

const TaskService = {
  getTasks: async function (url) {
    try {
      const response = await axiosInstance.get(`/tasks/${url}`);
      return response.data;
    } catch (err) {
      throw err;
    }
  },
  addTask: async function (task) {
    try {
      const response = await axiosInstance.post("/tasks", task);
      return response.data;
    } catch (err) {
      throw err;
    }
  },

  updateTask: async function (task) {
    try {
      const response = await axiosInstance.patch(`/tasks/${task.id}`, task);
      return response.data;
    } catch (err) {
      throw err;
    }
  },

  deleteTask: async function (id) {
    try {
      const response = await axiosInstance.delete(`/tasks/${id}`);
      return response.data;
    } catch (err) {
      throw err;
    }
  },

  deleteRrule: async function (taskId) {
    try {
      const response = await axiosInstance.delete(`tasks/rrule/${taskId}`);
      return response.data;
    } catch (err) {
      throw err;
    }
  },

  clearPendingTasksOfOldData: function () {
    const pendingTasks = JSON.parse(localStorage.getItem("pendingTasks"));
    if (!pendingTasks || pendingTasks.length < 1) return;
    const newPendingTasks = pendingTasks.filter((item) => {
      const itemDate = new Date(item.updatedTaskCompletedDate);
      return isToday(itemDate);
    });
    localStorage.setItem("pendingTasks", JSON.stringify(newPendingTasks));
  },

  deleteCreatedTask: async function (updatedTaskId) {
    const pendingTasks = JSON.parse(localStorage.getItem("pendingTasks"));
    if (!pendingTasks || pendingTasks.length < 1) return;
    const taskToDelete = pendingTasks.filter(
      (item) => item.updatedTaskId === updatedTaskId
    )[0];
    if (!taskToDelete) return;
    const response = await this.deleteTask(taskToDelete.newTaskId);
    const newPendingTasks = pendingTasks.filter(
      (item) => item.updatedTaskId !== updatedTaskId
    );
    localStorage.setItem("pendingTasks", JSON.stringify(newPendingTasks));
    return response;
  },

  saveToLocalStorage: function (updatedTask, newTask) {
    this.clearPendingTasksOfOldData();
    let pendingTasks = this.readFromLocalStorage();
    if (!pendingTasks) {
      pendingTasks = [];
    }
    const item = {
      updatedTaskId: updatedTask.id,
      updatedTaskCompletedDate: updatedTask.dtCompleted,
      newTaskId: newTask.id,
    };
    const tasksToSave = [...pendingTasks, item];
    localStorage.setItem("pendingTasks", JSON.stringify(tasksToSave));
  },

  readFromLocalStorage: function () {
    const pendingTasks = localStorage.getItem("pendingTasks");
    return JSON.parse(pendingTasks);
  },

  sortTasks: function (tasks) {
    return tasks
      .sort(function (a, b) {
        a = new Date(a.dtStart);
        b = new Date(b.dtStart);
        return a > b ? 1 : a < b ? -1 : 0;
      })
      .sort((a, b) => {
        return a.dtCompleted === b.dtCompleted ? 0 : a.dtCompleted ? 1 : -1;
      });
  },
};

export default TaskService;
