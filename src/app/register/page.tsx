"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import CaseTypeSelection from "@/components/register/CaseTypeSelection";
import ScammerInfoForm from "@/components/register/ScammerInfoForm";
import StatementEditor from "@/components/register/StatementEditor";
import useAuthStore from "@/store/useAuthStore";

type Step = "case-type" | "scammer-info" | "statement";

interface ScammerInfo {
  info_type: string;
  value: string;
}

interface ErrorResponse {
  detail?: { loc?: string[]; msg?: string }[] | string;
  message?: string;
  error?: string;
}

export default function RegisterPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<Step>("case-type");
  const [formData, setFormData] = useState({
    caseType: "",
    caseTypeOther: "",
    statement: "",
    scammerInfos: [] as ScammerInfo[],
  });

  const handleCaseTypeSelect = (type: string) => {
    setFormData((prev) => ({ ...prev, caseType: type }));
    setCurrentStep("scammer-info");
  };

  const handleScammerInfoNext = (infos: ScammerInfo[]) => {
    setFormData((prev) => ({ ...prev, scammerInfos: infos }));
    setCurrentStep("statement");
  };

  const handleScammerInfoBack = () => {
    setCurrentStep("case-type");
  };

  const handleStatementBack = () => {
    setCurrentStep("scammer-info");
  };

  const handleStatementSubmit = async (statement: string) => {
    setFormData((prev) => ({ ...prev, statement }));

    try {
      const { accessToken } = useAuthStore.getState();

      if (!accessToken) {
        alert("로그인이 필요합니다.");
        router.push("/login");
        return;
      }

      if (!statement || statement.trim() === "") {
        alert("피해 진술서를 작성해주세요.");
        return;
      }

      const requestBody = {
        case_type: formData.caseType,
        case_type_other: formData.caseTypeOther || null,
        statement: statement.trim(),
        scammer_infos:
          formData.scammerInfos.length > 0 ? formData.scammerInfos : [],
      };

      console.log("=== API 요청 시작 ===");
      console.log("Request body:", JSON.stringify(requestBody, null, 2));

      const response = await fetch("/api/cases", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(requestBody),
      });

      console.log("Response status:", response.status);

      if (response.ok) {
        const responseData = await response.json();
        console.log("Response data:", responseData);
        alert("신고가 성공적으로 등록되었습니다.");
        router.push(`/cases/${responseData.id}`);
      } else {
        let errorData: ErrorResponse;
        try {
          errorData = await response.json();
        } catch (_e) {
          errorData = { error: "알 수 없는 오류가 발생했습니다." };
        }

        console.error("=== API 에러 ===");
        console.error("Error response:", errorData);

        if (response.status === 422 && errorData.detail) {
          if (Array.isArray(errorData.detail)) {
            const validationErrors = errorData.detail
              .map((err) => `${err.loc?.join(".") || "필드"}: ${err.msg}`)
              .join("\n");
            alert(`입력 데이터 오류:\n${validationErrors}`);
          } else {
            alert(`입력 데이터 오류: ${errorData.detail}`);
          }
        } else {
          const errorMessage =
            errorData.detail ||
            errorData.message ||
            errorData.error ||
            "신고 등록에 실패했습니다.";
          alert(`신고 등록 실패: ${errorMessage}`);
        }
      }
    } catch (error) {
      console.error("=== Exception 발생 ===");
      console.error("Error:", error);

      if (error instanceof TypeError && error.message.includes("fetch")) {
        alert("네트워크 오류가 발생했습니다. 인터넷 연결을 확인해주세요.");
      } else if (error instanceof Error) {
        alert(`오류가 발생했습니다: ${error.message}`);
      } else {
        alert("알 수 없는 오류가 발생했습니다. 콘솔을 확인해주세요.");
      }
    }
  };

  return (
    <div
      className="min-h-screen"
      style={{
        background: "linear-gradient(180deg, #00353D 0%, #00252A 100%)",
      }}
    >
      {currentStep === "case-type" && (
        <CaseTypeSelection onSelect={handleCaseTypeSelect} />
      )}
      {currentStep === "scammer-info" && (
        <ScammerInfoForm
          onNext={handleScammerInfoNext}
          onBack={handleScammerInfoBack}
          initialData={formData.scammerInfos}
        />
      )}
      {currentStep === "statement" && (
        <StatementEditor
          onSubmit={handleStatementSubmit}
          onBack={handleStatementBack}
          initialStatement={formData.statement}
        />
      )}
    </div>
  );
}
