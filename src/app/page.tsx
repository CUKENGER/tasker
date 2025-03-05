'use client';

import { TaskCard } from '@/entities/task/ui/TaskCard';
import { CreateTaskForm } from '@/features/task/ui/CreateTaskForm';
import { TaskFilters } from '@/features/task/ui/TaskFilters';
import { useTaskStore } from '@/shared/store/taskStore';
import { TaskStatus } from '@/shared/types/task';
import { TaskStatistics } from '@/widgets/TaskStatistics/ui/TaskStatistics';

export default function Home() {
  const { getFilteredTasks, updateTask, addTask } = useTaskStore();
  const filteredTasks = getFilteredTasks();

  const handleCreateTask = (title: string, description: string) => {
    addTask({
      id: crypto.randomUUID(),
      title,
      description,
      status: 'todo',
      createdAt: new Date(),
    });
  };

  const handleStatusChange = (taskId: string, status: TaskStatus) => {
    updateTask(taskId, { status });
  };

  return (
    <main className="min-h-screen bg-gray-100 text-gray-900">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-gray-900">Task Tracker</h1>

        <TaskFilters />
        <CreateTaskForm onSubmit={handleCreateTask} />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {['todo', 'in_progress', 'done'].map((status) => (
            <div key={status} className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">
                {status === 'todo' && 'К выполнению'}
                {status === 'in_progress' && 'В работе'}
                {status === 'done' && 'Готово'}
              </h2>
              <div className="space-y-4">
                {filteredTasks
                  .filter(task => task.status === status)
                  .map(task => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      onStatusChange={handleStatusChange}
                    />
                  ))}
              </div>
            </div>
          ))}
        </div>
        <TaskStatistics />
      </div>
    </main>
  );
}
