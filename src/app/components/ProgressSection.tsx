import { Progress } from './ui/progress';
import { Trophy, Target } from 'lucide-react';

interface ProgressSectionProps {
  completedTasks: number;
  totalTasks: number;
  weeklyGoal: number;
}

export function ProgressSection({ completedTasks, totalTasks, weeklyGoal }: ProgressSectionProps) {
  const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
  const weekProgress = (completedTasks / weeklyGoal) * 100;

  return (
    <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl p-6 shadow-lg text-white">
      <div className="flex items-center gap-2 mb-4">
        <Target className="w-6 h-6" />
        <h2 className="text-xl font-bold">Tiến độ hôm nay</h2>
      </div>
      
      <div className="space-y-4">
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-purple-100">Nhiệm vụ hoàn thành</span>
            <span className="font-bold">{completedTasks}/{totalTasks}</span>
          </div>
          <Progress value={progress} className="h-3 bg-white/20" />
        </div>

        <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-2">
            <Trophy className="w-5 h-5 text-yellow-300" />
            <span className="font-semibold">Mục tiêu tuần này</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-purple-100 text-sm">Hoàn thành {weeklyGoal} nhiệm vụ</span>
            <span className="font-bold text-sm">{completedTasks}/{weeklyGoal}</span>
          </div>
          <Progress value={Math.min(weekProgress, 100)} className="h-2 bg-white/20" />
        </div>
      </div>
    </div>
  );
}
