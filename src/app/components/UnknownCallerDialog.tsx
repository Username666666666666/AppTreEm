import { motion } from 'motion/react';
import { Shield, AlertTriangle, X, Phone, PhoneOff } from 'lucide-react';

export interface UnknownCaller {
  phoneNumber: string;
  detectedName?: string;
  riskLevel: 'safe' | 'unknown' | 'danger';
  reasons: string[];
}

interface UnknownCallerDialogProps {
  caller: UnknownCaller | null;
  onAccept: () => void;
  onReject: () => void;
  onAskParent: () => void;
}

const riskConfig = {
  safe: {
    color: 'from-green-400 to-green-600',
    icon: '✅',
    title: 'Số điện thoại an toàn',
  },
  unknown: {
    color: 'from-yellow-400 to-orange-400',
    icon: '❓',
    title: 'Số lạ - Cần cẩn thận',
  },
  danger: {
    color: 'from-red-500 to-red-700',
    icon: '🚨',
    title: 'Cảnh báo nguy hiểm',
  },
};

export function UnknownCallerDialog({ caller, onAccept, onReject, onAskParent }: UnknownCallerDialogProps) {
  if (!caller) return null;

  const config = riskConfig[caller.riskLevel];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden"
      >
        <div className={`bg-gradient-to-r ${config.color} p-6 text-white`}>
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-2xl animate-pulse">
                {config.icon}
              </div>
              <div>
                <h3 className="font-bold text-lg">{config.title}</h3>
                <p className="text-sm opacity-90">Cuộc gọi đến</p>
              </div>
            </div>
          </div>
          <div className="bg-white/20 rounded-xl p-3 backdrop-blur-sm">
            <p className="text-center font-bold text-xl">{caller.phoneNumber}</p>
            {caller.detectedName && (
              <p className="text-center text-sm opacity-90 mt-1">{caller.detectedName}</p>
            )}
          </div>
        </div>

        <div className="p-6 space-y-4">
          {caller.reasons.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className="w-5 h-5 text-orange-500" />
                <h4 className="font-bold text-gray-800">Thông tin an toàn:</h4>
              </div>
              <ul className="space-y-2">
                {caller.reasons.map((reason, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="text-orange-500 mt-0.5">•</span>
                    <span>{reason}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="bg-blue-50 rounded-2xl p-4">
            <div className="flex items-start gap-2">
              <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-blue-900 mb-1">Lời khuyên:</h4>
                <p className="text-sm text-blue-800">
                  {caller.riskLevel === 'danger'
                    ? 'Bé không nên nhận cuộc gọi này. Hãy hỏi bố mẹ ngay!'
                    : caller.riskLevel === 'unknown'
                    ? 'Đây là số lạ. Bé nên hỏi bố mẹ trước khi nhận máy.'
                    : 'Số này có vẻ an toàn, nhưng vẫn nên cẩn thận nhé!'}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={onAskParent}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-4 rounded-xl hover:shadow-lg transition-shadow flex items-center justify-center gap-2"
            >
              <Shield className="w-5 h-5" />
              Hỏi bố mẹ
            </button>

            <div className="flex gap-3">
              {caller.riskLevel !== 'danger' && (
                <button
                  onClick={onAccept}
                  className="flex-1 bg-green-500 text-white font-bold py-3 rounded-xl hover:shadow-lg transition-shadow flex items-center justify-center gap-2"
                >
                  <Phone className="w-5 h-5" />
                  Nhận
                </button>
              )}
              <button
                onClick={onReject}
                className="flex-1 bg-red-500 text-white font-bold py-3 rounded-xl hover:shadow-lg transition-shadow flex items-center justify-center gap-2"
              >
                <PhoneOff className="w-5 h-5" />
                Từ chối
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Function to check if a number is unknown/dangerous
export function checkPhoneNumber(phoneNumber: string, trustedContacts: string[]): UnknownCaller {
  const isTrusted = trustedContacts.includes(phoneNumber);
  
  if (isTrusted) {
    return {
      phoneNumber,
      riskLevel: 'safe',
      reasons: ['Số điện thoại này nằm trong danh bạ an toàn'],
    };
  }

  // Simulate checking against spam database
  const isSpam = phoneNumber.startsWith('0888') || phoneNumber.startsWith('0999');
  const isAdvertising = phoneNumber.startsWith('1800');
  
  const reasons: string[] = [];
  let riskLevel: 'safe' | 'unknown' | 'danger' = 'unknown';

  if (isSpam) {
    reasons.push('Số này đã được báo cáo là lừa đảo');
    reasons.push('Nhiều người đã chặn số này');
    riskLevel = 'danger';
  } else if (isAdvertising) {
    reasons.push('Đây là số quảng cáo/dịch vụ');
    reasons.push('Không phải là người quen');
    riskLevel = 'unknown';
  } else {
    reasons.push('Số này không có trong danh bạ');
    reasons.push('Chưa có thông tin về số này');
    riskLevel = 'unknown';
  }

  return {
    phoneNumber,
    detectedName: isAdvertising ? 'Dịch vụ quảng cáo' : undefined,
    riskLevel,
    reasons,
  };
}
