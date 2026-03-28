import { useState } from 'react';
import { motion } from 'motion/react';
import { Lock, Shield, Eye, EyeOff, X, LogOut } from 'lucide-react';

interface SecurityPinProps {
  onSuccess: () => void;
  onCancel: () => void;
  mode: 'verify' | 'set';
  title?: string;
  description?: string;
  onLogout?: () => void;
}

export function SecurityPin({ onSuccess, onCancel, mode, title, description, onLogout }: SecurityPinProps) {
  const [pin, setPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [step, setStep] = useState<'enter' | 'confirm'>('enter');
  const [showPin, setShowPin] = useState(false);
  const [error, setError] = useState('');

  const CORRECT_PIN = '1234';

  const handleNumberClick = (num: string) => {
    if (pin.length < 4) {
      const newPin = pin + num;
      setPin(newPin);
      setError('');
      if (newPin.length === 4) {
        setTimeout(() => handlePinComplete(newPin), 300);
      }
    }
  };

  const handlePinComplete = (completedPin: string) => {
    if (mode === 'verify') {
      if (completedPin === CORRECT_PIN) {
        onSuccess();
      } else {
        setError('Mã PIN không đúng rồi!');
        setPin('');
      }
    } else if (mode === 'set') {
      if (step === 'enter') {
        setConfirmPin(completedPin);
        setPin('');
        setStep('confirm');
      } else {
        if (completedPin === confirmPin) {
          onSuccess();
        } else {
          setError('Mã PIN không khớp!');
          setPin('');
          setConfirmPin('');
          setStep('enter');
        }
      }
    }
  };

  const handleDelete = () => {
    setPin(pin.slice(0, -1));
    setError('');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4 font-sans"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="bg-white rounded-[40px] shadow-2xl max-w-sm w-full overflow-hidden border-8 border-white"
      >
        {/* Header với màu Gradient đồng bộ app trẻ em */}
        <div className="bg-gradient-to-r from-[#BF5AF2] via-[#FF2D55] to-[#FF9F0A] p-6 text-white text-center">
          <div className="flex justify-end">
             <button onClick={onCancel} className="bg-black/10 rounded-full p-1"><X size={20}/></button>
          </div>
          <div className="flex flex-col items-center gap-2 -mt-4">
             <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm shadow-inner">
                <Lock className="w-7 h-7" />
             </div>
             <h3 className="font-black text-xl tracking-tight">
                {title || (mode === 'verify' ? 'XÁC THỰC PHỤ HUYNH' : 'ĐẶT MÃ BẢO MẬT')}
             </h3>
          </div>
        </div>

        <div className="p-8">
          <div className="flex justify-center gap-4 mb-8">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl font-black border-4 transition-all ${
                  pin.length > i ? 'bg-[#30D158] border-[#30D158] text-white shadow-lg' : 'border-[#F2F2F7] bg-[#F2F2F7]'
                }`}
              >
                {pin.length > i ? (showPin ? pin[i] : '●') : ''}
              </div>
            ))}
          </div>

          {error && <p className="text-red-500 font-bold text-center mb-4 animate-bounce">{error}</p>}

          <div className="grid grid-cols-3 gap-4 mb-6">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
              <motion.button
                key={num}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleNumberClick(num.toString())}
                className="h-16 bg-[#F2F2F7] hover:bg-[#E5E5EA] rounded-2xl font-black text-2xl text-gray-800 shadow-[0_4px_0_#D1D1D6] active:shadow-none active:translate-y-1 transition-all"
              >
                {num}
              </motion.button>
            ))}
            <button onClick={() => setShowPin(!showPin)} className="flex items-center justify-center text-purple-600"><Eye /></button>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => handleNumberClick('0')}
              className="h-16 bg-[#F2F2F7] rounded-2xl font-black text-2xl shadow-[0_4px_0_#D1D1D6] active:shadow-none active:translate-y-1"
            >0</motion.button>
            <motion.button onClick={handleDelete} className="h-16 bg-red-50 text-red-500 rounded-2xl font-black text-2xl flex items-center justify-center">←</motion.button>
          </div>

          {/* PHẦN QUAN TRỌNG NHẤT: Nút Đăng xuất cho phụ huynh */}
          {mode === 'verify' && onLogout && (
            <div className="mt-4 pt-4 border-t-2 border-dashed border-gray-100 flex flex-col items-center gap-3">
               <p className="text-xs text-gray-400 font-medium italic">Bạn muốn đổi tài khoản quản lý?</p>
               <button 
                onClick={() => { if(confirm("Bạn có chắc muốn đăng xuất thiết bị?")) onLogout(); }}
                className="w-full py-3 bg-red-500 hover:bg-red-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95"
               >
                 <LogOut size={18} /> Đăng xuất ngay
               </button>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}