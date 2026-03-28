import { useState, useEffect } from 'react';
import { KidsHeader } from './components/KidsHeader';
import { TaskCard, Task } from './components/TaskCard';
import { ProgressSection } from './components/ProgressSection';
import { RewardCard, Reward } from './components/RewardCard';
import { BottomNavWithContacts } from './components/BottomNavWithContacts';
import { VideoCard, Video } from './components/VideoCard';
import { VirtualAssistant, useVirtualAssistant } from './components/VirtualAssistant';
import { TimeNotifications, useTimeNotifications } from './components/TimeNotifications';
import { ContentWarningDialog, checkContentSafety, ContentWarning } from './components/ContentWarning';
import { ContactCard, Contact } from './components/ContactCard';
import { CallScreen } from './components/CallScreen';
import { ChatScreen, Message } from './components/ChatScreen';
import { UnknownCallerDialog, checkPhoneNumber, UnknownCaller } from './components/UnknownCallerDialog';
import { SecurityPin } from './components/SecurityPin';
import { Toaster, toast } from 'sonner';
import confetti from 'canvas-confetti';
import { Shield, Phone } from 'lucide-react';
import { supabase } from "../lib/supabase";



const initialTasks: Task[] = [
  { id: '1', title: 'Đánh răng sáng', emoji: '🪥', points: 10, completed: false, category: 'daily' },
  { id: '2', title: 'Ăn sáng đầy đủ', emoji: '🥗', points: 15, completed: false, category: 'daily' },
  { id: '3', title: 'Làm bài tập toán', emoji: '📐', points: 20, completed: false, category: 'learning' },
  { id: '4', title: 'Đọc sách 15 phút', emoji: '📚', points: 15, completed: false, category: 'learning' },
  { id: '5', title: 'Dọn dẹp phòng', emoji: '🧹', points: 20, completed: false, category: 'chore' },
  { id: '6', title: 'Tập thể dục', emoji: '🤸', points: 15, completed: false, category: 'daily' },
  { id: '7', title: 'Luyện viết chữ', emoji: '✍️', points: 10, completed: false, category: 'learning' },
  { id: '8', title: 'Giúp mẹ nấu ăn', emoji: '👨‍🍳', points: 20, completed: false, category: 'chore' },
];

const initialRewards: Reward[] = [
  { id: '1', title: 'Xem phim hoạt hình', emoji: '🎬', pointsRequired: 50, unlocked: false },
  { id: '2', title: 'Chơi game 30 phút', emoji: '🎮', pointsRequired: 80, unlocked: false },
  { id: '3', title: 'Ăn kem yêu thích', emoji: '🍦', pointsRequired: 100, unlocked: false },
  { id: '4', title: 'Đi công viên', emoji: '🎡', pointsRequired: 150, unlocked: false },
  { id: '5', title: 'Mua đồ chơi mới', emoji: '🧸', pointsRequired: 200, unlocked: false },
  { id: '6', title: 'Pizza cuối tuần', emoji: '🍕', pointsRequired: 120, unlocked: false },
];

const educationalVideos: Video[] = [
  {
    id: '1',
    title: 'Học đếm số từ 1 đến 100 - Vui nhộn và dễ nhớ',
    thumbnail: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400',
    duration: '10:23',
    category: 'math',
    ageAppropriate: true,
    watched: false,
    safetyScore: 100,
  },
  {
    id: '2',
    title: 'ABC tiếng Việt cho bé - Học bảng chữ cái vui vẻ',
    thumbnail: 'https://images.unsplash.com/photo-1503676382389-4809596d5290?w=400',
    duration: '8:45',
    category: 'language',
    ageAppropriate: true,
    watched: true,
    safetyScore: 100,
  },
  {
    id: '3',
    title: 'Khám phá hệ mặt trời - Các hành tinh cho trẻ em',
    thumbnail: 'https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?w=400',
    duration: '12:30',
    category: 'science',
    ageAppropriate: true,
    watched: false,
    safetyScore: 100,
  },
  {
    id: '4',
    title: 'Vẽ tranh cho bé - Học vẽ động vật dễ thương',
    thumbnail: 'https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=400',
    duration: '15:12',
    category: 'art',
    ageAppropriate: true,
    watched: false,
    safetyScore: 100,
  },
  {
    id: '5',
    title: 'Kỹ năng giao tiếp - Cách chào hỏi lịch sự',
    thumbnail: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=400',
    duration: '7:20',
    category: 'life-skills',
    ageAppropriate: true,
    watched: false,
    safetyScore: 100,
  },
  {
    id: '6',
    title: 'Phép cộng trừ đơn giản - Toán học vui vẻ',
    thumbnail: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=400',
    duration: '11:05',
    category: 'math',
    ageAppropriate: true,
    watched: false,
    safetyScore: 100,
  },
];

