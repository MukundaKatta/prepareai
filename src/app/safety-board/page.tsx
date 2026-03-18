"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import { Users, ThumbsUp, ThumbsDown, MessageSquare, Gavel, Clock } from "lucide-react";

interface BoardMember {
  id: string;
  name: string;
  role: string;
  expertise: string;
  avatar: string;
}

interface Proposal {
  id: string;
  title: string;
  description: string;
  category: string;
  status: "draft" | "under_review" | "voting" | "approved" | "rejected";
  submittedBy: string;
  submittedAt: string;
  votes: { memberId: string; vote: "approve" | "reject" | "abstain"; comment: string }[];
  discussion: { memberId: string; memberName: string; message: string; timestamp: string }[];
}

const boardMembers: BoardMember[] = [
  { id: "bm1", name: "Dr. Sarah Chen", role: "Chair", expertise: "AI Safety Research", avatar: "SC" },
  { id: "bm2", name: "Prof. James Miller", role: "Member", expertise: "Cybersecurity", avatar: "JM" },
  { id: "bm3", name: "Dr. Amara Okafor", role: "Member", expertise: "Biosecurity", avatar: "AO" },
  { id: "bm4", name: "Dr. Raj Patel", role: "Member", expertise: "AI Ethics", avatar: "RP" },
  { id: "bm5", name: "Prof. Maria Garcia", role: "Member", expertise: "Policy & Governance", avatar: "MG" },
  { id: "bm6", name: "Dr. Wei Zhang", role: "External Advisor", expertise: "Nuclear Safety", avatar: "WZ" },
];

const proposals: Proposal[] = [
  {
    id: "prop1",
    title: "Deploy GPT-5 Preview with ASL-3 Safeguards",
    description: "Proposal to deploy GPT-5 Preview to limited users with enhanced monitoring, output filtering, and human review for high-risk queries. The model has passed initial safety evaluations but showed elevated capability in persuasion tasks.",
    category: "Deployment Decision",
    status: "voting",
    submittedBy: "Deployment Team",
    submittedAt: "2026-03-15",
    votes: [
      { memberId: "bm1", vote: "approve", comment: "Adequate safeguards in place for limited deployment" },
      { memberId: "bm2", vote: "approve", comment: "Cyber risk is manageable with proposed monitoring" },
      { memberId: "bm3", vote: "approve", comment: "Bio screening filters verified effective" },
      { memberId: "bm4", vote: "reject", comment: "Persuasion capability exceeds our threshold; needs more mitigation" },
      { memberId: "bm5", vote: "abstain", comment: "Need to see updated regulatory analysis first" },
    ],
    discussion: [
      { memberId: "bm4", memberName: "Dr. Raj Patel", message: "The persuasion metrics are concerning. We should not deploy until we have a proven mitigation for the manipulation detection threshold breach.", timestamp: "2026-03-15T10:00:00" },
      { memberId: "bm1", memberName: "Dr. Sarah Chen", message: "The limited deployment scope addresses this. Only 100 vetted researchers will have access initially.", timestamp: "2026-03-15T10:30:00" },
      { memberId: "bm2", memberName: "Prof. James Miller", message: "I've reviewed the cyber eval. The model cannot independently discover zero-days. Recommend approval with monitoring.", timestamp: "2026-03-15T11:00:00" },
    ],
  },
  {
    id: "prop2",
    title: "Increase Red Team Frequency for Autonomy Testing",
    description: "Proposal to increase autonomous capability testing from monthly to weekly cadence, given recent capability jumps observed in multi-step planning benchmarks.",
    category: "Policy Change",
    status: "approved",
    submittedBy: "Red Team Alpha",
    submittedAt: "2026-03-10",
    votes: [
      { memberId: "bm1", vote: "approve", comment: "Prudent given trajectory" },
      { memberId: "bm2", vote: "approve", comment: "Agree" },
      { memberId: "bm3", vote: "approve", comment: "Approve" },
      { memberId: "bm4", vote: "approve", comment: "Overdue" },
      { memberId: "bm5", vote: "approve", comment: "Fully support" },
    ],
    discussion: [],
  },
  {
    id: "prop3",
    title: "Emergency Pause: Bio Screening Filter Bypass",
    description: "A new technique was discovered that bypasses our biosecurity screening filter using encoded language. Requesting emergency deployment pause until patch is verified.",
    category: "Emergency Action",
    status: "under_review",
    submittedBy: "Bio Safety Group",
    submittedAt: "2026-03-16",
    votes: [],
    discussion: [
      { memberId: "bm3", memberName: "Dr. Amara Okafor", message: "This is a P0 issue. The bypass works in 3 of 5 tested scenarios. Recommend immediate pause.", timestamp: "2026-03-16T08:00:00" },
      { memberId: "bm1", memberName: "Dr. Sarah Chen", message: "Scheduling emergency vote for today. All members please review the attached evidence.", timestamp: "2026-03-16T08:30:00" },
    ],
  },
];

const statusColors: Record<string, string> = {
  draft: "badge-yellow",
  under_review: "badge-blue",
  voting: "badge-purple",
  approved: "badge-green",
  rejected: "badge-red",
};

