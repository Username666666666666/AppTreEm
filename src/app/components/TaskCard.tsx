import { CheckCircle2, Circle, Star } from 'lucide-react';
import { motion } from 'motion/react';

export interface Task {
  id: string;
  title: string;
  emoji: string;
  points: number;
  completed: boolean;
  category: 'daily' | 'learning' | 'chore';
}

interface TaskCardProps {
  task: Task;
  onToggle: (id: string) => void;
}

const categoryColors = {
  daily: 'from-blue-400 to-blue-600',
  learning: 'from-green-400 to-green-600',
  chore: 'from-orange-400 to-orange-600',
};

export function TaskCard({ task, onToggle }: TaskCardProps) {
  return (
    <motion.div
      whileTap={{ scale: 0.95 }}
      className={`relative bg-white rounded-2xl p-4 shadow-md cursor-pointer transition-all ${
        task.completed ? 'opacity-70' : ''
      }`}
      onClick={() => onToggle(task.id)}
    >
      <div className="flex items-center gap-4">
        <div className={`w-16 h-16 bg-gradient-to-br ${categoryColors[task.category]} rounded-xl flex items-center justify-center text-3xl shadow-md`}>
          {task.emoji}
        </div>
        <div className="flex-1">
          <h3 className={`font-bold text-lg ${task.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}>
            {task.title}
          </h3>
          <div className="flex items-center gap-1 mt-1">
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            <span className="text-sm font-semibold text-yellow-600">+{task.points} điểm</span>
          </div>
        </div>
        <div>
          {task.completed ? (
            <CheckCircle2 className="w-8 h-8 text-green-500 fill-green-100" />
          ) : (
            <Circle className="w-8 h-8 text-gray-300" />
          )}
        </div>
      </div>
    </motion.div>
  );
}
