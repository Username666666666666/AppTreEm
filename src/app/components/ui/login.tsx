import React, { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#BF5AF2] to-[#FF9F0A] flex flex-col items-center justify-center p-6 font-sans">
      {/* Thẻ chứa Form */}
      <div className="bg-white/95 p-8 rounded-[40px] shadow-2xl w-full max-w-sm border-8 border-white/30 text-center">
        
        {/* Icon đại diện vui nhộn */}
        <div className="bg-[#FFD60A] w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner text-5xl">
          👨‍👩‍👧‍👦
        </div>

        <h1 className="text-2xl font-black text-[#5856D6] mb-2">Bố Mẹ Đăng Nhập</h1>
        <p className="text-[#8E8E93] text-sm mb-8 leading-tight">Nhập tài khoản của Bố Mẹ để kết nối thiết bị với Bé nhé!</p>

        <div className="space-y-4 text-left">
          {/* Email Input */}
          <div>
            <label className="block text-[#FF9F0A] font-bold ml-4 mb-1">Email của Bố Mẹ</label>
            <input 
              type="email" 
              className="w-full bg-[#F2F2F7] border-4 border-transparent focus:border-[#BF5AF2] rounded-full px-6 py-4 outline-none transition-all placeholder:text-gray-400"
              placeholder="bome@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-[#FF9F0A] font-bold ml-4 mb-1">Mật khẩu</label>
            <input 
              type="password" 
              className="w-full bg-[#F2F2F7] border-4 border-transparent focus:border-[#BF5AF2] rounded-full px-6 py-4 outline-none transition-all"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        {/* Nút Đăng Nhập style "Game" */}
        <button className="w-full bg-[#30D158] hover:bg-[#28B34B] text-white font-black text-xl py-4 rounded-full mt-10 shadow-[0_6px_0_#248A3D] active:shadow-none active:translate-y-[4px] transition-all">
          KẾT NỐI NGAY!
        </button>
      </div>

      <p className="text-white/80 mt-8 text-sm font-medium">Bảo mật thông tin cho gia đình bạn 🔒</p>
    </div>
  );
};

export default Login;