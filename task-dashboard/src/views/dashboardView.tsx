import Task from '../model/task';

interface DashboardViewProps {
  tasks: Task[];
  newTask: {
    title: string;
    category: string;
    completed: boolean;
    priority: 'low' | 'medium' | 'high';
    description: string;
  };

  setNewTask: (newTask: {
    title: string;
    category: string;
    completed: boolean;
    priority: 'low' | 'medium' | 'high';
    description: string;
  }) => void;
  onAddTask: () => void;
  temperature: number;
  location: string;
  onToggleComplete: (id: number) => void;
  onDeleteTask: (id: number) => void;
  onEditTask: (id: number) => void;
  editingTaskId: number | null;
  filterStatus: 'all' | 'completed' | 'pending';
  onFilterChange: (status: 'all' | 'completed' | 'pending') => void;
  sortOrder: 'none' | 'highToLow' | 'lowToHigh';
  onSortChange: (order: 'none' | 'highToLow' | 'lowToHigh') => void;
  searchKeyword: string;
  onSearch: (keyword: string) => void;
  quote: string;
}

function DashboardView({
  tasks,
  newTask,
  setNewTask,
  onAddTask,
  temperature,
  location,
  onToggleComplete,
  onDeleteTask,
  onEditTask,
  editingTaskId,
  filterStatus,
  onFilterChange,
  sortOrder,
  onSortChange,
  searchKeyword,
  onSearch,
  quote,
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
  ): void {
    setNewTask({
      ...newTask,
      [e.target.name]: e.target.value,
    });
  }
  function selectSortOrder(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ): void {
    onSortChange(e.target.value as 'none' | 'highToLow' | 'lowToHigh');
  }

  function doSearch(e: React.ChangeEvent<HTMLInputElement>): void {
    onSearch(e.target.value);
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
      {/* Quote Display */}
      <div className="flex justify-end p-4">
        <div className="bg-white rounded-lg shadow-md p-3">
          <span className="font-semibold">Quote of the Day:</span>
          <p className="mt-2 text-gray-600">{quote}</p>
        </div>
      </div>

      {/* Filter Section */}
      <div className="flex justify-start gap-4 p-4">
        <button
          onClick={() => onFilterChange('all')}
          className={`px-4 py-2 rounded ${
            filterStatus === 'all'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-gray-700'
          }`}
        >
          All Tasks
        </button>
        <button
          onClick={() => onFilterChange('completed')}
          className={`px-4 py-2 rounded ${
            filterStatus === 'completed'
              ? 'bg-green-500 text-white'
              : 'bg-gray-200 text-gray-700'
          }`}
        >
          Completed
        </button>
        <button
          onClick={() => onFilterChange('pending')}
          className={`px-4 py-2 rounded ${
            filterStatus === 'pending'
              ? 'bg-yellow-500 text-white'
              : 'bg-gray-200 text-gray-700'
          }`}
        >
          Pending
        </button>
      </div>

      {/* Sort by order*/}
      <div className="flex justify-between items-center px-4">
        <div className="flex gap-4"></div>
        <div className="flex items-center gap-2">
          <span className="text-gray-700">Sort by priority:</span>
          <select
            value={sortOrder}
            onChange={selectSortOrder}
            className="p-2 border rounded bg-white"
          >
            <option value="none">None</option>
            <option value="highToLow">High to Low</option>
            <option value="lowToHigh">Low to High</option>
          </select>
        </div>
      </div>
      {/* Search Task */}
      <div className="flex justify-end p-4">
        <input
          type="text"
          placeholder="Search tasks"
          className="p-2 border rounded"
          value={searchKeyword}
          onChange={doSearch}
        />
        <button
          onClick={() => doSearch}
          className="px-4 py-2 rounded bg-gray-200 text-gray-70 0"
        >
          Search
        </button>
      </div>

      {/* Task Count */}
      <div className="px-4 text-sm text-gray-600">
        Showing {tasks.length} {filterStatus === 'all' ? 'total' : filterStatus}{' '}
        tasks
      </div>

      {/* Update or Add Task Form Title */}
      <div className="p-4 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">
          {editingTaskId ? 'Edit Task' : 'Add New Task'}
        </h2>
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
            {editingTaskId ? 'Update Task' : 'Add Task'}
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
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => onToggleComplete(task.id)}
                  className="h-5 w-5 text-blue-600"
                />
                <button
                  onClick={() => onEditTask(task.id)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDeleteTask(task.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  Delete
                </button>
              </div>
            </div>
            <div></div>
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
              <p className="text-gray-500 text-sm italic">
                <span className="font-semibold">Created:</span>{' '}
                {task.createdAt.toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DashboardView;
