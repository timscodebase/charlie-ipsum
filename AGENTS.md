# GEMINI.md — Project Blueprint & Antigravity Agent Instructions

## 1. Project Overview & Objectives

Build and deploy **Charlie Ipsum**, an interactive, responsive Lorem Ipsum text generator dedicated to the rhetorical themes of Charlie Kirk and Turning Point USA (TPUSA). The tool allows developers, designers, and organizers to generate debate-ready placeholder copy across four distinct rhetorical lenses: Campus Debate, Constitutional Republicanism, Free-Market Economics, and TPUSA Rally speeches.

The project must be initialized with the exact preset specified:
`pnpm dlx shadcn@latest init --preset bKsFBxgG --template next`
and run via Next.js with Turbopack.

---

## 2. Technology Stack & Tooling

| Layer               | Specification                  | Details                                                                                       |
| :------------------ | :----------------------------- | :-------------------------------------------------------------------------------------------- |
| **Framework**       | Next.js 15+ (App Router)       | React Server Components (RSC), Client Boundary separation, Turbopack (`next dev --turbopack`) |
| **Package Manager** | `pnpm` (v9+)                   | Monorepo/fast dependency isolation                                                            |
| **Styling**         | Tailwind CSS (v4 / Modern CSS) | HSL/OKLCH color system, dark theme default, border-radius custom tokens                       |
| **UI Components**   | Shadcn UI (`bKsFBxgG` preset)  | Accessible Radix/Base primitives, Tailwind integration                                        |
| **Icons**           | `lucide-react`                 | Semantic icons for controls, copy triggers, and status cards                                  |
| **Client FX**       | `canvas-confetti`              | Confetti celebration on successful copy                                                       |
| **Language**        | TypeScript 5+ (Strict)         | Type safety on all generator interfaces and state models                                      |

---

## 3. Project File Hierarchy

Ensure the directory structure matches the following layout:

```text
kirk-ipsum/
├── public/
│   └── favicon.ico
├── src/
│   ├── app/
│   │   ├── globals.css          # Color tokens, base CSS, reset rules
│   │   ├── layout.tsx           # Root HTML, dark class, typography font loading
│   │   └── page.tsx             # Interactive Charlie Ipsum client UI & generator logic
│   ├── components/
│   │   └── ui/                  # Shadcn UI primitives (button, card, slider, badge, etc.)
│   └── lib/
│       ├── charlie-ipsum.ts     # Pure TypeScript generator engine & rhetorical lexicons
│       └── utils.ts             # clsx / tailwind-merge helper
├── components.json              # Shadcn configuration preset metadata
├── next.config.ts               # Next.js configuration
├── package.json                 # Scripts and dependency specifications
├── postcss.config.mjs           # PostCSS setup
├── tsconfig.json                # TypeScript strict config
└── GEMINI.md                    # Antigravity agent instructions
```

---

## 4. Setup & Execution Commands

When executing within Google Antigravity IDE terminal:

```bash
# 1. Initialize project with specific preset
pnpm dlx shadcn@latest init --preset bKsFBxgG --template next .

# 2. Install supplementary packages
pnpm add lucide-react canvas-confetti clsx tailwind-merge
pnpm add -D @types/canvas-confetti

# 3. Launch development server with Turbopack
pnpm dev --turbopack

# 4. Production build validation
pnpm build
```

---

## 5. Implementation Specifications

### 5.1 Rhetoric Engine (`src/lib/charlie-ipsum.ts`)

Must export:

- `RhetoricTone`: union type `'campus-debate' | 'constitutional' | 'economic' | 'rally'`
- `generateCharlieIpsum(options: GeneratorOptions): string[]`

Features:

- Pure deterministic array sampling and Fisher-Yates shuffle algorithms.
- Configurable paragraph sentence lengths (4 to 6 sentences per paragraph).
- Formats supported: `paragraphs`, `sentences`, `bullets`.
- Toggleable signature hook lead-in on the first paragraph/sentence.

