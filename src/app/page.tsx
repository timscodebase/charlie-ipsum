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
  Shield,
  Star,
} from "lucide-react";
import confetti from "canvas-confetti";
import { generateCharlieIpsum, type RhetoricTone } from "@/lib/charlie-ipsum";

export default function CharlieIpsumApp() {
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
      return generatedOutput.map((b) => `• ${b}`).join("\n");
    }
    return generatedOutput.join("\n\n");
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
      // Majestic patriotic confetti: vibrant ruby red, pure white, and liberty cobalt blue
      confetti({
        particleCount: 55,
        spread: 70,
        origin: { y: 0.75 },
        colors: ["#ef4444", "#ffffff", "#2563eb", "#3b82f6", "#f43f5e", "#e2e8f0"],
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
    element.download = `charlie-ipsum-${Date.now()}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const toneConfig: Record<
    RhetoricTone,
    { label: string; icon: React.ReactNode; badge: string; colorClass: string; activeClass: string }
  > = {
    "campus-debate": {
      label: "Campus Clash",
      icon: <Flame className="w-4 h-4 text-red-400" />,
      badge: "Open Mic Challenge",
      colorClass: "hover:border-red-500/40 text-slate-300",
      activeClass: "bg-red-950/40 border-red-500/80 text-white shadow-[0_0_15px_rgba(239,68,68,0.2)]",
    },
    constitutional: {
      label: "Constitutional",
      icon: <Scale className="w-4 h-4 text-amber-400" />,
      badge: "Federalist Principles",
      colorClass: "hover:border-amber-500/40 text-slate-300",
      activeClass: "bg-amber-950/40 border-amber-500/80 text-white shadow-[0_0_15px_rgba(245,158,11,0.2)]",
    },
    economic: {
      label: "Free Enterprise",
      icon: <DollarSign className="w-4 h-4 text-emerald-400" />,
      badge: "Sound Currency",
      colorClass: "hover:border-emerald-500/40 text-slate-300",
      activeClass: "bg-emerald-950/40 border-emerald-500/80 text-white shadow-[0_0_15px_rgba(16,185,129,0.2)]",
    },
    rally: {
      label: "TPUSA Rally",
      icon: <Megaphone className="w-4 h-4 text-blue-400" />,
      badge: "Frontline Action",
      colorClass: "hover:border-blue-500/40 text-slate-300",
      activeClass: "bg-blue-950/40 border-blue-500/80 text-white shadow-[0_0_15px_rgba(59,130,246,0.25)]",
    },
  };

  return (
    <div className="relative flex flex-col min-h-screen bg-[#060a14] text-slate-100 overflow-hidden selection:bg-red-600 selection:text-white">
      {/* Ambient Patriotic Radial Lighting */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {/* Top-Left Cobalt Freedom Glow */}
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-blue-600/10 blur-[140px]" />
        {/* Top-Right Imperial Ruby Glow */}
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-red-600/10 blur-[140px]" />
        {/* Center Pearl Moonlight Ambience */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-slate-100/[0.02] blur-[160px]" />
        {/* Subtle Patriotic Starfield/Grid Accent */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-70" />
      </div>

      {/* Flag-Inspired Tricolor Precision Ribbon */}
      <div className="relative z-50 h-[3px] w-full bg-gradient-to-r from-red-600 via-slate-100 to-blue-600 shadow-[0_0_12px_rgba(59,130,246,0.4)]" />

      {/* Top Banner Navigation */}
      <header className="relative z-40 w-full border-b border-slate-800/80 bg-[#080d1a]/80 backdrop-blur-xl sticky top-0">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Patriotic Crest Emblem */}
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 via-rose-500 to-blue-600 p-[1.5px] shadow-lg shadow-red-950/40 group">
              <div className="w-full h-full rounded-[10px] bg-[#0a0f20] flex items-center justify-center transition-colors group-hover:bg-[#0d142b]">
                <Shield className="w-5 h-5 text-red-500 fill-red-500/20" />
                <Star className="w-2.5 h-2.5 text-blue-400 absolute" />
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg tracking-tight text-white flex items-center gap-1.5">
                  CHARLIE{" "}
                  <span className="bg-gradient-to-r from-red-500 via-rose-400 to-red-600 bg-clip-text text-transparent">
                    IPSUM
                  </span>
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wider uppercase bg-blue-950/60 text-blue-300 border border-blue-800/60 shadow-[0_0_8px_rgba(59,130,246,0.15)]">
                  <Sparkles className="w-2.5 h-2.5 text-blue-400" />
                  USA Edition
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium hidden md:block">
                The Conservative Lorem Ipsum & Debate Copy Engine
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Quick-action Patriotic Copy Button */}
            <button
              onClick={copyToClipboard}
              disabled={generatedOutput.length === 0}
              className={`relative group flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-xs tracking-wide uppercase transition-all shadow-md active:scale-95 disabled:opacity-50 border overflow-hidden ${
                hasCopied
                  ? "bg-emerald-600 border-emerald-500 text-white shadow-emerald-950/50"
                  : "bg-gradient-to-r from-red-600 via-red-500 to-rose-600 hover:from-red-500 hover:to-rose-500 border-red-400/30 text-white shadow-[0_0_18px_rgba(239,68,68,0.35)]"
              }`}
            >
              {hasCopied ? (
                <>
                  <Check className="w-3.5 h-3.5" /> Copied to Clipboard
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 group-hover:rotate-6 transition-transform" /> Copy Text
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Workspace */}
      <main className="relative z-10 flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Controls Column */}
        <div className="lg:col-span-5 space-y-6">
          <div className="relative rounded-2xl border border-slate-800/90 bg-gradient-to-b from-[#0b1328]/90 via-[#0a1020]/90 to-[#070b16]/90 backdrop-blur-xl p-6 space-y-6 shadow-2xl shadow-blue-950/20">
            {/* Subtle Top Accent Ribbon on Card */}
            <div className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />

            <div>
              <div className="flex items-center justify-between">
                <h2 className="text-xs font-bold text-slate-300 uppercase tracking-widest flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-red-500 inline-block animate-pulse" />
                  Discourse Controls
                </h2>
                <span className="text-[10px] uppercase font-mono text-slate-500 tracking-wider">
                  Config Engine
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Calibrate rhetorical intensity, format, and philosophical lens.
              </p>
            </div>

            {/* Output Format Selector */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center justify-between">
                <span>Output Format</span>
                <span className="text-[10px] text-slate-500 font-normal capitalize">({type})</span>
              </label>
              <div className="grid grid-cols-3 gap-2 p-1 rounded-xl bg-[#060a16] border border-slate-800/80">
                {(["paragraphs", "sentences", "bullets"] as const).map((fmt) => (
                  <button
                    key={fmt}
                    onClick={() => setType(fmt)}
                    className={`py-2 px-2.5 rounded-lg text-xs font-semibold capitalize transition-all text-center ${
                      type === fmt
                        ? "bg-gradient-to-r from-blue-900/60 to-indigo-900/60 border border-blue-500/50 text-white shadow-[0_0_12px_rgba(59,130,246,0.3)]"
                        : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/50 border border-transparent"
                    }`}
                  >
                    {fmt}
                  </button>
                ))}
              </div>
            </div>

            {/* Rhetorical Lens Grid */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Rhetorical Lens
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                {(Object.keys(toneConfig) as RhetoricTone[]).map((toneKey) => {
                  const config = toneConfig[toneKey];
                  const isSelected = tone === toneKey;
                  return (
                    <button
                      key={toneKey}
                      onClick={() => setTone(toneKey)}
                      className={`flex flex-col items-start p-3 rounded-xl border text-left transition-all ${
                        isSelected
                          ? config.activeClass
                          : `bg-[#070c1a]/90 border-slate-800/80 ${config.colorClass} hover:bg-slate-900/40`
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        {config.icon}
                        <span className="text-xs font-bold tracking-tight">{config.label}</span>
                      </div>
                      <span className="text-[10px] text-slate-400 font-medium">
                        {config.badge}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quantity Slider */}
            <div className="space-y-3 pt-1">
              <div className="flex justify-between items-center text-xs">
                <label className="font-semibold text-slate-300 uppercase tracking-wider">
                  Quantity Count
                </label>
                <span className="font-mono bg-blue-950/80 border border-blue-700/50 px-2.5 py-0.5 rounded-md text-blue-200 font-bold text-xs shadow-inner">
                  {count} {type}
                </span>
              </div>
              <div className="relative">
                <input
                  type="range"
                  min="1"
                  max={type === "paragraphs" ? 10 : 25}
                  value={count}
                  onChange={(e) => setCount(Number(e.target.value))}
                  className="w-full h-2 bg-[#060a16] border border-slate-800 rounded-lg appearance-none cursor-pointer accent-red-500 focus:outline-none"
                />
                <div className="flex justify-between text-[10px] text-slate-500 mt-1 font-mono">
                  <span>1</span>
                  <span>{type === "paragraphs" ? 5 : 12}</span>
                  <span>{type === "paragraphs" ? 10 : 25}</span>
                </div>
              </div>
            </div>

            {/* Signature Catchphrase toggle */}
            <div className="pt-3 border-t border-slate-800/80">
              <label className="flex items-center justify-between cursor-pointer group">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-semibold text-slate-200 group-hover:text-white transition-colors">
                      Signature Opening Hook
                    </span>
                    <span className="text-[9px] uppercase px-1.5 py-0.2 rounded bg-red-950/70 text-red-300 border border-red-800/50 font-mono">
                      TPUSA Lead
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400">
                    Prefix with iconic debate & summit lead-ins
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={startWithCatchphrase}
                  onChange={(e) => setStartWithCatchphrase(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-700 bg-slate-900 text-red-600 focus:ring-red-500 focus:ring-offset-slate-950 cursor-pointer accent-red-500"
                />
              </label>
            </div>

            {/* Generate Action Button */}
            <button
              onClick={handleGenerate}
              disabled={isPending}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-slate-100 via-white to-slate-200 hover:from-white hover:to-slate-100 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-white/5 active:scale-[0.98] disabled:opacity-50 border border-white/20"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-red-600 ${isPending ? "animate-spin" : ""}`} />
              Regenerate Discourse
            </button>
          </div>

          {/* Patriotic Executive Brief Statistics Card */}
          <div className="relative rounded-2xl border border-slate-800/90 bg-gradient-to-r from-[#0a1124]/90 via-[#090e1c]/90 to-[#0c0f1e]/90 p-4 backdrop-blur-xl shadow-xl">
            <div className="grid grid-cols-3 divide-x divide-slate-800/80 text-center">
              <div className="px-2">
                <p className="text-2xl font-black font-mono tracking-tight text-white">
                  {wordCount}
                </p>
                <p className="text-[10px] uppercase tracking-wider font-semibold text-slate-400 mt-0.5">
                  Words
                </p>
              </div>
              <div className="px-2">
                <p className="text-2xl font-black font-mono tracking-tight text-white">
                  {characterCount}
                </p>
                <p className="text-[10px] uppercase tracking-wider font-semibold text-slate-400 mt-0.5">
                  Characters
                </p>
              </div>
              <div className="px-2">
                <p className="text-2xl font-black font-mono tracking-tight text-red-400">
                  {generatedOutput.length}
                </p>
                <p className="text-[10px] uppercase tracking-wider font-semibold text-slate-400 mt-0.5 capitalize">
                  {type}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Display Output Column */}
        <div className="lg:col-span-7 flex flex-col space-y-4">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" />
              </span>
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-widest">
                Official Debate Transcript
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={downloadTextFile}
                className="flex items-center gap-1.5 text-xs font-medium text-slate-300 hover:text-white px-3 py-1.5 rounded-lg bg-[#0a1020] hover:bg-slate-800 border border-slate-700/80 transition-all shadow-sm active:scale-95"
                title="Download as UTF-8 .txt document"
              >
                <Download className="w-3.5 h-3.5 text-blue-400" />
                Export .TXT
              </button>
            </div>
          </div>

          {/* Archival Reading Card */}
          <div className="relative flex-1 rounded-2xl border border-slate-800/90 bg-gradient-to-b from-[#091024]/90 via-[#070d1d]/90 to-[#050814]/95 backdrop-blur-xl p-8 overflow-y-auto min-h-[460px] max-h-[720px] shadow-2xl space-y-5 select-text">
            {/* Subtle Tricolor Watermark Corner Indicator */}
            <div className="absolute top-3 right-4 flex items-center gap-1 opacity-50 select-none pointer-events-none">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            </div>

            {type === "bullets" ? (
              <ul className="space-y-4 list-none">
                {generatedOutput.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3.5 p-3 rounded-xl bg-slate-950/40 border border-slate-800/50 hover:border-slate-700/60 transition-colors"
                  >
                    <span className="text-red-500 select-none text-base leading-5">★</span>
                    <span className="font-sans text-slate-200 text-sm leading-relaxed font-normal">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              generatedOutput.map((paragraph, idx) => (
                <p
                  key={idx}
                  className="font-serif text-slate-200 leading-relaxed text-base tracking-normal first-letter:text-3xl first-letter:font-bold first-letter:text-red-500 first-letter:float-left first-letter:mr-2 first-letter:leading-none"
                >
                  {paragraph}
                </p>
              ))
            )}

            {/* Freedom of Speech Footnote */}
            <div className="pt-6 mt-8 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400 font-mono select-none">
              <span className="flex items-center gap-1.5">
                <Shield className="w-3 h-3 text-blue-400" />
                First Amendment Protected Copy
              </span>
              <span>Turning Point USA Archive</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
