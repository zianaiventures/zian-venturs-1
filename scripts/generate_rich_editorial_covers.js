const fs = require('fs');
const path = require('path');

const baseDir = 'C:/Users/richa/OneDrive/Desktop/zianai website';
const targetDirs = [
  path.join(baseDir, 'public/blog/podcast'),
  path.join(baseDir, 'public/blog-covers/podcast'),
];

targetDirs.forEach((d) => {
  if (!fs.existsSync(d)) {
    fs.mkdirSync(d, { recursive: true });
  }
});

const podcastCovers = [
  {
    filename: 'building-distribution.svg',
    category: 'FOUNDER GROWTH',
    badge_bg: '#451a03',
    badge_color: '#fbbf24',
    badge_border: '#f59e0b',
    title_1: 'Why Raw Content Beats',
    title_2: 'Polished Videos',
    title_2_color: '#f59e0b',
    subtitle: "A Founder's Guide to Building Real Distribution & Audience",
    takeaway: 'Authenticity & Consistency Outperform High-Budget Production Every Time',
    guest_name: 'Yash Sanghavi',
    guest_role: 'Founder, Yanisa Execution · Access Asia',
    initials: 'YS',
    read_time: '4 MIN READ',
    format: 'PODCAST DEBRIEF',
    theme: 'amber',
    c1: '#f59e0b',
    c2: '#ef4444',
    c3: '#fbbf24',
    bg1: '#030816',
    bg2: '#08172e',
    art_type: 'distribution',
  },
  {
    filename: 'ai-career-generalist.svg',
    category: 'AI CAREERS',
    badge_bg: '#064e3b',
    badge_color: '#34d399',
    badge_border: '#10b981',
    title_1: 'Want a Career in AI?',
    title_2: 'Start as a Generalist',
    title_2_color: '#34d399',
    subtitle: 'Why Breadth Beats Premature Specialization for Modern AI Builders',
    takeaway: 'Master the Full Stack: Data, Product, System Architecture & GTM',
    guest_name: 'Yash Sanghavi',
    guest_role: 'Founder, Yanisa Execution · Access Asia',
    initials: 'YS',
    read_time: '4 MIN READ',
    format: 'CAREER GUIDE',
    theme: 'emerald',
    c1: '#10b981',
    c2: '#06b6d4',
    c3: '#6ee7b7',
    bg1: '#020b14',
    bg2: '#052220',
    art_type: 'compass',
  },
  {
    filename: 'career-pivot-ai.svg',
    category: 'CAREER STRATEGY',
    badge_bg: '#3b0764',
    badge_color: '#c084fc',
    badge_border: '#a855f7',
    title_1: 'When Should You Pivot',
    title_2: 'Your Career in AI?',
    title_2_color: '#c084fc',
    subtitle: 'Lessons on 5-Year Checkpoints From a 20-Year Enterprise Data Leader',
    takeaway: 'Every 5 Years is a Natural Pivot Point. Move Early Before Forced',
    guest_name: 'Koyelia Ghosh Roy',
    guest_role: 'Gen AI & Agentic AI Leader, Capgemini',
    initials: 'KG',
    read_time: '4 MIN READ',
    format: 'LEADERSHIP MASTERCLASS',
    theme: 'violet',
    c1: '#a855f7',
    c2: '#ec4899',
    c3: '#d8b4fe',
    bg1: '#050414',
    bg2: '#1e0836',
    art_type: 'pivot',
  },
  {
    filename: 'india-ai-race.svg',
    category: 'AI ECOSYSTEM',
    badge_bg: '#0c4a6e',
    badge_color: '#38bdf8',
    badge_border: '#0284c7',
    title_1: 'Why India Is Still Years',
    title_2: 'Behind China in AI',
    title_2_color: '#38bdf8',
    subtitle: 'The Compute Clusters, Silicon Supply & Research Depth Bottleneck',
    takeaway: 'Closing the Gap Requires Silicon, Capital Clusters & Deep Engineering',
    guest_name: 'Yash Sanghavi',
    guest_role: 'Founder, Yanisa Execution · Access Asia',
    initials: 'YS',
    read_time: '4 MIN READ',
    format: 'MACRO DEBRIEF',
    theme: 'cyan',
    c1: '#0284c7',
    c2: '#38bdf8',
    c3: '#7dd3fc',
    bg1: '#020814',
    bg2: '#061c38',
    art_type: 'macro',
  },
  {
    filename: 'motherhood-tech-career.svg',
    category: 'FUTURE OF WORK',
    badge_bg: '#4c0519',
    badge_color: '#fda4af',
    badge_border: '#f43f5e',
    title_1: 'Returning to Tech Work',
    title_2: 'After Having a Child',
    title_2_color: '#fda4af',
    subtitle: 'What Nobody Tells You About the Hardest Phase in a 20-Year Career',
    takeaway: 'Long-Term Careers Outlast Short-Term Breaks. Systemic Support is Crucial',
    guest_name: 'Koyelia Ghosh Roy',
    guest_role: 'Gen AI & Agentic AI Leader, Capgemini',
    initials: 'KG',
    read_time: '4 MIN READ',
    format: 'EXECUTIVE DIALOGUE',
    theme: 'rose',
    c1: '#f43f5e',
    c2: '#fb7185',
    c3: '#fecdd3',
    bg1: '#08030e',
    bg2: '#24081c',
    art_type: 'harmony',
  },
  {
    filename: 'vibe-coding.svg',
    category: 'ENGINEERING & GENAI',
    badge_bg: '#14532d',
    badge_color: '#4ade80',
    badge_border: '#22c55e',
    title_1: 'Vibe Coding Explained:',
    title_2: 'Where It Helps & Breaks',
    title_2_color: '#4ade80',
    subtitle: 'Where AI Prototyping Accelerates and Where Enterprise Scale Breaks',
    takeaway: '10x Speed for Rapid MVPs, but Enterprise Demands Latency, Security & Tests',
    guest_name: 'Koyelia Ghosh Roy',
    guest_role: 'Gen AI & Agentic AI Leader, Capgemini',
    initials: 'KG',
    read_time: '4 MIN READ',
    format: 'DEV PLAYBOOK',
    theme: 'code',
    c1: '#22c55e',
    c2: '#00f0ff',
    c3: '#86efac',
    bg1: '#020b0a',
    bg2: '#041f17',
    art_type: 'terminal',
  },
  {
    filename: 'why-companies-fail-ai.svg',
    category: 'ENTERPRISE AI',
    badge_bg: '#431407',
    badge_color: '#fb923c',
    badge_border: '#ea580c',
    title_1: 'AI as Corporate Horoscope:',
    title_2: 'Why Most Companies Fail',
    title_2_color: '#fb923c',
    subtitle: 'Moving Past Executive Theater to Genuine Workflow Integration & High ROI',
    takeaway: 'Ditch Gimmick POVs: Real AI Value Comes From Deep Workflow Architecture',
    guest_name: 'Yash Sanghavi',
    guest_role: 'Founder, Yanisa Execution · Access Asia',
    initials: 'YS',
    read_time: '4 MIN READ',
    format: 'STRATEGY BRIEFING',
    theme: 'orange',
    c1: '#f97316',
    c2: '#ef4444',
    c3: '#fdba74',
    bg1: '#08040a',
    bg2: '#240b08',
    art_type: 'horoscope',
  },
  {
    filename: 'ai-agent-harness.svg',
    category: 'ENTERPRISE AI',
    badge_bg: '#1e3a8a',
    badge_color: '#60a5fa',
    badge_border: '#3b82f6',
    title_1: 'Why an AI Agent Is Not Enough:',
    title_2: 'The Harness Nobody Talks About',
    title_2_color: '#60a5fa',
    subtitle: 'Models Are Commodities. The Production Harness Is the Differentiator.',
    takeaway: 'The Harness Governs Memory, Tool Calling, Rate Limits, Latency & Security',
    guest_name: 'Koyelia Ghosh Roy',
    guest_role: 'Gen AI & Agentic AI Leader, Capgemini',
    initials: 'KG',
    read_time: '4 MIN READ',
    format: 'DEEP TECH ARCHITECTURE',
    theme: 'blue',
    c1: '#3b82f6',
    c2: '#60a5fa',
    c3: '#93c5fd',
    bg1: '#020817',
    bg2: '#0b1f47',
    art_type: 'harness',
  },
];

