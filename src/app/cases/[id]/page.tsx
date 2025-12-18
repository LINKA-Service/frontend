"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Header from "@/components/layout/Header";
import MatchList, { MatchCase } from "@/components/cases/MatchList";
import useAuthStore from "@/store/useAuthStore";

export default function CaseResultPage() {
  const params = useParams();
  const router = useRouter();
  const caseId = params.id as string;
  const { accessToken } = useAuthStore();

  const [similarCases, setSimilarCases] = useState<MatchCase[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userName, setUserName] = useState("사용자");

  useEffect(() => {
    const fetchSimilarCases = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/cases/${caseId}/matches?limit=3`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch similar cases");
        }

        const data = await response.json();
        setSimilarCases(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    if (caseId && accessToken) {
      fetchSimilarCases();
    }
  }, [caseId, accessToken]);

  const handleJoinGroup = (groupCaseId: number) => {
    router.push(`/cases/${groupCaseId}/chat`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#1a3d3d]">
        <Header />
        <div className="flex items-center justify-center h-[calc(100vh-80px)]">
          <div className="text-white text-xl">로딩 중...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#1a3d3d]">
        <Header />
        <div className="flex items-center justify-center h-[calc(100vh-80px)]">
          <div className="text-red-300 text-xl">오류: {error}</div>
        </div>
      </div>
    );
  }

  const totalCases = similarCases.length;

  return (
    <div className="min-h-screen bg-[#1a3d3d]">
      <Header />

      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-white text-2xl md:text-3xl font-bold text-center mb-12">
          {userName} 님의 피해상황과 유사한 피해 사례{" "}
          <span className="text-white">{totalCases}건</span>이 발견되었습니다!
        </h1>

        <MatchList cases={similarCases} onJoinGroup={handleJoinGroup} />

        <div className="mt-8 bg-[#d4f4dd] rounded-lg p-6 shadow-lg">
          <div className="flex items-start">
            <svg
              className="w-6 h-6 text-green-700 mr-3 mt-1 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div>
              <h3 className="font-bold text-gray-800 mb-2">다음 단계</h3>
              <p className="text-gray-700 text-sm">
                그룹에 참여하면 비슷한 재판방식 생성됩니다. 그곳에서 피해 정보를
                공유하고 함께 대처 방안을 논의할 수 있습니다.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
