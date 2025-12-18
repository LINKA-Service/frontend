"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Swal from "sweetalert2";
import useAuthStore from "@/store/useAuthStore";

export default function Footer() {
  const { user } = useAuthStore();
  const router = useRouter();
  const Toast = Swal.mixin({
    toast: true,
    position: "top",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
  });

  const handleFaqClick = () => {
    router.push("/#faq-section");
  };

  const handleCaseRegisterClick = (e: React.MouseEvent) => {
    e.preventDefault(); // 버튼은 사실 필요 없지만, 안전하게 추가 가능
    if (!user) {
      Toast.fire({
        iconColor: "#fff",
        title: "회원가입 또는 로그인 후에 이용해주세요!",
        color: "#fff",
        background: "#E74B3C",
        position: "top-end",
      });
      return;
    }
    router.push("/register");
  };

  return (
    <footer className="border-t border-[#fafafa]/10 bg-[#001b23] backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex justify-center mb-12">
          <Link href="/">
            <Image
              src="/logo/logo-w.svg"
              alt="LINKA Logo"
              width={150}
              height={150}
            />
          </Link>
        </div>

        <p className="text-center text-[#fafafa]/80 text-lg mb-16 max-w-3xl mx-auto">
          당신이 피해를 혼자 감당하지 않도록, AI가 당신과 공동대응을 함께할
          <br />
          피해자를 찾아서 매칭하고 필요한 대응을 알려드립니다.
        </p>

        <div className="flex justify-center mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-20 max-w-xl">
            <div className="text-left">
              <h4 className="text-[#fafafa] font-bold mb-3">서비스</h4>
              <div className="space-y-2 text-[#fafafa]/70 text-sm">
                <a
                  href="#"
                  className="block hover:text-[#fafafa] transition-colors"
                >
                  공지사항
                </a>
                <a
                  onClick={handleFaqClick}
                  className="block hover:text-[#fafafa] transition-colors cursor-pointer"
                >
                  자주 묻는 질문
                </a>

                <button
                  onClick={handleCaseRegisterClick}
                  className="block hover:text-[#fafafa] transition-colors"
                >
                  피해 등록하기
                </button>
              </div>
            </div>

            <div className="text-left">
              <h4 className="text-[#fafafa] font-bold mb-3">정책</h4>
              <div className="space-y-2 text-[#fafafa]/70 text-sm">
                <a
                  href="#"
                  className="block hover:text-[#fafafa] transition-colors"
                >
                  서비스 이용약관
                </a>
                <a
                  href="#"
                  className="block hover:text-[#fafafa] transition-colors"
                >
                  개인정보 처리방침
                </a>
              </div>
            </div>

            <div className="text-left">
              <h4 className="text-[#fafafa] font-bold mb-3">문의</h4>
              <div className="space-y-2 text-[#fafafa]/70 text-sm">
                <a
                  href="https://github.com/LINKA-Service"
                  className="block hover:text-[#fafafa] transition-colors"
                >
                  팀 &apos;대 선 린&apos; 소개
                </a>
                <a
                  href="#"
                  className="block hover:text-[#fafafa] transition-colors"
                >
                  문의하기
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-[#fafafa]/10 text-center text-[#fafafa]/60 text-sm">
          © {new Date().getFullYear()} LINKA. All rights reserved. <br />
          Connecting victims with 🫶, empowering justice.
        </div>
      </div>
    </footer>
  );
}
