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
