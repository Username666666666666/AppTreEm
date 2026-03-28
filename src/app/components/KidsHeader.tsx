import { Star, Award } from 'lucide-react';

interface KidsHeaderProps {
  childName: string;
  points: number;
  level: number;
}

export function KidsHeader({ childName, points, level }: KidsHeaderProps) {
  return (
    <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-400 p-6 rounded-b-3xl shadow-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-3xl shadow-lg">
            😊
          </div>
          <div className="text-white">
            <h1 className="text-2xl font-bold">Xin chào, {childName}!</h1>
            <p className="text-purple-100 text-sm">Hãy hoàn thành nhiệm vụ nhé!</p>
          </div>
        </div>
        <div className="flex gap-3">
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-4 py-2 flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-300 fill-yellow-300" />
            <span className="text-white font-bold">{points}</span>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-4 py-2 flex items-center gap-2">
            <Award className="w-5 h-5 text-yellow-300" />
            <span className="text-white font-bold">Cấp {level}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