function generateVectorArtwork(type, c1, c2, c3, id) {
  switch (type) {
    case 'distribution':
      return `
        <!-- Distribution Artwork: Video Frame, Waveforms, Viral Growth Curve -->
        <g transform="translate(1060, 200)">
          <!-- Ambient Glow Orb Behind Art -->
          <circle cx="240" cy="240" r="180" fill="${c1}" opacity="0.18" filter="url(#glow_${id})" />
          
          <!-- Concentric Broadcast Waves -->
          <circle cx="240" cy="240" r="230" fill="none" stroke="${c1}" stroke-width="2" opacity="0.2" stroke-dasharray="12 8" />
          <circle cx="240" cy="240" r="180" fill="none" stroke="${c2}" stroke-width="2.5" opacity="0.35" />
          <circle cx="240" cy="240" r="130" fill="none" stroke="${c3}" stroke-width="3" opacity="0.5" />
          
          <!-- 3D Video Studio Card -->
          <g transform="translate(70, 70)">
            <rect x="0" y="0" width="340" height="210" rx="24" fill="#07152b" fill-opacity="0.88" stroke="url(#cardGrad_${id})" stroke-width="3" filter="url(#glow_${id})" />
            
            <!-- Viewfinder Brackets -->
            <path d="M 25 45 L 25 25 L 45 25" stroke="${c1}" stroke-width="3.5" fill="none" stroke-linecap="round" />
            <path d="M 315 45 L 315 25 L 295 25" stroke="${c1}" stroke-width="3.5" fill="none" stroke-linecap="round" />
            <path d="M 25 165 L 25 185 L 45 185" stroke="${c1}" stroke-width="3.5" fill="none" stroke-linecap="round" />
            <path d="M 315 165 L 315 185 L 295 185" stroke="${c1}" stroke-width="3.5" fill="none" stroke-linecap="round" />
            
            <!-- REC Badge -->
            <rect x="35" y="40" width="80" height="26" rx="13" fill="#ef4444" fill-opacity="0.25" stroke="#ef4444" stroke-width="1.5" />
            <circle cx="50" cy="53" r="5" fill="#ef4444" />
            <text x="78" y="58" fill="#ffffff" font-family="'Inter', system-ui, sans-serif" font-size="12" font-weight="900" letter-spacing="1">REC</text>

            <!-- Center Audio Visualizer -->
            <g transform="translate(110, 80)">
              <rect x="0" y="20" width="8" height="40" rx="4" fill="${c1}" />
              <rect x="16" y="5" width="8" height="70" rx="4" fill="${c2}" />
              <rect x="32" y="30" width="8" height="30" rx="4" fill="${c3}" />
              <rect x="48" y="10" width="8" height="60" rx="4" fill="${c1}" />
              <rect x="64" y="0" width="8" height="80" rx="4" fill="${c2}" />
              <rect x="80" y="25" width="8" height="45" rx="4" fill="${c3}" />
              <rect x="96" y="15" width="8" height="55" rx="4" fill="${c1}" />
              <rect x="112" y="35" width="8" height="20" rx="4" fill="${c2}" />
            </g>
            
            <!-- Floating Label -->
            <text x="170" y="180" fill="#cbd5e1" font-family="'Inter', system-ui, sans-serif" font-size="13" font-weight="700" text-anchor="middle" letter-spacing="1.5">ORGANIC VIRAL ENGINE</text>
          </g>

          <!-- Compounding Exponential Reach Curve Badge -->
          <g transform="translate(130, 310)">
            <rect x="0" y="0" width="220" height="64" rx="16" fill="#040c1a" fill-opacity="0.9" stroke="${c1}" stroke-width="2" />
            <path d="M 20 45 Q 70 42, 110 32 T 180 15" fill="none" stroke="${c1}" stroke-width="3.5" stroke-linecap="round" />
            <circle cx="180" cy="15" r="5" fill="#ffffff" />
            <text x="105" y="55" fill="${c3}" font-family="'Inter', system-ui, sans-serif" font-size="11" font-weight="800" text-anchor="middle">COMPOUNDING REACH: 4 YRS</text>
          </g>
        </g>
      `;

    case 'compass':
      return `
        <!-- Generalist Multidirectional Compass & Neural Mesh -->
        <g transform="translate(1060, 200)">
          <circle cx="240" cy="240" r="190" fill="${c1}" opacity="0.15" filter="url(#glow_${id})" />
          
          <!-- Skill Radar Grid -->
          <polygon points="240,60 365,115 420,240 365,365 240,420 115,365 60,240 115,115" fill="#061e24" fill-opacity="0.6" stroke="${c1}" stroke-width="2" stroke-dasharray="6 6" />
          <polygon points="240,110 330,150 370,240 330,330 240,370 150,330 110,240 150,150" fill="#0a2e30" fill-opacity="0.5" stroke="${c2}" stroke-width="2" />
          <polygon points="240,160 295,185 320,240 295,295 240,320 185,295 160,240 185,185" fill="${c1}" fill-opacity="0.3" stroke="${c3}" stroke-width="2.5" />
          
          <!-- Axis Vectors -->
          <line x1="240" y1="50" x2="240" y2="430" stroke="${c1}" stroke-width="1.5" stroke-opacity="0.4" />
          <line x1="50" y1="240" x2="430" y2="240" stroke="${c1}" stroke-width="1.5" stroke-opacity="0.4" />
          
          <!-- 3D Center Core -->
          <circle cx="240" cy="240" r="38" fill="url(#cardGrad_${id})" stroke="#ffffff" stroke-width="3" filter="url(#glow_${id})" />
          <text x="240" y="246" fill="#ffffff" font-family="'Inter', system-ui, sans-serif" font-size="14" font-weight="900" text-anchor="middle">AI</text>
          
          <!-- Outer Node Badges -->
          <g transform="translate(180, 20)">
            <rect x="0" y="0" width="120" height="30" rx="15" fill="#072023" stroke="${c1}" stroke-width="1.5" />
            <text x="60" y="20" fill="${c3}" font-family="'Inter', system-ui, sans-serif" font-size="11" font-weight="800" text-anchor="middle">DATA ENG</text>
          </g>
          <g transform="translate(360, 225)">
            <rect x="0" y="0" width="110" height="30" rx="15" fill="#072023" stroke="${c2}" stroke-width="1.5" />
            <text x="55" y="20" fill="${c3}" font-family="'Inter', system-ui, sans-serif" font-size="11" font-weight="800" text-anchor="middle">PRODUCT</text>
          </g>
          <g transform="translate(185, 430)">
            <rect x="0" y="0" width="110" height="30" rx="15" fill="#072023" stroke="${c1}" stroke-width="1.5" />
            <text x="55" y="20" fill="${c3}" font-family="'Inter', system-ui, sans-serif" font-size="11" font-weight="800" text-anchor="middle">MODELS</text>
          </g>
          <g transform="translate(10, 225)">
            <rect x="0" y="0" width="110" height="30" rx="15" fill="#072023" stroke="${c2}" stroke-width="1.5" />
            <text x="55" y="20" fill="${c3}" font-family="'Inter', system-ui, sans-serif" font-size="11" font-weight="800" text-anchor="middle">GTM / BIZ</text>
          </g>
        </g>
      `;

    case 'pivot':
      return `
        <!-- Career Pivot Timeline Curve with 5-Year Checkpoint Pedestals -->
        <g transform="translate(1050, 190)">
          <circle cx="250" cy="250" r="190" fill="${c1}" opacity="0.18" filter="url(#glow_${id})" />
          
          <!-- Stepped Ascent Trajectory -->
          <path d="M 40 400 L 130 340 L 220 270 L 320 180 L 430 90" fill="none" stroke="${c1}" stroke-width="6" stroke-linecap="round" filter="url(#glow_${id})" />
          <path d="M 40 400 L 130 340 L 220 270 L 320 180 L 430 90" fill="none" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round" />
          
          <!-- Checkpoint 1: 5 Years -->
          <g transform="translate(110, 315)">
            <circle cx="20" cy="25" r="18" fill="#1b082e" stroke="${c2}" stroke-width="2.5" />
            <text x="20" y="30" fill="#ffffff" font-family="'Inter', system-ui, sans-serif" font-size="11" font-weight="900" text-anchor="middle">5Y</text>
            <rect x="-35" y="55" width="110" height="24" rx="12" fill="#2d0a47" stroke="${c1}" stroke-width="1.2" />
            <text x="20" y="71" fill="${c3}" font-family="'Inter', system-ui, sans-serif" font-size="10" font-weight="800" text-anchor="middle">ANALYTICS</text>
          </g>

          <!-- Checkpoint 2: 10 Years -->
          <g transform="translate(200, 245)">
            <circle cx="20" cy="25" r="20" fill="#240b3b" stroke="${c1}" stroke-width="3" />
            <text x="20" y="30" fill="#ffffff" font-family="'Inter', system-ui, sans-serif" font-size="12" font-weight="900" text-anchor="middle">10Y</text>
            <rect x="-40" y="55" width="120" height="24" rx="12" fill="#380e59" stroke="${c2}" stroke-width="1.2" />
            <text x="20" y="71" fill="${c3}" font-family="'Inter', system-ui, sans-serif" font-size="10" font-weight="800" text-anchor="middle">DATA ENG</text>
          </g>

          <!-- Checkpoint 3: 15 Years -->
          <g transform="translate(300, 155)">
            <circle cx="20" cy="25" r="22" fill="#300d4d" stroke="${c2}" stroke-width="3.5" />
            <text x="20" y="31" fill="#ffffff" font-family="'Inter', system-ui, sans-serif" font-size="13" font-weight="900" text-anchor="middle">15Y</text>
            <rect x="-45" y="55" width="130" height="24" rx="12" fill="#4a1275" stroke="${c1}" stroke-width="1.2" />
            <text x="20" y="71" fill="${c3}" font-family="'Inter', system-ui, sans-serif" font-size="10" font-weight="800" text-anchor="middle">GEN AI LEAD</text>
          </g>

          <!-- Checkpoint 4: 20 Years Star Peak -->
          <g transform="translate(405, 60)">
            <circle cx="25" cy="30" r="30" fill="url(#cardGrad_${id})" stroke="#ffffff" stroke-width="4" filter="url(#glow_${id})" />
            <text x="25" y="37" fill="#ffffff" font-family="'Inter', system-ui, sans-serif" font-size="16" font-weight="900" text-anchor="middle">20Y</text>
            <rect x="-45" y="72" width="140" height="28" rx="14" fill="#581c87" stroke="#ffffff" stroke-width="1.5" />
            <text x="25" y="90" fill="#ffffff" font-family="'Inter', system-ui, sans-serif" font-size="11" font-weight="900" text-anchor="middle">AGENTIC AI</text>
          </g>
        </g>
      `;

    case 'macro':
      return `
        <!-- Global Macro Compute Grid & Comparative Silicon Clusters -->
        <g transform="translate(1060, 200)">
          <circle cx="240" cy="240" r="190" fill="${c1}" opacity="0.16" filter="url(#glow_${id})" />
          
          <!-- Dual Orbital Globe Rings -->
          <ellipse cx="240" cy="240" rx="220" ry="85" fill="none" stroke="${c1}" stroke-width="2.5" opacity="0.4" transform="rotate(-25 240 240)" />
          <ellipse cx="240" cy="240" rx="220" ry="85" fill="none" stroke="${c2}" stroke-width="2.5" opacity="0.5" transform="rotate(35 240 240)" />
          
          <!-- Silicon Wafer 3D Architecture Box -->
          <g transform="translate(90, 100)">
            <rect x="0" y="0" width="300" height="230" rx="22" fill="#041224" fill-opacity="0.88" stroke="url(#cardGrad_${id})" stroke-width="3" filter="url(#glow_${id})" />
            
            <!-- Grid of Microchips -->
            <g transform="translate(35, 30)">
              ${[0, 1, 2].map(r => [0, 1, 2].map(c => `
                <rect x="${c * 80}" y="${r * 55}" width="65" height="42" rx="8" fill="#07223d" stroke="${c1}" stroke-width="1.5" />
                <circle cx="${c * 80 + 32}" cy="${r * 55 + 21}" r="6" fill="${c2}" />
                <line x1="${c * 80 + 10}" y1="${r * 55 + 21}" x2="${c * 80 + 55}" y2="${r * 55 + 21}" stroke="${c3}" stroke-width="1" stroke-dasharray="2 2" />
              `).join('')).join('')}
            </g>
            
            <rect x="50" y="180" width="200" height="28" rx="14" fill="#082b4c" stroke="${c2}" stroke-width="1.5" />
            <text x="150" y="198" fill="#ffffff" font-family="'Inter', system-ui, sans-serif" font-size="11" font-weight="900" text-anchor="middle" letter-spacing="1">COMPUTE INFRASTRUCTURE</text>
          </g>

          <!-- Strategic Metric Badge -->
          <g transform="translate(140, 350)">
            <rect x="0" y="0" width="200" height="44" rx="12" fill="#020917" stroke="#38bdf8" stroke-width="2" />
            <text x="100" y="27" fill="${c3}" font-family="'Inter', system-ui, sans-serif" font-size="12" font-weight="900" text-anchor="middle">ECOSYSTEM GAP ANALYSIS</text>
          </g>
        </g>
      `;

    case 'harmony':
      return `
        <!-- Harmonious Dual Orbit Balance Helix & Support Framework -->
        <g transform="translate(1060, 200)">
          <circle cx="240" cy="240" r="190" fill="${c1}" opacity="0.16" filter="url(#glow_${id})" />
          
          <!-- Interlocking Infinity Symmetry Helix -->
          <path d="M 120 240 C 120 150, 240 150, 240 240 C 240 330, 360 330, 360 240 C 360 150, 240 150, 240 240 C 240 330, 120 330, 120 240 Z" fill="none" stroke="${c1}" stroke-width="6" filter="url(#glow_${id})" />
          <path d="M 120 240 C 120 150, 240 150, 240 240 C 240 330, 360 330, 360 240 C 360 150, 240 150, 240 240 C 240 330, 120 330, 120 240 Z" fill="none" stroke="#ffffff" stroke-width="2" />
          
          <!-- Left Center: Life & Family Sphere -->
          <circle cx="160" cy="240" r="45" fill="#2d0a1b" stroke="${c2}" stroke-width="3" />
          <circle cx="160" cy="240" r="18" fill="${c1}" />
          <text x="160" y="315" fill="#fda4af" font-family="'Inter', system-ui, sans-serif" font-size="13" font-weight="800" text-anchor="middle">LIFE &amp; REBOOT</text>

          <!-- Right Center: Tech & Career Sphere -->
          <circle cx="320" cy="240" r="45" fill="#1b082e" stroke="${c3}" stroke-width="3" />
          <circle cx="320" cy="240" r="18" fill="${c2}" />
          <text x="320" y="315" fill="#fda4af" font-family="'Inter', system-ui, sans-serif" font-size="13" font-weight="800" text-anchor="middle">TECH HORIZON</text>

          <!-- Core Supportive Bridge Badge -->
          <g transform="translate(140, 110)">
            <rect x="0" y="0" width="200" height="42" rx="21" fill="#4c0519" stroke="#fda4af" stroke-width="2" />
            <text x="100" y="26" fill="#ffffff" font-family="'Inter', system-ui, sans-serif" font-size="12" font-weight="900" text-anchor="middle" letter-spacing="1">SYSTEMIC SUPPORT</text>
          </g>
        </g>
      `;

    case 'terminal':
      return `
        <!-- Vibe Coding 3D Terminal & Enterprise Production Guardrails -->
        <g transform="translate(1060, 200)">
          <circle cx="240" cy="240" r="190" fill="${c1}" opacity="0.16" filter="url(#glow_${id})" />
          
          <!-- 3D IDE Terminal Window -->
          <g transform="translate(50, 70)">
            <rect x="0" y="0" width="370" height="260" rx="20" fill="#041410" fill-opacity="0.9" stroke="url(#cardGrad_${id})" stroke-width="3" filter="url(#glow_${id})" />
            
            <!-- Window Titlebar -->
            <rect x="0" y="0" width="370" height="42" rx="20" fill="#06291e" />
            <circle cx="25" cy="21" r="6" fill="#ef4444" />
            <circle cx="45" cy="21" r="6" fill="#f59e0b" />
            <circle cx="65" cy="21" r="6" fill="#22c55e" />
            <text x="185" y="26" fill="#86efac" font-family="'JetBrains Mono', monospace" font-size="12" font-weight="700" text-anchor="middle">vibe_prototype.ts</text>
            
            <!-- Code Lines inside Terminal -->
            <g transform="translate(25, 65)">
              <text x="0" y="20" fill="#4ade80" font-family="'JetBrains Mono', monospace" font-size="14" font-weight="700">&gt; prompt: "Build full production agent"</text>
              <text x="0" y="45" fill="#38bdf8" font-family="'JetBrains Mono', monospace" font-size="14">&gt; status: 10x Velocity [Done in 12s] âœ“</text>
              <text x="0" y="70" fill="#facc15" font-family="'JetBrains Mono', monospace" font-size="14">&gt; testing: Unit tests, latency limits...</text>
              <text x="0" y="95" fill="#ef4444" font-family="'JetBrains Mono', monospace" font-size="14">&gt; error: Concurrency spike at scale!</text>
              
              <!-- Blinking Cursor -->
              <rect x="0" y="115" width="10" height="18" fill="#4ade80" />
            </g>
          </g>

          <!-- Guardrail Badge -->
          <g transform="translate(110, 350)">
            <rect x="0" y="0" width="250" height="48" rx="14" fill="#031f18" stroke="${c2}" stroke-width="2" />
            <text x="125" y="29" fill="#00f0ff" font-family="'Inter', system-ui, sans-serif" font-size="12" font-weight="900" text-anchor="middle" letter-spacing="1">ENTERPRISE LATENCY GUARD</text>
          </g>
        </g>
      `;

    case 'horoscope':
      return `
        <!-- Diagnostic Architecture Matrix: AI Hype vs Enterprise Integration -->
        <g transform="translate(1060, 200)">
          <circle cx="240" cy="240" r="190" fill="${c1}" opacity="0.18" filter="url(#glow_${id})" />
          
          <!-- Diagnostic Matrix Grid -->
          <g transform="translate(70, 80)">
            <rect x="0" y="0" width="340" height="240" rx="20" fill="#140604" fill-opacity="0.9" stroke="url(#cardGrad_${id})" stroke-width="3" filter="url(#glow_${id})" />
            
            <!-- Broken Chatbot Gimmick Side -->
            <rect x="25" y="30" width="130" height="130" rx="14" fill="#2d0a07" stroke="#ef4444" stroke-width="2" stroke-dasharray="4 4" />
            <circle cx="90" cy="75" r="22" fill="#ef4444" opacity="0.3" />
            <path d="M 75 75 L 105 75 M 90 60 L 90 90" stroke="#ef4444" stroke-width="3" stroke-linecap="round" />
            <text x="90" y="130" fill="#fca5a5" font-family="'Inter', system-ui, sans-serif" font-size="11" font-weight="800" text-anchor="middle">HOROSCOPE POV</text>
            <text x="90" y="148" fill="#f87171" font-family="'Inter', system-ui, sans-serif" font-size="10" text-anchor="middle">Zero Systemic ROI</text>

            <!-- Connected Workflow Pipeline Side -->
            <rect x="185" y="30" width="130" height="130" rx="14" fill="#0b2416" stroke="#22c55e" stroke-width="2.5" />
            <circle cx="250" cy="75" r="22" fill="#22c55e" opacity="0.3" />
            <path d="M 235 75 L 245 85 L 265 65" stroke="#22c55e" stroke-width="3.5" fill="none" stroke-linecap="round" />
            <text x="250" y="130" fill="#86efac" font-family="'Inter', system-ui, sans-serif" font-size="11" font-weight="900" text-anchor="middle">WORKFLOW FIT</text>
            <text x="250" y="148" fill="#4ade80" font-family="'Inter', system-ui, sans-serif" font-size="10" font-weight="700" text-anchor="middle">High Verified ROI</text>
            
            <rect x="40" y="185" width="260" height="34" rx="17" fill="#2d0a07" stroke="${c1}" stroke-width="1.5" />
            <text x="170" y="206" fill="#fdba74" font-family="'Inter', system-ui, sans-serif" font-size="11" font-weight="900" text-anchor="middle" letter-spacing="1">EXECUTION OVER HYPE</text>
          </g>
        </g>
      `;

    case 'harness':
      return `
        <!-- Armored Multi-Layer Production Agent Harness Framework -->
        <g transform="translate(1060, 200)">
          <circle cx="240" cy="240" r="190" fill="${c1}" opacity="0.2" filter="url(#glow_${id})" />
          
          <!-- Outer Harness Shield Matrix -->
          <polygon points="240,40 390,130 390,350 240,440 90,350 90,130" fill="#061633" fill-opacity="0.75" stroke="${c2}" stroke-width="3.5" filter="url(#glow_${id})" />
          <polygon points="240,75 355,145 355,335 240,405 125,335 125,145" fill="#0a2654" fill-opacity="0.8" stroke="${c1}" stroke-width="2" />
          
          <!-- Inner Core AI Brain -->
          <circle cx="240" cy="240" r="50" fill="url(#cardGrad_${id})" stroke="#ffffff" stroke-width="3.5" filter="url(#glow_${id})" />
          <circle cx="240" cy="240" r="22" fill="#ffffff" />
          <text x="240" y="325" fill="#93c5fd" font-family="'Inter', system-ui, sans-serif" font-size="13" font-weight="900" text-anchor="middle" letter-spacing="1.5">ENTERPRISE HARNESS</text>
          
          <!-- Orbiting Protection Nodes -->
          <g transform="translate(240, 100)">
            <circle cx="0" cy="0" r="14" fill="#0c4a6e" stroke="#38bdf8" stroke-width="2" />
            <text x="0" y="4" fill="#ffffff" font-family="'Inter', system-ui, sans-serif" font-size="9" font-weight="800" text-anchor="middle">API</text>
          </g>
          <g transform="translate(340, 240)">
            <circle cx="0" cy="0" r="14" fill="#1e3a8a" stroke="#60a5fa" stroke-width="2" />
            <text x="0" y="4" fill="#ffffff" font-family="'Inter', system-ui, sans-serif" font-size="8" font-weight="800" text-anchor="middle">RATE</text>
          </g>
          <g transform="translate(240, 380)">
            <circle cx="0" cy="0" r="14" fill="#0c4a6e" stroke="#38bdf8" stroke-width="2" />
            <text x="0" y="4" fill="#ffffff" font-family="'Inter', system-ui, sans-serif" font-size="8" font-weight="800" text-anchor="middle">AUTH</text>
          </g>
          <g transform="translate(140, 240)">
            <circle cx="0" cy="0" r="14" fill="#1e3a8a" stroke="#60a5fa" stroke-width="2" />
            <text x="0" y="4" fill="#ffffff" font-family="'Inter', system-ui, sans-serif" font-size="8" font-weight="800" text-anchor="middle">SAFE</text>
          </g>
        </g>
      `;

    default:
      return '';
  }
}

