"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import { ChevronDown, ChevronRight, AlertTriangle, Shield, Info } from "lucide-react";

interface RiskNode {
  id: string;
  name: string;
  description: string;
  level: "critical" | "high" | "medium" | "low";
  children?: RiskNode[];
}

const riskTaxonomy: RiskNode[] = [
  {
    id: "cyber",
    name: "Cyber Risk",
    description: "Risks related to AI-enabled cyberattacks and information security threats",
    level: "high",
    children: [
      {
        id: "cyber-offense",
        name: "Offensive Cyber Operations",
        description: "AI systems that can discover vulnerabilities or create exploits",
        level: "high",
        children: [
          { id: "cyber-vuln", name: "Vulnerability Discovery", description: "Autonomous discovery of zero-day vulnerabilities", level: "high" },
          { id: "cyber-exploit", name: "Exploit Generation", description: "Automated creation of working exploits", level: "critical" },
          { id: "cyber-malware", name: "Malware Creation", description: "Generation of novel malware variants", level: "high" },
        ],
      },
      {
        id: "cyber-social",
        name: "Social Engineering",
        description: "AI-powered social engineering at scale",
        level: "high",
        children: [
          { id: "cyber-phish", name: "Spear Phishing", description: "Personalized phishing at scale", level: "high" },
          { id: "cyber-deepfake", name: "Deepfake Generation", description: "Realistic impersonation content", level: "medium" },
        ],
      },
      {
        id: "cyber-infra",
        name: "Infrastructure Attacks",
        description: "Attacks on critical infrastructure systems",
        level: "critical",
        children: [
          { id: "cyber-scada", name: "SCADA/ICS Attacks", description: "Targeting industrial control systems", level: "critical" },
          { id: "cyber-grid", name: "Power Grid Disruption", description: "Attacks on electrical infrastructure", level: "critical" },
        ],
      },
    ],
  },
  {
    id: "bio",
    name: "Biological Risk",
    description: "Risks related to AI-enabled biological threats",
    level: "high",
    children: [
      {
        id: "bio-weapons",
        name: "Bioweapons",
        description: "AI-assisted creation of biological weapons",
        level: "critical",
        children: [
          { id: "bio-pathogen", name: "Pathogen Enhancement", description: "Engineering more dangerous pathogens", level: "critical" },
          { id: "bio-synthesis", name: "Synthesis Guidance", description: "Step-by-step synthesis instructions", level: "critical" },
          { id: "bio-delivery", name: "Delivery Mechanisms", description: "Designing dispersal systems", level: "high" },
        ],
      },
      {
        id: "bio-dual",
        name: "Dual-Use Research",
        description: "Legitimate research with weaponization potential",
        level: "medium",
        children: [
          { id: "bio-gain", name: "Gain-of-Function", description: "Research that enhances pathogen capabilities", level: "high" },
          { id: "bio-gene", name: "Gene Editing Guidance", description: "CRISPR and gene editing assistance", level: "medium" },
        ],
      },
    ],
  },
  {
    id: "cbrn",
    name: "CBRN Risk",
    description: "Chemical, Biological, Radiological, Nuclear risks beyond bio-specific",
    level: "medium",
    children: [
      {
        id: "cbrn-chem",
        name: "Chemical Weapons",
        description: "AI-assisted chemical weapons development",
        level: "high",
        children: [
          { id: "cbrn-nerve", name: "Nerve Agent Synthesis", description: "Instructions for nerve agent creation", level: "critical" },
          { id: "cbrn-precursor", name: "Precursor Identification", description: "Identifying available precursor chemicals", level: "high" },
        ],
      },
      {
        id: "cbrn-nuclear",
        name: "Nuclear/Radiological",
        description: "Nuclear and radiological weapon assistance",
        level: "medium",
        children: [
          { id: "cbrn-enrichment", name: "Enrichment Guidance", description: "Nuclear material enrichment processes", level: "high" },
          { id: "cbrn-dirty", name: "Dirty Bomb Design", description: "Radiological dispersal device design", level: "high" },
        ],
      },
    ],
  },
  {
    id: "autonomy",
    name: "Autonomy Risk",
    description: "Risks from AI systems acting autonomously",
    level: "medium",
    children: [
      { id: "auto-replicate", name: "Self-Replication", description: "AI systems that can copy themselves to new infrastructure", level: "critical" },
      { id: "auto-resource", name: "Resource Acquisition", description: "Autonomous acquisition of compute, money, or influence", level: "high" },
      { id: "auto-deception", name: "Deceptive Alignment", description: "AI appearing aligned during testing but pursuing other goals", level: "high" },
      { id: "auto-goal", name: "Goal Misspecification", description: "Pursuing unintended objectives due to reward hacking", level: "medium" },
    ],
  },
  {
    id: "persuasion",
    name: "Persuasion Risk",
    description: "Risks from AI-powered manipulation and influence",
    level: "high",
    children: [
      { id: "pers-mass", name: "Mass Manipulation", description: "Large-scale opinion manipulation campaigns", level: "high" },
      { id: "pers-individual", name: "Individual Targeting", description: "Highly personalized persuasion and manipulation", level: "high" },
      { id: "pers-radicalize", name: "Radicalization", description: "Systematic radicalization of individuals", level: "critical" },
      { id: "pers-election", name: "Election Interference", description: "AI-powered election manipulation", level: "critical" },
    ],
  },
  {
    id: "societal",
    name: "Societal Risk",
    description: "Broader societal risks from AI deployment",
    level: "medium",
    children: [
      { id: "soc-labor", name: "Labor Displacement", description: "Rapid workforce displacement without transition support", level: "medium" },
      { id: "soc-concentrate", name: "Power Concentration", description: "Concentration of power among AI developers", level: "high" },
      { id: "soc-surveillance", name: "Mass Surveillance", description: "AI-enabled pervasive surveillance", level: "high" },
      { id: "soc-inequality", name: "Inequality Amplification", description: "Widening economic and social divides", level: "medium" },
    ],
  },
];