### 5.2 Color Tokens & Styles (`src/app/globals.css`)

- Configure conservative, patriotic, high-contrast palette:
  - Deep slate/navy background (`hsl(224, 71%, 4%)`)
  - Crisp light text (`hsl(213, 31%, 91%)`)
  - Accent Red/Rose (`hsl(348, 83%, 53%)`)
  - Neutral borders (`hsl(216, 34%, 17%)`)
- Enforce full dark-mode by default (`.dark` applied at `html` root).

### 5.3 Root Layout (`src/app/layout.tsx`)

- App Router layout loading `Inter` from `next/font/google`.
- Full metadata configured (`title`, `description`).
- Anti-aliased typography and rose highlight selection (`selection:bg-rose-500 selection:text-white`).

### 5.4 Main Interactive Interface (`src/app/page.tsx`)

Must include:

1. **Header Bar**:
   - Branding icon + title (`Charlie Ipsum`).
   - Quick-action Copy button with visual feedback and confetti trigger.
2. **Left Control Rail**:
   - **Format Selector**: Segmented toggles for Paragraphs, Sentences, Bullets.
   - **Rhetorical Lens**: Grid of 4 tone buttons (Campus Clash, Constitutional, Free Enterprise, TPUSA Rally) with thematic icons.
   - **Count Slider**: Dynamic range input (1–10 for paragraphs, 1–25 for sentences/bullets).
   - **Hook Toggle**: Checkbox to prefix copy with signature opening phrases.
   - **Regenerate Button**: Smooth transition button with loading state.
   - **Real-time Stat Cards**: Live word count, character count, and item count.
3. **Right Preview Workspace**:
   - Monospace/serif styled reading card with high legibility.
   - First-letter drop-caps styling on paragraphs.
   - Bulleted list rendering mode.
   - One-click `.txt` file export using standard Web Blob / ObjectURL APIs.
   - Dual-mode clipboard support (modern `navigator.clipboard` with legacy `document.execCommand('copy')` fallback).

---

## 6. Full Code Implementation Files

### File: `src/lib/charlie-ipsum.ts`