export default function SafetyBoard() {
  const [selectedProposal, setSelectedProposal] = useState<string>(proposals[0].id);
  const [newComment, setNewComment] = useState("");
  const proposal = proposals.find((p) => p.id === selectedProposal)!;

  const approveCount = proposal.votes.filter((v) => v.vote === "approve").length;
  const rejectCount = proposal.votes.filter((v) => v.vote === "reject").length;
  const abstainCount = proposal.votes.filter((v) => v.vote === "abstain").length;

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white">Safety Board Simulator</h1>
          <p className="text-gray-400 mt-1">Simulate safety governance board decisions and voting</p>
        </div>

        {/* Board Members */}
        <div className="flex gap-3 mb-8 overflow-x-auto pb-2">
          {boardMembers.map((member) => (
            <div key={member.id} className="card flex-shrink-0 w-48">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-red-600/30 flex items-center justify-center text-red-400 font-bold text-sm">
                  {member.avatar}
                </div>
                <div>
                  <p className="text-sm font-medium text-white">{member.name}</p>
                  <p className="text-xs text-gray-500">{member.role}</p>
                </div>
              </div>
              <p className="text-xs text-gray-400">{member.expertise}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* Proposal List */}
          <div className="space-y-3">
            {proposals.map((p) => (
              <button
                key={p.id}
                onClick={() => setSelectedProposal(p.id)}
                className={`w-full text-left p-4 rounded-xl border transition-colors ${
                  p.id === selectedProposal ? "bg-red-600/20 border-red-500/50" : "bg-gray-900 border-gray-800 hover:border-gray-700"
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className={statusColors[p.status]}>{p.status.replace("_", " ")}</span>
                  <span className="text-xs text-gray-600">{p.category}</span>
                </div>
                <p className="text-sm font-medium text-white">{p.title}</p>
                <p className="text-xs text-gray-500 mt-1">{p.submittedAt}</p>
              </button>
            ))}
          </div>

          {/* Proposal Detail */}
          <div className="col-span-2 space-y-6">
            <div className="card">
              <div className="flex items-center gap-2 mb-2">
                <span className={statusColors[proposal.status]}>{proposal.status.replace("_", " ")}</span>
                <span className="text-xs text-gray-500">{proposal.category}</span>
              </div>
              <h2 className="text-xl font-bold text-white mb-2">{proposal.title}</h2>
              <p className="text-sm text-gray-300 mb-4">{proposal.description}</p>
              <div className="flex gap-4 text-xs text-gray-500">
                <span>Submitted by: {proposal.submittedBy}</span>
                <span>Date: {proposal.submittedAt}</span>
              </div>
            </div>

            {/* Voting */}
            {proposal.votes.length > 0 && (
              <div className="card">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <Gavel className="w-5 h-5" /> Votes
                </h3>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="bg-green-900/20 rounded-lg p-3 text-center">
                    <ThumbsUp className="w-5 h-5 text-green-400 mx-auto mb-1" />
                    <p className="text-2xl font-bold text-green-400">{approveCount}</p>
                    <p className="text-xs text-gray-500">Approve</p>
                  </div>
                  <div className="bg-red-900/20 rounded-lg p-3 text-center">
                    <ThumbsDown className="w-5 h-5 text-red-400 mx-auto mb-1" />
                    <p className="text-2xl font-bold text-red-400">{rejectCount}</p>
                    <p className="text-xs text-gray-500">Reject</p>
                  </div>
                  <div className="bg-gray-800 rounded-lg p-3 text-center">
                    <p className="text-2xl font-bold text-gray-400">{abstainCount}</p>
                    <p className="text-xs text-gray-500">Abstain</p>
                  </div>
                </div>
                <div className="space-y-2">
                  {proposal.votes.map((vote) => {
                    const member = boardMembers.find((m) => m.id === vote.memberId)!;
                    return (
                      <div key={vote.memberId} className="flex items-center gap-3 p-2 bg-gray-800 rounded-lg">
                        <div className="w-8 h-8 rounded-full bg-red-600/30 flex items-center justify-center text-red-400 text-xs font-bold">
                          {member.avatar}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-white">{member.name}</p>
                          <p className="text-xs text-gray-400">{vote.comment}</p>
                        </div>
                        <span className={
                          vote.vote === "approve" ? "badge-green" :
                          vote.vote === "reject" ? "badge-red" : "bg-gray-700 text-gray-400 badge"
                        }>
                          {vote.vote}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Discussion */}
            {proposal.discussion.length > 0 && (
              <div className="card">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" /> Discussion
                </h3>
                <div className="space-y-4">
                  {proposal.discussion.map((msg, i) => (
                    <div key={i} className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-red-600/30 flex items-center justify-center text-red-400 text-xs font-bold flex-shrink-0">
                        {boardMembers.find((m) => m.id === msg.memberId)?.avatar}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-medium text-white">{msg.memberName}</span>
                          <span className="text-xs text-gray-600">{new Date(msg.timestamp).toLocaleString()}</span>
                        </div>
                        <p className="text-sm text-gray-300">{msg.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex gap-2">
                  <input
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add to discussion..."
                    className="input-field flex-1"
                  />
                  <button className="btn-primary">Send</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
