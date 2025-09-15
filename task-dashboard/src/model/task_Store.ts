import Task from './task';
import { fetchCurrentLocationWeather } from '../api/weatherApiData';

class TaskStore {
  tasks: Task[] = [];
  cityWeather: number = 0;
  cityName: string = '';

  addTask(
    id: number,
    title: string,
    completed: boolean,
    priority: 'low' | 'medium' | 'high',
    category: string,
    description?: string
  ) {
    const task = new Task(
      id,
      title,
      completed,
      priority,
      category,
      description
    );
    this.tasks.push(task);
  }

  setWeatherData(temp: number, cityName: string) {
    this.cityWeather = temp;
    this.cityName = cityName;
  }

  async updateWeatherData() {
    try {
      const weatherData = await fetchCurrentLocationWeather();
      this.setWeatherData(weatherData.temp, weatherData.city);
    } catch (error) {
      console.error('Failed to fetch weather data:', error);
    }
  }

  getTempData(): number {
    return this.cityWeather;
  }
  getCityName(): string {
    return this.cityName;
  }

  toggleTaskCompletion(id: number, callback: (completed: boolean) => void) {
    const selectedTask = this.tasks.find((task) => task.id === id);
    if (selectedTask) {
      selectedTask.completed = !selectedTask.completed;
      if (selectedTask.completed) {
        console.log(`Task "${selectedTask.title}" has been completed!`);
      } else {
        console.log(`Task "${selectedTask.title}" is yet uncompleted!`);
      }
      callback(selectedTask.completed);
    }
  }

  deleteTask(id: number) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }
}

export default TaskStore;
