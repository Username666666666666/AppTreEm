import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, Video, X, PhoneOff, Mic, MicOff, Volume2 } from 'lucide-react';
import { Contact } from './ContactCard';

interface CallScreenProps {
  contact: Contact | null;
  callType: 'voice' | 'video';
  onEndCall: () => void;
}

export function CallScreen({ contact, callType, onEndCall }: CallScreenProps) {
  const [callDuration, setCallDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isRinging, setIsRinging] = useState(true);

  useEffect(() => {
    if (!contact) return;

    // Simulate ringing
    const ringTimer = setTimeout(() => {
      setIsRinging(false);
    }, 3000);

    return () => clearTimeout(ringTimer);
  }, [contact]);

  useEffect(() => {
    if (!contact || isRinging) return;

    const interval = setInterval(() => {
      setCallDuration(prev => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [contact, isRinging]);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (!contact) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500"
      >
        <div className="h-full flex flex-col items-center justify-between p-8 text-white">
          <div className="flex-1 flex flex-col items-center justify-center">
            <motion.div
              animate={isRinging ? { scale: [1, 1.1, 1] } : {}}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-32 h-32 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-6xl mb-6 shadow-2xl"
            >
              {contact.avatar}
            </motion.div>

            <h2 className="text-3xl font-bold mb-2">{contact.name}</h2>
            <p className="text-white/80 mb-4">{contact.relation}</p>

            {isRinging ? (
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="flex items-center gap-2"
              >
                <Phone className="w-5 h-5" />
                <span className="text-lg">Đang kết nối...</span>
              </motion.div>
            ) : (
              <div className="flex items-center gap-2 text-xl">
                {callType === 'video' ? (
                  <Video className="w-6 h-6" />
                ) : (
                  <Phone className="w-6 h-6" />
                )}
                <span>{formatDuration(callDuration)}</span>
              </div>
            )}
          </div>

          {!isRinging && (
            <div className="flex items-center gap-4 mb-8">
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsMuted(!isMuted)}
                className={`w-14 h-14 rounded-full flex items-center justify-center ${
                  isMuted ? 'bg-red-500' : 'bg-white/20 backdrop-blur-sm'
                } shadow-lg`}
              >
                {isMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.9 }}
                className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg"
              >
                <Volume2 className="w-6 h-6" />
              </motion.button>
            </div>
          )}

          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={onEndCall}
            className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center shadow-2xl mb-8"
          >
            <PhoneOff className="w-8 h-8" />
          </motion.button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
