const fs = require('fs');
const path = require('path');

// Créer une image Open Graph simple avec du SVG
const ogImageSVG = `
<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <style>
      .title { font-family: 'Georgia', serif; font-size: 64px; font-weight: 300; fill: #000; }
      .subtitle { font-family: 'Arial', sans-serif; font-size: 32px; font-weight: 400; fill: #666; }
      .logo { fill: #000; }
    </style>
  </defs>
  
  <!-- Background -->
  <rect width="1200" height="630" fill="#ffffff"/>
  
  <!-- Logo SVG (simplifié) -->
  <g transform="translate(100, 200)">
    <!-- Logo La Stela Company -->
    <text x="0" y="0" class="title">La Stela Company</text>
    <text x="0" y="80" class="subtitle">Danse • Théâtre • Langues</text>
  </g>
  
  <!-- Decorative elements -->
  <circle cx="1000" cy="100" r="50" fill="#f0f0f0" opacity="0.3"/>
  <circle cx="1100" cy="500" r="30" fill="#f0f0f0" opacity="0.2"/>
</svg>
`;

// Créer le fichier OG image
const ogImagePath = path.join(__dirname, '../public/og-image.svg');
fs.writeFileSync(ogImagePath, ogImageSVG);

console.log('✅ OG Image générée : /public/og-image.svg');