```typescript
export type RhetoricTone = "campus-debate" | "constitutional" | "economic" | "rally";

export interface GeneratorOptions {
  count: number;
  type: "paragraphs" | "sentences" | "bullets";
  tone: RhetoricTone;
  startWithCatchphrase: boolean;
}

const PHRASES: Record<RhetoricTone, string[]> = {
  "campus-debate": [
    "Prove me wrong: the microphone is open, and we welcome all viewpoints.",
    "Colleges have transformed from centers of open inquiry into ideological echo chambers.",
    "We do not need emotional safe spaces; we need intellectual courage and rigorous debate.",
    "Show me where in the Constitution it guarantees a right to never be offended.",
    "Higher education is currently the greatest consumer scam in modern American history.",
    "Why are working-class taxpayers subsidizing six-figure degrees in grievances?",
    "Facts do not yield to social pressure, and biological reality is not up for committee vote.",
    "Critical thinking means following the evidence where it leads, not where administration decrees.",
    "When you censor opposing ideas, you show everyone you are terrified of the argument.",
    "Free speech on public campuses is non-negotiable under the First Amendment.",
  ],
  constitutional: [
    "The Founders did not create a direct democracy; they engineered a constitutional republic.",
    "Rights are endowed by the Creator, which means no government bureaucracy can revoke them.",
    "Federalism was designed precisely to prevent concentrated administrative tyranny.",
    "The Tenth Amendment is the ultimate bulwark against centralized executive overreach.",
    "Separation of powers exists to safeguard individual liberties, not governmental efficiency.",
    "A self-governing people requires moral virtue, personal accountability, and local sovereignty.",
    "The Constitution remains the greatest political charter of human freedom ever drafted.",
    "When laws proliferate infinitely, liberty diminishes proportionately.",
    "The administrative state represents an unelected fourth branch operating outside constitutional boundaries.",
    "Freedom is never more than one generation away from extinction.",
  ],
  economic: [
    "Free-market capitalism has lifted more human beings out of poverty than any socialist regime.",
    "Inflation is not an accident of nature; it is the direct consequence of reckless monetary printing.",
    "You cannot tax a society into prosperity, nor can you spend your way out of national debt.",
    "Energy independence is the foundational prerequisite for both national security and economic growth.",
    "Every dollar the federal government allocates was first extracted from a productive worker.",
    "Central planning inevitably produces scarcity, inefficiency, and bureaucratic paralysis.",
    "Individual enterprise, private property rights, and sound currency drive human flourish.",
    "Student loan forgiveness is a regressive wealth transfer from tradespeople to elite credential holders.",
    "Deregulation empowers small businesses while regulatory capture protects entrenched monopolies.",
    "Competition breeds excellence; bureaucratic mandates breed mediocrity.",
  ],
  rally: [
    "Turning Point USA is on the frontlines across thousands of high schools and college campuses.",
    "Faith, family, and freedom: that is the bedrock of Western civilization.",
    "We are witnessing a cultural awakening of young Americans refusing to be silenced.",
    "Stand up, speak boldly, and do not apologize for loving the United States of America.",
    "Winning the culture war requires showing up where the other side assumed they had a monopoly.",
    "Strong borders, safe neighborhoods, and sovereign nations remain non-negotiable.",
    "Our best days are not behind us if the rising generation chooses courage over compliance.",
    "Big Tech algorithms may throttle conservative reach, but the truth penetrates the noise.",
    "It is time to defund institutions that despise the very republic that finances them.",
    "Courage is contagious; once one student stands up, the entire lecture hall takes notice.",
  ],
};

const LEAD_INS: string[] = [
  "Turning Point USA begins with an undeniable truth:",
  "Here is the fundamental premise that campus radicals refuse to debate:",
  "Let us examine the data without ideological filters:",
  "At our national student action summits, one message rings crystal clear:",
];

function getRandomItem<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function shuffleArray<T>(array: T[]): T[] {
  const cloned = [...array];
  for (let i = cloned.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cloned[i], cloned[j]] = [cloned[j], cloned[i]];
  }
  return cloned;
}

export function generateCharlieIpsum(options: GeneratorOptions): string[] {
  const { count, type, tone, startWithCatchphrase } = options;
  const pool = PHRASES[tone];
  const results: string[] = [];

  if (type === "sentences") {
    const shuffled = shuffleArray(pool);
    for (let i = 0; i < count; i++) {
      let sentence = shuffled[i % shuffled.length];
      if (i === 0 && startWithCatchphrase) {
        sentence = `${getRandomItem(LEAD_INS)} ${sentence}`;
      }
      results.push(sentence);
    }
    return results;
  }

  if (type === "bullets") {
    const shuffled = shuffleArray(pool);
    for (let i = 0; i < count; i++) {
      let bullet = shuffled[i % shuffled.length];
      if (i === 0 && startWithCatchphrase) {
        bullet = `Core Action Item: ${bullet}`;
      }
      results.push(bullet);
    }
    return results;
  }

  // Generate Paragraphs
  for (let p = 0; p < count; p++) {
    const sentenceCount = Math.floor(Math.random() * 3) + 4; // 4 to 6 sentences
    const paragraphSentences: string[] = [];
    const localPool = shuffleArray(pool);

    for (let s = 0; s < sentenceCount; s++) {
      paragraphSentences.push(localPool[s % localPool.length]);
    }

    let paragraph = paragraphSentences.join(" ");

    if (p === 0 && startWithCatchphrase) {
      paragraph = `${getRandomItem(LEAD_INS)} ${paragraph}`;
    }

    results.push(paragraph);
  }

  return results;
}
```

