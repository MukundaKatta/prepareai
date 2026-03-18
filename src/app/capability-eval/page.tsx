"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import { Plus, Play, Cpu } from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

interface Evaluation {
  id: string;
  model: string;
  category: string;
  level: "none" | "low" | "medium" | "high" | "critical";
  evidence: string;
  evaluatedAt: string;
  evaluator: string;
  tasks: { name: string; score: number; maxScore: number }[];
}

const evaluations: Evaluation[] = [
  {
    id: "e1", model: "GPT-4o", category: "Cyber Offense", level: "high",
    evidence: "Demonstrated ability to identify common vulnerabilities and suggest exploit approaches. Could not independently discover novel zero-days.",
    evaluatedAt: "2026-03-16", evaluator: "Red Team Alpha",
    tasks: [
      { name: "Vuln Identification", score: 82, maxScore: 100 },
      { name: "Exploit Suggestion", score: 75, maxScore: 100 },
      { name: "Novel Zero-Day", score: 15, maxScore: 100 },
      { name: "Lateral Movement", score: 45, maxScore: 100 },
    ],
  },
  {
    id: "e2", model: "GPT-4o", category: "Biological Risk", level: "medium",
    evidence: "Can discuss biological concepts at graduate level but does not provide actionable synthesis routes for dangerous pathogens.",
    evaluatedAt: "2026-03-15", evaluator: "Bio Safety Team",
    tasks: [
      { name: "Pathogen Knowledge", score: 70, maxScore: 100 },
      { name: "Synthesis Routes", score: 20, maxScore: 100 },
      { name: "Enhancement Methods", score: 15, maxScore: 100 },
      { name: "Dual-Use Awareness", score: 85, maxScore: 100 },
    ],
  },
  {
    id: "e3", model: "Claude 3.5 Sonnet", category: "Persuasion", level: "medium",
    evidence: "Capable of generating persuasive text but consistently refuses to engage in manipulation tactics.",
    evaluatedAt: "2026-03-14", evaluator: "Influence Ops Team",
    tasks: [
      { name: "Persuasive Writing", score: 88, maxScore: 100 },
      { name: "Targeted Messaging", score: 55, maxScore: 100 },
      { name: "Manipulation Resistance", score: 92, maxScore: 100 },
      { name: "Disinformation Gen", score: 12, maxScore: 100 },
    ],
  },
  {
    id: "e4", model: "GPT-4o", category: "Autonomy", level: "medium",
    evidence: "Can plan multi-step tasks but lacks ability to acquire resources or replicate independently.",
    evaluatedAt: "2026-03-13", evaluator: "Alignment Team",
    tasks: [
      { name: "Multi-Step Planning", score: 78, maxScore: 100 },
      { name: "Resource Acquisition", score: 8, maxScore: 100 },
      { name: "Self-Replication", score: 3, maxScore: 100 },
      { name: "Goal Persistence", score: 35, maxScore: 100 },
    ],
  },
];

const levelColors: Record<string, string> = { none: "badge-green", low: "badge-green", medium: "badge-yellow", high: "badge-orange", critical: "badge-red" };
const levelBg: Record<string, string> = { none: "bg-green-500", low: "bg-green-500", medium: "bg-yellow-500", high: "bg-orange-500", critical: "bg-red-500" };

export default function CapabilityEval() {
  const [selected, setSelected] = useState<string>(evaluations[0].id);
  const eval_ = evaluations.find((e) => e.id === selected)!;

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white">Capability Evaluation</h1>
            <p className="text-gray-400 mt-1">Assess dangerous capabilities of AI models</p>
          </div>
          <button className="btn-primary flex items-center gap-2">
            <Plus className="w-4 h-4" /> New Evaluation
          </button>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* Eval List */}
          <div className="space-y-3">
            {evaluations.map((e) => (
              <button
                key={e.id}
                onClick={() => setSelected(e.id)}
                className={`w-full text-left p-4 rounded-xl border transition-colors ${
                  e.id === selected ? "bg-red-600/20 border-red-500/50" : "bg-gray-900 border-gray-800 hover:border-gray-700"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-white">{e.model}</span>
                  <span className={levelColors[e.level]}>{e.level}</span>
                </div>
                <p className="text-xs text-gray-500">{e.category}</p>
                <p className="text-xs text-gray-600 mt-1">{e.evaluatedAt} by {e.evaluator}</p>
              </button>
            ))}
          </div>

          {/* Detail */}
          <div className="col-span-2 space-y-6">
            <div className="card">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl font-bold text-white">{eval_.model} - {eval_.category}</h2>
                  <p className="text-sm text-gray-400 mt-1">Evaluated {eval_.evaluatedAt} by {eval_.evaluator}</p>
                </div>
                <span className={`${levelColors[eval_.level]} text-base px-3 py-1`}>{eval_.level}</span>
              </div>
              <p className="text-sm text-gray-300 bg-gray-800 rounded-lg p-4">{eval_.evidence}</p>
            </div>

            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-4">Task Performance</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={eval_.tasks} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis type="number" domain={[0, 100]} stroke="#9ca3af" />
                  <YAxis type="category" dataKey="name" stroke="#9ca3af" width={140} tick={{ fontSize: 12 }} />
                  <Tooltip contentStyle={{ backgroundColor: "#1f2937", border: "1px solid #374151", borderRadius: "8px" }} />
                  <Bar dataKey="score" fill="#ef4444" radius={[0, 4, 4, 0]} name="Score" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-4">Capability Scores</h3>
              <div className="space-y-3">
                {eval_.tasks.map((task) => (
                  <div key={task.name}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-gray-300">{task.name}</span>
                      <span className={`text-sm font-bold ${
                        task.score >= 70 ? "text-red-400" : task.score >= 40 ? "text-yellow-400" : "text-green-400"
                      }`}>
                        {task.score}/{task.maxScore}
                      </span>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          task.score >= 70 ? "bg-red-500" : task.score >= 40 ? "bg-yellow-500" : "bg-green-500"
                        }`}
                        style={{ width: `${task.score}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
