"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import useAuthStore from "../../store/useAuthStore";

export default function Header() {
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md border-b border-[#fafafa]/10">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <Link href="/">
            <Image
              src="/logo/logo-w.svg"
              alt="LINKA Logo"
              width={150}
              height={150}
            />
          </Link>
        </div>
        <div className="flex items-center gap-3">
          {!mounted ? (
            <div className="w-[200px] h-[42px]" />
          ) : user ? (
            <>
              {/* 로그인 후 사용자명 */}
              <button
                onClick={() => router.push("/mypage")}
                className="px-5 py-2 text-[#fafafa]/90 hover:text-[#fafafa] transition-colors font-medium"
              >
                {user.display_name} 님
              </button>

              <button
                onClick={logout}
                className="px-6 py-2.5 bg-[#fafafa] text-teal-900 rounded-full font-semibold hover:bg-teal-50 transition-all shadow-lg hover:shadow-xl hover:scale-105"
              >
                로그아웃
              </button>
            </>
          ) : (
            <>
              {/* 로그인 전 */}
              <button
                onClick={() => router.push("/login")}
                className="px-5 py-2 text-[#fafafa]/90 hover:text-[#fafafa] transition-colors font-medium"
              >
                로그인
              </button>
              <button
                onClick={() => router.push("/signup")}
                className="px-6 py-2.5 bg-[#fafafa] text-teal-900 rounded-full font-semibold hover:shadow-xl hover:scale-105"
              >
                회원가입
              </button>
            </>
          )}
        </div>
      </div>
      <div className="h-px bg-[#fafafa]/20"></div>
    </header>
  );
}
