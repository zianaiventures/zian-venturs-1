import os

svg_dir = r'public/blog/meeting-notes'
os.makedirs(svg_dir, exist_ok=True)

# 15 distinct high-end dark SVG visuals matching each meeting notes document topic
svg_configs = [
    ('clinical-evidence-pipeline.svg', 'Evidence Pipeline', '#38bdf8', '#2563eb', 'pipeline'),
    ('real-world-pilots.svg', 'Real World Pilots', '#34d399', '#059669', 'pilots'),
    ('medtech-sequenced-launches.svg', 'MedTech Launch', '#60a5fa', '#1d4ed8', 'launch'),
    ('foundry-model.svg', 'Healthcare Foundry', '#818cf8', '#4f46e5', 'foundry'),
    ('healthcare-grants-funding.svg', 'Grants Funding', '#fbbf24', '#d97706', 'grants'),
    ('doctor-fundraising-materials.svg', 'Fundraising Readiness', '#38bdf8', '#2563eb', 'fundraising'),
    ('healthcare-venture-models.svg', 'Venture Models', '#60a5fa', '#2563eb', 'venture'),
    ('venture-studios-paid.svg', 'Studio Economics', '#a78bfa', '#7c3aed', 'economics'),
    ('doctor-business-cofounder.svg', 'Co-Founder Partnership', '#38bdf8', '#0284c7', 'cofounder'),
    ('commercialization-timeline.svg', 'Commercialization Roadmap', '#34d399', '#10b981', 'timeline'),
    ('seasonal-government-traps.svg', 'Sales Channel Strategy', '#f87171', '#dc2626', 'traps'),
    ('hospital-government-sales.svg', 'Hospital Procurement', '#38bdf8', '#1d4ed8', 'procurement'),
    ('clinic-brand-architecture.svg', 'Clinic Brand Architecture', '#60a5fa', '#2563eb', 'brand'),
    ('revenue-diversification.svg', 'Practice Revenue Expansion', '#34d399', '#059669', 'revenue'),
    ('hybrid-specialty-clinic.svg', 'Hybrid Clinic Model', '#38bdf8', '#2563eb', 'hybrid'),
    ('meeting-notes-fallback.svg', 'ZiAn Meeting Notes', '#38bdf8', '#2563eb', 'fallback'),
]

for filename, title, c1, c2, theme in svg_configs:
    filepath = os.path.join(svg_dir, filename)
    svg = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900" width="1600" height="900">
  <defs>
    <linearGradient id="bg_{theme}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#04070e" />
      <stop offset="40%" stop-color="#051933" />
      <stop offset="100%" stop-color="#020b18" />
    </linearGradient>
    <linearGradient id="grad_{theme}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="{c1}" />
      <stop offset="100%" stop-color="{c2}" />
    </linearGradient>
    <radialGradient id="radial_{theme}" cx="65%" cy="45%" r="55%">
      <stop offset="0%" stop-color="{c1}" stop-opacity="0.22" />
      <stop offset="100%" stop-color="#04070e" stop-opacity="0" />
    </radialGradient>
    <filter id="glow_{theme}" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="12" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>

  <!-- Deep Navy Base -->
  <rect width="1600" height="900" fill="url(#bg_{theme})" />
  <rect width="1600" height="900" fill="url(#radial_{theme})" />

  <!-- Perspective Floor Grid -->
  <g opacity="0.12" stroke="{c1}" stroke-width="1">
    <line x1="200" y1="850" x2="800" y2="450" />
    <line x1="500" y1="850" x2="800" y2="450" />
    <line x1="800" y1="850" x2="800" y2="450" />
    <line x1="1100" y1="850" x2="800" y2="450" />
    <line x1="1400" y1="850" x2="800" y2="450" />
    <ellipse cx="800" cy="720" rx="600" ry="130" fill="none" stroke-dasharray="6 6" />
  </g>

  <!-- High-End 3D Visual Centerpiece -->
  <g transform="translate(800, 450)">
    <!-- Ambient Orbital Rings -->
    <ellipse cx="0" cy="0" rx="360" ry="120" fill="none" stroke="{c1}" stroke-opacity="0.25" stroke-width="1.5" stroke-dasharray="12 8" transform="rotate(-15)" />
    <ellipse cx="0" cy="0" rx="280" ry="90" fill="none" stroke="{c2}" stroke-opacity="0.35" stroke-width="2" transform="rotate(25)" />

    <!-- Central Isometric Glass Device Matrix -->
    <g transform="translate(-180, -140)">
      <polygon points="180,0 360,104 180,208 0,104" fill="#071933" fill-opacity="0.75" stroke="url(#grad_{theme})" stroke-width="2" />
      <polygon points="0,104 180,208 180,288 0,184" fill="#030d1d" fill-opacity="0.85" stroke="url(#grad_{theme})" stroke-width="1.5" />
      <polygon points="180,208 360,104 360,184 180,288" fill="#0b2344" fill-opacity="0.85" stroke="url(#grad_{theme})" stroke-width="1.5" />

      <!-- Floating Inner Glass Core -->
      <polygon points="180,-40 300,30 180,100 60,30" fill="url(#grad_{theme})" fill-opacity="0.25" stroke="{c1}" stroke-width="1.5" filter="url(#glow_{theme})" />
      <circle cx="180" cy="30" r="28" fill="url(#grad_{theme})" opacity="0.9" filter="url(#glow_{theme})" />
      <circle cx="180" cy="30" r="12" fill="#ffffff" opacity="0.95" />
    </g>

    <!-- Floating Data Nodes and Digital Pulses -->
    <circle cx="-260" cy="-80" r="8" fill="{c1}" filter="url(#glow_{theme})" />
    <line x1="-260" y1="-80" x2="-140" y2="-40" stroke="{c1}" stroke-opacity="0.4" stroke-width="1.5" stroke-dasharray="4 4" />

    <circle cx="280" cy="60" r="10" fill="{c1}" filter="url(#glow_{theme})" />
    <line x1="280" y1="60" x2="160" y2="20" stroke="{c2}" stroke-opacity="0.4" stroke-width="1.5" stroke-dasharray="4 4" />

    <circle cx="-180" cy="140" r="6" fill="{c2}" />
    <circle cx="220" cy="-140" r="7" fill="{c1}" />
  </g>

  <!-- Accent Glow Highlights -->
  <circle cx="240" cy="180" r="3" fill="{c1}" opacity="0.7" />
  <circle cx="1380" cy="240" r="4" fill="{c1}" opacity="0.8" />
  <circle cx="1260" cy="720" r="3" fill="{c2}" opacity="0.6" />
  <circle cx="320" cy="760" r="3.5" fill="{c1}" opacity="0.5" />
</svg>"""
    with open(filepath, 'w', encoding='utf-8') as s:
        s.write(svg)

print(f"Successfully created {len(svg_configs)} high-end dark SVGs in {svg_dir}")
