import sharp from "sharp";
import fs from "fs";
import path from "path";

const iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ef4444" />
      <stop offset="50%" stop-color="#f43f5e" />
      <stop offset="100%" stop-color="#2563eb" />
    </linearGradient>
    <radialGradient id="glowGrad" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#ef4444" stop-opacity="0.35" />
      <stop offset="100%" stop-color="#060a14" stop-opacity="0" />
    </radialGradient>
  </defs>

  <!-- Background Base -->
  <rect width="512" height="512" rx="110" fill="#060a14" />
  <rect width="512" height="512" rx="110" fill="url(#glowGrad)" />

  <!-- Shield Outline -->
  <path d="M256 64 L416 128 C416 272 336 384 256 448 C176 384 96 272 96 128 Z" 
        fill="#0b1329" 
        stroke="url(#shieldGrad)" 
        stroke-width="24" 
        stroke-linejoin="round" />

  <!-- Center Star -->
  <polygon points="256 144 285 216 360 221 301 269 320 344 256 301 192 344 211 269 152 221 227 216" 
           fill="#ffffff" />
</svg>`;

const maskableSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ef4444" />
      <stop offset="50%" stop-color="#f43f5e" />
      <stop offset="100%" stop-color="#2563eb" />
    </linearGradient>
  </defs>
  <!-- Full Bleed Background for Maskable Icon -->
  <rect width="512" height="512" fill="#060a14" />
  <g transform="translate(64, 64) scale(0.75)">
    <path d="M256 64 L416 128 C416 272 336 384 256 448 C176 384 96 272 96 128 Z" 
          fill="#0b1329" 
          stroke="url(#shieldGrad)" 
          stroke-width="24" 
          stroke-linejoin="round" />
    <polygon points="256 144 285 216 360 221 301 269 320 344 256 301 192 344 211 269 152 221 227 216" 
             fill="#ffffff" />
  </g>
</svg>`;

async function generate() {
  const publicDir = path.resolve(process.cwd(), "public");
  if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });

  const iconBuffer = Buffer.from(iconSvg);
  const maskableBuffer = Buffer.from(maskableSvg);

  // 1. icon-512.png
  await sharp(iconBuffer).resize(512, 512).png().toFile(path.join(publicDir, "icon-512.png"));
  console.log("Created icon-512.png");

  // 2. icon-192.png
  await sharp(iconBuffer).resize(192, 192).png().toFile(path.join(publicDir, "icon-192.png"));
  console.log("Created icon-192.png");

  // 3. icon-maskable-512.png
  await sharp(maskableBuffer).resize(512, 512).png().toFile(path.join(publicDir, "icon-maskable-512.png"));
  console.log("Created icon-maskable-512.png");

  // 4. icon-maskable-192.png
  await sharp(maskableBuffer).resize(192, 192).png().toFile(path.join(publicDir, "icon-maskable-192.png"));
  console.log("Created icon-maskable-192.png");

  // 5. apple-touch-icon.png (180x180)
  await sharp(iconBuffer).resize(180, 180).png().toFile(path.join(publicDir, "apple-touch-icon.png"));
  console.log("Created apple-touch-icon.png");

  // 6. favicon-32x32.png
  await sharp(iconBuffer).resize(32, 32).png().toFile(path.join(publicDir, "favicon-32x32.png"));
  console.log("Created favicon-32x32.png");

  // 7. favicon-16x16.png
  await sharp(iconBuffer).resize(16, 16).png().toFile(path.join(publicDir, "favicon-16x16.png"));
  console.log("Created favicon-16x16.png");
}

generate().catch(console.error);