---

### File: `src/app/globals.css`

```css
@import "tailwindcss";

@layer base {
  :root {
    --background: 220 20% 98%;
    --foreground: 222 47% 11%;
    --card: 0 0% 100%;
    --card-foreground: 222 47% 11%;
    --popover: 0 0% 100%;
    --popover-foreground: 222 47% 11%;
    --primary: 348 83% 47%;
    --primary-foreground: 210 40% 98%;
    --secondary: 215 28% 17%;
    --secondary-foreground: 210 40% 98%;
    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 348 83% 47%;
    --radius: 0.5rem;
  }

  .dark {
    --background: 224 71% 4%;
    --foreground: 213 31% 91%;
    --card: 224 71% 7%;
    --card-foreground: 213 31% 91%;
    --popover: 224 71% 7%;
    --popover-foreground: 213 31% 91%;
    --primary: 348 83% 53%;
    --primary-foreground: 210 40% 98%;
    --secondary: 215 28% 25%;
    --secondary-foreground: 210 40% 98%;
    --muted: 223 47% 11%;
    --muted-foreground: 215.4 16.3% 56.9%;
    --accent: 216 34% 17%;
    --accent-foreground: 210 40% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%;
    --border: 216 34% 17%;
    --input: 216 34% 17%;
    --ring: 348 83% 53%;
  }
}

body {
  background-color: hsl(var(--background));
  color: hsl(var(--foreground));
  font-feature-settings: "cv02", "cv03", "cv04", "cv11";
}
```

---

### File: `src/app/layout.tsx`

```tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Charlie Ipsum | The Conservative Lorem Ipsum Generator",
  description:
    "Generate bold, debate-ready placeholder text steeped in free enterprise and constitutional principles.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.className} min-h-screen antialiased selection:bg-rose-500 selection:text-white`}
      >
        {children}
      </body>
    </html>
  );
}
```

---

### File: `src/app/page.tsx`

```tsx
"use client";

import * as React from "react";
import {
  Copy,
  Check,
  Download,
  Flame,
  Scale,
  DollarSign,
  Megaphone,
  RefreshCw,
  Sparkles,
} from "lucide-react";
import confetti from "canvas-confetti";
import { generateCharlieIpsum, type RhetoricTone } from "@/lib/charlie-ipsum";

