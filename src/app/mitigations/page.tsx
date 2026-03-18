"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import { Plus, CheckCircle, Clock, ArrowRight, AlertTriangle } from "lucide-react";

interface Mitigation {
  id: string;
  title: string;
  description: string;
  riskCategory: string;
  targetRisk: string;
  status: "planned" | "in_progress" | "implemented" | "verified";
  effectiveness: number | null;
  owner: string;
  priority: "critical" | "high" | "medium" | "low";
  dueDate: string;
  steps: { step: string; done: boolean }[];
}

const mitigations: Mitigation[] = [
  {
    id: "m1", title: "Deploy Manipulation Detection Layer", description: "Real-time detection system for persuasion and manipulation attempts in model outputs",
    riskCategory: "Persuasion", targetRisk: "Mass Manipulation", status: "in_progress", effectiveness: null,
    owner: "AI Safety Team", priority: "critical", dueDate: "2026-04-01",
    steps: [
      { step: "Design detection heuristics", done: true },
      { step: "Train classifier on manipulation patterns", done: true },
      { step: "Integrate with output pipeline", done: false },
      { step: "A/B test effectiveness", done: false },
      { step: "Full deployment", done: false },
    ],
  },
  {
    id: "m2", title: "Biosecurity Screening Filter", description: "Domain-specific content filter for biological weapons-related queries and outputs",
    riskCategory: "Bio", targetRisk: "Bioweapon Synthesis", status: "implemented", effectiveness: 92,
    owner: "Bio Safety Group", priority: "critical", dueDate: "2026-03-15",
    steps: [
      { step: "Compile dangerous pathogen database", done: true },
      { step: "Build query pattern matcher", done: true },
      { step: "Implement output sanitizer", done: true },
      { step: "Red team testing", done: true },
      { step: "Deploy to production", done: true },
    ],
  },
  {
    id: "m3", title: "Code Execution Sandbox Enhancement", description: "Improved sandboxing for AI-generated code to prevent malicious execution",
    riskCategory: "Cyber", targetRisk: "Malware Generation", status: "in_progress", effectiveness: null,
    owner: "Security Engineering", priority: "high", dueDate: "2026-04-15",
    steps: [
      { step: "Audit current sandbox capabilities", done: true },
      { step: "Implement syscall filtering", done: true },
      { step: "Add network isolation", done: false },
      { step: "Pen test new sandbox", done: false },
    ],
  },
  {
    id: "m4", title: "Human-in-the-Loop for Autonomous Actions", description: "Mandatory human approval for any autonomous resource acquisition or multi-step planning",
    riskCategory: "Autonomy", targetRisk: "Autonomous Resource Acquisition", status: "verified", effectiveness: 98,
    owner: "Alignment Team", priority: "high", dueDate: "2026-03-01",
    steps: [
      { step: "Define action categories requiring approval", done: true },
      { step: "Build approval workflow", done: true },
      { step: "Implement hard constraints", done: true },
      { step: "Verify with red team", done: true },
    ],
  },
  {
    id: "m5", title: "Debiasing Training Pipeline", description: "Systematic debiasing of training data and fine-tuning process",
    riskCategory: "Societal", targetRisk: "Bias Amplification", status: "planned", effectiveness: null,
    owner: "Fairness Team", priority: "medium", dueDate: "2026-05-01",
    steps: [
      { step: "Audit training data for bias", done: false },
      { step: "Develop debiasing transforms", done: false },
      { step: "Retrain affected models", done: false },
      { step: "Evaluate effectiveness", done: false },
    ],
  },
];

const statusColors: Record<string, string> = { planned: "badge-yellow", in_progress: "badge-blue", implemented: "badge-green", verified: "badge-green" };
const priorityColors: Record<string, string> = { critical: "badge-red", high: "badge-orange", medium: "badge-yellow", low: "badge-green" };

