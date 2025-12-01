"use client";

import React, { useState } from "react";
import {
  ArrowRight,
  Heart,
  Users,
  FileText,
  Scale,
  ChevronRight,
  ChevronDown,
} from "lucide-react";
import Image from "next/image";
import useAuthStore from "../store/useAuthStore";

export default function MainPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const { user, logout } = useAuthStore();

  return (
    <div
      className="min-h-screen"
      style={{
        background: "linear-gradient(180deg, #00353D 0%, #00252A 100%)",
      }}
    >
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md border-b border-[#fafafa]/10">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <Image
              src="/logo/logo-w.svg"
              alt="LINKA Logo"
              width={120}
              height={120}
              className="shadow-lg"
            />
          </div>

          <div className="flex items-center gap-3">
            {user ? (
              <>
                {/* 로그인 후 사용자명 */}
                <button className="px-5 py-2 text-[#fafafa]/90 hover:text-[#fafafa] transition-colors font-medium">
                  {user.display_name} 님
                </button>
                {/* 로그아웃 버튼 */}
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
                <button className="px-5 py-2 text-[#fafafa]/90 hover:text-[#fafafa] transition-colors font-medium">
                  로그인
                </button>
                <button className="px-6 py-2.5 bg-[#fafafa] text-teal-900 rounded-full font-semibold hover:bg-teal-50 transition-all shadow-lg hover:shadow-xl hover:scale-105">
                  회원가입
                </button>
              </>
            )}
          </div>
        </div>
        <div className="h-px bg-[#fafafa]/20"></div>
      </header>
      <div className="h-25"></div>

      <section className="pt-32 pb-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#fafafa]/95 backdrop-blur-sm rounded-full mb-10 shadow-lg hover:shadow-xl transition-all">
            <Heart className="w-4 h-4 text-rose-500" fill="currentColor" />
            <span className="text-teal-900 font-semibold text-sm">
              피해자를 위한 서비스
            </span>
          </div>

          <h1 className="text-[#fafafa] mb-6">
            <div className="text-6xl md:text-7xl font-bold mb-3 leading-tight">
              혼자가 아니에요.
            </div>
            <div className="text-6xl md:text-7xl font-bold leading-tight">
              함께 대처합시다.
            </div>
          </h1>

          <p className="text-teal-100/90 text-xl md:text-2xl mb-12 leading-relaxed max-w-3xl mx-auto font-light">
            AI가 당신과 유사한 피해를 입은 사람들을 찾아주고,
            <br />
            함께 모여 적절한 대처를 할 수 있도록 돕습니다.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="group w-full sm:w-auto px-10 py-4 bg-[#fafafa] text-teal-900 rounded-full font-bold text-lg hover:bg-teal-50 transition-all flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl hover:scale-105">
              피해 등록하기
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <button className="w-full sm:w-auto px-10 py-4 border-2 border-[#fafafa]/80 text-[#fafafa] rounded-full font-bold text-lg hover:bg-[#fafafa]/10 transition-all backdrop-blur-sm shadow-lg hover:shadow-xl hover:scale-105">
              더 알아보기
            </button>
          </div>
        </div>
      </section>
      <div className="h-15"></div>

      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-[#fafafa] text-4xl font-bold mb-4">
              LINKA의 핵심 기능
            </h2>
            <p className="text-teal-100/80 text-lg">
              AI 기술로 피해자를 연결하고, 함께 대응할 수 있도록 돕습니다
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <div className="bg-[#fafafa] rounded-3xl p-8 hover:scale-[1.02] transition-all shadow-2xl flex flex-col h-full">
              <div className="flex items-center gap-4 mb-5">
                <FileText className="w-8 h-8 text-[#00252A]" />
                <h3 className="text-[#00252A] text-2xl font-bold">
                  피해 등록 & AI 자동 분석
                </h3>
              </div>
              <p className="text-[#00252A]/80 leading-relaxed mb-6">
                피해 내용을 자유롭게 작성하면 AI가 자동으로 분석하고, 부족한
                정보를 질문으로 보완합니다. 사기 유형, 가해자 정보, 증거 자료를
                체계적으로 정리할 수 있습니다.
              </p>
              <div className="bg-[#fafafa] rounded-xl p-4 space-y-2 mt-2">
                <div className="flex items-center gap-2 text-sm text-[#00252A]/70">
                  <div className="w-1.5 h-1.5 bg-[#00252A] rounded-full"></div>
                  <span>구조화된 폼으로 간편한 정보 입력</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-[#00252A]/70">
                  <div className="w-1.5 h-1.5 bg-[#00252A] rounded-full"></div>
                  <span>AI가 진술 분석 후 추가 질문 생성</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-[#00252A]/70">
                  <div className="w-1.5 h-1.5 bg-[#00252A] rounded-full"></div>
                  <span>증거 자료 자동 분류 및 저장</span>
                </div>
              </div>
            </div>

            <div className="bg-[#fafafa] rounded-3xl p-8 hover:scale-[1.02] transition-all shadow-2xl flex flex-col h-full">
              <div className="flex items-center gap-4 mb-5">
                <Users className="w-8 h-8 text-[#00252A]" />
                <h3 className="text-[#00252A] text-2xl font-bold">
                  하이브리드 AI 매칭
                </h3>
              </div>
              <p className="text-[#00252A]/80 leading-relaxed mb-6">
                동일 가해자는 물론, 유사한 수법의 사기까지 AI가 자동으로
                탐지합니다. 계좌번호나 연락처가 다르더라도 패턴 분석으로
                연결해드립니다.
              </p>
              <div className="bg-[#fafafa] to-[#00252A]/10 rounded-xl p-4 mt-2">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-[#00252A] rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-[#fafafa] text-xs font-bold">
                        1
                      </span>
                    </div>
                    <div>
                      <p className="text-[#00252A] font-semibold text-sm">
                        가해자 식별 정보 매칭
                      </p>
                      <p className="text-[#00252A]/70 text-xs">
                        계좌번호·전화번호·계정 ID 기반
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-[#00252A] rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-[#fafafa] text-xs font-bold">
                        2
                      </span>
                    </div>
                    <div>
                      <p className="text-[#00252A] font-semibold text-sm">
                        사기 수법 유사도 분석
                      </p>
                      <p className="text-[#00252A]/70 text-xs">
                        BM25 + 벡터 검색 하이브리드
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-[#00252A] rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-[#fafafa] text-xs font-bold">
                        3
                      </span>
                    </div>
                    <div>
                      <p className="text-[#00252A] font-semibold text-sm">
                        정밀 재랭킹
                      </p>
                      <p className="text-[#00252A]/70 text-xs">
                        Cross-Encoder로 최종 순위 조정
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#fafafa] rounded-3xl p-8 hover:scale-[1.02] transition-all shadow-2xl flex flex-col h-full">
              <div className="flex items-center gap-4 mb-5">
                <Heart className="w-8 h-8 text-[#00252A]" fill="currentColor" />
                <h3 className="text-[#00252A] text-2xl font-bold">
                  피해자 그룹 채팅
                </h3>
              </div>
              <p className="text-[#00252A]/80 leading-relaxed mb-6">
                매칭된 피해자들과 안전하게 소통하며 공동대응을 준비하세요. AI
                커맨드로 대화 내용을 요약하고, 증거를 정리하며, 타임라인을 자동
                생성할 수 있습니다.
              </p>
              <div className="space-y-3 mt-2">
                <div className="bg-[#fafafa]/70 rounded-xl p-3 border-l-4 border-[#00252A]">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[#00252A] font-bold text-xs bg-[#00252A]/10 px-2 py-0.5 rounded">
                      /summarize
                    </span>
                  </div>
                  <p className="text-[#00252A]/70 text-xs">
                    대화 내용을 핵심만 요약
                  </p>
                </div>
                <div className="bg-[#fafafa]/70 rounded-xl p-3 border-l-4 border-[#00252A]">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[#00252A] font-bold text-xs bg-[#00252A]/10 px-2 py-0.5 rounded">
                      /timeline
                    </span>
                  </div>
                  <p className="text-[#00252A]/70 text-xs">
                    피해 발생 시간순 자동 정리
                  </p>
                </div>
                <div className="bg-[#fafafa]/70 rounded-xl p-3 border-l-4 border-[#00252A]">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[#00252A] font-bold text-xs bg-[#00252A]/10 px-2 py-0.5 rounded">
                      /evidence
                    </span>
                  </div>
                  <p className="text-[#00252A]/70 text-xs">
                    모든 증거 자료를 한눈에
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-[#fafafa] rounded-3xl p-8 hover:scale-[1.02] transition-all shadow-2xl flex flex-col h-full">
              <div className="flex items-center gap-4 mb-5">
                <Scale className="w-8 h-8 text-[#00252A]" />
                <h3 className="text-[#00252A] text-2xl font-bold">
                  RAG 기반 법률 상담
                </h3>
              </div>
              <p className="text-[#00252A]/80 leading-relaxed mb-6">
                국가법령정보센터와 판례 데이터를 기반으로 초기 법률 조언을
                받아보세요. 변호사 상담 전 기본적인 대응 방향을 파악할 수
                있습니다.
              </p>
              <div className="bg-[#fafafa] to-transparent rounded-xl p-4 mt-2 border border-[#00252A]/20">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[#00252A] font-bold text-sm">
                    AI 법률 검색 프로세스
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-start gap-2 text-sm">
                    <span className="text-[#00252A]/60">①</span>
                    <span className="text-[#00252A]/80">
                      질문 분석 및 핵심 쟁점 파악
                    </span>
                  </div>
                  <div className="flex items-start gap-2 text-sm">
                    <span className="text-[#00252A]/60">②</span>
                    <span className="text-[#00252A]/80">
                      관련 법령 및 판례 자동 검색
                    </span>
                  </div>
                  <div className="flex items-start gap-2 text-sm">
                    <span className="text-[#00252A]/60">③</span>
                    <span className="text-[#00252A]/80">
                      근거 기반 법률 조언 생성
                    </span>
                  </div>
                  <div className="flex items-start gap-2 text-sm">
                    <span className="text-[#00252A]/60">④</span>
                    <span className="text-[#00252A]/80">
                      법령 조항·판례 번호 출처 제공
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-[#fafafa] text-4xl font-bold mb-4">
              LINKA는 어떻게 도움을 주나요?
            </h2>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <div className="flex-1 max-w-xs">
              <div className="w-full h-full p-6 bg-[#fafafa] rounded-2xl text-[#00353D]">
                <div className="w-full flex justify-center mb-4">
                  <FileText className="w-16 h-16 text-[#00353D]" />
                </div>
                <div className="text-center">
                  <h3 className="text-[#00353D] text-xl font-bold mb-3">
                    피해 내용 등록
                  </h3>
                  <p className="text-[#00353D] text-sm leading-relaxed">
                    사기 유형, 가해자 정보, 증거 자료를 간편하게
                    <br />
                    등록하고 AI가 자동 분석합니다.
                  </p>
                </div>
              </div>
            </div>

            <ChevronRight className="hidden md:block w-8 h-8 text-[#fafafa]" />
            <div className="md:hidden">
              <ChevronDown className="w-8 h-8 text-[#fafafa]" />
            </div>

            <div className="flex-1 max-w-xs">
              <div className="w-full h-full p-6 bg-[#fafafa] rounded-2xl text-[#00353D]">
                <div className="w-full flex justify-center mb-4">
                  <Users className="w-16 h-16 text-[#00353D]" />
                </div>
                <div className="text-center">
                  <h3 className="text-[#00353D] text-xl font-bold mb-3">
                    AI 분석 및 매칭
                  </h3>
                  <p className="text-[#00353D] text-sm leading-relaxed">
                    유사한 피해를 입은
                    <br />
                    다른 피해자들을 AI가
                    <br />
                    자동으로 찾아서 연결
                  </p>
                </div>
              </div>
            </div>

            <ChevronRight className="hidden md:block w-8 h-8 text--[#fafafa]" />
            <div className="md:hidden">
              <ChevronDown className="w-8 h-8 text-[#fafafa]" />
            </div>

            <div className="flex-1 max-w-xs">
              <div className="w-full h-full p-6 bg-[#fafafa] rounded-2xl text-[#00353D]">
                <div className="w-full flex justify-center mb-4">
                  <Scale className="w-16 h-16 text-[#00353D]" />
                </div>
                <div className="text-center">
                  <h3 className="text-[#00353D] text-xl font-bold mb-3">
                    공동 대응 시작
                  </h3>
                  <p className="text-[#00353D] text-sm leading-relaxed">
                    함께 증거를 정리하고
                    <br />
                    법률 조언을 받아
                    <br />
                    효과적인 집단 대응 진행
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-[#fafafa] text-4xl font-bold text-center mb-12">
            자주 묻는 질문
          </h2>

          <div className="space-y-4">
            {[
              {
                q: "Q. 어떤정보를 등록해야 하나요?",
                a: "A. 네! LINKA는 전문 법무법인이 의뢰인을 모집하거나, 권리행사가 가능한지 여부를 AI 분석 및 자문을 기반으로 판단하며, 가입자에 대한 기본적인 상담/자문을 지원합니다.",
              },
              {
                q: "Q. 가해자의 모든 정보를 알아야 가능한가요?",
                a: "A. 아니요, 관련없습니다. 계좌정보, 전화번호, 메신저 ID 등 가능한 정보만 입력하시면 AI가 유사한 수법과 패턴을 분석하여 매칭합니다. 사기 수법 자체가 유사하다면 같은 가해자일 가능성이 높습니다.",
              },
              {
                q: "Q. 피해자끼리 채팅하면 무엇을 할 수 있나요?",
                a: "A. 네, 특정 가해자 또는 유사한 수법을 가진 범죄자들의 정보를 취합하여 공동 대응이 가능합니다. 이것이 가능한 이유는 여러 사람이 자신의 피해 내용을 취합하여 패턴을 파악하고, 증거 자료를 모아 보다 효과적으로 법적 대응을 할 수 있기 때문입니다.",
              },
            ].map((faq, index) => (
              <div
                key={index}
                className="bg-[#fafafa]/5 backdrop-blur-lg border border-[#fafafa]/10 rounded-2xl overflow-hidden hover:border-teal-400/30 transition-all"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-8 py-6 flex items-center justify-between text-left"
                >
                  <span className="text-[#fafafa] font-semibold text-lg">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#fafafa] transition-transform ${
                      openFaq === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openFaq === index && (
                  <div className="px-8 pb-6">
                    <p className="text-teal-100/80 leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-[#fafafa] text-3xl font-bold mb-6">
            마지막으로, 약속드립니다.
          </h2>
          <p className="text-teal-100 text-xl leading-relaxed italic">
            &ldquo;당신만의 권리를 되찾고, 당신의 소중한 일상이
            <br />
            다시 돌아올 때까지 동행하겠습니다.&rdquo;
          </p>
        </div>
      </section>

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
    </div>
  );
}
