import { Gift, Lock } from 'lucide-react';
import { motion } from 'motion/react';

export interface Reward {
  id: string;
  title: string;
  emoji: string;
  pointsRequired: number;
  unlocked: boolean;
}

interface RewardCardProps {
  reward: Reward;
  currentPoints: number;
  onClaim?: (id: string) => void;
}

export function RewardCard({ reward, currentPoints, onClaim }: RewardCardProps) {
  const canClaim = currentPoints >= reward.pointsRequired && !reward.unlocked;
  
  return (
    <motion.div
      whileTap={canClaim ? { scale: 0.95 } : {}}
      className={`relative bg-white rounded-2xl p-4 shadow-md ${
        canClaim ? 'cursor-pointer ring-2 ring-green-400' : ''
      } ${reward.unlocked ? 'opacity-60' : ''}`}
      onClick={() => canClaim && onClaim && onClaim(reward.id)}
    >
      {reward.unlocked && (
        <div className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
          Đã nhận
        </div>
      )}
      {!reward.unlocked && currentPoints < reward.pointsRequired && (
        <div className="absolute top-2 right-2 bg-gray-400 rounded-full p-1">
          <Lock className="w-4 h-4 text-white" />
        </div>
      )}
      
      <div className="flex flex-col items-center text-center">
        <div className="w-20 h-20 bg-gradient-to-br from-pink-400 to-purple-500 rounded-2xl flex items-center justify-center text-4xl shadow-md mb-3">
          {reward.emoji}
        </div>
        <h3 className="font-bold text-sm mb-2">{reward.title}</h3>
        <div className="flex items-center gap-1">
          <Gift className="w-4 h-4 text-purple-500" />
          <span className="text-sm font-semibold text-purple-600">{reward.pointsRequired} điểm</span>
        </div>
      </div>
    </motion.div>
  );
}
