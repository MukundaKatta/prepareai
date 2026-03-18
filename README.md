# PrepareAI

**AI Catastrophic Risk Assessment & Safety Evaluation Framework**

PrepareAI is a risk assessment platform for evaluating AI model capabilities against catastrophic risk categories. Track risks across cyber, biological, CBRN, autonomy, persuasion, and societal domains with structured evaluation frameworks, safety thresholds, and mitigation planning.

## Features

- **Risk Dashboard** -- Overview of AI risk levels across six catastrophic risk domains
- **Risk Taxonomy** -- Structured categorization of AI capabilities and associated risks
- **Capability Evaluation** -- Evaluate AI models for dangerous capabilities with scoring rubrics
- **Risk Matrix** -- Visual risk-level mapping with trend analysis over time
- **Safety Thresholds** -- Define and monitor capability thresholds that trigger safety reviews
- **Mitigation Planning** -- Plan and track risk mitigation strategies and interventions
- **Safety Board** -- Governance dashboard for safety review decisions and approvals

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Backend:** Supabase (Auth, Database, SSR)
- **State Management:** Zustand
- **Charts:** Recharts
- **Date Handling:** date-fns
- **Icons:** Lucide React

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
git clone <repository-url>
cd prepareai
npm install
```

### Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/
│   ├── page.tsx              # Risk dashboard overview
│   ├── taxonomy/             # Risk categorization
│   ├── capability-eval/      # Model capability evaluation
│   ├── risk-matrix/          # Risk-level visualization
│   ├── thresholds/           # Safety threshold management
│   ├── mitigations/          # Mitigation strategy planning
│   └── safety-board/         # Governance & approvals
├── components/               # Reusable UI components
└── lib/                      # Supabase client, utilities
```

