"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";

interface RiskItem {
  id: string;
  name: string;
  likelihood: number; // 1-5
  impact: number; // 1-5
  category: string;
  description: string;
  mitigations: string[];
}

const riskItems: RiskItem[] = [
  { id: "r1", name: "Novel cyberattack generation", likelihood: 3, impact: 5, category: "Cyber", description: "AI generates novel attack vectors for critical infrastructure", mitigations: ["Output filtering", "Code execution sandboxing"] },
  { id: "r2", name: "Bioweapon synthesis guidance", likelihood: 2, impact: 5, category: "Bio", description: "AI provides actionable instructions for bioweapon creation", mitigations: ["Domain-specific filters", "Expert review gates"] },
  { id: "r3", name: "Mass disinformation campaigns", likelihood: 4, impact: 4, category: "Persuasion", description: "AI-generated disinformation at scale across platforms", mitigations: ["Watermarking", "Content provenance"] },
  { id: "r4", name: "Autonomous resource acquisition", likelihood: 2, impact: 5, category: "Autonomy", description: "AI independently acquires compute or financial resources", mitigations: ["Action boundaries", "Human-in-the-loop"] },
  { id: "r5", name: "Election manipulation", likelihood: 3, impact: 5, category: "Persuasion", description: "Targeted voter manipulation using AI-generated content", mitigations: ["Platform detection", "Voter education"] },
  { id: "r6", name: "PII extraction at scale", likelihood: 4, impact: 3, category: "Cyber", description: "Mass extraction of personal information through AI prompting", mitigations: ["PII detection", "Training data filtering"] },
  { id: "r7", name: "Chemical weapon precursor ID", likelihood: 2, impact: 4, category: "CBRN", description: "AI identifies accessible precursors for chemical weapons", mitigations: ["Chemistry domain filters", "Query monitoring"] },
  { id: "r8", name: "Deepfake impersonation", likelihood: 4, impact: 3, category: "Persuasion", description: "Realistic deepfakes of public figures for manipulation", mitigations: ["Deepfake detection", "Digital signatures"] },
  { id: "r9", name: "Workforce displacement shock", likelihood: 4, impact: 4, category: "Societal", description: "Rapid AI-driven job displacement without transition support", mitigations: ["Gradual deployment", "Reskilling programs"] },
  { id: "r10", name: "Self-replication attempt", likelihood: 1, impact: 5, category: "Autonomy", description: "AI system attempts to copy itself to other infrastructure", mitigations: ["Containment protocols", "Network isolation"] },
  { id: "r11", name: "Nuclear enrichment guidance", likelihood: 1, impact: 5, category: "CBRN", description: "Detailed nuclear material enrichment instructions", mitigations: ["Hard-coded refusals", "Nuclear domain filters"] },
  { id: "r12", name: "Radicalization pipeline", likelihood: 3, impact: 4, category: "Persuasion", description: "Systematic radicalization through personalized content", mitigations: ["Content monitoring", "User behavior analysis"] },
];

const likelihoodLabels = ["", "Very Unlikely", "Unlikely", "Possible", "Likely", "Very Likely"];
const impactLabels = ["", "Negligible", "Minor", "Moderate", "Major", "Catastrophic"];
const categoryColors: Record<string, string> = {
  Cyber: "#3b82f6",
  Bio: "#22c55e",
  CBRN: "#8b5cf6",
  Autonomy: "#f97316",
  Persuasion: "#ef4444",
  Societal: "#eab308",
};

