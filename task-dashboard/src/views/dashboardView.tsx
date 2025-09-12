import Task from '../model/task';

interface DashboardViewProps {
  tasks: Task[];
  newTask: {
    title: string;
    category: string;
    completed: boolean;
    priority: 'low' | 'medium' | 'high';
    description?: string;
    
  };
  setNewTask: (task: any) => void;
  onAddTask: () => void;
  temperature: number;
  location: string;
  onToggleComplete: (id: number) => void;
}

function DashboardView({
  tasks,
  newTask,
  setNewTask,
  onAddTask,
  temperature,
  location,
  onToggleComplete,
}: DashboardViewProps) {
  const priorityColor = {
    low: 'bg-blue-100 text-blue-800',
    medium: 'bg-yellow-100 text-yellow-800',
    high: 'bg-red-100 text-red-800',
  };

  function setTaskDetails(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    setNewTask({
      ...newTask,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <div className="space-y-6">
      {/* Weather Display */}
      <div className="flex justify-end p-4">
        <div className="bg-white rounded-lg shadow-md p-3">
          <span className="font-semibold">
            Temperature now in <span className="text-red-600">{location}</span>{' '}
            is {temperature}°C.
          </span>
        </div>
      </div>

      {/* Add Task Details Form */}
      <div className="p-4 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Add New Task</h2>
        <div className="space-y-4">
          <input
            name="title"
            type="text"
            placeholder="Task Title"
            className="w-full p-2 border rounded"
            value={newTask.title}
            onChange={setTaskDetails}
          />
          <input
            name="category"
            type="text"
            placeholder="Category"
            className="w-full p-2 border rounded"
            value={newTask.category}
            onChange={setTaskDetails}
          />
          <select
            name="priority"
            className="w-full p-2 border rounded"
            value={newTask.priority}
            onChange={setTaskDetails}
          >
            <option value="low">Low Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="high">High Priority</option>
          </select>
          <textarea
            name="description"
            placeholder="Description"
            className="w-full p-2 border rounded"
            value={newTask.description}
            onChange={setTaskDetails}
          />
          <button
            onClick={onAddTask}
            className="w-full bg-blue-500 text-black p-2 rounded hover:bg-blue-600"
          >
            {' '}
            Add Task
          </button>
        </div>
      </div>

      {/* Task List */}
      <div className="space-y-4">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold mb-2 text-gray-800">
                {task.title}
              </h3>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => onToggleComplete(task.id)}
                className="h-5 w-5 text-blue-600"
              />
            </div>
            <div className="space-y-2">
              <div
                className={`inline-block px-2 py-1 rounded-full text-sm ${priorityColor[task.priority]}`}
              >
                Priority: {task.priority}
              </div>
              <p className="text-gray-600">
                <span className="font-semibold">Category:</span> {task.category}
              </p>
              {task.description && (
                <p className="text-gray-600">
                  <span className="font-semibold">Description:</span>{' '}
                  {task.description}
                </p>
              )}
              
              
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DashboardView;
