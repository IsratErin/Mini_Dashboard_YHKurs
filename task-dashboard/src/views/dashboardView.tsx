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
    <div className="fixed inset-0 bg-gray-50 overflow-hidden">
      {/* Quote Display at Top */}
      <div className="bg-white rounded-lg  p-3 m-2 mb-4">
        <span className="font-medium text-m">Advice for Today:</span>
        <p className="mt-1 text-black-400 text-m">{quote}</p>
      </div>

      {/* Main Content Area */}
      <div className="flex gap-4 mx-2 h-[calc(100vh-120px)]">
        {/* Add Task Form*/}
        <div className="w-1/3 bg-white rounded-lg shadow-sm p-3 h-fit">
          <h2 className=" font-bold text-2xl mb-3">
            {editingTaskId ? 'Edit Task' : 'New Task'}
          </h2>
          <div className="space-y-3">
            <input
              name="title"
              type="text"
              placeholder="Task Title"
              className="w-full p-2 border rounded text-sm"
              value={newTask.title}
              onChange={setTaskDetails}
            />
            <input
              name="category"
              type="text"
              placeholder="Category"
              className="w-full p-2 border rounded text-sm"
              value={newTask.category}
              onChange={setTaskDetails}
            />
            <select
              name="priority"
              className="w-full p-2 border rounded text-sm"
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
              className="w-full p-2 border rounded text-sm resize-none"
              rows={3}
              value={newTask.description}
              onChange={setTaskDetails}
            />
            <button
              onClick={onAddTask}
              className="w-[100px] h-[42px] bg-blue-500 text-black p-1 rounded hover:bg-blue-600 text-xs"
            >
              {editingTaskId ? 'Update' : 'Add'}
            </button>
          </div>
        </div>

        {/* Task List - Right Side */}
        <div className="w-full flex flex-col h-full">
          {/* Filter and Sort Controls*/}

          <div className="bg-white rounded-lg shadow-sm p-3 mb-3 flex-shrink-0">
            <div className="flex items-center justify-between gap-4">
              {/* Filter Dropdown */}
              <div className="flex items-center gap-2">
                <span className="text-gray-700 text-sm font-medium">
                  Filter:
                </span>
                <select
                  value={filterStatus}
                  onChange={(e) =>
                    onFilterChange(
                      e.target.value as 'all' | 'completed' | 'pending'
                    )
                  }
                  className="px-2 py-1 border rounded bg-white text-xs"
                >
                  <option value="all">All Tasks</option>
                  <option value="completed">Completed</option>
                  <option value="pending">Pending</option>
                </select>
              </div>

              {/* Sort Control */}
              <div className="flex items-center gap-2">
                <span className="text-gray-700 text-sm font-medium">Sort:</span>
                <select
                  value={sortOrder}
                  onChange={selectSortOrder}
                  className="px-2 py-1 border rounded bg-white text-xs"
                >
                  <option value="none">None</option>
                  <option value="highToLow">High→Low</option>
                  <option value="lowToHigh">Low→High</option>
                </select>
              </div>

              {/* Search Control */}
              <div className="flex items-center gap-2">
                <span className="text-gray-700 text-sm font-medium">
                  {' '}
                  Search:{' '}
                </span>
                <input
                  type="text"
                  placeholder="Search task"
                  className="px-2 py-1 border rounded text-xs w-32 lg:w-48"
                  value={searchKeyword}
                  onChange={doSearch}
                />
                {/*<button
                  onClick={()=>doSearch}
                  className="px-2 py-0.5 rounded bg-gray-300  text-gray-700 text-xs hover:bg-gray-300"
                >
                  Search
                </button>*/}
              </div>
            </div>

            {/* Task Count */}
            <div className="text-xs text-gray-600 mt-2">
              <div className="border border-gray-300 rounded px-2 py-0.5">
                {' '}
                Showing {tasks.length} of{' '}
                {filterStatus === 'all' ? 'total' : filterStatus} tasks
              </div>
            </div>
          </div>

          {/* Task List Grid */}
          <div className="flex-1 overflow-y-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 pr-2">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className={`p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow ${
                    editingTaskId === task.id
                      ? 'bg-blue-50 border-2 border-blue-300 ring-2 ring-blue-200'
                      : 'bg-white'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className=" font-bold text-gray-800">
                      {task.title}
                      {editingTaskId === task.id && (
                        <span className="ml-2 text-xs text-blue-600 font-normal">
                          (Editing)
                        </span>
                      )}
                    </h3>
                    <div className="flex items-center gap-1 ml-1">
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => onToggleComplete(task.id)}
                        className="h-6 w-6 text-blue-600"
                      />
                      <button
                        onClick={() => onEditTask(task.id)}
                        className="text-blue-600 hover:text-blue-800 text-[5px] p-1 leading-none"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => onDeleteTask(task.id)}
                        className="text-red-600 hover:text-red-800 text-[5px] p-1 leading-none"
                      >
                        Delete
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-4 flex-wrap">
                      <p className="text-gray-600 text-sm">
                        <span className="font-semibold">Priority:</span>{' '}
                        {task.priority}
                      </p>
                      <p className="text-gray-600 text-sm">
                        <span className="font-semibold">Category:</span>{' '}
                        {task.category}
                      </p>
                      <p className="text-gray-600 text-sm">
                        <span className="font-semibold">Date:</span>{' '}
                        {task.createdAt.toLocaleString().split(',')[0]}
                      </p>
                    </div>
                  </div>
                  <div className="mt-2 flex flex-col text-left">
                    {task.description && (
                      <p className="text-gray-600 text-sm">
                        <div className="font-semibold">Description:</div>
                        {task.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Weather Display - Bottom Left Corner */}
        <div className="fixed bottom-4 left-4">
          <div className="bg-white rounded-lg shadow-md p-2">
            <span className="font-semibold text-sm">
              Temperature: {temperature}°C in{' '}
              <span className="text-red-600">{location}</span>{' '}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardView;
