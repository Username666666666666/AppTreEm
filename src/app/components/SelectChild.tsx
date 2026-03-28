import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";

export default function SelectChild() {
  const navigate = useNavigate();

  const [children, setChildren] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // 📌 Lấy danh sách con của phụ huynh đang đăng nhập
  const fetchChildren = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      navigate("/");
      return;
    }

    const { data, error } = await supabase
      .from("children")
      .select("*")
      .eq("parent_id", user.id);

    if (error) {
      console.error("Lỗi lấy danh sách trẻ em:", error);
    } else {
      setChildren(data || []);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchChildren();
  }, []);

  // 📌 Chọn bé → chuyển vào app chính
 const handleSelect = (child: any) => {
  localStorage.setItem("selected_child_id", child.id);
  navigate("/profile");
};

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-bold">
        Đang tải danh sách bé...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-500 to-pink-500 flex items-center justify-center p-6">
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6 text-purple-600">
          Chọn trẻ em
        </h1>

        <div className="space-y-4">
          {children.length > 0 ? (
            children.map((child) => (
              <button
                key={child.id}
                onClick={() => handleSelect(child)}
                className="w-full p-4 bg-gray-100 rounded-2xl flex items-center gap-4 hover:bg-purple-100 transition"
              >
                <div className="text-4xl">
                  {child.gender === "female" ? "👧" : "👦"}
                </div>
                <div className="text-left">
                  <div className="font-bold text-lg">
                    {child.child_name}
                  </div>
                  <div className="text-sm text-gray-500">
                    Năm sinh: {child.birth_year}
                  </div>
                </div>
              </button>
            ))
          ) : (
            <div className="text-center text-gray-500">
              Không có trẻ em nào
            </div>
          )}
        </div>
      </div>
    </div>
  );
}