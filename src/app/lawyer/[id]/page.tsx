"use client";

import React, { useState, useEffect } from "react";
import {
  User,
  MessageSquare,
  Bell,
  Settings,
  FileText,
  ArrowLeft,
  Users,
} from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { apiClient } from "@/lib/api-client";
import type { Lawyer, LawyerReview } from "@/types/api";

const LawyerDetailPage = () => {
  const router = useRouter();
  const params = useParams();
  const lawyerId = params?.id as string;

  const [lawyer, setLawyer] = useState<Lawyer | null>(null);
  const [reviews, setReviews] = useState<LawyerReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [reviewText, setReviewText] = useState("");

  // 변호사 정보 및 리뷰 불러오기
  useEffect(() => {
    const fetchLawyerData = async () => {
      try {
        const lawyerData = await apiClient.getLawyerById(lawyerId);
        setLawyer(lawyerData);

        // 리뷰 불러오기
        const reviewsData = await apiClient.getLawyerReviews(lawyerData.id);
        setReviews(reviewsData);
      } catch (error) {
        console.error("Failed to fetch lawyer data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (lawyerId) {
      fetchLawyerData();
    }
  }, [lawyerId]);

  // 리뷰 작성
  const handleSubmitReview = async () => {
    if (!lawyer || !reviewText.trim()) return;

    try {
      const newReview = await apiClient.createLawyerReview(
        lawyer.id,
        reviewText,
      );
      setReviews([...reviews, newReview]);
      setReviewText("");
      alert("리뷰가 등록되었습니다.");
    } catch (error) {
      alert("리뷰 등록에 실패했습니다.");
      console.error(error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#00353d] flex items-center justify-center">
        <div className="text-white text-xl">로딩 중...</div>
      </div>
    );
  }

  if (!lawyer) {
    return (
      <div className="min-h-screen bg-[#00353d] flex items-center justify-center">
        <div className="text-white text-xl">
          변호사 정보를 찾을 수 없습니다.
        </div>
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
            {/* Back Button */}
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-white mb-6 hover:text-white/80 transition"
            >
              <ArrowLeft size={24} />
              <span className="text-xl">변호사 검색으로 돌아가기</span>
            </button>

            <div className="bg-[#fafafa] rounded-2xl p-8">
              <div className="flex gap-8">
                {/* Left Section - Profile */}
                <div className="w-1/3">
                  <div className="bg-[#00353d] rounded-2xl p-8 flex flex-col items-center mb-6">
                    <div className="w-48 h-48 rounded-full mb-6 overflow-hidden">
                      <img
                        src={lawyer.avatar_url.val || "/example.png"}
                        alt={lawyer.lawyer_name.val}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h2 className="text-white text-2xl font-bold mb-8">
                      {lawyer.lawyer_name.val} 변호사
                    </h2>
                    <button className="w-full bg-[#00353d] border-2 border-white text-white py-3 rounded-xl font-medium hover:bg-white hover:text-[#00353d] transition mb-4">
                      해당 변호사 에게 사건 의뢰하기
                    </button>
                    <button className="w-full bg-[#fafafa] text-[#00353d] py-3 rounded-xl font-medium hover:bg-white transition">
                      채팅 문의하기
                    </button>
                  </div>
                </div>

                {/* Right Section - Details */}
                <div className="flex-1">
                  {/* Info Header */}
                  <div className="bg-[#00353d] rounded-xl px-6 py-4 mb-6">
                    <h3 className="text-white text-xl font-bold text-center">
                      변호사 세부 정보
                    </h3>
                  </div>

                  {/* Greeting */}
                  <div className="mb-8">
                    <h4 className="text-[#00353d] text-xl font-bold mb-4">
                      인사말
                    </h4>
                    <p className="text-[#00353d] leading-relaxed">
                      {lawyer.bio.val || "등록된 인사말이 없습니다."}
                    </p>
                  </div>

                  {/* Specialties */}
                  <div className="mb-8">
                    <h4 className="text-[#00353d] text-xl font-bold mb-4">
                      전문 분야
                    </h4>
                    <div className="grid grid-cols-4 gap-4">
                      {lawyer.specializations.map((specialty, index) => (
                        <div
                          key={index}
                          className="bg-white rounded-xl p-6 flex flex-col items-center justify-center shadow-sm"
                        >
                          <div className="w-16 h-16 bg-[#D3D3D3] rounded-full flex items-center justify-center text-3xl mb-3">
                            <Users size={32} className="text-[#00353d]" />
                          </div>
                          <span className="text-[#00353d] font-medium">
                            {specialty.val}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Reviews Section */}
                  <div>
                    <h4 className="text-[#00353d] text-xl font-bold mb-4">
                      후기 ({reviews.length})
                    </h4>
                    <div className="space-y-4 mb-6">
                      {reviews.length > 0 ? (
                        reviews.map((review) => (
                          <div
                            key={review.id}
                            className="bg-white rounded-xl p-4 shadow-sm"
                          >
                            <div className="font-medium text-[#00353d] mb-2">
                              {review.author_id.val}
                            </div>
                            <p className="text-[#00353d]/80">
                              {review.review.val}
                            </p>
                            <div className="text-[#00353d]/60 text-sm mt-2">
                              {new Date(review.created_at).toLocaleDateString()}
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-[#00353d]/60 text-center py-8">
                          아직 등록된 후기가 없습니다.
                        </div>
                      )}
                    </div>

                    {/* Review Form */}
                    <div className="bg-white rounded-xl p-4">
                      <textarea
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                        placeholder="이 변호사에 대한 후기를 작성해주세요..."
                        className="w-full p-3 border border-[#00353d]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F4A55] min-h-[100px]"
                      />
                      <button
                        onClick={handleSubmitReview}
                        className="mt-3 bg-[#00353d] text-white px-6 py-2 rounded-lg hover:bg-[#0F4A55] transition"
                      >
                        후기 등록
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LawyerDetailPage;
