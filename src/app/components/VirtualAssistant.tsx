import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles } from 'lucide-react';

export interface AssistantMessage {
  id: string;
  type: 'tip' | 'encouragement' | 'warning' | 'reminder' | 'celebration';
  message: string;
  emoji: string;
}

interface VirtualAssistantProps {
  message: AssistantMessage | null;
  onDismiss: () => void;
}

const typeColors = {
  tip: 'from-blue-400 to-cyan-400',
  encouragement: 'from-green-400 to-emerald-400',
  warning: 'from-red-400 to-orange-400',
  reminder: 'from-purple-400 to-pink-400',
  celebration: 'from-yellow-400 to-orange-400',
};

export function VirtualAssistant({ message, onDismiss }: VirtualAssistantProps) {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
          className="fixed bottom-24 left-4 right-4 z-50 max-w-md mx-auto"
        >
          <div className={`bg-gradient-to-r ${typeColors[message.type]} rounded-3xl shadow-2xl p-4 text-white`}>
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-2xl flex-shrink-0 shadow-lg">
                {message.emoji}
              </div>
              <div className="flex-1 pt-1">
                <div className="flex items-center gap-2 mb-1">
                  <Sparkles className="w-4 h-4" />
                  <span className="font-bold text-sm">Trợ lý AI của bé</span>
                </div>
                <p className="text-sm leading-relaxed">{message.message}</p>
              </div>
              <button
                onClick={onDismiss}
                className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors flex-shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Hook to manage assistant messages
export function useVirtualAssistant() {
  const [currentMessage, setCurrentMessage] = useState<AssistantMessage | null>(null);
  const [messageQueue, setMessageQueue] = useState<AssistantMessage[]>([]);

  const showMessage = (message: Omit<AssistantMessage, 'id'>) => {
    const newMessage: AssistantMessage = {
      ...message,
      id: Date.now().toString(),
    };
    setMessageQueue(prev => [...prev, newMessage]);
  };

  useEffect(() => {
    if (!currentMessage && messageQueue.length > 0) {
      setCurrentMessage(messageQueue[0]);
      setMessageQueue(prev => prev.slice(1));
    }
  }, [currentMessage, messageQueue]);

  const dismissMessage = () => {
    setCurrentMessage(null);
  };

  return {
    currentMessage,
    showMessage,
    dismissMessage,
  };
}
