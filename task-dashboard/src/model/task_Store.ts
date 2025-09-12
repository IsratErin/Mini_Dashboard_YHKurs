import Task from './task';
import {fetchCityWeatherData} from '../api/weatherApiData';

class TaskStore {
  tasks: Task[] = [];
  cityWeather: number = 0;

  
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

  setWeatherData(data: number) {
    this.cityWeather = data;  
  }

  async updateWeatherData(city: string) {
    try {
      const weatherData = await fetchCityWeatherData(city);
      this.setWeatherData(weatherData);
    } catch (error) {
      console.error('Failed to fetch weather data:', error);
    }
  }

  getWeatherData(): number {
    return this.cityWeather;
  }
  
}


export default TaskStore;
