import sharp from "sharp";
import path from "path";

// 1. Wide Desktop Screenshot (1280 x 720)
const wideSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 720" width="1280" height="720">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#060a14" />
      <stop offset="100%" stop-color="#0b1328" />
    </linearGradient>
    <linearGradient id="ribbon" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#dc2626" />
      <stop offset="50%" stop-color="#ffffff" />
      <stop offset="100%" stop-color="#2563eb" />
    </linearGradient>
    <linearGradient id="cardGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#0c152d" />
      <stop offset="100%" stop-color="#080e1e" />
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1280" height="720" fill="url(#bgGrad)" />

  <!-- Tricolor Top Ribbon -->
  <rect width="1280" height="5" fill="url(#ribbon)" />

  <!-- Header -->
  <rect y="5" width="1280" height="65" fill="#080d1a" fill-opacity="0.9" />
  <line x1="0" y1="70" x2="1280" y2="70" stroke="#1e293b" stroke-width="1" />

  <!-- Header Brand -->
  <rect x="80" y="20" width="36" height="36" rx="8" fill="#1e1b4b" stroke="#ef4444" stroke-width="2" />
  <text x="130" y="44" fill="#ffffff" font-family="system-ui, sans-serif" font-size="20" font-weight="900" letter-spacing="1">CHARLIE <tspan fill="#ef4444">IPSUM</tspan></text>
  <rect x="300" y="27" width="110" height="22" rx="11" fill="#1e293b" />
  <text x="312" y="42" fill="#93c5fd" font-family="system-ui, sans-serif" font-size="11" font-weight="700">USA EDITION</text>

  <!-- Copy Button in Header -->
  <rect x="1060" y="20" width="140" height="36" rx="8" fill="#dc2626" />
  <text x="1100" y="43" fill="#ffffff" font-family="system-ui, sans-serif" font-size="12" font-weight="700" letter-spacing="1">COPY TEXT</text>

  <!-- Main 2-Column Layout -->
  <!-- Left Column: Controls (x=80, y=95, width=420, height=580) -->
  <rect x="80" y="95" width="440" height="580" rx="16" fill="url(#cardGrad)" stroke="#1e293b" stroke-width="1.5" />
  <text x="110" y="135" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="14" font-weight="700" letter-spacing="2">DISCOURSE CONTROLS</text>

  <!-- Format Buttons -->
  <rect x="110" y="170" width="120" height="38" rx="8" fill="#1e3a8a" stroke="#3b82f6" stroke-width="1" />
  <text x="135" y="194" fill="#ffffff" font-family="system-ui, sans-serif" font-size="13" font-weight="600">Paragraphs</text>
  <rect x="240" y="170" width="120" height="38" rx="8" fill="#0b1329" stroke="#1e293b" stroke-width="1" />
  <text x="272" y="194" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="13" font-weight="600">Sentences</text>
  <rect x="370" y="170" width="120" height="38" rx="8" fill="#0b1329" stroke="#1e293b" stroke-width="1" />
  <text x="408" y="194" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="13" font-weight="600">Bullets</text>

  <!-- Tone Buttons -->
  <rect x="110" y="240" width="185" height="50" rx="10" fill="#450a0a" stroke="#ef4444" stroke-width="1.5" />
  <text x="130" y="271" fill="#ffffff" font-family="system-ui, sans-serif" font-size="13" font-weight="700">Campus Clash</text>
  <rect x="305" y="240" width="185" height="50" rx="10" fill="#0b1329" stroke="#1e293b" stroke-width="1" />
  <text x="325" y="271" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="13" font-weight="600">Constitutional</text>

  <rect x="110" y="300" width="185" height="50" rx="10" fill="#0b1329" stroke="#1e293b" stroke-width="1" />
  <text x="130" y="331" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="13" font-weight="600">Free Enterprise</text>
  <rect x="305" y="300" width="185" height="50" rx="10" fill="#0b1329" stroke="#1e293b" stroke-width="1" />
  <text x="325" y="331" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="13" font-weight="600">TPUSA Rally</text>

  <!-- Slider -->
  <text x="110" y="390" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="12" font-weight="600">QUANTITY COUNT</text>
  <rect x="110" y="410" width="380" height="6" rx="3" fill="#1e293b" />
  <circle cx="230" cy="413" r="10" fill="#ef4444" />

  <!-- Regenerate Button -->
  <rect x="110" y="470" width="380" height="46" rx="10" fill="#ffffff" />
  <text x="220" y="499" fill="#020617" font-family="system-ui, sans-serif" font-size="13" font-weight="800" letter-spacing="1">REGENERATE DISCOURSE</text>

  <!-- Stats -->
  <rect x="110" y="540" width="380" height="70" rx="12" fill="#070b16" stroke="#1e293b" stroke-width="1" />
  <text x="160" y="575" fill="#ffffff" font-family="monospace" font-size="20" font-weight="900">184</text>
  <text x="155" y="595" fill="#64748b" font-family="system-ui, sans-serif" font-size="10">WORDS</text>
  <text x="290" y="575" fill="#ffffff" font-family="monospace" font-size="20" font-weight="900">1,218</text>
  <text x="280" y="595" fill="#64748b" font-family="system-ui, sans-serif" font-size="10">CHARACTERS</text>
  <text x="435" y="575" fill="#ef4444" font-family="monospace" font-size="20" font-weight="900">3</text>
  <text x="415" y="595" fill="#64748b" font-family="system-ui, sans-serif" font-size="10">PARAGRAPHS</text>

  <!-- Right Column: Debate Transcript (x=550, y=95, width=650, height=580) -->
  <rect x="550" y="95" width="650" height="580" rx="16" fill="url(#cardGrad)" stroke="#1e293b" stroke-width="1.5" />
  <circle cx="585" cy="132" r="4" fill="#3b82f6" />
  <text x="600" y="136" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="13" font-weight="700" letter-spacing="2">OFFICIAL DEBATE TRANSCRIPT</text>

  <!-- Transcript Paragraph 1 -->
  <text x="585" y="190" fill="#e2e8f0" font-family="Georgia, serif" font-size="16" line-height="1.6">Turning Point USA begins with an undeniable truth: Free speech on public</text>
  <text x="585" y="218" fill="#e2e8f0" font-family="Georgia, serif" font-size="16">campuses is non-negotiable under the First Amendment. Prove me wrong:</text>
  <text x="585" y="246" fill="#e2e8f0" font-family="Georgia, serif" font-size="16">the microphone is open, and we welcome all viewpoints. Colleges have</text>
  <text x="585" y="274" fill="#e2e8f0" font-family="Georgia, serif" font-size="16">transformed from centers of open inquiry into ideological echo chambers.</text>

  <!-- Transcript Paragraph 2 -->
  <text x="585" y="335" fill="#e2e8f0" font-family="Georgia, serif" font-size="16">Why are working-class taxpayers subsidizing six-figure degrees in grievances?</text>
  <text x="585" y="363" fill="#e2e8f0" font-family="Georgia, serif" font-size="16">We do not need emotional safe spaces; we need intellectual courage and</text>
  <text x="585" y="391" fill="#e2e8f0" font-family="Georgia, serif" font-size="16">rigorous debate. Facts do not yield to social pressure, and biological</text>
  <text x="585" y="419" fill="#e2e8f0" font-family="Georgia, serif" font-size="16">reality is not up for committee vote.</text>

  <!-- Transcript Paragraph 3 -->
  <text x="585" y="480" fill="#e2e8f0" font-family="Georgia, serif" font-size="16">Higher education is currently the greatest consumer scam in modern American</text>
  <text x="585" y="508" fill="#e2e8f0" font-family="Georgia, serif" font-size="16">history. When you censor opposing ideas, you show everyone you are terrified</text>
  <text x="585" y="536" fill="#e2e8f0" font-family="Georgia, serif" font-size="16">of the argument. Courage is contagious.</text>

  <!-- Footer -->
  <line x1="585" y1="590" x2="1165" y2="590" stroke="#1e293b" stroke-width="1" />
  <text x="585" y="625" fill="#64748b" font-family="monospace" font-size="11">★ FIRST AMENDMENT PROTECTED COPY • TURNING POINT USA ARCHIVE</text>
</svg>`;

// 2. Narrow Mobile Screenshot (750 x 1334)
const narrowSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 750 1334" width="750" height="1334">
  <defs>
    <linearGradient id="mBgGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#060a14" />
      <stop offset="100%" stop-color="#0a1226" />
    </linearGradient>
    <linearGradient id="mRibbon" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#dc2626" />
      <stop offset="50%" stop-color="#ffffff" />
      <stop offset="100%" stop-color="#2563eb" />
    </linearGradient>
  </defs>

  <rect width="750" height="1334" fill="url(#mBgGrad)" />
  <rect width="750" height="8" fill="url(#mRibbon)" />

  <!-- Mobile Header -->
  <rect y="8" width="750" height="100" fill="#080d1a" />
  <line x1="0" y1="108" x2="750" y2="108" stroke="#1e293b" stroke-width="2" />
  <rect x="40" y="32" width="50" height="50" rx="12" fill="#1e1b4b" stroke="#ef4444" stroke-width="2" />
  <text x="110" y="68" fill="#ffffff" font-family="system-ui, sans-serif" font-size="28" font-weight="900">CHARLIE <tspan fill="#ef4444">IPSUM</tspan></text>
  <rect x="560" y="35" width="150" height="46" rx="10" fill="#dc2626" />
  <text x="595" y="65" fill="#ffffff" font-family="system-ui, sans-serif" font-size="16" font-weight="700">COPY</text>

  <!-- Controls Card -->
  <rect x="40" y="140" width="670" height="490" rx="20" fill="#0c152d" stroke="#1e293b" stroke-width="2" />
  <text x="75" y="195" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="20" font-weight="800">DISCOURSE CONTROLS</text>

  <!-- Format -->
  <rect x="75" y="225" width="190" height="55" rx="12" fill="#1e3a8a" stroke="#3b82f6" stroke-width="1.5" />
  <text x="115" y="260" fill="#ffffff" font-family="system-ui, sans-serif" font-size="18" font-weight="600">Paragraphs</text>
  <rect x="280" y="225" width="190" height="55" rx="12" fill="#070b16" />
  <text x="330" y="260" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="18" font-weight="600">Sentences</text>
  <rect x="485" y="225" width="190" height="55" rx="12" fill="#070b16" />
  <text x="545" y="260" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="18" font-weight="600">Bullets</text>

  <!-- Lens -->
  <rect x="75" y="305" width="290" height="70" rx="14" fill="#450a0a" stroke="#ef4444" stroke-width="2" />
  <text x="105" y="348" fill="#ffffff" font-family="system-ui, sans-serif" font-size="19" font-weight="700">Campus Clash</text>
  <rect x="385" y="305" width="290" height="70" rx="14" fill="#070b16" stroke="#1e293b" stroke-width="1" />
  <text x="415" y="348" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="19" font-weight="600">Constitutional</text>

  <!-- Button -->
  <rect x="75" y="405" width="600" height="65" rx="14" fill="#ffffff" />
  <text x="235" y="446" fill="#020617" font-family="system-ui, sans-serif" font-size="18" font-weight="900" letter-spacing="1">REGENERATE DISCOURSE</text>

  <!-- Stats -->
  <rect x="75" y="495" width="600" height="95" rx="14" fill="#070b16" />
  <text x="135" y="545" fill="#ffffff" font-family="monospace" font-size="28" font-weight="900">184</text>
  <text x="130" y="570" fill="#64748b" font-family="system-ui, sans-serif" font-size="14">WORDS</text>
  <text x="325" y="545" fill="#ffffff" font-family="monospace" font-size="28" font-weight="900">1,218</text>
  <text x="320" y="570" fill="#64748b" font-family="system-ui, sans-serif" font-size="14">CHARS</text>
  <text x="535" y="545" fill="#ef4444" font-family="monospace" font-size="28" font-weight="900">3</text>
  <text x="510" y="570" fill="#64748b" font-family="system-ui, sans-serif" font-size="14">PARAGRAPHS</text>

  <!-- Mobile Transcript Card -->
  <rect x="40" y="660" width="670" height="630" rx="20" fill="#0c152d" stroke="#1e293b" stroke-width="2" />
  <text x="75" y="715" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="18" font-weight="800">OFFICIAL TRANSCRIPT</text>
  <text x="75" y="775" fill="#e2e8f0" font-family="Georgia, serif" font-size="22" line-height="1.5">Turning Point USA begins with an undeniable</text>
  <text x="75" y="815" fill="#e2e8f0" font-family="Georgia, serif" font-size="22">truth: Free speech on public campuses is</text>
  <text x="75" y="855" fill="#e2e8f0" font-family="Georgia, serif" font-size="22">non-negotiable under the First Amendment.</text>
  <text x="75" y="895" fill="#e2e8f0" font-family="Georgia, serif" font-size="22">Colleges have transformed from centers</text>
  <text x="75" y="935" fill="#e2e8f0" font-family="Georgia, serif" font-size="22">of inquiry into ideological echo chambers.</text>

  <text x="75" y="1010" fill="#e2e8f0" font-family="Georgia, serif" font-size="22">We do not need emotional safe spaces;</text>
  <text x="75" y="1050" fill="#e2e8f0" font-family="Georgia, serif" font-size="22">we need intellectual courage and rigorous</text>
  <text x="75" y="1090" fill="#e2e8f0" font-family="Georgia, serif" font-size="22">debate. Facts do not yield to pressure.</text>
</svg>`;

async function run() {
  const publicDir = path.resolve(process.cwd(), "public");

  await sharp(Buffer.from(wideSvg)).png().toFile(path.join(publicDir, "screenshot-wide.png"));
  console.log("Created screenshot-wide.png");

  await sharp(Buffer.from(narrowSvg)).png().toFile(path.join(publicDir, "screenshot-narrow.png"));
  console.log("Created screenshot-narrow.png");
}

run().catch(console.error);
