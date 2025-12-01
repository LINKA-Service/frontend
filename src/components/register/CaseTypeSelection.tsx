"use client";

import { Icon } from "@iconify/react";
import Header from "@/components/layout/Header";

interface CaseTypeSelectionProps {
  onSelect: (type: string) => void;
}

const caseTypes = [
  { id: "voice_phishing", icon: "mdi:package-variant", label: "택거래 사기" },
  { id: "job_scam", icon: "mdi:briefcase", label: "보험/서류 사기" },
  { id: "dating_scam", icon: "mdi:account-multiple", label: "방문판매 사기" },
  { id: "loan_scam", icon: "mdi:shield-alert", label: "사칭/위조 사기" },
  { id: "rental_scam", icon: "mdi:home-city", label: "전세/월세 사기" },
  { id: "romance_scam", icon: "mdi:heart", label: "로맨스 스캠" },
  { id: "smishing", icon: "mdi:message-text", label: "스미싱 사기" },
  { id: "fake_ad", icon: "mdi:bullhorn", label: "허위 광고 사기" },
  { id: "used_goods", icon: "mdi:repeat", label: "중고거래 사기" },
  { id: "investment", icon: "mdi:hand-coin", label: "투자 유인 사기" },
  { id: "game_item", icon: "mdi:cards-playing", label: "게임 도용 사기" },
  { id: "other", icon: "mdi:account-question", label: "기타" },
];

// 4개씩 잘라서 3개의 열로 구조 잡기
const columns = [
  caseTypes.slice(0, 3),
  caseTypes.slice(3, 6),
  caseTypes.slice(6, 9),
  caseTypes.slice(9, 12),
];

export default function CaseTypeSelection({
  onSelect,
}: CaseTypeSelectionProps) {
  return (
    <div className="min-h-screen text-white">
      <Header />

      <div className="fixed inset-0 pointer-events-none z-50">
        <div className="h-full relative">
          <button
            className="absolute left-5 top-1/2 transform -translate-y-1/2 p-4 rounded-full text-white pointer-events-auto"
            aria-label="이전"
          >
            <Icon icon="mdi:chevron-left" className="w-18 h-18" />
          </button>

          <button
            className="absolute right-5 top-1/2 transform -translate-y-1/2 p-4 rounded-full text-white pointer-events-auto"
            aria-label="다음"
          >
            <Icon icon="mdi:chevron-right" className="w-18 h-18" />
          </button>
        </div>
      </div>

      <div className="h-15"></div>
      <main className="container mx-auto px-8 py-10">
        <div className="text-center mb-16 mt-10">
          <h1 className="text-5xl font-bold mb-6">피해 수법</h1>
          <p className="text-lg mb-2">피해를 받은 수단을 선택해주세요.</p>
          <p className="text-lg">
            카드를 클릭하면 해당 사기의 정확한 의미를 알 수 있습니다.
          </p>
        </div>

        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row gap-16 justify-center">
          {columns.map((col, columnIndex) => (
            <div key={columnIndex} className="flex flex-col gap-16">
              {col.map((caseType) => (
                <button
                  key={caseType.id}
                  onClick={() => onSelect(caseType.id)}
                  className="w-60 bg-[#fafafa] rounded-2xl p-8 flex flex-col items-center gap-6 hover:scale-105 transition-transform duration-200 hover:shadow-2xl mx-auto"
                >
                  <div className="w-20 h-20 bg-[#0A3A40] rounded-full flex items-center justify-center">
                    <Icon
                      icon={caseType.icon}
                      className="text-white text-4xl"
                    />
                  </div>
                  <span className="text-[#0A3A40] text-xl font-bold">
                    {caseType.label}
                  </span>
                  <div className="bg-[#0A3A40] text-white px-6 py-2 rounded-lg text-sm font-semibold">
                    선택하기
                  </div>
                </button>
              ))}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
