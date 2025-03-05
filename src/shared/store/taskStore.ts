import { create } from 'zustand';
import { Task, TaskStatus } from '../types/task';
import { persist } from 'zustand/middleware';

interface TaskState {
  tasks: Task[];
  searchQuery: string;
  filterStatus: TaskStatus | 'all';
  addTask: (task: Task) => void;
  updateTask: (taskId: string, updates: Partial<Task>) => void;
  deleteTask: (taskId: string) => void;
  setSearchQuery: (query: string) => void;
  setFilterStatus: (status: TaskStatus | 'all') => void;
  getFilteredTasks: () => Task[];
}

export const useTaskStore = create<TaskState>()(
  persist(
    (set, get) => ({
      tasks: [],
      searchQuery: '',
      filterStatus: 'all',

      addTask: (task) => set((state) => ({ 
        tasks: [...state.tasks, task] 
      })),

      updateTask: (taskId, updates) => set((state) => ({
        tasks: state.tasks.map((task) =>
          task.id === taskId ? { ...task, ...updates } : task
        ),
      })),

      deleteTask: (taskId) => set((state) => ({
        tasks: state.tasks.filter((task) => task.id !== taskId),
      })),

      setSearchQuery: (query) => set({ searchQuery: query }),
      
      setFilterStatus: (status) => set({ filterStatus: status }),

      getFilteredTasks: () => {
        const { tasks, searchQuery, filterStatus } = get();
        return tasks.filter((task) => {
          const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              task.description.toLowerCase().includes(searchQuery.toLowerCase());
          const matchesStatus = filterStatus === 'all' || task.status === filterStatus;
          return matchesSearch && matchesStatus;
        });
      },
    }),
    {
      name: 'task-storage',
    }
  )
); 