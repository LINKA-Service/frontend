"use client";

import React, { useState, useEffect } from "react";
import {
  User,
  MessageSquare,
  Bell,
  Settings,
  FileText,
  Users,
  Edit,
  Copy,
  Plus,
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { apiClient } from "@/lib/api-client";
import type { User as UserType } from "@/types/api";

const MyPage = () => {
  const [activeTab, setActiveTab] = useState("account");
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState<{
    nickname: boolean;
    username: boolean;
    password: boolean;
  }>({
    nickname: false,
    username: false,
    password: false,
  });

  const [formData, setFormData] = useState({
    nickname: "",
    username: "",
    password: "",
    bio: "",
    avatar_url: "",
  });

  // 사용자 정보 불러오기
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await apiClient.getMe();
        setUser(userData);
        setFormData({
          nickname: userData.display_name,
          username: userData.username,
          password: "",
          bio: userData.bio,
          avatar_url: userData.avatar_url,
        });
      } catch (error) {
        console.error("Failed to fetch user:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  // 닉네임 수정
  const handleUpdateNickname = async () => {
    try {
      const updatedUser = await apiClient.updateMe({
        display_name: formData.nickname,
      });
      setUser(updatedUser);
      setEditMode({ ...editMode, nickname: false });
      alert("닉네임이 변경되었습니다.");
    } catch (error) {
      alert("닉네임 변경에 실패했습니다.");
      console.error(error);
    }
  };

  // 아이디 수정
  const handleUpdateUsername = async () => {
    try {
      const updatedUser = await apiClient.changeUsername(formData.username);
      setUser(updatedUser);
      setEditMode({ ...editMode, username: false });
      alert("아이디가 변경되었습니다.");
    } catch (error) {
      alert("아이디 변경에 실패했습니다.");
      console.error(error);
    }
  };

  // 비밀번호 수정 (추가 구현 필요)
  const handleUpdatePassword = async () => {
    alert("비밀번호 변경 기능은 추가 구현이 필요합니다.");
    setEditMode({ ...editMode, password: false });
  };

  const timelineData = [
    {
      id: 1,
      title: "중고거래 사기",
      status: "진행중",
      statusColor: "bg-blue-500",
      date: "2024.10.18",
    },
    {
      id: 2,
      title: "게임 사기 피해",
      status: "접수 완료",
      statusColor: "bg-teal-600",
      date: "2025.11.23",
    },
    {
      id: 3,
      title: "투자 리딩방 사기",
      status: "확인중",
      statusColor: "bg-red-500",
      date: "2025.11.30",
    },
  ];

  const chatRooms = [
    { id: 1, name: "중고거래 사기 피해 모임", members: 4, status: "online" },
    { id: 2, name: "중고거래 사기 피해 모임", members: 4, status: "online" },
    { id: 3, name: "중고거래 사기 피해 모임", members: 4, status: "online" },
    { id: 4, name: "중고거래 사기 피해 모임", members: 4, status: "online" },
    { id: 5, name: "중고거래 사기 피해 모임", members: 4, status: "online" },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A3840] flex items-center justify-center">
        <div className="text-white text-xl">로딩 중...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[#0A3840] flex items-center justify-center">
        <div className="text-white text-xl">
          사용자 정보를 불러올 수 없습니다.
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A3840]">
      <Header />

      <div className="max-w-7xl mx-auto p-6">
        <div className="flex gap-6">
          {/* Sidebar */}
          <div className="w-48 space-y-2">
            <button className="w-full flex items-center gap-3 px-4 py-3 text-white/70 hover:bg-white/5 rounded-lg transition">
              <User size={20} />
              <span>개인 채팅</span>
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 text-white/70 hover:bg-white/5 rounded-lg transition">
              <MessageSquare size={20} />
              <span>채팅방</span>
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 text-white/70 hover:bg-white/5 rounded-lg transition">
              <Bell size={20} />
              <span>알람</span>
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 bg-[#0F4A55] text-white rounded-lg">
              <Settings size={20} />
              <span>마이 페이지</span>
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 text-white/70 hover:bg-white/5 rounded-lg transition">
              <FileText size={20} />
              <span>변호사 검색</span>
            </button>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Profile Card & Stats */}
            <div className="grid grid-cols-4 gap-4 mb-6">
              <div className="bg-[#F5F5DC] rounded-2xl p-6 flex flex-col items-center justify-center">
                <div className="w-24 h-24 rounded-full mb-4 overflow-hidden">
                  <img
                    src={user.avatar_url || "/example.png"}
                    alt="프로필"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-[#0A3840] font-bold text-lg">
                  {user.display_name}님
                </div>
              </div>
              <div className="bg-[#F5F5DC] rounded-2xl p-6 flex flex-col items-center justify-center">
                <div className="text-[#0A3840]/60 text-sm mb-2">등록한사건</div>
                <div className="text-[#0A3840] text-4xl font-bold">2건</div>
              </div>
              <div className="bg-[#F5F5DC] rounded-2xl p-6 flex flex-col items-center justify-center">
                <div className="text-[#0A3840]/60 text-sm mb-2">
                  참여 채팅방
                </div>
                <div className="text-[#0A3840] text-4xl font-bold">3개</div>
              </div>
              <div className="bg-[#F5F5DC] rounded-2xl p-6 flex flex-col items-center justify-center">
                <div className="text-[#0A3840]/60 text-sm mb-2">새 알림</div>
                <div className="text-[#0A3840] text-4xl font-bold">5개</div>
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-[#F5F5DC] rounded-2xl p-8">
              <div className="flex gap-0 mb-6 bg-[#0A3840] rounded-lg p-1">
                <button
                  onClick={() => setActiveTab("account")}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg transition ${
                    activeTab === "account"
                      ? "bg-[#0F4A55] text-white"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  <User size={20} />
                  <span>계정 및 이명 설정</span>
                </button>
                <button
                  onClick={() => setActiveTab("cases")}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg transition ${
                    activeTab === "cases"
                      ? "bg-[#0F4A55] text-white"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  <FileText size={20} />
                  <span>내 사건 리스트</span>
                </button>
                <button
                  onClick={() => setActiveTab("chats")}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg transition ${
                    activeTab === "chats"
                      ? "bg-[#0F4A55] text-white"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  <Users size={20} />
                  <span>참여중인 채팅방</span>
                </button>
              </div>

              {/* Tab Content */}
              {activeTab === "account" && (
                <div className="space-y-6">
                  <div className="text-[#0A3840] text-2xl font-bold mb-6">
                    계정 설정
                  </div>

                  {/* 닉네임 */}
                  <div className="flex items-center justify-between py-4 border-b border-[#0A3840]/10">
                    <div className="flex-1">
                      {editMode.nickname ? (
                        <input
                          type="text"
                          value={formData.nickname}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              nickname: e.target.value,
                            })
                          }
                          className="text-[#0A3840] font-medium border-b-2 border-[#0A3840] focus:outline-none"
                        />
                      ) : (
                        <div className="text-[#0A3840] font-medium mb-1">
                          닉네임 : {user.display_name}
                        </div>
                      )}
                    </div>
                    <button
                      onClick={() => {
                        if (editMode.nickname) {
                          handleUpdateNickname();
                        } else {
                          setEditMode({ ...editMode, nickname: true });
                        }
                      }}
                      className="bg-[#0A3840] text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-[#0F4A55] transition"
                    >
                      {editMode.nickname ? "저장" : "수정"}
                    </button>
                  </div>

                  {/* 아이디 */}
                  <div className="flex items-center justify-between py-4 border-b border-[#0A3840]/10">
                    <div className="flex-1">
                      {editMode.username ? (
                        <input
                          type="text"
                          value={formData.username}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              username: e.target.value,
                            })
                          }
                          className="text-[#0A3840] font-medium border-b-2 border-[#0A3840] focus:outline-none"
                        />
                      ) : (
                        <div className="text-[#0A3840] font-medium mb-1">
                          아이디 : {user.username}
                        </div>
                      )}
                    </div>
                    <button
                      onClick={() => {
                        if (editMode.username) {
                          handleUpdateUsername();
                        } else {
                          setEditMode({ ...editMode, username: true });
                        }
                      }}
                      className="bg-[#0A3840] text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-[#0F4A55] transition"
                    >
                      {editMode.username ? "저장" : "수정"}
                    </button>
                  </div>

                  {/* 비밀번호 */}
                  <div className="flex items-center justify-between py-4 border-b border-[#0A3840]/10">
                    <div className="flex-1">
                      <div className="text-[#0A3840] font-medium mb-1">
                        비밀번호 : **********
                      </div>
                    </div>
                    <button
                      onClick={handleUpdatePassword}
                      className="bg-[#0A3840] text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-[#0F4A55] transition"
                    >
                      수정
                    </button>
                  </div>

                  <div className="text-[#0A3840] text-2xl font-bold mt-10 mb-6">
                    이명 설정
                  </div>

                  <div className="flex items-center justify-between py-4">
                    <div className="text-[#0A3840] font-medium">
                      프로필 비공개
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        defaultChecked
                      />
                      <div className="w-14 h-7 bg-[#0A3840] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between py-4">
                    <div className="text-[#0A3840] font-medium">
                      닉네임 사용
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        defaultChecked
                      />
                      <div className="w-14 h-7 bg-[#0A3840] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between py-4">
                    <div className="text-[#0A3840] font-medium">
                      사건 내역 숨기기
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-14 h-7 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-[#0A3840] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all"></div>
                    </label>
                  </div>
                </div>
              )}

              {activeTab === "cases" && (
                <div>
                  <div className="text-[#0A3840] text-2xl font-bold mb-6">
                    내 사건 리스트
                  </div>
                  <div className="space-y-4">
                    {timelineData.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-4 bg-white rounded-xl p-4 shadow-sm"
                      >
                        <div
                          className={`w-12 h-12 ${item.statusColor} rounded-full flex-shrink-0`}
                        ></div>
                        <div className="flex-1">
                          <div className="text-[#0A3840] font-bold text-lg">
                            {item.title}
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span
                            className={`${item.statusColor} text-white px-4 py-1 rounded-full text-sm font-medium`}
                          >
                            {item.status}
                          </span>
                          <span className="text-[#0A3840]/60 text-sm">
                            - {item.date}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-center mt-8">
                    <button className="bg-[#0A3840] text-white px-8 py-3 rounded-full font-medium hover:bg-[#0F4A55] transition flex items-center gap-2">
                      <Plus size={20} />새 사건 등록
                    </button>
                  </div>
                </div>
              )}

              {activeTab === "chats" && (
                <div>
                  <div className="text-[#0A3840] text-2xl font-bold mb-6">
                    참여중인 채팅방
                  </div>
                  <div className="space-y-4">
                    {chatRooms.map((room) => (
                      <div
                        key={room.id}
                        className="flex items-center gap-4 bg-white rounded-xl p-4 shadow-sm"
                      >
                        <div className="w-12 h-12 bg-[#0A3840] rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                          JG
                        </div>
                        <div className="flex-1">
                          <div className="text-[#0A3840] font-bold">
                            {room.name}
                          </div>
                          <div className="text-green-500 text-sm">
                            {room.members}명 online
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button className="w-10 h-10 bg-[#0A3840] rounded-full flex items-center justify-center hover:bg-[#0F4A55] transition">
                            <Edit size={18} className="text-white" />
                          </button>
                          <button className="w-10 h-10 bg-[#0A3840] rounded-full flex items-center justify-center hover:bg-[#0F4A55] transition">
                            <Copy size={18} className="text-white" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-center mt-8">
                    <button className="bg-[#0A3840] text-white px-8 py-3 rounded-full font-medium hover:bg-[#0F4A55] transition flex items-center gap-2">
                      <Plus size={20} />
                      채팅방 추가하기
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MyPage;
