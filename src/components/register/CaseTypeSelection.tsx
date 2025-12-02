"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";
import Header from "@/components/layout/Header";
import Swal from "sweetalert2";

interface CaseTypeSelectionProps {
  onSelect: (type: string) => void;
}

const caseTypes = [
  { id: "delivery", icon: "mdi:package-variant", label: "직거래 사기" },
  { id: "insurance", icon: "mdi:briefcase", label: "보험/서류 사기" },
  { id: "door_to_door", icon: "mdi:account-multiple", label: "방문판매 사기" },
  { id: "appointment", icon: "mdi:shield-alert", label: "사칭/위조 사기" },
  { id: "rental", icon: "mdi:home-city", label: "전세/월세 사기" },
  { id: "romance", icon: "mdi:heart", label: "로맨스 스캠" },
  { id: "smishing", icon: "mdi:message-text", label: "스미싱 사기" },
  { id: "false_advertising", icon: "mdi:bullhorn", label: "허위 광고 사기" },
  { id: "secondhand_fraud", icon: "mdi:repeat", label: "중고거래 사기" },
  { id: "investment_scam", icon: "mdi:hand-coin", label: "투자 유인 사기" },
  {
    id: "account_takeover",
    icon: "mdi:cards-playing",
    label: "계정 도용 사기",
  },
  { id: "other", icon: "mdi:account-question", label: "기타" },
];

const columns = [
  caseTypes.slice(0, 4),
  caseTypes.slice(4, 8),
  caseTypes.slice(8, 12),
];

const Toast = Swal.mixin({
  toast: true,
  position: "top",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
});

export default function CaseTypeSelection({
  onSelect,
}: CaseTypeSelectionProps) {
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const handleCardClick = (typeId: string) => {
    if (selectedType === typeId) {
      setSelectedType(null);
    } else {
      setSelectedType(typeId);
    }
  };

  const handleNext = () => {
    if (selectedType) {
      onSelect(selectedType);
    } else {
      Toast.fire({
        iconColor: "#fff",
        title: "어떤 종류의 사기를 당하셨는지 알려주세요!",
        color: "#fff",
        background: "#E74B3C",
        position: "top-end",
      });
    }
  };

  return (
    <div className="min-h-screen text-white">
      <Header />

      <div className="fixed inset-0 pointer-events-none z-50">
        <div className="h-full relative">
          <button
            onClick={handleNext}
            className={`absolute right-5 top-1/2 transform -translate-y-1/2 p-4 rounded-full text-white pointer-events-auto transition-opacity`}
            aria-label="다음"
          >
            <Icon icon="mdi:chevron-right" className="w-22 h-22" />
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
                  onClick={() => handleCardClick(caseType.id)}
                  className={`w-60 rounded-2xl p-8 flex flex-col items-center gap-6 transition-all duration-200 mx-auto ${
                    selectedType === caseType.id
                      ? "bg-[#cffbdc] scale-105 shadow-2xl"
                      : "bg-[#fafafa] hover:scale-105 hover:shadow-2xl"
                  }`}
                >
                  <div
                    className={`w-20 h-20 rounded-full flex items-center justify-center ${
                      selectedType === caseType.id
                        ? "bg-[#0A3A40]"
                        : "bg-[#0A3A40]"
                    }`}
                  >
                    <Icon
                      icon={caseType.icon}
                      className={`text-4xl ${
                        selectedType === caseType.id
                          ? "text-white"
                          : "text-white"
                      }`}
                    />
                  </div>

                  <span
                    className={`text-xl font-bold ${
                      selectedType === caseType.id
                        ? "text-[#0A3A40]"
                        : "text-[#0A3A40]"
                    }`}
                  >
                    {caseType.label}
                  </span>
                  <div
                    className={`px-6 py-2 rounded-lg text-sm font-semibold ${
                      selectedType === caseType.id
                        ? "bg-[#0A3A40] text-white"
                        : "bg-[#0A3A40] text-white"
                    }`}
                  >
                    {selectedType === caseType.id ? "선택됨" : "선택하기"}
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
