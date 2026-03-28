import { Home, ListTodo, Gift, User } from 'lucide-react';

interface BottomNavProps {
  activeTab: 'home' | 'tasks' | 'rewards' | 'profile'| 'videos';
  onTabChange: (tab: 'home' | 'tasks' | 'rewards' | 'profile'| 'videos') => void;
}

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  const tabs = [
    { id: 'home' as const, icon: Home, label: 'Trang chủ' },
    { id: 'tasks' as const, icon: ListTodo, label: 'Nhiệm vụ' },
    { id: 'rewards' as const, icon: Gift, label: 'Phần thưởng' },
    { id: 'profile' as const, icon: User, label: 'Hồ sơ' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-gray-100 shadow-lg rounded-t-3xl">
      <div className="flex justify-around items-center p-4 max-w-md mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${
                isActive 
                  ? 'bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-md' 
                  : 'text-gray-400'
              }`}
            >
              <Icon className="w-6 h-6" />
              <span className="text-xs font-semibold">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
