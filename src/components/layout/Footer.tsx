"use client";

import React from "react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-[#fafafa]/10 bg-black/20 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex justify-center mb-12">
          <Image
            src="/logo/logo-w.svg"
            alt="LINKA Logo"
            width={150}
            height={150}
          />
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
                  href="#"
                  className="block hover:text-[#fafafa] transition-colors"
                >
                  자주 묻는 질문
                </a>
                <a
                  href="#"
                  className="block hover:text-[#fafafa] transition-colors"
                >
                  피해 사례 등록하기
                </a>
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
                  href="#"
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
          © {new Date().getFullYear()} LINKA. All rights reserved. Connecting
          victims with 🫶, empowering justice.
        </div>
      </div>
    </footer>
  );
}
