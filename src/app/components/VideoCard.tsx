import { Play, Clock, CheckCircle, Shield } from 'lucide-react';
import { motion } from 'motion/react';

export interface Video {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  category: 'math' | 'language' | 'science' | 'art' | 'life-skills';
  ageAppropriate: boolean;
  watched: boolean;
  safetyScore: number; // 0-100
}

interface VideoCardProps {
  video: Video;
  onPlay: (id: string) => void;
}

const categoryLabels = {
  math: '🔢 Toán học',
  language: '📝 Ngôn ngữ',
  science: '🔬 Khoa học',
  art: '🎨 Nghệ thuật',
  'life-skills': '🌟 Kỹ năng sống',
};

const categoryColors = {
  math: 'from-blue-400 to-blue-600',
  language: 'from-green-400 to-green-600',
  science: 'from-purple-400 to-purple-600',
  art: 'from-pink-400 to-pink-600',
  'life-skills': 'from-orange-400 to-orange-600',
};

export function VideoCard({ video, onPlay }: VideoCardProps) {
  return (
    <motion.div
      whileTap={{ scale: 0.98 }}
      className="bg-white rounded-2xl shadow-md overflow-hidden cursor-pointer"
      onClick={() => onPlay(video.id)}
    >
      <div className="relative">
        <img 
          src={video.thumbnail} 
          alt={video.title}
          className="w-full h-40 object-cover"
        />
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
          <div className="w-14 h-14 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
            <Play className="w-7 h-7 text-purple-600 fill-purple-600 ml-1" />
          </div>
        </div>
        {video.watched && (
          <div className="absolute top-2 right-2 bg-green-500 rounded-full p-1">
            <CheckCircle className="w-5 h-5 text-white" />
          </div>
        )}
        {video.safetyScore === 100 && (
          <div className="absolute top-2 left-2 bg-green-500 rounded-full p-1.5">
            <Shield className="w-4 h-4 text-white" />
          </div>
        )}
        <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
          <Clock className="w-3 h-3" />
          {video.duration}
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-sm mb-2 line-clamp-2">{video.title}</h3>
        <div className={`inline-block bg-gradient-to-r ${categoryColors[video.category]} text-white text-xs px-3 py-1 rounded-full font-semibold`}>
          {categoryLabels[video.category]}
        </div>
      </div>
    </motion.div>
  );
}
