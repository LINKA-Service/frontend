"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import useAuthStore from "@/store/useAuthStore";

interface ScammerInfo {
  id: number;
  case_id: number;
  info_type: string;
  value: string;
}

interface Case {
  id: number;
  user_id: number;
  case_type: string;
  case_type_other: string | null;
  title: string;
  statement: string;
  status: string;
  created_at: string;
  updated_at: string;
  scammer_infos: ScammerInfo[];
}

export default function CasesPage() {
  const router = useRouter();
  const { accessToken } = useAuthStore();
  const [cases, setCases] = useState<Case[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCases = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/cases", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (!response.ok) {
          throw new Error("케이스 목록을 불러오는데 실패했습니다.");
        }

        const data = await response.json();
        setCases(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    if (accessToken) {
      fetchCases();
    }
  }, [accessToken]);

  const getCaseTypeLabel = (caseType: string): string => {
    const typeMap: { [key: string]: string } = {
      delivery: "직거래 사기",
      insurance: "보험/서류 사기",
      door_to_door: "방문판매 사기",
      appointment: "사칭/위조 사기",
      rental: "전세/월세 사기",
      romance: "로맨스 스캠",
      smishing: "스미싱 사기",
      false_advertising: "허위 광고 사기",
      secondhand_fraud: "중고거래 사기",
      investment_scam: "투자 유인 사기",
      account_takeover: "계정 도용 사기",
      other: "기타",
    };
    return typeMap[caseType] || caseType;
  };

  const getStatusLabel = (status: string): string => {
    const statusMap: { [key: string]: string } = {
      pending: "대기중",
      in_progress: "진행중",
      resolved: "해결됨",
    };
    return statusMap[status] || status;
  };

  const getStatusColor = (status: string): string => {
    const colorMap: { [key: string]: string } = {
      pending: "bg-yellow-500",
      in_progress: "bg-blue-500",
      resolved: "bg-green-500",
    };
    return colorMap[status] || "bg-gray-500";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#00353D]">
        <Header />
        <div className="flex items-center justify-center h-[calc(100vh-80px)]">
          <div className="text-white text-xl">로딩 중...</div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#00353D]">
        <Header />
        <div className="flex items-center justify-center h-[calc(100vh-80px)]">
          <div className="text-red-300 text-xl">{error}</div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#00353D]">
      <Header />

      <main className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-white text-3xl font-bold">내 사건 목록</h1>
          <button
            onClick={() => router.push("/register")}
            className="bg-[#fafafa] text-[#00353D] px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
          >
            새 사건 등록
          </button>
        </div>

        {cases.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-white text-xl mb-6">등록된 사건이 없습니다.</p>
            <button
              onClick={() => router.push("/register")}
              className="bg-[#fafafa] text-[#00353D] px-8 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
            >
              첫 사건 등록하기
            </button>
          </div>
        ) : (
          <div className="grid gap-6">
            {cases.map((caseItem: Case) => (
              <div
                key={caseItem.id}
                className="bg-[#e8e5d8] rounded-lg p-6 shadow-lg cursor-pointer hover:shadow-xl transition-shadow"
                onClick={() => router.push(`/cases/${caseItem.id}`)}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-xl font-bold text-gray-800 mb-2">
                      {caseItem.title}
                    </h2>
                    <span className="inline-block bg-white px-3 py-1 rounded-full text-sm text-gray-700 border border-gray-300">
                      {getCaseTypeLabel(caseItem.case_type)}
                    </span>
                  </div>
                  <span
                    className={`${getStatusColor(caseItem.status)} text-white px-4 py-1 rounded-full text-sm font-medium`}
                  >
                    {getStatusLabel(caseItem.status)}
                  </span>
                </div>

                <p className="text-gray-700 mb-4 line-clamp-2">
                  {caseItem.statement}
                </p>

                {caseItem.scammer_infos &&
                  caseItem.scammer_infos.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {caseItem.scammer_infos
                        .slice(0, 3)
                        .map((info: ScammerInfo) => (
                          <span
                            key={info.id}
                            className="text-sm text-gray-600 bg-white px-3 py-1 rounded-full"
                          >
                            {info.info_type}: {info.value}
                          </span>
                        ))}
                      {caseItem.scammer_infos.length > 3 && (
                        <span className="text-sm text-gray-600">
                          +{caseItem.scammer_infos.length - 3}개 더
                        </span>
                      )}
                    </div>
                  )}

                <div className="text-sm text-gray-500">
                  등록일:{" "}
                  {new Date(caseItem.created_at).toLocaleDateString("ko-KR")}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
