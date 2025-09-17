import Task from './task';
import { fetchCurrentLocationWeather } from '../api/weatherApiData';
import { fetchDailyQuote } from '../api/quoteApiData';

class TaskStore {
  tasks: Task[] = [];
  cityWeather: number = 0;
  cityName: string = '';
  quote: string = '';

  addTask(
    id: number,
    title: string,
    completed: boolean,
    priority: 'low' | 'medium' | 'high',
    category: string,
    description?: string
  ): void {
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

  setWeatherData(temp: number, cityName: string): void {
    this.cityWeather = temp;
    this.cityName = cityName;
  }

  async updateWeatherData(): Promise<void> {
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

  toggleTaskCompletion(
    id: number,
    callback: (completed: boolean) => void
  ): void {
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

  deleteTask(id: number): void {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }

  editTask(
    id: number,
    title: string,
    priority: 'low' | 'medium' | 'high',
    category: string,
    description: string
  ): void {
    const taskToEdit = this.tasks.find((task) => task.id === id);
    if (taskToEdit) {
      taskToEdit.title = title;
      taskToEdit.priority = priority;
      taskToEdit.category = category;
      taskToEdit.description = description;
    }
  }

  async getQuote(): Promise<string> {
    try {
      const quoteData = await fetchDailyQuote();
      console.log('quoteData:', quoteData);
      this.quote = quoteData.quote;
      return this.quote;
    } catch (error) {
      console.error('Failed to fetch daily quote:', error);
      return '';
    }
  }
}

export default TaskStore;
