"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import { AlertTriangle, TrendingUp, TrendingDown, Activity, Bell } from "lucide-react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine } from "recharts";

interface Threshold {
  id: string;
  category: string;
  metric: string;
  current: number;
  threshold: number;
  trend: "increasing" | "stable" | "decreasing";
  history: { date: string; value: number }[];
  breached: boolean;
  lastUpdated: string;
}

const thresholds: Threshold[] = [
  {
    id: "th1", category: "Cyber", metric: "Autonomous Exploit Success Rate", current: 12, threshold: 20,
    trend: "increasing", breached: false, lastUpdated: "2026-03-16",
    history: [
      { date: "Dec", value: 5 }, { date: "Jan", value: 7 }, { date: "Feb", value: 9 }, { date: "Mar", value: 12 },
    ],
  },
  {
    id: "th2", category: "Bio", metric: "Pathogen Knowledge Score", current: 35, threshold: 50,
    trend: "stable", breached: false, lastUpdated: "2026-03-15",
    history: [
      { date: "Dec", value: 32 }, { date: "Jan", value: 33 }, { date: "Feb", value: 34 }, { date: "Mar", value: 35 },
    ],
  },
  {
    id: "th3", category: "Persuasion", metric: "Manipulation Effectiveness Index", current: 72, threshold: 70,
    trend: "increasing", breached: true, lastUpdated: "2026-03-16",
    history: [
      { date: "Dec", value: 58 }, { date: "Jan", value: 63 }, { date: "Feb", value: 68 }, { date: "Mar", value: 72 },
    ],
  },
  {
    id: "th4", category: "Autonomy", metric: "Self-Directed Task Completion", current: 8, threshold: 30,
    trend: "increasing", breached: false, lastUpdated: "2026-03-14",
    history: [
      { date: "Dec", value: 3 }, { date: "Jan", value: 5 }, { date: "Feb", value: 6 }, { date: "Mar", value: 8 },
    ],
  },
  {
    id: "th5", category: "CBRN", metric: "Weapons Knowledge Uplift Score", current: 18, threshold: 25,
    trend: "decreasing", breached: false, lastUpdated: "2026-03-13",
    history: [
      { date: "Dec", value: 22 }, { date: "Jan", value: 21 }, { date: "Feb", value: 19 }, { date: "Mar", value: 18 },
    ],
  },
  {
    id: "th6", category: "Societal", metric: "Bias Amplification Index", current: 45, threshold: 40,
    trend: "stable", breached: true, lastUpdated: "2026-03-16",
    history: [
      { date: "Dec", value: 42 }, { date: "Jan", value: 44 }, { date: "Feb", value: 44 }, { date: "Mar", value: 45 },
    ],
  },
];

export default function Thresholds() {
  const [selected, setSelected] = useState<string>(thresholds[0].id);
  const th = thresholds.find((t) => t.id === selected)!;

  const breachedCount = thresholds.filter((t) => t.breached).length;
  const nearBreachCount = thresholds.filter((t) => !t.breached && t.current / t.threshold > 0.8).length;

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white">Threshold Tracker</h1>
            <p className="text-gray-400 mt-1">Monitor risk capability thresholds and breaches</p>
          </div>
          {breachedCount > 0 && (
            <div className="flex items-center gap-2 bg-red-900/30 border border-red-800 rounded-lg px-4 py-2">
              <Bell className="w-4 h-4 text-red-400" />
              <span className="text-sm text-red-400 font-medium">{breachedCount} threshold(s) breached</span>
            </div>
          )}
        </div>

        {/* Summary */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="card text-center">
            <p className="text-3xl font-bold text-white">{thresholds.length}</p>
            <p className="text-xs text-gray-500">Total Thresholds</p>
          </div>
          <div className="card text-center">
            <p className="text-3xl font-bold text-red-400">{breachedCount}</p>
            <p className="text-xs text-gray-500">Breached</p>
          </div>
          <div className="card text-center">
            <p className="text-3xl font-bold text-yellow-400">{nearBreachCount}</p>
            <p className="text-xs text-gray-500">Near Breach (&gt;80%)</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* Threshold List */}
          <div className="space-y-3">
            {thresholds.map((t) => {
              const pct = Math.round((t.current / t.threshold) * 100);
              return (
                <button
                  key={t.id}
                  onClick={() => setSelected(t.id)}
                  className={`w-full text-left p-4 rounded-xl border transition-colors ${
                    t.id === selected ? "bg-red-600/20 border-red-500/50" :
                    t.breached ? "bg-red-900/20 border-red-800/50" :
                    "bg-gray-900 border-gray-800 hover:border-gray-700"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-white">{t.metric}</span>
                    {t.breached && <AlertTriangle className="w-4 h-4 text-red-400" />}
                  </div>
                  <p className="text-xs text-gray-500 mb-2">{t.category}</p>
                  <div className="w-full bg-gray-800 rounded-full h-2 mb-1">
                    <div
                      className={`h-2 rounded-full ${t.breached ? "bg-red-500" : pct > 80 ? "bg-yellow-500" : "bg-green-500"}`}
                      style={{ width: `${Math.min(pct, 100)}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">{t.current} / {t.threshold}</span>
                    <div className="flex items-center gap-1">
                      {t.trend === "increasing" ? <TrendingUp className="w-3 h-3 text-red-400" /> :
                       t.trend === "decreasing" ? <TrendingDown className="w-3 h-3 text-green-400" /> :
                       <Activity className="w-3 h-3 text-gray-500" />}
                      <span className="text-xs text-gray-500">{t.trend}</span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Detail */}
          <div className="col-span-2 space-y-6">
            <div className="card">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h2 className="text-xl font-bold text-white">{th.metric}</h2>
                  <p className="text-sm text-gray-400">{th.category}</p>
                </div>
                {th.breached && (
                  <span className="badge-red text-sm px-3 py-1">THRESHOLD BREACHED</span>
                )}
              </div>
            </div>

            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-4">Trend</h3>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={th.history}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="date" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip contentStyle={{ backgroundColor: "#1f2937", border: "1px solid #374151", borderRadius: "8px" }} />
                  <ReferenceLine y={th.threshold} stroke="#ef4444" strokeDasharray="5 5" label={{ value: "Threshold", fill: "#ef4444", fontSize: 12 }} />
                  <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} dot={{ fill: "#3b82f6" }} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="card text-center">
                <p className={`text-3xl font-bold ${th.breached ? "text-red-400" : "text-white"}`}>{th.current}</p>
                <p className="text-xs text-gray-500">Current Value</p>
              </div>
              <div className="card text-center">
                <p className="text-3xl font-bold text-yellow-400">{th.threshold}</p>
                <p className="text-xs text-gray-500">Threshold</p>
              </div>
              <div className="card text-center">
                <p className="text-3xl font-bold text-white">{Math.round((th.current / th.threshold) * 100)}%</p>
                <p className="text-xs text-gray-500">Of Threshold</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
