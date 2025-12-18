"use client";

import { useState, useEffect } from "react";
import type { Lawyer, LawyerValue } from "@/types/lawyer";
import LawyerCard from "@/components/lawyer/LawyerCard";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const categories = [
  "전체",
  "직거래",
  "보험/사기",
  "방문판매",
  "사칭/위조",
  "전세/임대",
  "로맨스",
  "스미싱",
  "허위광고",
  "중고거래",
  "투자유인",
  "계정도용",
  "기타",
];

export default function LawyerListPage() {
  const [lawyers, setLawyers] = useState<Lawyer[]>([]);
  const [filteredLawyers, setFilteredLawyers] = useState<Lawyer[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLawyers = async () => {
      try {
        setLoading(true);

        const apiUrl =
          selectedCategory === "전체"
            ? "/api/lawyers/search"
            : `/api/lawyers/search?specialization=${encodeURIComponent(selectedCategory)}`;

        const response = await fetch(apiUrl);

        if (!response.ok) {
          throw new Error("변호사 목록을 불러오는데 실패했습니다.");
        }

        const data = await response.json();
        setLawyers(data);
        setFilteredLawyers(data);
        setError(null);
      } catch (err) {
        setError("변호사 목록을 불러오는데 실패했습니다.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchLawyers();
  }, [selectedCategory]);

  useEffect(() => {
    let filtered = lawyers;

    if (searchQuery.trim()) {
      filtered = filtered.filter(
        (lawyer) =>
          lawyer.lawyer_name?.val
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          lawyer.bio?.val.toLowerCase().includes(searchQuery.toLowerCase()) ||
          lawyer.specializations?.some((spec: LawyerValue) =>
            spec.val.toLowerCase().includes(searchQuery.toLowerCase()),
          ),
      );
    }

    setFilteredLawyers(filtered);
  }, [searchQuery, lawyers]);

  return (
    <div className="min-h-screen bg-[#00353D]">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Header />
        <div className="h-25"></div>
        <h1 className="text-3xl font-bold text-white mb-8">
          내 사건에 딱 맞는 변호사를 찾아보세요.
        </h1>

        <div className="mb-6">
          <input
            type="text"
            placeholder="질문 분야, 변호사 이름 검색..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-[#fafafa] text-[#00353D] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00353D]"
          />
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full transition-colors ${
                selectedCategory === category
                  ? "bg-white text-[#00353D]"
                  : "bg-transparent text-white border border-white hover:bg-white/10"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
            <p className="text-white mt-4">변호사 목록을 불러오는 중...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {!loading && !error && (
          <>
            {filteredLawyers.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-white text-lg">검색 결과가 없습니다.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredLawyers.map((lawyer: Lawyer) => (
                  <LawyerCard
                    key={lawyer.id}
                    lawyer={lawyer}
                    reviewCount={17}
                    averageFee="440만 원"
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
      <Footer />
    </div>
  );
}
