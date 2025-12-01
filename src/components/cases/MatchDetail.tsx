import React from "react";

interface ScammerInfo {
  [key: string]: unknown;
}

export interface MatchCase {
  case_id: number;
  title: string;
  case_type: string;
  statement: string;
  scammer_infos: ScammerInfo[];
  similarity_score: number;
  created_at: string;
}

interface MatchDetailProps {
  caseData: MatchCase;
  index: number;
  onJoinGroup?: (caseId: number) => void;
}

export default function MatchDetail({
  caseData,
  index,
  onJoinGroup,
}: MatchDetailProps) {
  const getCaseTypeLabel = (caseType: string): string => {
    const typeMap: { [key: string]: string } = {
      same_scammer: "동일 가해자 사례",
      similar_method: "유사 수법 사례",
      related_fraud: "관련 사기 사례",
      voice_phishing: "동일 가해자 사례",
      romance_scam: "유사 수법 사례",
      loan_scam: "관련 사기 사례",
      impersonation: "대면 사기",
    };
    return typeMap[caseType] || caseType;
  };

  const getCaseSubTypeLabel = (index: number): string => {
    const labels = ["중고거래 사기", "전자상거래 사기", "대면 사기"];
    return labels[index % labels.length];
  };

  const getCaseTypeButtonStyle = (index: number): string => {
    return "bg-white border border-gray-300 text-gray-700";
  };

  const extractScammerInfo = (scammerInfos: ScammerInfo[]): string => {
    if (!scammerInfos || scammerInfos.length === 0) return "";

    const firstInfo = scammerInfos[0];
    const entries = Object.entries(firstInfo);

    if (entries.length === 0) return "";

    return entries.map(([key, value]) => `${key}: ${value}`).join(", ");
  };

  // 예시 데이터 (실제로는 API에서 받아와야 함)
  const totalVictims = 4 + index;
  const totalDamage = (2.5 + index * 1.2).toFixed(1);
  const scammerInfo = extractScammerInfo(caseData.scammer_infos);
  const participantCount = 5 + index * 7;
  const hasTransaction = index === 1;

  const handleJoinClick = () => {
    if (onJoinGroup) {
      onJoinGroup(caseData.case_id);
    }
  };

  return (
    <div className="bg-[#e8e5d8] rounded-lg p-6 shadow-lg">
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-xl font-bold text-gray-800">
          {getCaseTypeLabel(caseData.case_type)}
        </h2>
        <button
          onClick={handleJoinClick}
          className="bg-[#1a3d3d] text-white px-4 py-2 rounded-md text-sm hover:bg-[#2a4d4d] transition-colors whitespace-nowrap"
        >
          모임 참여하기
        </button>
      </div>

      <p className="text-gray-700 mb-3 font-medium">{caseData.title}</p>

      <div className="flex items-center text-gray-700 mb-3">
        <svg
          className="w-5 h-5 mr-2 flex-shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
        <span className="font-semibold">
          {totalVictims}명의 피해자 총 피해액: {totalDamage}백만원
        </span>
      </div>

      <div className="flex items-start flex-wrap gap-2">
        <button
          className={`px-3 py-1 rounded-full text-sm ${getCaseTypeButtonStyle(index)}`}
        >
          {getCaseSubTypeLabel(index)}
        </button>
        {scammerInfo && (
          <span className="text-gray-600 text-sm pt-1">{scammerInfo}</span>
        )}
      </div>

      {participantCount > 0 && (
        <p className="text-gray-600 text-sm mt-3">
          참가 채팅 기록 {participantCount}건
          {hasTransaction && ", 거래내역 8건"}
        </p>
      )}
    </div>
  );
}