const trustedContacts: Contact[] = [
  {
    id: '1',
    name: 'Mẹ',
    relation: 'Mẹ của bé',
    avatar: '👩',
    phoneNumber: '0912345678',
    isTrusted: true,
    canCall: true,
    canMessage: true,
    isOnline: true,
  },
  {
    id: '2',
    name: 'Bố',
    relation: 'Bố của bé',
    avatar: '👨',
    phoneNumber: '0987654321',
    isTrusted: true,
    canCall: true,
    canMessage: true,
    isOnline: false,
  },
  {
    id: '3',
    name: 'Bà nội',
    relation: 'Bà của bé',
    avatar: '👵',
    phoneNumber: '0901234567',
    isTrusted: true,
    canCall: true,
    canMessage: true,
    isOnline: true,
  },
  {
    id: '4',
    name: 'Chị Lan',
    relation: 'Chị gái',
    avatar: '👧',
    phoneNumber: '0976543210',
    isTrusted: true,
    canCall: true,
    canMessage: true,
    isOnline: true,
  },
  {
    id: '5',
    name: 'Cô giáo Hương',
    relation: 'Giáo viên',
    avatar: '👩‍🏫',
    phoneNumber: '0965432109',
    isTrusted: true,
    canCall: true,
    canMessage: false,
    isOnline: false,
  },
];

