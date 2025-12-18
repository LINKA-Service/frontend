"use client";

import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import Header from "@/components/layout/Header";
import useAuthStore from "@/store/useAuthStore";
import { Send, ArrowLeft, Users } from "lucide-react";

interface Message {
  content: string;
  id: number;
  group_id: number;
  author_id: number;
  created_at: string;
  updated_at: string;
}

interface Group {
  name: string;
  description: string;
  icon_url: string;
  id: number;
  owner_id: number;
  created_at: string;
  updated_at: string;
}

export default function CaseChatPage() {
  const params = useParams();
  const router = useRouter();
  const caseId = params.id as string;
  const { accessToken, user } = useAuthStore();

  const [group, setGroup] = useState<Group | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [groupId, setGroupId] = useState<number | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const fetchOrCreateGroup = async () => {
      try {
        // 먼저 그룹 목록을 가져와서 이 케이스에 해당하는 그룹이 있는지 확인
        const groupsResponse = await fetch("/api/groups", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (groupsResponse.ok) {
          const groups = await groupsResponse.json();
          // 케이스 ID와 관련된 그룹 찾기 (이름에 케이스 ID가 포함되어 있다고 가정)
          const existingGroup = groups.find((g: Group) =>
            g.name.includes(`Case ${caseId}`),
          );

          if (existingGroup) {
            setGroup(existingGroup);
            setGroupId(existingGroup.id);
            return;
          }
        }

        // 그룹이 없으면 새로 생성
        const createResponse = await fetch("/api/groups", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            name: `Case ${caseId} Discussion`,
            description: `사건 ${caseId}에 대한 공동 대응 채팅방`,
            icon_url: "",
          }),
        });

        if (createResponse.ok) {
          const newGroup = await createResponse.json();
          setGroup(newGroup);
          setGroupId(newGroup.id);
        }
      } catch (error) {
        console.error("Error fetching/creating group:", error);
      }
    };

    if (accessToken && caseId) {
      fetchOrCreateGroup();
    }
  }, [accessToken, caseId]);

  useEffect(() => {
    const fetchMessages = async () => {
      if (!groupId) return;

      try {
        const response = await fetch(`/api/groups/${groupId}/messages`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setMessages(data);
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    if (groupId) {
      fetchMessages();
      // 5초마다 메시지 새로고침
      const interval = setInterval(fetchMessages, 5000);
      return () => clearInterval(interval);
    }
  }, [groupId, accessToken]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || !groupId) return;

    setLoading(true);
    try {
      const response = await fetch(`/api/groups/${groupId}/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          content: inputMessage,
          group_id: groupId,
        }),
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

      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-6">
          <button
            onClick={() => router.push(`/cases/${caseId}`)}
            className="flex items-center text-white hover:text-gray-300 transition-colors"
          >
            <ArrowLeft className="mr-2" size={20} />
            사건 상세로 돌아가기
          </button>
        </div>

        <div className="bg-[#fafafa] rounded-lg h-[calc(100vh-250px)] flex flex-col">
          {/* 헤더 */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-[#00353D] text-xl font-bold">
                  {group?.name || "채팅방"}
                </h1>
                <p className="text-sm text-gray-600">
                  {group?.description || "공동 대응을 위한 채팅방입니다"}
                </p>
              </div>
              <div className="flex items-center gap-2 text-[#00353D]">
                <Users size={20} />
                <span className="font-semibold">참여자</span>
              </div>
            </div>
          </div>

          {/* AI 커맨드 안내 */}
          <div className="p-3 bg-blue-50 border-b border-blue-100">
            <p className="text-xs text-blue-800">
              💡 AI 커맨드: /summarize (요약), /timeline (타임라인), /evidence
              (증거), /lawhelp [질문] (법률 조언)
            </p>
          </div>

          {/* 메시지 영역 */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 ? (
              <div className="flex items-center justify-center h-full text-gray-500">
                <div className="text-center">
                  <p className="text-lg font-semibold mb-2">
                    채팅방에 오신 것을 환영합니다!
                  </p>
                  <p className="text-sm">
                    피해자들과 정보를 공유하고 공동 대응을 준비하세요.
                  </p>
                </div>
              </div>
            ) : (
              messages.map((message: Message) => (
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
                      message.author_id === user?.id
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
              ))
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* 입력 영역 */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex gap-2">
              <textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="메시지를 입력하세요... (AI 커맨드: /로 시작)"
                className="flex-1 p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#00353D]"
                rows={3}
                disabled={loading}
              />
              <button
                onClick={handleSendMessage}
                disabled={loading || !inputMessage.trim()}
                className="px-6 bg-[#00353D] text-white rounded-lg hover:bg-[#004a54] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
