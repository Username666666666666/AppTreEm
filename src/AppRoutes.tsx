import { BrowserRouter, Routes, Route } from "react-router-dom";
import ParentLogin from "./app/components/ParentLogin";
import ParentRegister from "./app/components/ParentRegister";
import SelectChild from "./app/components/SelectChild";
import ChildApp from "./app/App";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Màn hình đăng nhập phụ huynh */}
        <Route path="/" element={<ParentLogin />} />

        {/* Đăng ký */}
        <Route path="/parent-register" element={<ParentRegister />} />

        {/* Chọn bé */}
        <Route path="/select-child" element={<SelectChild />} />

        {/* App của bé */}
        <Route path="/profile" element={<ChildApp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;