export default function Mitigations() {
  const [selected, setSelected] = useState<string>(mitigations[0].id);
  const [filterStatus, setFilterStatus] = useState("all");
  const m = mitigations.find((x) => x.id === selected)!;

  const filtered = filterStatus === "all" ? mitigations : mitigations.filter((x) => x.status === filterStatus);

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white">Mitigation Planner</h1>
            <p className="text-gray-400 mt-1">Plan and track risk mitigation measures</p>
          </div>
          <button className="btn-primary flex items-center gap-2">
            <Plus className="w-4 h-4" /> Add Mitigation
          </button>
        </div>

        {/* Status Pipeline */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          {["planned", "in_progress", "implemented", "verified"].map((status) => {
            const count = mitigations.filter((x) => x.status === status).length;
            const label = status.replace("_", " ").replace(/^\w/, (c) => c.toUpperCase());
            return (
              <button
                key={status}
                onClick={() => setFilterStatus(filterStatus === status ? "all" : status)}
                className={`card text-center transition-colors ${filterStatus === status ? "ring-2 ring-red-500" : ""}`}
              >
                <p className="text-2xl font-bold text-white">{count}</p>
                <p className="text-xs text-gray-500">{label}</p>
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* List */}
          <div className="space-y-3">
            {filtered.map((item) => (
              <button
                key={item.id}
                onClick={() => setSelected(item.id)}
                className={`w-full text-left p-4 rounded-xl border transition-colors ${
                  item.id === selected ? "bg-red-600/20 border-red-500/50" : "bg-gray-900 border-gray-800 hover:border-gray-700"
                }`}
              >
                <p className="text-sm font-medium text-white">{item.title}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className={priorityColors[item.priority]}>{item.priority}</span>
                  <span className={statusColors[item.status]}>{item.status.replace("_", " ")}</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">{item.riskCategory} &middot; {item.owner}</p>
              </button>
            ))}
          </div>

          {/* Detail */}
          <div className="col-span-2 space-y-6">
            <div className="card">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-white">{m.title}</h2>
                <div className="flex gap-2">
                  <span className={priorityColors[m.priority]}>{m.priority}</span>
                  <span className={statusColors[m.status]}>{m.status.replace("_", " ")}</span>
                </div>
              </div>
              <p className="text-sm text-gray-300 mb-4">{m.description}</p>
              <div className="grid grid-cols-4 gap-4 text-sm">
                <div><p className="text-gray-500">Risk Category</p><p className="text-white">{m.riskCategory}</p></div>
                <div><p className="text-gray-500">Target Risk</p><p className="text-white">{m.targetRisk}</p></div>
                <div><p className="text-gray-500">Owner</p><p className="text-white">{m.owner}</p></div>
                <div><p className="text-gray-500">Due Date</p><p className="text-white">{m.dueDate}</p></div>
              </div>
            </div>

            {/* Steps */}
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-4">Implementation Steps</h3>
              <div className="space-y-3">
                {m.steps.map((step, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    {step.done ? (
                      <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    ) : (
                      <div className="w-5 h-5 rounded-full border-2 border-gray-600 flex-shrink-0" />
                    )}
                    <span className={`text-sm ${step.done ? "text-gray-400 line-through" : "text-gray-200"}`}>
                      {step.step}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-gray-800">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">Progress</span>
                  <span className="text-xs text-gray-400">
                    {m.steps.filter((s) => s.done).length}/{m.steps.length} complete
                  </span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2 mt-1">
                  <div
                    className="h-2 rounded-full bg-green-500"
                    style={{ width: `${(m.steps.filter((s) => s.done).length / m.steps.length) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            {m.effectiveness !== null && (
              <div className="card text-center">
                <p className="text-xs text-gray-500 mb-1">Measured Effectiveness</p>
                <p className={`text-4xl font-bold ${m.effectiveness >= 90 ? "text-green-400" : m.effectiveness >= 70 ? "text-yellow-400" : "text-red-400"}`}>
                  {m.effectiveness}%
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
