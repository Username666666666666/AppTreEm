import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const ParentRegister = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !password) {
      alert('Nhập đầy đủ thông tin');
      return;
    }

    localStorage.setItem('parent_account', JSON.stringify({ name, email }));
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-500 to-purple-500 flex items-center justify-center p-6">
      <div className="bg-white p-10 rounded-[40px] shadow-2xl w-full max-w-md">
        <h1 className="text-3xl font-black text-center text-purple-600 mb-6">
          Đăng ký phụ huynh
        </h1>

        <form onSubmit={handleRegister} className="space-y-5">
          <input
            type="text"
            placeholder="Tên phụ huynh"
            className="w-full p-4 rounded-full bg-gray-100 outline-none"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full p-4 rounded-full bg-gray-100 outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Mật khẩu"
            className="w-full p-4 rounded-full bg-gray-100 outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="w-full bg-purple-500 text-white font-bold py-4 rounded-full"
          >
            Tạo tài khoản
          </button>
        </form>

        <p className="text-center mt-5">
          Đã có tài khoản?{' '}
          <Link to="/" className="text-pink-500 font-bold">
            Đăng nhập
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ParentRegister;