import { BottomNav } from './BottomNav';
import { Home, ListTodo, Gift, User, Video, Phone } from 'lucide-react';


interface BottomNavWithVideoProps {
  activeTab: 'home' | 'tasks' | 'contacts' | 'rewards' | 'profile'| 'videos' ;
  onTabChange: (tab: 'home' | 'tasks' | 'contacts' | 'rewards' | 'profile'| 'videos' ) => void;
}

export function BottomNavWithVideo({ activeTab, onTabChange }: BottomNavWithVideoProps) {
  const tabs = [
    { id: 'home' as const, icon: Home, label: 'Trang chủ' },
    { id: 'tasks' as const, icon: ListTodo, label: 'Nhiệm vụ' },
    { id: 'videos' as const, icon: Video, label: 'Video' },
    { id: 'contacts' as const, icon: Phone, label: 'Liên hệ' },
    { id: 'rewards' as const, icon: Gift, label: 'Thưởng' },
    { id: 'profile' as const, icon: User, label: 'Hồ sơ' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-gray-100 shadow-lg rounded-t-3xl">
      <div className="flex justify-around items-center p-3 max-w-md mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center gap-0.5 p-2 rounded-xl transition-all ${
                isActive 
                  ? 'bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-md' 
                  : 'text-gray-400'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px] font-semibold">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
