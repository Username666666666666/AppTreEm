import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Clock, Bell } from 'lucide-react';

export interface TimeNotification {
  id: string;
  time: string;
  title: string;
  message: string;
  type: 'task' | 'break' | 'meal' | 'sleep' | 'study';
  emoji: string;
}

interface TimeNotificationProps {
  notifications: TimeNotification[];
  onDismiss: (id: string) => void;
}

const typeColors = {
  task: 'from-blue-500 to-cyan-500',
  break: 'from-green-500 to-emerald-500',
  meal: 'from-orange-500 to-yellow-500',
  sleep: 'from-indigo-500 to-purple-500',
  study: 'from-pink-500 to-rose-500',
};

export function TimeNotifications({ notifications, onDismiss }: TimeNotificationProps) {
  return (
    <div className="fixed top-20 right-4 z-50 space-y-2 max-w-xs">
      <AnimatePresence>
        {notifications.map((notification) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className={`bg-gradient-to-r ${typeColors[notification.type]} rounded-2xl shadow-xl p-4 text-white`}
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-xl flex-shrink-0">
                {notification.emoji}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Bell className="w-4 h-4 animate-pulse" />
                  <span className="font-bold text-sm">{notification.title}</span>
                </div>
                <p className="text-xs mb-2">{notification.message}</p>
                <div className="flex items-center gap-1 text-xs opacity-90">
                  <Clock className="w-3 h-3" />
                  <span>{notification.time}</span>
                </div>
              </div>
              <button
                onClick={() => onDismiss(notification.id)}
                className="text-white/80 hover:text-white text-xs"
              >
                ✕
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

// Hook to manage time-based notifications
export function useTimeNotifications() {
  const [notifications, setNotifications] = useState<TimeNotification[]>([]);

  const scheduleNotification = (notification: Omit<TimeNotification, 'id'>) => {
    const newNotification: TimeNotification = {
      ...notification,
      id: Date.now().toString(),
    };
    setNotifications(prev => [...prev, newNotification]);

    // Auto dismiss after 10 seconds
    setTimeout(() => {
      dismissNotification(newNotification.id);
    }, 10000);
  };

  const dismissNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  // Check time-based triggers
  useEffect(() => {
    const checkSchedule = () => {
      const now = new Date();
      const hour = now.getHours();
      const minute = now.getMinutes();
      const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;

      // Example schedules
      const schedules = [
        { time: '07:00', type: 'meal' as const, emoji: '🥞', title: 'Giờ ăn sáng!', message: 'Đã đến giờ ăn sáng rồi. Nhớ ăn đầy đủ nhé!' },
        { time: '12:00', type: 'meal' as const, emoji: '🍱', title: 'Giờ ăn trưa!', message: 'Đã đến giờ ăn trưa. Nghỉ ngơi và ăn uống nhé!' },
        { time: '15:00', type: 'break' as const, emoji: '🧘', title: 'Giờ nghỉ ngơi!', message: 'Nghỉ giải lao một chút. Bé có thể chơi hoặc ăn nhẹ!' },
        { time: '18:00', type: 'meal' as const, emoji: '🍽️', title: 'Giờ ăn tối!', message: 'Đã đến giờ ăn tối rồi!' },
        { time: '20:00', type: 'sleep' as const, emoji: '😴', title: 'Chuẩn bị đi ngủ!', message: 'Sắp đến giờ đi ngủ. Hãy chuẩn bị nhé!' },
      ];

      schedules.forEach(schedule => {
        if (timeString === schedule.time) {
          scheduleNotification(schedule);
        }
      });
    };

    // Check every minute
    const interval = setInterval(checkSchedule, 60000);
    checkSchedule(); // Check immediately

    return () => clearInterval(interval);
  }, []);

  return {
    notifications,
    scheduleNotification,
    dismissNotification,
  };
}
