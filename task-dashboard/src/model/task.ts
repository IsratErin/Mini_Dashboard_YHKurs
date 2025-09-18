type priority = 'low' | 'medium' | 'high';
class Task {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  priority: priority;
  createdAt: Date;
  category: string;

  constructor(
    id: number,
    title: string,
    completed: boolean,
    priority: priority,
    category: string,
    description?: string
  ) {
    this.id = id;
    this.title = title;
    this.priority = priority;
    this.category = category;
    this.description = description;
    this.completed = completed;
    this.createdAt = new Date();
  }
}
export default Task;
