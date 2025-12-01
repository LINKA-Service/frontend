import React from "react";
import MatchDetail from "./MatchDetail";

interface ScammerInfo {
  [key: string]: unknown;
}

export interface MatchCase {
  case_id: number;
  title: string;
  case_type: string;
  statement: string;
  scammer_infos: ScammerInfo[];
  similarity_score: number;
  created_at: string;
}

interface MatchListProps {
  cases: MatchCase[];
  onJoinGroup?: (caseId: number) => void;
}

export default function MatchList({ cases, onJoinGroup }: MatchListProps) {
  if (!cases || cases.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-white text-lg">매칭된 사례가 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {cases.map((caseItem, index) => (
        <MatchDetail
          key={caseItem.case_id}
          caseData={caseItem}
          index={index}
          onJoinGroup={onJoinGroup}
        />
      ))}
    </div>
  );
}
