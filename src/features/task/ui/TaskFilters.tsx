import { TaskStatus } from '@/shared/types/task';
import { useTaskStore } from '@/shared/store/taskStore';

export const TaskFilters = () => {
  const { searchQuery, filterStatus, setSearchQuery, setFilterStatus } = useTaskStore();

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-6">
      <div className="flex flex-col md:flex-row gap-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Поиск задач..."
          className="flex-1 p-2 border rounded text-gray-700 bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value as TaskStatus | 'all')}
          className="p-2 border rounded text-gray-700 bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="all">Все задачи</option>
          <option value="todo">К выполнению</option>
          <option value="in_progress">В работе</option>
          <option value="done">Готово</option>
        </select>
      </div>
    </div>
  );
}; 