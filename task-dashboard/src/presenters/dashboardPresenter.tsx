import { useState, useEffect } from 'react';
import DashboardView from '../views/dashboardView.tsx';
import TaskStore from '../model/task_Store';

interface TaskProps {
  id: number;
  title: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  category: string;
  description?: string;
}

export function DashboardRender() {
  const [taskStore] = useState(() => new TaskStore());
  const [tasks, setTasks] = useState(taskStore.tasks);
  const [temperature, setTemperature] = useState(0);
  const [city, setCity] = useState('');
  const [newTask, setNewTask] = useState({
    title: '',
    category: '',
    priority: 'low' as 'low' | 'medium' | 'high',
    description: '',
  });

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

    const id = Date.now();
    taskStore.addTask(
      id,
      newTask.title,
      false,
      newTask.priority,
      newTask.category,
      newTask.description
    );
    // Update tasks state to trigger re-render
    setTasks([...taskStore.tasks]);
    setNewTask({
      title: '',
      category: '',
      priority: 'low' as 'low' | 'medium' | 'high',
      description: '',
    });
  };

  return (
    <DashboardView
      tasks={tasks}
      newTask={newTask}
      setNewTask={setNewTask}
      onAddTask={handleAddTask}
      temperature={temperature}
      location={city}
    />
  );
}
