import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../../lib/supabase";

const ParentLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      alert("Sai email hoặc mật khẩu");
      console.error(error);
      return;
    }

    console.log("Đăng nhập thành công:", data.user);

    // 👉 sang trang chọn bé
    navigate("/select-child");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#BF5AF2] via-[#FF2D55] to-[#FF9F0A] flex items-center justify-center p-6">
      <div className="bg-white p-10 rounded-[40px] shadow-2xl w-full max-w-md">
        <h1 className="text-3xl font-black text-center text-[#5856D6] mb-6">
          Đăng nhập phụ huynh
        </h1>

        <form onSubmit={handleLogin} className="space-y-5">
          <input
            type="email"
            placeholder="Email phụ huynh"
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
            disabled={loading}
            className="w-full bg-green-500 text-white font-bold py-4 rounded-full"
          >
            {loading ? "Đang đăng nhập..." : "Đăng nhập"}
          </button>
        </form>

        <p className="text-center mt-5">
          Chưa có tài khoản?{" "}
          <Link to="/parent-register" className="text-purple-600 font-bold">
            Đăng ký
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ParentLogin;