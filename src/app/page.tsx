"use client";

import Sidebar from "@/components/Sidebar";
import { AlertOctagon, TrendingUp, TrendingDown, Shield, Cpu, Activity } from "lucide-react";
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  BarChart, Bar,
} from "recharts";

const riskOverview = [
  { domain: "Cyber", level: 68, trend: "increasing", color: "#3b82f6" },
  { domain: "Biological", level: 45, trend: "stable", color: "#22c55e" },
  { domain: "CBRN", level: 32, trend: "decreasing", color: "#8b5cf6" },
  { domain: "Autonomy", level: 55, trend: "increasing", color: "#f97316" },
  { domain: "Persuasion", level: 72, trend: "increasing", color: "#ef4444" },
  { domain: "Societal", level: 60, trend: "stable", color: "#eab308" },
];

const radarData = riskOverview.map((r) => ({ domain: r.domain, risk: r.level }));

const trendData = [
  { month: "Oct", cyber: 55, bio: 42, cbrn: 35, autonomy: 40, persuasion: 58, societal: 52 },
  { month: "Nov", cyber: 58, bio: 43, cbrn: 34, autonomy: 45, persuasion: 62, societal: 55 },
  { month: "Dec", cyber: 62, bio: 44, cbrn: 33, autonomy: 48, persuasion: 65, societal: 57 },
  { month: "Jan", cyber: 64, bio: 44, cbrn: 33, autonomy: 50, persuasion: 68, societal: 58 },
  { month: "Feb", cyber: 66, bio: 45, cbrn: 32, autonomy: 53, persuasion: 70, societal: 59 },
  { month: "Mar", cyber: 68, bio: 45, cbrn: 32, autonomy: 55, persuasion: 72, societal: 60 },
];

const modelRisks = [
  { model: "GPT-4o", cyber: 72, bio: 48, autonomy: 60 },
  { model: "Claude 3.5", cyber: 55, bio: 35, autonomy: 45 },
  { model: "Llama 3", cyber: 45, bio: 30, autonomy: 35 },
  { model: "Gemini", cyber: 65, bio: 42, autonomy: 52 },
];

const recentEvals = [
  { model: "GPT-4o", category: "Cyber Offense", level: "high", date: "2026-03-16" },
  { model: "Claude 3.5 Sonnet", category: "Persuasion", level: "medium", date: "2026-03-15" },
  { model: "Llama 3 70B", category: "Bioweapons Info", level: "low", date: "2026-03-14" },
  { model: "GPT-4o", category: "Autonomous Replication", level: "medium", date: "2026-03-13" },
  { model: "Gemini Pro", category: "CBRN Uplift", level: "low", date: "2026-03-12" },
];

const levelColors: Record<string, string> = { none: "badge-green", low: "badge-green", medium: "badge-yellow", high: "badge-orange", critical: "badge-red" };

export default function Dashboard() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white">Risk Dashboard</h1>
          <p className="text-gray-400 mt-1">AI catastrophic risk assessment overview</p>
        </div>

        {/* Risk Domain Cards */}
        <div className="grid grid-cols-6 gap-3 mb-8">
          {riskOverview.map((r) => (
            <div key={r.domain} className="card text-center">
              <p className="text-xs text-gray-500 mb-1">{r.domain}</p>
              <p className="text-2xl font-bold" style={{ color: r.color }}>{r.level}</p>
              <div className="flex items-center justify-center gap-1 mt-1">
                {r.trend === "increasing" ? (
                  <TrendingUp className="w-3 h-3 text-red-400" />
                ) : r.trend === "decreasing" ? (
                  <TrendingDown className="w-3 h-3 text-green-400" />
                ) : (
                  <Activity className="w-3 h-3 text-gray-500" />
                )}
                <span className="text-xs text-gray-500">{r.trend}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-6 mb-8">
          {/* Radar */}
          <div className="card">
            <h3 className="text-lg font-semibold text-white mb-4">Risk Profile</h3>
            <ResponsiveContainer width="100%" height={280}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="#374151" />
                <PolarAngleAxis dataKey="domain" tick={{ fill: "#9ca3af", fontSize: 12 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: "#6b7280" }} />
                <Radar name="Risk Level" dataKey="risk" stroke="#ef4444" fill="#ef4444" fillOpacity={0.3} />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* Trend */}
          <div className="card">
            <h3 className="text-lg font-semibold text-white mb-4">Risk Trends</h3>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="month" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" domain={[0, 100]} />
                <Tooltip contentStyle={{ backgroundColor: "#1f2937", border: "1px solid #374151", borderRadius: "8px" }} />
                <Line type="monotone" dataKey="cyber" stroke="#3b82f6" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="bio" stroke="#22c55e" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="persuasion" stroke="#ef4444" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="autonomy" stroke="#f97316" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* Model Comparison */}
          <div className="card col-span-2">
            <h3 className="text-lg font-semibold text-white mb-4">Model Risk Comparison</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={modelRisks}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="model" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" domain={[0, 100]} />
                <Tooltip contentStyle={{ backgroundColor: "#1f2937", border: "1px solid #374151", borderRadius: "8px" }} />
                <Bar dataKey="cyber" fill="#3b82f6" name="Cyber" radius={[2, 2, 0, 0]} />
                <Bar dataKey="bio" fill="#22c55e" name="Bio" radius={[2, 2, 0, 0]} />
                <Bar dataKey="autonomy" fill="#f97316" name="Autonomy" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Recent Evals */}
          <div className="card">
            <h3 className="text-lg font-semibold text-white mb-4">Recent Evaluations</h3>
            <div className="space-y-3">
              {recentEvals.map((ev, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-gray-800 last:border-0">
                  <div>
                    <p className="text-sm text-white">{ev.model}</p>
                    <p className="text-xs text-gray-500">{ev.category}</p>
                  </div>
                  <div className="text-right">
                    <span className={levelColors[ev.level]}>{ev.level}</span>
                    <p className="text-xs text-gray-600 mt-1">{ev.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