function App() {
  const [activeTab, setActiveTab] = useState<
    'home' | 'tasks' | 'contacts' | 'rewards' | 'profile' | 'videos'
  >('home');
const [childProfile, setChildProfile] = useState<any>(null);
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [rewards, setRewards] = useState<Reward[]>(initialRewards);
  const [videos, setVideos] = useState<Video[]>(educationalVideos);
  const [contacts, setContacts] = useState<Contact[]>(trustedContacts);

  const [messages, setMessages] = useState<{ [contactId: string]: Message[] }>({
    '1': [
      {
        id: '1',
        senderId: '1',
        text: 'Con đã ăn cơm chưa?',
        timestamp: new Date(Date.now() - 3600000),
        isFromMe: false,
      },
      {
        id: '2',
        senderId: 'me',
        text: 'Con ăn rồi mẹ ơi! 😊',
        timestamp: new Date(Date.now() - 3000000),
        isFromMe: true,
      },
    ],
  });
  
  const [points, setPoints] = useState(75);
  const [level, setLevel] = useState(3);
  const [contentWarning, setContentWarning] = useState<ContentWarning | null>(null);
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);
  const [currentCall, setCurrentCall] = useState<{ contact: Contact; type: 'voice' | 'video' } | null>(null);
  const [currentChat, setCurrentChat] = useState<Contact | null>(null);
  const [unknownCaller, setUnknownCaller] = useState<UnknownCaller | null>(null);
  const [showSecurityPin, setShowSecurityPin] = useState(false);
  const [pendingAction, setPendingAction] = useState<(() => void) | null>(null);

  const { currentMessage, showMessage, dismissMessage } = useVirtualAssistant();
  const { notifications, scheduleNotification, dismissNotification } = useTimeNotifications();

  const completedTasksCount = tasks.filter(t => t.completed).length;
  const weeklyGoal = 20;

  // Welcome message on mount
  useEffect(() => {
    setTimeout(() => {
      showMessage({
        type: 'encouragement',
        emoji: '👋',
        message: 'Chào bé! Hôm nay bé có khỏe không? Hãy hoàn thành nhiệm vụ để nhận điểm nhé!',
      });
    }, 1000);
  }, []);

  useEffect(() => {
  const loadChild = async () => {
    const childId = localStorage.getItem("selected_child_id");

    if (!childId) return;

    const { data, error } = await supabase
      .from("children")
      .select("*")
      .eq("id", childId)
      .single();

    if (!error) {
      setChildProfile(data);
    }
  };

  loadChild();
}, []);

  // Periodic encouragement
  useEffect(() => {
    const messages = [
      { type: 'tip' as const, emoji: '💡', message: 'Mẹo hay: Hoàn thành nhiệm vụ sáng sớm sẽ có cả ngày vui vẻ đấy!' },
      { type: 'encouragement' as const, emoji: '🌟', message: 'Bé làm rất tốt! Tiếp tục cố gắng nhé!' },
      { type: 'reminder' as const, emoji: '📚', message: 'Đừng quên xem video học tập hôm nay nhé!' },
    ];

    const interval = setInterval(() => {
      const randomMessage = messages[Math.floor(Math.random() * messages.length)];
      showMessage(randomMessage);
    }, 180000); // Every 3 minutes

    return () => clearInterval(interval);
  }, []);

  // Screen time warning
  useEffect(() => {
    let videoWatchTime = 0;
    const interval = setInterval(() => {
      if (activeTab === 'videos') {
        videoWatchTime += 1;
        if (videoWatchTime === 20) { // 20 minutes
          showMessage({
            type: 'warning',
            emoji: '⏰',
            message: 'Bé đã xem video 20 phút rồi! Nên nghỉ mắt một chút nhé!',
          });
        }
      } else {
        videoWatchTime = 0;
      }
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [activeTab]);

  // Simulate incoming unknown call
  useEffect(() => {
    const simulateUnknownCall = () => {
      const unknownNumber = '0888123456';
      const caller = checkPhoneNumber(
        unknownNumber,
        contacts.map(c => c.phoneNumber)
      );
      setUnknownCaller(caller);
      
      showMessage({
        type: 'warning',
        emoji: '📞',
        message: 'Có cuộc gọi từ số lạ! Hãy kiểm tra trước khi nhận máy.',
      });
    };

    // Simulate after 30 seconds for demo
    const timer = setTimeout(simulateUnknownCall, 30000);
    return () => clearTimeout(timer);
  }, []);

  const handleTaskToggle = (id: string) => {
    const task = tasks.find(t => t.id === id);
    if (!task) return;

    if (!task.completed) {
      // Complete task
      setTasks(tasks.map(t => t.id === id ? { ...t, completed: true } : t));
      setPoints(prev => prev + task.points);
      
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 }
      });
      
      toast.success(`🎉 Hoàn thành! +${task.points} điểm`, {
        duration: 2000,
      });

      // AI encouragement
      showMessage({
        type: 'celebration',
        emoji: '🎊',
        message: `Tuyệt vời! Bé vừa hoàn thành "${task.title}". Giỏi lắm!`,
      });

      // Level up check
      const newPoints = points + task.points;
      const newLevel = Math.floor(newPoints / 100) + 1;
      if (newLevel > level) {
        setLevel(newLevel);
        setTimeout(() => {
          confetti({
            particleCount: 100,
            spread: 100,
            origin: { y: 0.5 }
          });
          toast.success(`🌟 Lên cấp ${newLevel}!`, {
            duration: 3000,
          });
          showMessage({
            type: 'celebration',
            emoji: '🏆',
            message: `Chúc mừng bé lên cấp ${newLevel}! Bé thật là giỏi!`,
          });
        }, 500);
      }
    } else {
      // Uncomplete task
      setTasks(tasks.map(t => t.id === id ? { ...t, completed: false } : t));
      setPoints(prev => Math.max(0, prev - task.points));
      toast.info(`Đã bỏ hoàn thành nhiệm vụ`, {
        duration: 2000,
      });
    }
  };

  const handleClaimReward = (id: string) => {
    const reward = rewards.find(r => r.id === id);
    if (!reward) return;

    if (points >= reward.pointsRequired) {
      setRewards(rewards.map(r => r.id === id ? { ...r, unlocked: true } : r));
      setPoints(prev => prev - reward.pointsRequired);
      
      confetti({
        particleCount: 100,
        spread: 120,
        origin: { y: 0.5 }
      });
      
      toast.success(`🎁 Đã nhận phần thưởng: ${reward.title}!`, {
        duration: 3000,
      });

      showMessage({
        type: 'celebration',
        emoji: '🎉',
        message: `Chúc mừng bé nhận được phần thưởng "${reward.title}"! Hãy tận hưởng nhé!`,
      });
    }
  };

  const handleVideoPlay = (id: string) => {
    const video = videos.find(v => v.id === id);
    if (!video) return;

    // Check content safety
    const safety = checkContentSafety({
      title: video.title,
      keywords: [video.category],
    });

    if (safety.detected) {
      setContentWarning(safety);
      setSelectedVideoId(id);
    } else {
      playVideo(id);
    }
  };

  const playVideo = (id: string) => {
    setVideos(videos.map(v => v.id === id ? { ...v, watched: true } : v));
    toast.success('Đang phát video...', { duration: 2000 });
    
    showMessage({
      type: 'tip',
      emoji: '📺',
      message: 'Nhớ ngồi thẳng lưng và giữ khoảng cách với màn hình nhé!',
    });

    // Simulate earning points for watching educational video
    setTimeout(() => {
      setPoints(prev => prev + 5);
      toast.success('🌟 +5 điểm vì xem video học tập!', { duration: 2000 });
    }, 3000);
  };

  const handleWarningClose = () => {
    setContentWarning(null);
    setSelectedVideoId(null);
  };

  const handleWarningProceed = () => {
    if (selectedVideoId) {
      playVideo(selectedVideoId);
    }
  };

  const handleCall = (contactId: string, type: 'voice' | 'video') => {
    const contact = contacts.find(c => c.id === contactId);
    if (!contact) return;

    setCurrentCall({ contact, type });
    toast.success(`Đang gọi ${contact.name}...`, { duration: 2000 });
    
    showMessage({
      type: 'tip',
      emoji: '📞',
      message: `Đang kết nối với ${contact.name}. Nhớ chào hỏi lịch sự nhé!`,
    });
  };

  const handleEndCall = () => {
    if (currentCall) {
      toast.info(`Đã kết thúc cuộc gọi với ${currentCall.contact.name}`);
    }
    setCurrentCall(null);
  };

  const handleMessage = (contactId: string) => {
    const contact = contacts.find(c => c.id === contactId);
    if (!contact) return;

    setCurrentChat(contact);
  };

  const handleSendMessage = (text: string) => {
    if (!currentChat) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: 'me',
      text,
      timestamp: new Date(),
      isFromMe: true,
    };

    setMessages(prev => ({
      ...prev,
      [currentChat.id]: [...(prev[currentChat.id] || []), newMessage],
    }));

    // Simulate reply
    setTimeout(() => {
      const replyMessage: Message = {
        id: (Date.now() + 1).toString(),
        senderId: currentChat.id,
        text: getAutoReply(currentChat.name),
        timestamp: new Date(),
        isFromMe: false,
      };

      setMessages(prev => ({
        ...prev,
        [currentChat.id]: [...(prev[currentChat.id] || []), replyMessage],
      }));
    }, 2000);
  };

  const getAutoReply = (name: string): string => {
    const replies = [
      'Được con yêu! ❤️',
      'Mẹ đang bận, chút nữa mẹ trả lời nhé!',
      'Con giỏi lắm!',
      'Yêu con nhiều! 😘',
    ];
    return replies[Math.floor(Math.random() * replies.length)];
  };

  const handleUnknownCallerAccept = () => {
    toast.info('Đã nhận cuộc gọi từ số lạ');
    setUnknownCaller(null);
    showMessage({
      type: 'warning',
      emoji: '⚠️',
      message: 'Nhớ không cho người lạ biết thông tin cá nhân nhé!',
    });
  };

  const handleUnknownCallerReject = () => {
    toast.success('Đã từ chối cuộc gọi');
    setUnknownCaller(null);
    showMessage({
      type: 'encouragement',
      emoji: '👍',
      message: 'Tốt lắm! Bé đã làm đúng khi cảnh giác với số lạ!',
    });
  };

  const handleUnknownCallerAskParent = () => {
    setUnknownCaller(null);
    setShowSecurityPin(true);
    setPendingAction(() => () => {
      toast.success('Đã thông báo cho bố mẹ!');
      showMessage({
        type: 'encouragement',
        emoji: '✅',
        message: 'Giỏi lắm! Luôn hỏi bố mẹ khi không chắc chắn!',
      });
    });
  };

  const handleSecurityPinSuccess = () => {
    setShowSecurityPin(false);
    if (pendingAction) {
      pendingAction();
      setPendingAction(null);
    }
  };

  const handleSecurityPinCancel = () => {
    setShowSecurityPin(false);
    setPendingAction(null);
    toast.info('Đã hủy xác thực');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 pb-24">
      <Toaster position="top-center" />
      
      
      
      
      <KidsHeader
  childName={childProfile?.child_name || "Đang tải..."}
  points={points}
  level={level}
/>

      <TimeNotifications 
        notifications={notifications}
        onDismiss={dismissNotification}
      />

      <VirtualAssistant 
        message={currentMessage}
        onDismiss={dismissMessage}
      />

      <ContentWarningDialog 
        warning={contentWarning}
        onClose={handleWarningClose}
        onProceed={handleWarningProceed}
      />

      <UnknownCallerDialog 
        caller={unknownCaller}
        onAccept={handleUnknownCallerAccept}
        onReject={handleUnknownCallerReject}
        onAskParent={handleUnknownCallerAskParent}
      />

      {showSecurityPin && (
        <SecurityPin
          mode="verify"
          onSuccess={handleSecurityPinSuccess}
          onCancel={handleSecurityPinCancel}
        />
      )}

      {currentCall && (
        <CallScreen
          contact={currentCall.contact}
          callType={currentCall.type}
          onEndCall={handleEndCall}
        />
      )}

      {currentChat && (
        <ChatScreen
          contact={currentChat}
          messages={messages[currentChat.id] || []}
          onBack={() => setCurrentChat(null)}
          onSendMessage={handleSendMessage}
        />
      )}

      <div className="p-4 max-w-md mx-auto space-y-6 mt-6">
        {/* Home Tab */}
        {activeTab === 'home' && (
          <>
            <ProgressSection 
              completedTasks={completedTasksCount} 
              totalTasks={tasks.length}
              weeklyGoal={weeklyGoal}
            />
            
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span>📝</span> Nhiệm vụ hôm nay
              </h2>
              <div className="space-y-3">
                {tasks.slice(0, 4).map(task => (
                  <TaskCard key={task.id} task={task} onToggle={handleTaskToggle} />
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span>📞</span> Người thân
              </h2>
              <div className="space-y-3">
                {contacts.slice(0, 3).map(contact => (
                  <ContactCard 
                    key={contact.id} 
                    contact={contact}
                    onCall={handleCall}
                    onMessage={handleMessage}
                  />
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span>🎁</span> Phần thưởng gần đạt được
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {rewards.filter(r => !r.unlocked).slice(0, 4).map(reward => (
                  <RewardCard 
                    key={reward.id} 
                    reward={reward} 
                    currentPoints={points}
                    onClaim={handleClaimReward}
                  />
                ))}
              </div>
            </div>
          </>
        )}

        {/* Tasks Tab */}
        {activeTab === 'tasks' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span>📋</span> Tất cả nhiệm vụ
            </h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-blue-600 mb-3">🌅 Sinh hoạt hàng ngày</h3>
                <div className="space-y-3">
                  {tasks.filter(t => t.category === 'daily').map(task => (
                    <TaskCard key={task.id} task={task} onToggle={handleTaskToggle} />
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-green-600 mb-3">📚 Học tập</h3>
                <div className="space-y-3">
                  {tasks.filter(t => t.category === 'learning').map(task => (
                    <TaskCard key={task.id} task={task} onToggle={handleTaskToggle} />
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-orange-600 mb-3">🏠 Việc nhà</h3>
                <div className="space-y-3">
                  {tasks.filter(t => t.category === 'chore').map(task => (
                    <TaskCard key={task.id} task={task} onToggle={handleTaskToggle} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Contacts Tab */}
        {activeTab === 'contacts' && (
          <div>
            <div className="bg-gradient-to-r from-green-400 to-emerald-400 rounded-2xl p-4 mb-6 text-white shadow-lg">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-2xl">
                  🛡️
                </div>
                <div className="flex-1">
                  <p className="font-bold text-sm mb-1">Danh bạ an toàn</p>
                  <p className="text-xs opacity-90">Chỉ liên hệ với người được phê duyệt</p>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span>👨‍👩‍👧</span> Danh bạ của bé
            </h2>

            <div className="space-y-3">
              {contacts.map(contact => (
                <ContactCard 
                  key={contact.id} 
                  contact={contact}
                  onCall={handleCall}
                  onMessage={handleMessage}
                />
              ))}
            </div>

            <div className="mt-6 bg-blue-50 rounded-2xl p-4">
              <div className="flex items-start gap-2">
                <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-blue-900 mb-1">An toàn khi liên lạc</h4>
                  <ul className="text-xs text-blue-800 space-y-1">
                    <li>• Chỉ gọi người có trong danh bạ</li>
                    <li>• Không chia sẻ thông tin cá nhân</li>
                    <li>• Hỏi bố mẹ nếu có số lạ gọi đến</li>
                    <li>• Lịch sự và tôn trọng khi trò chuyện</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Videos Tab */}
        {activeTab === 'videos' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span>📺</span> Video học tập
            </h2>

            <div className="bg-gradient-to-r from-green-400 to-emerald-400 rounded-2xl p-4 mb-6 text-white shadow-lg">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-2xl">
                  🛡️
                </div>
                <div className="flex-1">
                  <p className="font-bold text-sm mb-1">Nội dung an toàn</p>
                  <p className="text-xs opacity-90">Tất cả video đã được kiểm duyệt kỹ lưỡng</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-blue-600 mb-3">🔢 Toán học</h3>
                <div className="grid grid-cols-2 gap-3">
                  {videos.filter(v => v.category === 'math').map(video => (
                    <VideoCard 
                      key={video.id} 
                      video={video}
                      onPlay={handleVideoPlay}
                    />
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-green-600 mb-3">📝 Ngôn ngữ</h3>
                <div className="grid grid-cols-2 gap-3">
                  {videos.filter(v => v.category === 'language').map(video => (
                    <VideoCard 
                      key={video.id} 
                      video={video}
                      onPlay={handleVideoPlay}
                    />
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-purple-600 mb-3">🔬 Khoa học</h3>
                <div className="grid grid-cols-2 gap-3">
                  {videos.filter(v => v.category === 'science').map(video => (
                    <VideoCard 
                      key={video.id} 
                      video={video}
                      onPlay={handleVideoPlay}
                    />
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-pink-600 mb-3">🎨 Nghệ thuật</h3>
                <div className="grid grid-cols-2 gap-3">
                  {videos.filter(v => v.category === 'art').map(video => (
                    <VideoCard 
                      key={video.id} 
                      video={video}
                      onPlay={handleVideoPlay}
                    />
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-orange-600 mb-3">🌟 Kỹ năng sống</h3>
                <div className="grid grid-cols-2 gap-3">
                  {videos.filter(v => v.category === 'life-skills').map(video => (
                    <VideoCard 
                      key={video.id} 
                      video={video}
                      onPlay={handleVideoPlay}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Rewards Tab */}
        {activeTab === 'rewards' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span>🎁</span> Phần thưởng của bé
            </h2>
            
            <div className="bg-gradient-to-r from-yellow-400 to-orange-400 rounded-2xl p-4 mb-6 text-white shadow-lg">
              <div className="text-center">
                <p className="text-sm opacity-90 mb-1">Điểm hiện tại</p>
                <p className="text-4xl font-bold">{points} ⭐</p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-3">🔓 Có thể nhận ngay</h3>
              <div className="grid grid-cols-2 gap-3 mb-6">
                {rewards.filter(r => !r.unlocked && points >= r.pointsRequired).map(reward => (
                  <RewardCard 
                    key={reward.id} 
                    reward={reward} 
                    currentPoints={points}
                    onClaim={handleClaimReward}
                  />
                ))}
                {rewards.filter(r => !r.unlocked && points >= r.pointsRequired).length === 0 && (
                  <div className="col-span-2 text-center py-8 text-gray-400">
                    <p>Chưa có phần thưởng nào có thể nhận</p>
                    <p className="text-sm">Hãy hoàn thành thêm nhiệm vụ nhé! 💪</p>
                  </div>
                )}
              </div>

              <h3 className="text-lg font-semibold text-gray-700 mb-3">🔒 Chưa đủ điểm</h3>
              <div className="grid grid-cols-2 gap-3 mb-6">
                {rewards.filter(r => !r.unlocked && points < r.pointsRequired).map(reward => (
                  <RewardCard 
                    key={reward.id} 
                    reward={reward} 
                    currentPoints={points}
                  />
                ))}
              </div>

              {rewards.filter(r => r.unlocked).length > 0 && (
                <>
                  <h3 className="text-lg font-semibold text-gray-700 mb-3">✅ Đã nhận</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {rewards.filter(r => r.unlocked).map(reward => (
                      <RewardCard 
                        key={reward.id} 
                        reward={reward} 
                        currentPoints={points}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div>
            <div className="bg-white rounded-3xl p-6 shadow-lg mb-6">
              <div className="flex flex-col items-center text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-5xl shadow-lg mb-4">
                  😊
                </div>
               <h2 className="text-2xl font-bold text-gray-800">
  {childProfile?.child_name || "Đang tải..."}
</h2>
                <p className="text-purple-600 font-semibold">Cấp {level} ⭐</p>
                <div className="mt-4 px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-bold">
                  {points} điểm
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-white rounded-2xl p-5 shadow-md">
                <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <span>📊</span> Thống kê
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Nhiệm vụ hoàn thành</span>
                    <span className="font-bold text-green-600">{completedTasksCount}/{tasks.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Phần thưởng đã nhận</span>
                    <span className="font-bold text-purple-600">{rewards.filter(r => r.unlocked).length}/{rewards.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Cấp độ hiện tại</span>
                    <span className="font-bold text-blue-600">Cấp {level}</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-5 shadow-md">
                <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <span>🏆</span> Thành tích
                </h3>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { emoji: '🌟', title: 'Siêng năng', earned: completedTasksCount >= 5 },
                    { emoji: '📚', title: 'Học giỏi', earned: tasks.filter(t => t.category === 'learning' && t.completed).length >= 2 },
                    { emoji: '🧹', title: 'Gọn gàng', earned: tasks.filter(t => t.category === 'chore' && t.completed).length >= 2 },
                    { emoji: '⚡', title: 'Nhanh nhẹn', earned: level >= 3 },
                    { emoji: '💪', title: 'Khỏe mạnh', earned: points >= 70 },
                    { emoji: '🎯', title: 'Tập trung', earned: points >= 100 },
                  ].map((achievement, idx) => (
                    <div 
                      key={idx}
                      className={`p-3 rounded-xl text-center ${
                        achievement.earned 
                          ? 'bg-gradient-to-br from-yellow-400 to-orange-400' 
                          : 'bg-gray-100'
                      }`}
                    >
                      <div className="text-3xl mb-1">{achievement.emoji}</div>
                      <div className={`text-xs font-semibold ${
                        achievement.earned ? 'text-white' : 'text-gray-400'
                      }`}>
                        {achievement.title}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <BottomNavWithContacts activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}

export default App;