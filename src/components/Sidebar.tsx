"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AlertOctagon,
  Grid3X3,
  List,
  Cpu,
  LayoutGrid,
  Gauge,
  Shield,
  Users,
} from "lucide-react";

const navItems = [
  { href: "/", label: "Dashboard", icon: Grid3X3 },
  { href: "/taxonomy", label: "Risk Taxonomy", icon: List },
  { href: "/capability-eval", label: "Capability Evaluation", icon: Cpu },
  { href: "/risk-matrix", label: "Risk Matrix", icon: LayoutGrid },
  { href: "/thresholds", label: "Threshold Tracker", icon: Gauge },
  { href: "/mitigations", label: "Mitigation Planner", icon: Shield },
  { href: "/safety-board", label: "Safety Board Sim", icon: Users },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-gray-900 border-r border-gray-800 min-h-screen p-4 flex flex-col">
      <div className="flex items-center gap-3 mb-8 px-2">
        <AlertOctagon className="w-8 h-8 text-red-500" />
        <div>
          <h1 className="text-lg font-bold text-white">PrepareAI</h1>
          <p className="text-xs text-gray-500">Risk Assessment</p>
        </div>
      </div>
      <nav className="flex-1 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive ? "bg-red-600/20 text-red-400" : "text-gray-400 hover:bg-gray-800 hover:text-gray-200"
              }`}
            >
              <Icon className="w-4 h-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto pt-4 border-t border-gray-800">
        <p className="text-xs text-gray-600 px-2">PrepareAI v1.0</p>
      </div>
    </aside>
  );
}
