"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import useAuthStore from "../../store/useAuthStore";

export default function LoginPage() {
  const router = useRouter();
  const { setAccessToken } = useAuthStore();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const formBody = new URLSearchParams();
      formBody.append("username", formData.username);
      formBody.append("password", formData.password);
      formBody.append("grant_type", "password");

      const response = await fetch(
        "http://linka-backend.dokploy.byeolki.me/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: formBody.toString(),
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "로그인에 실패했습니다.");
      }

      const data = await response.json();
      setAccessToken(data.access_token);
      router.push("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "로그인에 실패했습니다.");
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
      className="min-h-screen flex items-center justify-center px-4"
      style={{
        background: "linear-gradient(180deg, #00353D 0%, #00252A 50%)",
      }}
    >
      <div className="w-full max-w-md">
        <div className="bg-[#FAFAF0] rounded-3xl shadow-2xl p-8 flex flex-col items-center">
          <div className="flex flex-col items-center mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Link href="/">
                <Image
                  src="/logo/logo-g.svg"
                  alt="LINKA Logo"
                  width={180}
                  height={180}
                />
              </Link>
            </div>
            <h1 className="text-2xl font-bold text-[#00353D]">로그인</h1>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
              <p className="text-red-600 text-sm text-center">{error}</p>
            </div>
          )}

          <div className="w-full space-y-4">
            <div className="flex flex-col w-full">
              <label
                htmlFor="username"
                className="text-[#00353D] font-semibold mb-2"
              >
                아이디
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
                htmlFor="password"
                className="text-[#00353D] font-semibold mb-2"
              >
                비밀번호
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

            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full py-4 bg-[#00353D] text-white font-bold rounded-xl hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "로그인 중..." : "로그인"}
            </button>
          </div>

          <div className="mt-6 flex flex-col gap-2 text-center">
            <button
              onClick={() => router.push("/forgot-password")}
              className="text-[#00353D] font-medium hover:underline"
            >
              비밀번호 찾기
            </button>
            <button
              onClick={() => router.push("/signup")}
              className="text-[#00353D] font-medium hover:underline"
            >
              회원가입
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
