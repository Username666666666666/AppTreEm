import { Phone, Video, MessageCircle, Shield, AlertTriangle } from 'lucide-react';
import { motion } from 'motion/react';

export interface Contact {
  id: string;
  name: string;
  relation: string;
  avatar: string;
  phoneNumber: string;
  isTrusted: boolean;
  canCall: boolean;
  canMessage: boolean;
  isOnline?: boolean;
}

interface ContactCardProps {
  contact: Contact;
  onCall: (id: string, type: 'voice' | 'video') => void;
  onMessage: (id: string) => void;
}

export function ContactCard({ contact, onCall, onMessage }: ContactCardProps) {
  return (
    <motion.div
      whileTap={{ scale: 0.98 }}
      className="bg-white rounded-2xl p-4 shadow-md"
    >
      <div className="flex items-center gap-4">
        <div className="relative">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-3xl shadow-md">
            {contact.avatar}
          </div>
          {contact.isOnline && (
            <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
          )}
          {contact.isTrusted && (
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
              <Shield className="w-3 h-3 text-white" />
            </div>
          )}
        </div>

        <div className="flex-1">
          <h3 className="font-bold text-gray-800">{contact.name}</h3>
          <p className="text-sm text-gray-500">{contact.relation}</p>
        </div>

        <div className="flex gap-2">
          {contact.canCall && (
            <>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => onCall(contact.id, 'voice')}
                className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white shadow-md"
              >
                <Phone className="w-5 h-5" />
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => onCall(contact.id, 'video')}
                className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white shadow-md"
              >
                <Video className="w-5 h-5" />
              </motion.button>
            </>
          )}
          {contact.canMessage && (
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => onMessage(contact.id)}
              className="w-10 h-10 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-white shadow-md"
            >
              <MessageCircle className="w-5 h-5" />
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
