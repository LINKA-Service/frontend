"use client";

import { useState, useEffect, useRef } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import useAuthStore from "@/store/useAuthStore";
import { Send } from "lucide-react";

interface Message {
  id: number;
  content: string;
  consultation_id: number;
  author_id: number;
  created_at: string;
  isAI?: boolean;
}

interface Consultation {
  id: number;
  case_id: number;
  name: string;
  author_id: number;
  group_id: number;
  created_at: string;
  messages: Message[];
}

export default function LegalConsultationPage() {
  const { accessToken, user } = useAuthStore();
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [selectedConsultation, setSelectedConsultation] =
    useState<Consultation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isAIMode, setIsAIMode] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const fetchConsultations = async () => {
      try {
        const response = await fetch("/api/consultation", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setConsultations(data);
        }
      } catch (error) {
        console.error("Error fetching consultations:", error);
      }
    };

    if (accessToken) {
      fetchConsultations();
    }
  }, [accessToken]);

  useEffect(() => {
    const fetchMessages = async () => {
      if (!selectedConsultation) return;

      try {
        const response = await fetch(
          `/api/consultation/${selectedConsultation.id}/messages`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );
        if (response.ok) {
          const data = await response.json();
          setMessages(data);
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    if (selectedConsultation) {
      fetchMessages();
    }
  }, [selectedConsultation, accessToken]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || !selectedConsultation) return;

    setLoading(true);
    try {
      const endpoint = isAIMode
        ? `/api/consultation/${selectedConsultation.id}/messages/ai`
        : `/api/consultation/${selectedConsultation.id}/messages`;

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ content: inputMessage }),
      });

      if (response.ok) {
        const newMessage = await response.json();
        setMessages((prev) => [...prev, newMessage]);
        setInputMessage("");
      }
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-[#00353D]">
      <Header />

      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <h1 className="text-white text-3xl font-bold mb-8">AI 법률 상담</h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 h-[calc(100vh-250px)]">
          {/* 상담 목록 */}
          <div className="md:col-span-1 bg-[#fafafa] rounded-lg p-4 overflow-y-auto">
            <h2 className="text-[#00353D] font-bold mb-4">내 상담 목록</h2>
            <div className="space-y-2">
              {consultations.map((consultation: Consultation) => (
                <button
                  key={consultation.id}
                  onClick={() => setSelectedConsultation(consultation)}
                  className={`w-full text-left p-3 rounded-lg transition-colors ${
                    selectedConsultation?.id === consultation.id
                      ? "bg-[#00353D] text-white"
                      : "bg-white text-[#00353D] hover:bg-gray-100"
                  }`}
                >
                  <div className="font-semibold">{consultation.name}</div>
                  <div className="text-xs opacity-70">
                    {new Date(consultation.created_at).toLocaleDateString(
                      "ko-KR",
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* 채팅 영역 */}
          <div className="md:col-span-3 bg-[#fafafa] rounded-lg flex flex-col">
            {selectedConsultation ? (
              <>
                {/* 헤더 */}
                <div className="p-4 border-b border-gray-200">
                  <h2 className="text-[#00353D] font-bold">
                    {selectedConsultation.name}
                  </h2>
                  <div className="flex items-center gap-2 mt-2">
                    <label className="flex items-center gap-2 text-sm text-[#00353D]">
                      <input
                        type="checkbox"
                        checked={isAIMode}
                        onChange={(e) => setIsAIMode(e.target.checked)}
                        className="rounded"
                      />
                      AI 법률 상담 모드
                    </label>
                  </div>
                </div>

                {/* 메시지 영역 */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((message: Message) => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.author_id === user?.id
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[70%] p-3 rounded-lg ${
                          message.isAI
                            ? "bg-purple-100 text-purple-900"
                            : message.author_id === user?.id
                              ? "bg-[#00353D] text-white"
                              : "bg-gray-200 text-gray-800"
                        }`}
                      >
                        <p className="whitespace-pre-wrap">{message.content}</p>
                        <div className="text-xs opacity-70 mt-1">
                          {new Date(message.created_at).toLocaleTimeString(
                            "ko-KR",
                            {
                              hour: "2-digit",
                              minute: "2-digit",
                            },
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>

                {/* 입력 영역 */}
                <div className="p-4 border-t border-gray-200">
                  <div className="flex gap-2">
                    <textarea
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder={
                        isAIMode
                          ? "AI에게 법률 질문을 입력하세요..."
                          : "메시지를 입력하세요..."
                      }
                      className="flex-1 p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#00353D]"
                      rows={3}
                      disabled={loading}
                    />
                    <button
                      onClick={handleSendMessage}
                      disabled={loading || !inputMessage.trim()}
                      className="px-6 bg-[#00353D] text-white rounded-lg hover:bg-[#004a54] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Send size={20} />
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-gray-500">
                상담을 선택하거나 새로운 상담을 시작하세요.
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
