import Task from './task';
class TaskStore {
  tasks: Task[] = [];

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
}

const myTask = new TaskStore();
//console.log(myTask.addTask(1, 'first task', false, 'low', 'none', 'none'));
console.log(myTask.addTask(2, 'second task', false, 'low', 'none', 'none'));
console.log(myTask.tasks);

export default TaskStore;