export default function KirkIpsumApp() {
  const [count, setCount] = React.useState<number>(3);
  const [type, setType] = React.useState<"paragraphs" | "sentences" | "bullets">("paragraphs");
  const [tone, setTone] = React.useState<RhetoricTone>("campus-debate");
  const [startWithCatchphrase, setStartWithCatchphrase] = React.useState<boolean>(true);
  const [generatedOutput, setGeneratedOutput] = React.useState<string[]>([]);
  const [hasCopied, setHasCopied] = React.useState<boolean>(false);
  const [isPending, startTransition] = React.useTransition();

  const handleGenerate = React.useCallback(() => {
    startTransition(() => {
      const output = generateCharlieIpsum({
        count,
        type,
        tone,
        startWithCatchphrase,
      });
      setGeneratedOutput(output);
    });
  }, [count, type, tone, startWithCatchphrase]);

  React.useEffect(() => {
    handleGenerate();
  }, [handleGenerate]);

  const rawText = React.useMemo(() => {
    if (type === "bullets") {
      return generatedOutput.map((b) => `• ${b}`).join("
");
    }
    return generatedOutput.join("

");
  }, [generatedOutput, type]);

  const wordCount = React.useMemo(() => {
    return rawText.trim().split(/\s+/).filter(Boolean).length;
  }, [rawText]);

  const characterCount = React.useMemo(() => {
    return rawText.length;
  }, [rawText]);

  const copyToClipboard = async () => {
    if (!rawText) return;
    try {
      await navigator.clipboard.writeText(rawText);
      setHasCopied(true);
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.8 },
        colors: ["#e11d48", "#ffffff", "#1e3a8a"],
      });
      setTimeout(() => setHasCopied(false), 2000);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = rawText;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setHasCopied(true);
      setTimeout(() => setHasCopied(false), 2000);
    }
  };

  const downloadTextFile = () => {
    const element = document.createElement("a");
    const file = new Blob([rawText], { type: "text/plain;charset=utf-8" });
    element.href = URL.createObjectURL(file);
    element.download = `kirk-ipsum-${Date.now()}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const toneIcons: Record<RhetoricTone, React.ReactNode> = {
    "campus-debate": <Flame className="w-4 h-4 text-rose-500" />,
    constitutional: <Scale className="w-4 h-4 text-amber-500" />,
    economic: <DollarSign className="w-4 h-4 text-emerald-500" />,
    rally: <Megaphone className="w-4 h-4 text-sky-500" />,
  };

  return (
    <div className="flex flex-col min-h-screen bg-neutral-950 text-neutral-100">
      {/* Top Banner */}
      <div className="w-full border-b border-neutral-800 bg-neutral-900/60 backdrop-blur sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-tr from-rose-600 to-rose-400 p-2 rounded-lg text-white shadow-md shadow-rose-900/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-lg tracking-tight text-white flex items-center gap-1.5">
                KIRK <span className="text-rose-500">IPSUM</span>
              </span>
              <span className="text-xs text-neutral-400 hidden sm:inline-block ml-2 border-l border-neutral-700 pl-2">
                Turning Point Generator
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={copyToClipboard}
              disabled={generatedOutput.length === 0}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-rose-600 hover:bg-rose-500 text-white font-medium text-sm transition-all shadow-sm active:scale-95 disabled:opacity-50"
            >
              {hasCopied ? (
                <>
                  <Check className="w-4 h-4" /> Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" /> Copy Text
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Controls Column */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-xl border border-neutral-800 bg-neutral-900/40 backdrop-blur space-y-6">
            <div>
              <h2 className="text-base font-semibold text-neutral-200 uppercase tracking-wider">
                Generator Controls
              </h2>
              <p className="text-xs text-neutral-400 mt-1">
                Calibrate rhetorical intensity, format, and topical focus.
              </p>
            </div>

            {/* Output Type */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-neutral-300">Format</label>
              <div className="grid grid-cols-3 gap-2">
                {(["paragraphs", "sentences", "bullets"] as const).map((fmt) => (
                  <button
                    key={fmt}
                    onClick={() => setType(fmt)}
                    className={`py-2 px-3 rounded-lg text-xs font-semibold capitalize transition-all border ${
                      type === fmt
                        ? "bg-neutral-800 border-rose-500/80 text-white shadow-sm"
                        : "bg-neutral-950 border-neutral-800 text-neutral-400 hover:border-neutral-700 hover:text-neutral-200"
                    }`}
                  >
                    {fmt}
                  </button>
                ))}
              </div>
            </div>

            {/* Tone Selector */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-neutral-300">Rhetorical Lens</label>
              <div className="grid grid-cols-2 gap-2">
                {(
                  [
                    { id: "campus-debate", label: "Campus Clash" },
                    { id: "constitutional", label: "Constitutional" },
                    { id: "economic", label: "Free Enterprise" },
                    { id: "rally", label: "TPUSA Rally" },
                  ] as const
                ).map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setTone(t.id)}
                    className={`flex items-center gap-2 p-2.5 rounded-lg text-xs font-medium border text-left transition-all ${
                      tone === t.id
                        ? "bg-neutral-800 border-neutral-600 text-white"
                        : "bg-neutral-950 border-neutral-800/80 text-neutral-400 hover:border-neutral-700 hover:text-neutral-300"
                    }`}
                  >
                    {toneIcons[t.id]}
                    <span>{t.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Slider */}
            <div className="space-y-3">
              <div className="flex justify-between items-center text-xs">
                <label className="font-medium text-neutral-300">
                  Count ({type})
                </label>
                <span className="font-mono bg-neutral-800 px-2 py-0.5 rounded text-neutral-200 font-semibold">
                  {count}
                </span>
              </div>
              <input
                type="range"
                min="1"
                max={type === "paragraphs" ? 10 : 25}
                value={count}
                onChange={(e) => setCount(Number(e.target.value))}
                className="w-full h-1.5 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-rose-500"
              />
            </div>

            {/* Catchphrase toggle */}
            <div className="pt-2 border-t border-neutral-800">
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-xs text-neutral-300">
                  Lead with Signature Hook
                </span>
                <input
                  type="checkbox"
                  checked={startWithCatchphrase}
                  onChange={(e) => setStartWithCatchphrase(e.target.checked)}
                  className="w-4 h-4 rounded border-neutral-700 bg-neutral-800 text-rose-600 focus:ring-rose-500 focus:ring-offset-neutral-900"
                />
              </label>
            </div>

            {/* Actions */}
            <button
              onClick={handleGenerate}
              disabled={isPending}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-neutral-100 hover:bg-white text-neutral-900 font-semibold text-sm transition-all shadow-md active:scale-98 disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${isPending ? "animate-spin" : ""}`} />
              Regenerate Discourse
            </button>
          </div>

          {/* Statistics Card */}
          <div className="p-4 rounded-xl border border-neutral-800/80 bg-neutral-900/20 flex items-center justify-around text-center">
            <div>
              <p className="text-xl font-bold font-mono text-neutral-200">{wordCount}</p>
              <p className="text-xs text-neutral-500">Words</p>
            </div>
            <div className="h-8 w-px bg-neutral-800" />
            <div>
              <p className="text-xl font-bold font-mono text-neutral-200">{characterCount}</p>
              <p className="text-xs text-neutral-500">Characters</p>
            </div>
            <div className="h-8 w-px bg-neutral-800" />
            <div>
              <p className="text-xl font-bold font-mono text-neutral-200">
                {generatedOutput.length}
              </p>
              <p className="text-xs text-neutral-500">{type}</p>
            </div>
          </div>
        </div>

        {/* Display Output Column */}
        <div className="lg:col-span-7 flex flex-col space-y-4">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-sm font-semibold text-neutral-400 uppercase tracking-wider">
              Debate Transcript
            </h3>
            <div className="flex items-center gap-2">
              <button
                onClick={downloadTextFile}
                className="flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white px-2.5 py-1 rounded bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 transition-colors"
                title="Download as .txt"
              >
                <Download className="w-3.5 h-3.5" />
                Export
              </button>
            </div>
          </div>

          <div className="flex-1 p-6 rounded-xl border border-neutral-800 bg-neutral-900/30 backdrop-blur overflow-y-auto min-h-[420px] max-h-[700px] space-y-4 font-serif text-neutral-300 leading-relaxed text-base select-text">
            {type === "bullets" ? (
              <ul className="space-y-3 list-none">
                {generatedOutput.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="text-rose-500 select-none mt-1 font-sans">▪</span>
                    <span className="font-sans text-neutral-200 text-sm leading-6">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              generatedOutput.map((paragraph, idx) => (
                <p key={idx} className="first-letter:text-2xl first-letter:font-bold first-letter:text-rose-500">
                  {paragraph}
                </p>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
```

---

## 7. Verification Checklist for Antigravity Agent

After code generation, the agent must run the following checks:

1. Verify `pnpm dev --turbopack` starts clean on `localhost:3000` with zero TS compiler errors.
2. Confirm switching between `paragraphs`, `sentences`, and `bullets` immediately updates the text and stat counters.
3. Validate clipboard write and test that confetti triggers on success.
4. Test `.txt` file export generates a clean UTF-8 text file with correct line endings.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
