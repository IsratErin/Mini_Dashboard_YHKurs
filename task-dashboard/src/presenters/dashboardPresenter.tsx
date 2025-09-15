import { useState, useEffect } from 'react';
import DashboardView from '../views/dashboardView.tsx';
import TaskStore from '../model/task_Store';

export function DashboardRender() {
  const [taskStore] = useState(() => new TaskStore());
  const [tasks, setTasks] = useState(taskStore.tasks);
  const [temperature, setTemperature] = useState(0);
  const [city, setCity] = useState('');
  const [newTask, setNewTask] = useState({
    title: '',
    category: '',
    completed: false,
    priority: 'low' as 'low' | 'medium' | 'high',
    description: '',
  });
  const [filterStatus, setFilterStatus] = useState<
    'all' | 'completed' | 'pending'
  >('all');

  useEffect(() => {
    const fetchWeather = async () => {
      await taskStore.updateWeatherData();
      setTemperature(taskStore.getTempData());
      setCity(taskStore.getCityName());
    };
    fetchWeather();
  }, [taskStore]);

  const handleAddTask = () => {
    if (!newTask.title || !newTask.category) {
      alert('Please fill in at least the title and category');
      return;
    }

    const id = Math.floor(Math.random() * 10000) + 1; // Simple random ID generation
    taskStore.addTask(
      id,
      newTask.title,
      false,
      newTask.priority,
      newTask.category,
      newTask.description || '' // To ensure description is always a string
    );
    // Update tasks state to trigger re-render
    setTasks([...taskStore.tasks]);
    setNewTask({
      title: '',
      category: '',
      completed: false,
      priority: 'low' as 'low' | 'medium' | 'high',
      description: '',
    });
  };

  const handleDeleteTask = (id: number) => {
    if (id) {
      taskStore.deleteTask(id);
      setTasks([...taskStore.tasks]);
    }
  };

  const handleToggleComplete = (id: number) => {
    taskStore.toggleTaskCompletion(id, (completed) => {
      console.log(`Task ${id} completion status: ${completed}`);
      setTasks([...taskStore.tasks]);
    });
  };

  const [editingTask, setEditingTask] = useState<number | null>(null);

  const handleEditTask = (id: number) => {
    const taskToEdit = tasks.find((task) => task.id === id);
    if (taskToEdit) {
      setEditingTask(id);
      setNewTask({
        title: taskToEdit.title,
        category: taskToEdit.category,
        completed: taskToEdit.completed,
        priority: taskToEdit.priority,
        description: taskToEdit.description || '',
      });
    }
  };

  const handleUpdateTask = () => {
    if (editingTask && newTask.title && newTask.category) {
      taskStore.editTask(
        editingTask,
        newTask.title,
        newTask.priority,
        newTask.category,
        newTask.description
      );
      setTasks([...taskStore.tasks]);
      setEditingTask(null);
      setNewTask({
        title: '',
        category: '',
        completed: false,
        priority: 'low' as 'low' | 'medium' | 'high',
        description: '',
      });
    }
  };

  const handleFilterChange = (status: 'all' | 'completed' | 'pending') => {
    setFilterStatus(status);
  };

  const filteredTasks = tasks.filter((task) => {
    switch (filterStatus) {
      case 'completed':
        return task.completed;
      case 'pending':
        return !task.completed;
      default:
        return true;
    }
  });

  return (
    <DashboardView
      tasks={filteredTasks}
      newTask={newTask}
      setNewTask={setNewTask}
      onAddTask={editingTask ? handleUpdateTask : handleAddTask}
      temperature={temperature}
      location={city}
      onToggleComplete={handleToggleComplete}
      onDeleteTask={handleDeleteTask}
      onEditTask={handleEditTask}
      editingTaskId={editingTask}
      filterStatus={filterStatus}
      onFilterChange={handleFilterChange}
    />
  );
}
