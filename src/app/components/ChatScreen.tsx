import { useState } from 'react';
import { motion } from 'motion/react';
import { Send, ArrowLeft, Smile } from 'lucide-react';
import { Contact } from './ContactCard';

export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: Date;
  isFromMe: boolean;
}

interface ChatScreenProps {
  contact: Contact | null;
  messages: Message[];
  onBack: () => void;
  onSendMessage: (text: string) => void;
}

export function ChatScreen({ contact, messages, onBack, onSendMessage }: ChatScreenProps) {
  const [inputText, setInputText] = useState('');

  const handleSend = () => {
    if (inputText.trim()) {
      onSendMessage(inputText);
      setInputText('');
    }
  };

  if (!contact) return null;

  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-4 shadow-lg">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-2xl shadow-md">
            {contact.avatar}
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-white">{contact.name}</h3>
            <p className="text-xs text-white/80">{contact.isOnline ? 'Đang hoạt động' : 'Ngoại tuyến'}</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 bg-purple-50">
        <div className="space-y-3">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isFromMe ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[75%] rounded-2xl px-4 py-3 ${
                  message.isFromMe
                    ? 'bg-gradient-to-br from-purple-500 to-pink-500 text-white'
                    : 'bg-white shadow-md text-gray-800'
                }`}
              >
                <p className="text-sm">{message.text}</p>
                <p className={`text-xs mt-1 ${message.isFromMe ? 'text-white/70' : 'text-gray-400'}`}>
                  {message.timestamp.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="p-4 bg-white border-t-2 border-gray-100">
        <div className="flex items-center gap-2">
          <button className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-600">
            <Smile className="w-5 h-5" />
          </button>
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Nhập tin nhắn..."
            className="flex-1 px-4 py-3 bg-gray-100 rounded-full outline-none text-sm"
          />
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleSend}
            className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white shadow-md"
          >
            <Send className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </div>
  );
}