function buildSvg(item, idx) {
  const id = `cover_${idx}`;
  const artwork = generateVectorArtwork(item.art_type, item.c1, item.c2, item.c3, id);

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900" width="1600" height="900">
  <defs>
    <!-- Background Space Gradients -->
    <linearGradient id="bgGrad_${id}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${item.bg1}" />
      <stop offset="50%" stop-color="${item.bg2}" />
      <stop offset="100%" stop-color="#02050c" />
    </linearGradient>

    <!-- Card Artwork Gradient -->
    <linearGradient id="cardGrad_${id}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${item.c1}" />
      <stop offset="100%" stop-color="${item.c2}" />
    </linearGradient>

    <!-- Radial Ambient Glowing Orbs -->
    <radialGradient id="ambient1_${id}" cx="20%" cy="20%" r="65%">
      <stop offset="0%" stop-color="${item.c1}" stop-opacity="0.28" />
      <stop offset="100%" stop-color="#000000" stop-opacity="0" />
    </radialGradient>
    <radialGradient id="ambient2_${id}" cx="80%" cy="50%" r="60%">
      <stop offset="0%" stop-color="${item.c2}" stop-opacity="0.25" />
      <stop offset="100%" stop-color="#000000" stop-opacity="0" />
    </radialGradient>

    <!-- Drop Shadow / Glow Filter -->
    <filter id="glow_${id}" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="16" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
    <filter id="shadow_${id}" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="16" stdDeviation="20" flood-color="#000000" flood-opacity="0.75" />
    </filter>
  </defs>

  <!-- Canvas Deep Midnight Background -->
  <rect width="1600" height="900" fill="url(#bgGrad_${id})" />
  <rect width="1600" height="900" fill="url(#ambient1_${id})" />
  <rect width="1600" height="900" fill="url(#ambient2_${id})" />

  <!-- Perspective Tech Floor Grid -->
  <g opacity="0.12" stroke="${item.c1}" stroke-width="1.2">
    <line x1="0" y1="780" x2="1600" y2="780" />
    <line x1="0" y1="840" x2="1600" y2="840" />
    <line x1="150" y1="900" x2="600" y2="700" />
    <line x1="400" y1="900" x2="720" y2="700" />
    <line x1="1200" y1="900" x2="900" y2="700" />
    <line x1="1450" y1="900" x2="1020" y2="700" />
  </g>

  <!-- TOP HEADER BAR: ZiAn Brand Pill + Category Badge -->
  <g transform="translate(100, 80)">
    <!-- ZiAn Brand Pill -->
    <rect x="0" y="0" width="220" height="42" rx="21" fill="#040c1d" stroke="${item.c1}" stroke-opacity="0.5" stroke-width="1.5" />
    <circle cx="22" cy="21" r="5" fill="${item.c1}" filter="url(#glow_${id})" />
    <text x="120" y="27" fill="#ffffff" font-family="'Inter', system-ui, sans-serif" font-size="12" font-weight="900" text-anchor="middle" letter-spacing="1.5">ZIAN VENTURES</text>

    <!-- Podcast Series Pill -->
    <rect x="235" y="0" width="160" height="42" rx="21" fill="#061226" stroke="#ffffff" stroke-opacity="0.15" stroke-width="1.5" />
    <text x="315" y="27" fill="#94a3b8" font-family="'Inter', system-ui, sans-serif" font-size="12" font-weight="800" text-anchor="middle" letter-spacing="1">ACCESS ASIA</text>

    <!-- Distinct Category Badge -->
    <rect x="410" y="0" width="210" height="42" rx="21" fill="${item.badge_bg}" stroke="${item.badge_border}" stroke-width="2" filter="url(#glow_${id})" />
    <text x="515" y="27" fill="${item.badge_color}" font-family="'Inter', system-ui, sans-serif" font-size="12" font-weight="900" text-anchor="middle" letter-spacing="1.5">${item.category}</text>
  </g>

  <!-- MAIN EDITORIAL HEADLINE BLOCK (Left: X: 100, Y: 210) -->
  <g transform="translate(100, 210)">
    <!-- Format Pill -->
    <g transform="translate(0, 0)">
      <rect x="0" y="0" width="180" height="30" rx="8" fill="${item.c1}" fill-opacity="0.18" stroke="${item.c1}" stroke-width="1.5" />
      <text x="90" y="20" fill="${item.c3}" font-family="'Inter', system-ui, sans-serif" font-size="11" font-weight="900" text-anchor="middle" letter-spacing="1.5">${item.format}</text>
    </g>

    <!-- Title Line 1 (Pure White, Bold 56px) -->
    <text x="0" y="85" fill="#ffffff" font-family="'Inter', system-ui, sans-serif" font-size="52" font-weight="900" letter-spacing="-1.2">
      ${item.title_1}
    </text>

    <!-- Title Line 2 (Glowing Vibrant Color, Bold 52px) -->
    <text x="0" y="152" fill="${item.title_2_color}" font-family="'Inter', system-ui, sans-serif" font-size="52" font-weight="900" letter-spacing="-1.2" filter="url(#glow_${id})">
      ${item.title_2}
    </text>

    <!-- Subtitle (Clear Crisp 22px) -->
    <text x="0" y="222" fill="#cbd5e1" font-family="'Inter', system-ui, sans-serif" font-size="22" font-weight="600">
      ${item.subtitle}
    </text>

    <!-- Key Takeaway Thesis Box -->
    <g transform="translate(0, 260)">
      <rect x="0" y="0" width="850" height="52" rx="14" fill="#040d1f" fill-opacity="0.85" stroke="${item.c1}" stroke-opacity="0.4" stroke-width="1.5" />
      <circle cx="26" cy="26" r="10" fill="${item.c1}" fill-opacity="0.25" stroke="${item.c1}" stroke-width="1.5" />
      <text x="26" y="30" fill="${item.c3}" font-family="'Inter', system-ui, sans-serif" font-size="12" font-weight="900" text-anchor="middle">★</text>
      <text x="50" y="32" fill="#e2e8f0" font-family="'Inter', system-ui, sans-serif" font-size="16" font-weight="700">
        ${item.takeaway}
      </text>
    </g>
  </g>

  <!-- RIGHT SIDE VECTOR ARTWORK -->
  ${artwork}

  <!-- BOTTOM SPEAKER / AUTHOR PROFILE BAR -->
  <g transform="translate(100, 680)">
    <!-- Container Card -->
    <rect x="0" y="0" width="850" height="96" rx="20" fill="#051226" fill-opacity="0.9" stroke="url(#cardGrad_${id})" stroke-width="2" filter="url(#shadow_${id})" />

    <!-- Avatar Circle -->
    <g transform="translate(24, 18)">
      <circle cx="30" cy="30" r="30" fill="url(#cardGrad_${id})" stroke="#ffffff" stroke-width="2.5" />
      <text x="30" y="38" fill="#ffffff" font-family="'Inter', system-ui, sans-serif" font-size="20" font-weight="900" text-anchor="middle">${item.initials}</text>
    </g>

    <!-- Speaker Name & Role -->
    <g transform="translate(104, 38)">
      <text x="0" y="0" fill="#ffffff" font-family="'Inter', system-ui, sans-serif" font-size="22" font-weight="900">${item.guest_name}</text>
      <text x="0" y="24" fill="${item.c3}" font-family="'Inter', system-ui, sans-serif" font-size="14" font-weight="700">${item.guest_role}</text>
    </g>

    <!-- Meta Read Time Badge -->
    <g transform="translate(670, 32)">
      <rect x="0" y="0" width="150" height="34" rx="17" fill="#091c36" stroke="${item.c1}" stroke-width="1.5" />
      <text x="75" y="22" fill="#ffffff" font-family="'Inter', system-ui, sans-serif" font-size="12" font-weight="800" text-anchor="middle">â ± ${item.read_time}</text>
    </g>
  </g>

  <!-- Outer Rounded Tech Accent Border -->
  <rect x="30" y="30" width="1540" height="840" rx="28" fill="none" stroke="${item.c1}" stroke-opacity="0.3" stroke-width="2" />
</svg>`;
}

console.log(`Generating ${podcastCovers.length} rich editorial covers...`);

podcastCovers.forEach((item, idx) => {
  const svgContent = buildSvg(item, idx);
  targetDirs.forEach((d) => {
    const dest = path.join(d, item.filename);
    fs.writeFileSync(dest, svgContent, 'utf8');
  });
  console.log(`[DONE] ${item.filename} created across all target folders.`);
});

console.log('All podcast covers successfully created!');
