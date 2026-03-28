import { AlertTriangle, Shield, X } from 'lucide-react';
import { motion } from 'motion/react';

export interface ContentWarning {
  detected: boolean;
  severity: 'low' | 'medium' | 'high';
  issues: string[];
  recommendation: string;
}

interface ContentWarningDialogProps {
  warning: ContentWarning | null;
  onClose: () => void;
  onProceed?: () => void;
}

const severityConfig = {
  low: {
    color: 'from-yellow-400 to-orange-400',
    icon: '⚠️',
    title: 'Cảnh báo nhẹ',
  },
  medium: {
    color: 'from-orange-400 to-red-400',
    icon: '🛑',
    title: 'Cảnh báo quan trọng',
  },
  high: {
    color: 'from-red-500 to-red-700',
    icon: '🚨',
    title: 'Cảnh báo nghiêm trọng',
  },
};

export function ContentWarningDialog({ warning, onClose, onProceed }: ContentWarningDialogProps) {
  if (!warning || !warning.detected) return null;

  const config = severityConfig[warning.severity];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className={`bg-gradient-to-r ${config.color} p-6 text-white`}>
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-2xl">
                {config.icon}
              </div>
              <div>
                <h3 className="font-bold text-lg">{config.title}</h3>
                <p className="text-sm opacity-90">Trợ lý AI phát hiện vấn đề</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="w-5 h-5 text-orange-500" />
              <h4 className="font-bold text-gray-800">Vấn đề phát hiện:</h4>
            </div>
            <ul className="space-y-2">
              {warning.issues.map((issue, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="text-red-500 mt-0.5">•</span>
                  <span>{issue}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-blue-50 rounded-2xl p-4">
            <div className="flex items-start gap-2">
              <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-blue-900 mb-1">Khuyến nghị:</h4>
                <p className="text-sm text-blue-800">{warning.recommendation}</p>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-3 rounded-xl hover:shadow-lg transition-shadow"
            >
              Đã hiểu
            </button>
            {warning.severity === 'low' && onProceed && (
              <button
                onClick={() => {
                  onProceed();
                  onClose();
                }}
                className="flex-1 bg-gray-200 text-gray-700 font-bold py-3 rounded-xl hover:bg-gray-300 transition-colors"
              >
                Vẫn xem
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Content safety checker
export function checkContentSafety(content: {
  title: string;
  description?: string;
  keywords?: string[];
}): ContentWarning {
  const unsafeKeywords = ['bạo lực', 'máu', 'đánh nhau', 'kinh dị', 'scary', 'horror'];
  const questionableKeywords = ['quảng cáo', 'mua', 'tiền'];
  
  const issues: string[] = [];
  let severity: 'low' | 'medium' | 'high' = 'low';
  
  const allText = [
    content.title,
    content.description || '',
    ...(content.keywords || [])
  ].join(' ').toLowerCase();

  // Check for unsafe content
  const foundUnsafe = unsafeKeywords.filter(keyword => allText.includes(keyword));
  if (foundUnsafe.length > 0) {
    issues.push(`Phát hiện nội dung không phù hợp: ${foundUnsafe.join(', ')}`);
    severity = foundUnsafe.length > 2 ? 'high' : 'medium';
  }

  // Check for questionable content
  const foundQuestionable = questionableKeywords.filter(keyword => allText.includes(keyword));
  if (foundQuestionable.length > 0) {
    issues.push(`Phát hiện nội dung cần cẩn thận: ${foundQuestionable.join(', ')}`);
    if (severity === 'low') severity = 'low';
  }

  const detected = issues.length > 0;
  
  let recommendation = '';
  if (detected) {
    if (severity === 'high') {
      recommendation = 'Nội dung này không phù hợp với trẻ em. Bé nên hỏi bố mẹ trước khi xem.';
    } else if (severity === 'medium') {
      recommendation = 'Nội dung này có thể không phù hợp. Hãy xem cùng bố mẹ nhé!';
    } else {
      recommendation = 'Bé nên hỏi ý kiến bố mẹ trước khi tiếp tục xem nội dung này.';
    }
  }

  return {
    detected,
    severity,
    issues,
    recommendation,
  };
}