const levelColors: Record<string, string> = {
  critical: "bg-red-500/20 text-red-400",
  high: "bg-orange-500/20 text-orange-400",
  medium: "bg-yellow-500/20 text-yellow-400",
  low: "bg-green-500/20 text-green-400",
};

function TaxonomyNode({ node, depth = 0 }: { node: RiskNode; depth?: number }) {
  const [expanded, setExpanded] = useState(depth < 1);
  const hasChildren = node.children && node.children.length > 0;

  return (
    <div className={`${depth > 0 ? "ml-6 border-l border-gray-800 pl-4" : ""}`}>
      <div
        className={`flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800/50 cursor-pointer transition-colors ${
          depth === 0 ? "bg-gray-900 border border-gray-800 mb-2" : "mb-1"
        }`}
        onClick={() => setExpanded(!expanded)}
      >
        {hasChildren ? (
          expanded ? (
            <ChevronDown className="w-4 h-4 text-gray-500 flex-shrink-0" />
          ) : (
            <ChevronRight className="w-4 h-4 text-gray-500 flex-shrink-0" />
          )
        ) : (
          <div className="w-4 h-4 flex-shrink-0" />
        )}
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className={`text-sm font-medium ${depth === 0 ? "text-white text-base" : "text-gray-200"}`}>
              {node.name}
            </span>
            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${levelColors[node.level]}`}>
              {node.level}
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-0.5">{node.description}</p>
        </div>
      </div>
      {expanded && hasChildren && (
        <div className="mt-1">
          {node.children!.map((child) => (
            <TaxonomyNode key={child.id} node={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function Taxonomy() {
  const [search, setSearch] = useState("");

  const countNodes = (nodes: RiskNode[]): number =>
    nodes.reduce((acc, n) => acc + 1 + (n.children ? countNodes(n.children) : 0), 0);

  const countByLevel = (nodes: RiskNode[], level: string): number =>
    nodes.reduce(
      (acc, n) => acc + (n.level === level ? 1 : 0) + (n.children ? countByLevel(n.children, level) : 0),
      0
    );

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white">Risk Taxonomy</h1>
          <p className="text-gray-400 mt-1">Hierarchical classification of AI catastrophic risks</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-5 gap-4 mb-8">
          <div className="card text-center">
            <p className="text-2xl font-bold text-white">{countNodes(riskTaxonomy)}</p>
            <p className="text-xs text-gray-500">Total Risk Nodes</p>
          </div>
          <div className="card text-center">
            <p className="text-2xl font-bold text-red-400">{countByLevel(riskTaxonomy, "critical")}</p>
            <p className="text-xs text-gray-500">Critical</p>
          </div>
          <div className="card text-center">
            <p className="text-2xl font-bold text-orange-400">{countByLevel(riskTaxonomy, "high")}</p>
            <p className="text-xs text-gray-500">High</p>
          </div>
          <div className="card text-center">
            <p className="text-2xl font-bold text-yellow-400">{countByLevel(riskTaxonomy, "medium")}</p>
            <p className="text-xs text-gray-500">Medium</p>
          </div>
          <div className="card text-center">
            <p className="text-2xl font-bold text-green-400">{countByLevel(riskTaxonomy, "low")}</p>
            <p className="text-xs text-gray-500">Low</p>
          </div>
        </div>

        <div className="mb-6">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search risk taxonomy..."
            className="input-field w-full max-w-md"
          />
        </div>

        <div className="space-y-2">
          {riskTaxonomy.map((node) => (
            <TaxonomyNode key={node.id} node={node} />
          ))}
        </div>
      </main>
    </div>
  );
}
