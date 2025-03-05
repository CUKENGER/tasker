import { motion } from 'framer-motion';
import { Task } from '@/shared/types/task';
import { formatDistanceToNow, format } from 'date-fns';
import { ru } from 'date-fns/locale';

interface TaskCardProps {
  task: Task;
  onStatusChange: (taskId: string, status: Task['status']) => void;
}

export const TaskCard = ({ task, onStatusChange }: TaskCardProps) => {
  const getTimeInProgress = () => {
    if (!task.startedAt) return 'Не начата';
    return formatDistanceToNow(task.startedAt, { locale: ru, addSuffix: false });
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-gray-50 rounded-lg shadow-sm p-4 border border-gray-200"
    >
      <h3 className="text-lg font-semibold mb-2 text-gray-900">{task.title}</h3>
      <p className="text-gray-600 mb-4 text-sm">{task.description}</p>
      
      <div className="flex flex-col gap-2">
        <div className="space-x-2">
          <select
            value={task.status}
            onChange={(e) => onStatusChange(task.id, e.target.value as Task['status'])}
            className="w-full p-2 border rounded text-gray-700 bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="todo">К выполнению</option>
            <option value="in_progress">В работе</option>
            <option value="done">Готово</option>
          </select>
        </div>
        
        <div className="text-sm space-y-1">
          <p className="text-gray-600">Время в работе: {getTimeInProgress()}</p>
          <p className="text-gray-600">Создано: {formatDistanceToNow(task.createdAt, { locale: ru, addSuffix: true })}</p>
          {task.deadline && (
            <p className={`${new Date(task.deadline) < new Date() ? 'text-red-600' : 'text-yellow-600'} font-medium`}>
              Дедлайн: {format(new Date(task.deadline), 'dd.MM.yyyy', { locale: ru })}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}; 