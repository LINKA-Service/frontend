"use client";

import React, { useState, useEffect } from "react";
import {
  User,
  MessageSquare,
  Bell,
  Settings,
  FileText,
  Search,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { apiClient } from "@/lib/api-client";
import type { Lawyer } from "@/types/api";

const LawyerSearchPage = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [lawyers, setLawyers] = useState<Lawyer[]>([]);
  const [loading, setLoading] = useState(true);

  const categories = [
    "전체",
    "직거래",
    "보험/사기",
    "방문판매",
    "사칭/위조",
    "전세/월세",
    "로맨스",
    "스미싱",
    "허위광고",
    "중고거래",
    "투자유인",
    "계정도용",
    "기타",
  ];

  // 변호사 목록 불러오기 (실제로는 목록 API가 필요하지만, 일단 샘플 데이터 사용)
  useEffect(() => {
    const fetchLawyers = async () => {
      try {
        // TODO: 실제 변호사 목록 API 엔드포인트 추가 필요
        // const lawyersData = await apiClient.getLawyers();
        // setLawyers(lawyersData);

        // 임시 데이터
        setLawyers([
          {
            id: 1,
            lawyer_id: { val: "lawyer001" },
            lawyer_name: { val: "홍길동" },
            bio: { val: "전문 변호사입니다." },
            avatar_url: { val: "/example.png" },
            specializations: [{ val: "중고거래" }, { val: "직거래" }],
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
        ]);
      } catch (error) {
        console.error("Failed to fetch lawyers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLawyers();
  }, []);

  const toggleCategory = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const filteredLawyers = lawyers.filter((lawyer) => {
    // 검색어 필터링
    const matchesSearch =
      searchQuery === "" ||
      lawyer.lawyer_name.val.includes(searchQuery) ||
      lawyer.specializations.some((s) => s.val.includes(searchQuery));

    // 카테고리 필터링
    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes("전체") ||
      lawyer.specializations.some((s) => selectedCategories.includes(s.val));

    return matchesSearch && matchesCategory;
  });

  const handleLawyerClick = (lawyerId: string) => {
    router.push(`/lawyer/${lawyerId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#00353d] flex items-center justify-center">
        <div className="text-white text-xl">로딩 중...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#00353d]">
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
            <button className="w-full flex items-center gap-3 px-4 py-3 text-white/70 hover:bg-white/5 rounded-lg transition">
              <Settings size={20} />
              <span>설정</span>
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 bg-[#0F4A55] text-white rounded-lg">
              <FileText size={20} />
              <span>변호사 검색</span>
            </button>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <h1 className="text-white text-3xl font-bold mb-6">
              내 사건에 딱 맞는 변호사를 찾아보세요.
            </h1>

            {/* Search Bar */}
            <div className="relative mb-6">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="전문 분야, 변호사 이름 검색..."
                className="w-full px-6 py-4 rounded-xl bg-[#fafafa] text-[#00353d] placeholder-[#00353d]/40 text-lg focus:outline-none focus:ring-2 focus:ring-[#0F4A55]"
              />
              <Search
                className="absolute right-6 top-1/2 -translate-y-1/2 text-[#00353d]/40"
                size={24}
              />
            </div>

            {/* Category Tags */}
            <div className="flex flex-wrap gap-3 mb-8">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => toggleCategory(category)}
                  className={`px-6 py-2.5 rounded-full border-2 transition ${
                    selectedCategories.includes(category)
                      ? "bg-[#0F4A55] border-[#0F4A55] text-white"
                      : "border-white/30 text-white hover:border-white/50"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Lawyer Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredLawyers.map((lawyer) => (
                <div
                  key={lawyer.id}
                  className="bg-[#fafafa] rounded-2xl p-6 flex flex-col items-center cursor-pointer hover:shadow-xl transition"
                  onClick={() => handleLawyerClick(lawyer.lawyer_id.val)}
                >
                  <div className="w-32 h-32 rounded-full mb-4 overflow-hidden">
                    <img
                      src={lawyer.avatar_url.val || "/example.png"}
                      alt={lawyer.lawyer_name.val}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-[#00353d] font-bold text-xl mb-3">
                    {lawyer.lawyer_name.val} 변호사
                  </h3>
                  <div className="flex gap-2 mb-4 flex-wrap justify-center">
                    {lawyer.specializations.slice(0, 2).map((tag, index) => (
                      <span
                        key={index}
                        className="text-[#0F4A55] text-sm font-medium"
                      >
                        #{tag.val}
                      </span>
                    ))}
                  </div>
                  <div className="text-[#00353d] mb-2 text-center">
                    누적 상담 : 17건
                  </div>
                  <div className="text-[#00353d] mb-6 text-center">
                    사건 수임 기준가 : 440만 원
                  </div>
                  <button
                    className="w-full bg-[#00353d] text-white py-3 rounded-xl font-medium hover:bg-[#0F4A55] transition"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLawyerClick(lawyer.lawyer_id.val);
                    }}
                  >
                    변호사 세부 정보 보기
                  </button>
                </div>
              ))}
            </div>

            {filteredLawyers.length === 0 && (
              <div className="text-center text-white text-xl py-12">
                검색 결과가 없습니다.
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LawyerSearchPage;
