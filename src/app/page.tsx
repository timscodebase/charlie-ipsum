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
