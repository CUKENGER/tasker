import { Bar } from 'react-chartjs-2';
import { useTaskStore } from '@/shared/store/taskStore';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const TaskStatistics = () => {
  const tasks = useTaskStore((state) => state.tasks);

  const statusCounts = {
    todo: tasks.filter(t => t.status === 'todo').length,
    in_progress: tasks.filter(t => t.status === 'in_progress').length,
    done: tasks.filter(t => t.status === 'done').length,
  };

  const data = {
    labels: ['К выполнению', 'В работе', 'Готово'],
    datasets: [
      {
        label: 'Количество задач',
        data: [statusCounts.todo, statusCounts.in_progress, statusCounts.done],
        backgroundColor: ['#93c5fd', '#fcd34d', '#86efac'],
      },
    ],
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-semibold mb-4">Статистика задач</h2>
      <Bar data={data} />
    </div>
  );
}; 