export default function RiskMatrix() {
  const [selectedRisk, setSelectedRisk] = useState<RiskItem | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>("all");

  const filtered = filterCategory === "all" ? riskItems : riskItems.filter((r) => r.category === filterCategory);

  const getCellColor = (l: number, i: number) => {
    const score = l * i;
    if (score >= 15) return "bg-red-900/60";
    if (score >= 10) return "bg-orange-900/60";
    if (score >= 5) return "bg-yellow-900/60";
    return "bg-green-900/60";
  };

  const getRisksInCell = (l: number, i: number) => filtered.filter((r) => r.likelihood === l && r.impact === i);

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white">Risk Matrix</h1>
            <p className="text-gray-400 mt-1">Likelihood vs Impact assessment of AI risks</p>
          </div>
          <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)} className="input-field">
            <option value="all">All Categories</option>
            {Object.keys(categoryColors).map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* Matrix */}
          <div className="col-span-2 card">
            <div className="flex">
              <div className="flex flex-col justify-center items-center mr-2">
                <span className="text-xs text-gray-500 -rotate-90 whitespace-nowrap">LIKELIHOOD</span>
              </div>
              <div className="flex-1">
                <div className="grid grid-cols-5 gap-1">
                  {[5, 4, 3, 2, 1].map((likelihood) =>
                    [1, 2, 3, 4, 5].map((impact) => {
                      const risks = getRisksInCell(likelihood, impact);
                      return (
                        <div
                          key={`${likelihood}-${impact}`}
                          className={`${getCellColor(likelihood, impact)} rounded-lg p-2 min-h-[80px] cursor-pointer hover:ring-1 hover:ring-gray-600 transition-all`}
                          onClick={() => risks.length > 0 && setSelectedRisk(risks[0])}
                        >
                          <div className="flex flex-wrap gap-1">
                            {risks.map((r) => (
                              <div
                                key={r.id}
                                className="w-6 h-6 rounded-full flex items-center justify-center text-[8px] font-bold text-white cursor-pointer"
                                style={{ backgroundColor: categoryColors[r.category] }}
                                title={r.name}
                                onClick={(e) => { e.stopPropagation(); setSelectedRisk(r); }}
                              >
                                {r.id.replace("r", "")}
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
                <div className="flex justify-between mt-2 px-1">
                  {impactLabels.slice(1).map((label) => (
                    <span key={label} className="text-xs text-gray-500">{label}</span>
                  ))}
                </div>
                <p className="text-xs text-gray-500 text-center mt-1">IMPACT</p>
              </div>
              <div className="flex flex-col justify-between ml-2 py-1">
                {likelihoodLabels.slice(1).reverse().map((label) => (
                  <span key={label} className="text-xs text-gray-500 text-right">{label}</span>
                ))}
              </div>
            </div>

            {/* Legend */}
            <div className="flex gap-4 mt-6 pt-4 border-t border-gray-800">
              {Object.entries(categoryColors).map(([cat, color]) => (
                <div key={cat} className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
                  <span className="text-xs text-gray-400">{cat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Risk Detail */}
          <div className="card">
            {selectedRisk ? (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white" style={{ backgroundColor: categoryColors[selectedRisk.category] }}>
                    {selectedRisk.id.replace("r", "")}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">{selectedRisk.name}</h3>
                    <span className="text-xs text-gray-500">{selectedRisk.category}</span>
                  </div>
                </div>
                <p className="text-sm text-gray-300 mb-4">{selectedRisk.description}</p>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-gray-800 rounded-lg p-3">
                    <p className="text-xs text-gray-500">Likelihood</p>
                    <p className="text-lg font-bold text-white">{selectedRisk.likelihood}/5</p>
                    <p className="text-xs text-gray-400">{likelihoodLabels[selectedRisk.likelihood]}</p>
                  </div>
                  <div className="bg-gray-800 rounded-lg p-3">
                    <p className="text-xs text-gray-500">Impact</p>
                    <p className="text-lg font-bold text-white">{selectedRisk.impact}/5</p>
                    <p className="text-xs text-gray-400">{impactLabels[selectedRisk.impact]}</p>
                  </div>
                </div>
                <div className="bg-gray-800 rounded-lg p-3 mb-4">
                  <p className="text-xs text-gray-500 mb-1">Risk Score</p>
                  <p className="text-2xl font-bold text-red-400">{selectedRisk.likelihood * selectedRisk.impact}/25</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-2">Mitigations</p>
                  <div className="space-y-1">
                    {selectedRisk.mitigations.map((m, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-gray-300">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                        {m}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-gray-500 text-center py-12">Click a risk on the matrix to see details</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
