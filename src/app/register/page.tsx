"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    display_name: "",
    password: "",
    passwordConfirm: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setError("");

    // 비밀번호 확인 검증
    if (formData.password !== formData.passwordConfirm) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }

    // 필수 필드 검증
    if (!formData.username || !formData.display_name || !formData.password) {
      setError("모든 필드를 입력해주세요.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(
        "http://linka-backend.dokploy.byeolki.me/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: formData.username,
            display_name: formData.display_name,
            password: formData.password,
            bio: "",
            avatar_url: "",
          }),
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "회원가입에 실패했습니다.");
      }

      // 회원가입 성공 시 로그인 페이지로 이동
      alert("회원가입이 완료되었습니다. 로그인해주세요.");
      router.push("/login");
    } catch (err) {
      setError(err instanceof Error ? err.message : "회원가입에 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !isLoading) {
      const btnEvent = {
        preventDefault: () => {},
      } as React.MouseEvent<HTMLButtonElement>;
      handleSubmit(btnEvent);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-12"
      style={{
        background: "linear-gradient(180deg, #00353D 0%, #00252A 50%)",
      }}
    >
      <div className="w-full max-w-md">
        <div className="bg-[#FAFAF0] rounded-3xl shadow-2xl p-8 flex flex-col items-center">
          <div className="flex flex-col items-center mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/logo/logo-g.svg"
                alt="LINKA Logo"
                width={180}
                height={10}
              />
            </div>
            <h1 className="text-2xl font-bold text-[#00353D]">회원가입</h1>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl w-full">
              <p className="text-red-600 text-sm text-center">{error}</p>
            </div>
          )}

          <div className="w-full space-y-4">
            <div className="flex flex-col w-full">
              <label
                htmlFor="username"
                className="text-[#00353D] font-semibold mb-2"
              >
                아이디 <span className="text-red-500">*</span>
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                value={formData.username}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
                placeholder="아이디"
                className="w-full px-4 py-3.5 border-2 border-[#00353D]/30 rounded-xl focus:outline-none focus:border-[#00353D] placeholder:text-gray-400 text-[#00353D] transition-all"
              />
            </div>

            <div className="flex flex-col w-full">
              <label
                htmlFor="display_name"
                className="text-[#00353D] font-semibold mb-2"
              >
                사용자 이름 <span className="text-red-500">*</span>
              </label>
              <input
                id="display_name"
                name="display_name"
                type="text"
                required
                value={formData.display_name}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
                placeholder="사용자 이름"
                className="w-full px-4 py-3.5 border-2 border-[#00353D]/30 rounded-xl focus:outline-none focus:border-[#00353D] placeholder:text-gray-400 text-[#00353D] transition-all"
              />
            </div>

            <div className="flex flex-col w-full">
              <label
                htmlFor="password"
                className="text-[#00353D] font-semibold mb-2"
              >
                비밀번호 <span className="text-red-500">*</span>
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
                placeholder="비밀번호"
                className="w-full px-4 py-3.5 border-2 border-[#00353D]/30 rounded-xl focus:outline-none focus:border-[#00353D] placeholder:text-gray-400 text-[#00353D] transition-all"
              />
            </div>

            <div className="flex flex-col w-full">
              <label
                htmlFor="passwordConfirm"
                className="text-[#00353D] font-semibold mb-2"
              >
                비밀번호 확인 <span className="text-red-500">*</span>
              </label>
              <input
                id="passwordConfirm"
                name="passwordConfirm"
                type="password"
                required
                value={formData.passwordConfirm}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
                placeholder="비밀번호 확인"
                className="w-full px-4 py-3.5 border-2 border-[#00353D]/30 rounded-xl focus:outline-none focus:border-[#00353D] placeholder:text-gray-400 text-[#00353D] transition-all"
              />
            </div>

            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full py-4 bg-[#00353D] text-white font-bold rounded-xl hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {isLoading ? "가입 중..." : "회원가입"}
            </button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-[#00353D]/70 text-sm mb-2">
              이미 계정이 있으신가요?
            </p>
            <button
              onClick={() => router.push("/login")}
              className="text-[#00353D] font-medium hover:underline"
            >
              로그인하기
            </button>
          </div>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={() => router.push("/")}
            className="text-teal-200 hover:text-white transition-colors font-medium"
          >
            ← 홈으로 돌아가기
          </button>
        </div>
      </div>
    </div>
  );
}
