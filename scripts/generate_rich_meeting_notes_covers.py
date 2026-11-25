import os

svg_dir = r'public/blog/meeting-notes'
os.makedirs(svg_dir, exist_ok=True)

# 16 distinct, high-impact editorial cover designs
covers = [
    {
        "filename": "clinical-evidence-pipeline.svg",
        "category": "CLINICAL EVIDENCE & PILOTS",
        "title1": "CLINICAL EVIDENCE",
        "title2": "PIPELINE FOR AI",
        "subtitle": "Why AI Diagnostics Need Evidence Pipelines Before Scaling",
        "accent": "#38bdf8",
        "accent_glow": "#2563eb",
        "badge": "MEDTECH EXEC BRIEFING",
        "icon_type": "pipeline",
    },
    {
        "filename": "clinic-brand-architecture.svg",
        "category": "SPECIALTY HEALTHCARE PRACTICES",
        "title1": "CLINIC BRAND",
        "title2": "ARCHITECTURE",
        "subtitle": "Why Growing Practices Shouldn't Just Be the Doctor's Name",
        "accent": "#60a5fa",
        "accent_glow": "#1d4ed8",
        "badge": "PRACTICE SCALING PLAYBOOK",
        "icon_type": "brand",
    },
    {
        "filename": "equity-fees-revenue-share.svg",
        "category": "VENTURE BUILDING",
        "title1": "EQUITY, FEES OR",
        "title2": "REVENUE SHARE",
        "subtitle": "Choosing the Right Healthcare Venture Builder for Your Stage",
        "accent": "#a78bfa",
        "accent_glow": "#7c3aed",
        "badge": "STUDIO COMP & STRUCTURING",
        "icon_type": "scales",
    },
    {
        "filename": "foundry-model.svg",
        "category": "HEALTHCARE INNOVATION",
        "title1": "THE HEALTHCARE",
        "title2": "FOUNDRY MODEL",
        "subtitle": "Why Innovation Needs Studio Platforms, Not Single Bets",
        "accent": "#38bdf8",
        "accent_glow": "#0284c7",
        "badge": "VENTURE ARCHITECTURE",
        "icon_type": "foundry",
    },
    {
        "filename": "healthcare-grants-funding.svg",
        "category": "INVESTMENT & FUNDRAISING",
        "title1": "NON-DILUTIVE",
        "title2": "GRANTS FIRST",
        "subtitle": "Why Grants Should Fund the First Stage of Deep HealthTech",
        "accent": "#fbbf24",
        "accent_glow": "#d97706",
        "badge": "NON-DILUTIVE FINANCING",
        "icon_type": "grants",
    },
    {
        "filename": "doctor-fundraising-materials.svg",
        "category": "INVESTMENT & FUNDRAISING",
        "title1": "DOCTOR FUNDRAISING",
        "title2": "READINESS",
        "subtitle": "Why Investment Materials Must Come Before Investor Outreach",
        "accent": "#34d399",
        "accent_glow": "#059669",
        "badge": "CAPITAL RAISING PLAYBOOK",
        "icon_type": "dossier",
    },
    {
        "filename": "venture-studios-paid.svg",
        "category": "VENTURE BUILDING",
        "title1": "HOW VENTURE",
        "title2": "STUDIOS GET PAID",
        "subtitle": "Retainers, Success Fees, Equity, & Revenue Share Explained",
        "accent": "#c084fc",
        "accent_glow": "#9333ea",
        "badge": "STUDIO ECONOMICS",
        "icon_type": "economics",
    },
    {
        "filename": "real-world-pilots.svg",
        "category": "CLINICAL EVIDENCE & PILOTS",
        "title1": "REAL-WORLD PILOTS",
        "title2": "VS CLINICAL TRIALS",
        "subtitle": "Why Healthcare Software Requires In-Hospital Workflow Validation",
        "accent": "#38bdf8",
        "accent_glow": "#2563eb",
        "badge": "HOSPITAL INTEGRATION",
        "icon_type": "pilots",
    },
    {
        "filename": "commercialization-timeline.svg",
        "category": "HEALTHCARE COMMERCIALIZATION",
        "title1": "5 TO 7 YEAR",
        "title2": "COMMERCIAL ROADMAP",
        "subtitle": "The Realistic Multi-Year Timeline of Healthcare Commercialization",
        "accent": "#34d399",
        "accent_glow": "#10b981",
        "badge": "CAPITAL PLANNING",
        "icon_type": "timeline",
    },
    {
        "filename": "revenue-diversification.svg",
        "category": "SPECIALTY HEALTHCARE PRACTICES",
        "title1": "SPECIALTY PRACTICE",
        "title2": "REVENUE DIVERSITY",
        "subtitle": "Why Specialty Clinics Need More Than Consultation Cashflow",
        "accent": "#38bdf8",
        "accent_glow": "#2563eb",
        "badge": "REVENUE ARCHITECTURE",
        "icon_type": "revenue",
    },
    {
        "filename": "seasonal-government-traps.svg",
        "category": "HEALTHCARE COMMERCIALIZATION",
        "title1": "SEASONAL & GOVT",
        "title2": "SALES TRAPS",
        "subtitle": "Surviving Fiscal Cycle Delays in Enterprise Healthcare Sales",
        "accent": "#f87171",
        "accent_glow": "#dc2626",
        "badge": "SALES RISK MITIGATION",
        "icon_type": "trap",
    },
    {
        "filename": "hybrid-specialty-clinic.svg",
        "category": "SPECIALTY HEALTHCARE PRACTICES",
        "title1": "THE HYBRID",
        "title2": "CLINIC MODEL",
        "subtitle": "Why Specialty Practices Should Go Hybrid, Not Online-Only",
        "accent": "#60a5fa",
        "accent_glow": "#2563eb",
        "badge": "CLINICAL OPERATIONS",
        "icon_type": "hybrid",
    },
    {
        "filename": "doctor-business-cofounder.svg",
        "category": "VENTURE BUILDING",
        "title1": "THE DOCTOR &",
        "title2": "CO-FOUNDER DUO",
        "subtitle": "Why Great Clinical Ideas Need an Operational Co-Founder",
        "accent": "#38bdf8",
        "accent_glow": "#0284c7",
        "badge": "FOUNDING TEAM FORMATION",
        "icon_type": "gears",
    },
    {
        "filename": "medtech-sequenced-launches.svg",
        "category": "MEDTECH & AI DIAGNOSTICS",
        "title1": "SEQUENCED",
        "title2": "MEDTECH LAUNCHES",
        "subtitle": "Why Device & Software Launches Should Be Sequenced",
        "accent": "#818cf8",
        "accent_glow": "#4f46e5",
        "badge": "MARKET ENTRY STRATEGY",
        "icon_type": "rocket",
    },
    {
        "filename": "hospital-government-sales.svg",
        "category": "HEALTHCARE COMMERCIALIZATION",
        "title1": "SELLING TO",
        "title2": "HOSPITAL BUYERS",
        "subtitle": "Navigating Procurement Committees & Institutional Timelines",
        "accent": "#38bdf8",
        "accent_glow": "#1d4ed8",
        "badge": "ENTERPRISE PROCUREMENT",
        "icon_type": "hospital",
    },
    {
        "filename": "meeting-notes-fallback.svg",
        "category": "ZIAN VENTURE KNOWLEDGE",
        "title1": "EXECUTIVE",
        "title2": "MEETING NOTES",
        "subtitle": "Venture Architecture & Healthcare Commercialization Playbooks",
        "accent": "#38bdf8",
        "accent_glow": "#2563eb",
        "badge": "KNOWLEDGE REPOSITORY",
        "icon_type": "shield",
    },
]

def render_icon(icon_type, accent, accent_glow):
    if icon_type == "pipeline":
        return f"""
        <!-- Clinical Pipeline Isometric Diagram -->
        <g transform="translate(100, 20)">
          <!-- Node 1: AI Model -->
          <rect x="-160" y="-120" width="160" height="90" rx="16" fill="#071b38" stroke="{accent}" stroke-width="3" filter="url(#glow)" />
          <text x="-80" y="-75" fill="#ffffff" font-family="'Inter', sans-serif" font-size="14" font-weight="700" text-anchor="middle">AI ALGORITHM</text>
          <text x="-80" y="-55" fill="{accent}" font-family="'Inter', sans-serif" font-size="11" font-weight="600" text-anchor="middle">98.4% SENSITIVITY</text>

          <!-- Connector Flow 1 -->
          <path d="M 0 -75 L 80 -75" stroke="{accent}" stroke-width="4" stroke-dasharray="8 6" />
          <polygon points="80,-75 68,-82 68,-68" fill="{accent}" />

          <!-- Node 2: Clinical Trial -->
          <rect x="90" y="-130" width="180" height="110" rx="20" fill="#0a254d" stroke="#ffffff" stroke-width="3.5" filter="url(#glow)" />
          <circle cx="180" cy="-75" r="28" fill="{accent}" opacity="0.25" />
          <path d="M 180 -95 L 180 -55 M 160 -75 L 200 -75" stroke="{accent}" stroke-width="4" stroke-linecap="round" />
          <text x="180" y="-35" fill="#ffffff" font-family="'Inter', sans-serif" font-size="12" font-weight="700" text-anchor="middle">CLINICAL TRIALS</text>

          <!-- Connector Flow 2 -->
          <path d="M 270 -75 L 340 -75" stroke="{accent}" stroke-width="4" stroke-dasharray="8 6" />
          <polygon points="340,-75 328,-82 328,-68" fill="{accent}" />

          <!-- Node 3: Real World Hospital -->
          <rect x="350" y="-120" width="160" height="90" rx="16" fill="#071b38" stroke="{accent}" stroke-width="3" />
          <text x="430" y="-75" fill="#ffffff" font-family="'Inter', sans-serif" font-size="14" font-weight="700" text-anchor="middle">EHR DEPLOYMENT</text>
          <text x="430" y="-55" fill="#34d399" font-family="'Inter', sans-serif" font-size="11" font-weight="600" text-anchor="middle">LIVE WORKFLOW</text>

          <!-- Lower Validation Matrix -->
          <rect x="-100" y="30" width="550" height="150" rx="24" fill="#041226" stroke="{accent}" stroke-opacity="0.4" stroke-width="2" />
          <line x1="-100" y1="80" x2="450" y2="80" stroke="{accent}" stroke-opacity="0.2" />
          <text x="-70" y="62" fill="#7dd3fc" font-family="'Inter', sans-serif" font-size="13" font-weight="700">VALIDATION STAGE</text>
          <text x="120" y="62" fill="#7dd3fc" font-family="'Inter', sans-serif" font-size="13" font-weight="700">REGULATORY TARGET</text>
          <text x="320" y="62" fill="#7dd3fc" font-family="'Inter', sans-serif" font-size="13" font-weight="700">COMMERCIAL READINESS</text>
          
          <circle cx="-60" cy="120" r="10" fill="#34d399" />
          <text x="-40" y="125" fill="#ffffff" font-family="'Inter', sans-serif" font-size="14" font-weight="600">Stage 01: IRB Approval</text>
          <circle cx="130" cy="120" r="10" fill="{accent}" />
          <text x="150" y="125" fill="#ffffff" font-family="'Inter', sans-serif" font-size="14" font-weight="600">FDA 510(k) Cleared</text>
          <circle cx="330" cy="120" r="10" fill="{accent_glow}" />
          <text x="350" y="125" fill="#ffffff" font-family="'Inter', sans-serif" font-size="14" font-weight="600">Hospital Procurement</text>
        </g>
        """
    elif icon_type == "brand":
        return f"""
        <!-- Clinic Architecture Multi-Node Network -->
        <g transform="translate(180, 20)">
          <!-- Core Central Clinic Shield -->
          <rect x="0" y="-120" width="220" height="140" rx="24" fill="#0a254d" stroke="{accent}" stroke-width="3.5" filter="url(#glow)" />
          <text x="110" y="-70" fill="#ffffff" font-family="'Inter', sans-serif" font-size="16" font-weight="800" text-anchor="middle">INSTITUTIONAL BRAND</text>
          <text x="110" y="-45" fill="{accent}" font-family="'Inter', sans-serif" font-size="12" font-weight="600" text-anchor="middle">Scalable Clinic Platform</text>
          <circle cx="110" cy="-10" r="16" fill="{accent}" opacity="0.3" />
          <circle cx="110" cy="-10" r="7" fill="{accent}" />

          <!-- Location 1 -->
          <rect x="-180" y="80" width="160" height="90" rx="16" fill="#071b38" stroke="{accent}" stroke-width="2" />
          <text x="-100" y="125" fill="#ffffff" font-family="'Inter', sans-serif" font-size="13" font-weight="700" text-anchor="middle">METRO CLINIC 01</text>
          <text x="-100" y="145" fill="#94a3b8" font-family="'Inter', sans-serif" font-size="11" text-anchor="middle">Partner Clinicians</text>
          <line x1="-20" y1="80" x2="60" y2="20" stroke="{accent}" stroke-width="2.5" stroke-dasharray="6 4" />

          <!-- Location 2 -->
          <rect x="30" y="90" width="160" height="90" rx="16" fill="#071b38" stroke="{accent}" stroke-width="2" />
          <text x="110" y="135" fill="#ffffff" font-family="'Inter', sans-serif" font-size="13" font-weight="700" text-anchor="middle">REGIONAL HUB 02</text>
          <text x="110" y="155" fill="#94a3b8" font-family="'Inter', sans-serif" font-size="11" text-anchor="middle">Specialty Protocols</text>
          <line x1="110" y1="90" x2="110" y2="20" stroke="{accent}" stroke-width="2.5" stroke-dasharray="6 4" />

          <!-- Location 3 -->
          <rect x="240" y="80" width="160" height="90" rx="16" fill="#071b38" stroke="{accent}" stroke-width="2" />
          <text x="320" y="125" fill="#ffffff" font-family="'Inter', sans-serif" font-size="13" font-weight="700" text-anchor="middle">FLAGSHIP CENTER 03</text>
          <text x="320" y="145" fill="#94a3b8" font-family="'Inter', sans-serif" font-size="11" text-anchor="middle">Surgical Suites</text>
          <line x1="240" y1="80" x2="160" y2="20" stroke="{accent}" stroke-width="2.5" stroke-dasharray="6 4" />
        </g>
        """
    elif icon_type == "scales":
        return f"""
        <!-- 3-Way Compensation Balance Structure -->
        <g transform="translate(240, 20)">
          <!-- Balance Fulcrum -->
          <polygon points="120,-80 150,-10 90,-10" fill="#0a254d" stroke="{accent}" stroke-width="3" />
          <line x1="-80" y1="-80" x2="320" y2="-80" stroke="{accent}" stroke-width="6" stroke-linecap="round" />
          <circle cx="120" cy="-80" r="14" fill="{accent}" filter="url(#glow)" />

          <!-- Pan 1: Retainer -->
          <line x1="-40" y1="-80" x2="-80" y2="20" stroke="{accent}" stroke-width="2" />
          <line x1="-40" y1="-80" x2="0" y2="20" stroke="{accent}" stroke-width="2" />
          <rect x="-100" y="20" width="120" height="80" rx="16" fill="#071b38" stroke="{accent}" stroke-width="2.5" />
          <text x="-40" y="55" fill="#ffffff" font-family="'Inter', sans-serif" font-size="14" font-weight="800" text-anchor="middle">RETAINER</text>
          <text x="-40" y="75" fill="#7dd3fc" font-family="'Inter', sans-serif" font-size="11" text-anchor="middle">Monthly Execution</text>

          <!-- Pan 2: Equity -->
          <line x1="280" y1="-80" x2="240" y2="20" stroke="{accent}" stroke-width="2" />
          <line x1="280" y1="-80" x2="320" y2="20" stroke="{accent}" stroke-width="2" />
          <rect x="220" y="20" width="120" height="80" rx="16" fill="#071b38" stroke="{accent}" stroke-width="2.5" />
          <text x="280" y="55" fill="#ffffff" font-family="'Inter', sans-serif" font-size="14" font-weight="800" text-anchor="middle">EQUITY</text>
          <text x="280" y="75" fill="#c084fc" font-family="'Inter', sans-serif" font-size="11" text-anchor="middle">10% - 25% Stake</text>

          <!-- Center Pan: Rev Share -->
          <rect x="50" y="60" width="140" height="90" rx="18" fill="#0a254d" stroke="{accent}" stroke-width="3" filter="url(#glow)" />
          <text x="120" y="100" fill="#ffffff" font-family="'Inter', sans-serif" font-size="14" font-weight="800" text-anchor="middle">REV SHARE</text>
          <text x="120" y="125" fill="#34d399" font-family="'Inter', sans-serif" font-size="11" text-anchor="middle">Royalty Alignment</text>
        </g>
        """
    elif icon_type == "grants":
        return f"""
        <!-- Non-Dilutive Grant Funding Pipeline -->
        <g transform="translate(160, 20)">
          <!-- Grant Certificate Shield -->
          <rect x="-80" y="-120" width="220" height="260" rx="24" fill="#071b38" stroke="{accent}" stroke-width="3.5" filter="url(#glow)" />
          <rect x="-60" y="-100" width="180" height="40" rx="12" fill="#fbbf24" fill-opacity="0.2" stroke="#fbbf24" stroke-width="1.5" />
          <text x="30" y="-75" fill="#fef08a" font-family="'Inter', sans-serif" font-size="13" font-weight="800" text-anchor="middle">NON-DILUTIVE $2M</text>
          <circle cx="30" cy="-10" r="34" fill="#fbbf24" opacity="0.2" />
          <text x="30" y="0" fill="#fbbf24" font-family="'Inter', sans-serif" font-size="28" font-weight="900" text-anchor="middle">₹</text>

          <line x1="-50" y1="50" x2="110" y2="50" stroke="{accent}" stroke-opacity="0.3" stroke-width="2" />
          <text x="30" y="75" fill="#ffffff" font-family="'Inter', sans-serif" font-size="13" font-weight="700" text-anchor="middle">ZERO EQUITY LOSS</text>
          <text x="30" y="100" fill="#94a3b8" font-family="'Inter', sans-serif" font-size="11" text-anchor="middle">De-Risk Clinical R&amp;D</text>

          <!-- Arrow Flow -->
          <path d="M 160 10 L 260 10" stroke="{accent}" stroke-width="4" stroke-dasharray="6 4" />
          <polygon points="260,10 248,3 248,17" fill="{accent}" />

          <!-- Series A Launch -->
          <rect x="270" y="-50" width="180" height="130" rx="20" fill="#0a254d" stroke="#34d399" stroke-width="3" filter="url(#glow)" />
          <text x="360" y="-10" fill="#34d399" font-family="'Inter', sans-serif" font-size="14" font-weight="800" text-anchor="middle">SERIES A VALUATION</text>
          <text x="360" y="20" fill="#ffffff" font-family="'Inter', sans-serif" font-size="22" font-weight="900" text-anchor="middle">3x - 5x HIGHER</text>
          <text x="360" y="50" fill="#94a3b8" font-family="'Inter', sans-serif" font-size="11" text-anchor="middle">Proven Clinical Data</text>
        </g>
        """
    elif icon_type == "hospital":
        return f"""
        <!-- Hospital Enterprise Procurement Maze -->
        <g transform="translate(180, 20)">
          <!-- Hospital Tower Graphic -->
          <rect x="0" y="-140" width="160" height="280" rx="20" fill="#071b38" stroke="{accent}" stroke-width="3.5" filter="url(#glow)" />
          <!-- Hospital Cross Symbol -->
          <circle cx="80" cy="-90" r="28" fill="{accent}" opacity="0.2" />
          <path d="M 80 -105 L 80 -75 M 65 -90 L 95 -90" stroke="{accent}" stroke-width="5" stroke-linecap="round" />
          
          <text x="80" y="-40" fill="#ffffff" font-family="'Inter', sans-serif" font-size="15" font-weight="800" text-anchor="middle">ENTERPRISE</text>
          <text x="80" y="-20" fill="{accent}" font-family="'Inter', sans-serif" font-size="12" font-weight="700" text-anchor="middle">HOSPITAL SYSTEM</text>

          <rect x="20" y="10" width="120" height="30" rx="8" fill="#041226" stroke="{accent}" stroke-width="1.5" />
          <text x="80" y="30" fill="#94a3b8" font-family="'Inter', sans-serif" font-size="10" text-anchor="middle">CIO &bull; CMIO Review</text>
          <rect x="20" y="50" width="120" height="30" rx="8" fill="#041226" stroke="{accent}" stroke-width="1.5" />
          <text x="80" y="70" fill="#94a3b8" font-family="'Inter', sans-serif" font-size="10" text-anchor="middle">Security &bull; HIPAA</text>
          <rect x="20" y="90" width="120" height="30" rx="8" fill="#34d399" fill-opacity="0.2" stroke="#34d399" stroke-width="1.5" />
          <text x="80" y="110" fill="#34d399" font-family="'Inter', sans-serif" font-size="11" font-weight="700" text-anchor="middle">PO Approved</text>

          <!-- Cycle Time Badge -->
          <rect x="200" y="-50" width="180" height="110" rx="18" fill="#0a254d" stroke="#f87171" stroke-width="2.5" />
          <text x="290" y="-15" fill="#fca5a5" font-family="'Inter', sans-serif" font-size="12" font-weight="700" text-anchor="middle">SALES CYCLE WARNING</text>
          <text x="290" y="15" fill="#ffffff" font-family="'Inter', sans-serif" font-size="24" font-weight="900" text-anchor="middle">12 - 18 MOS</text>
          <text x="290" y="38" fill="#94a3b8" font-family="'Inter', sans-serif" font-size="11" text-anchor="middle">Plan Capital Runway</text>
        </g>
        """
    elif icon_type == "timeline":
        return f"""
        <!-- 7-Year Staged Commercialization Gantt Roadmap -->
        <g transform="translate(120, 20)">
          <!-- Year 1-2 -->
          <rect x="-60" y="-120" width="220" height="65" rx="14" fill="#071b38" stroke="{accent}" stroke-width="2.5" />
          <text x="-40" y="-80" fill="{accent}" font-family="'Inter', sans-serif" font-size="13" font-weight="800">YEARS 1 - 2</text>
          <text x="60" y="-80" fill="#ffffff" font-family="'Inter', sans-serif" font-size="13" font-weight="600">Lab Validation &amp; IRB</text>

          <!-- Year 3-4 -->
          <rect x="20" y="-35" width="260" height="65" rx="14" fill="#0a254d" stroke="{accent}" stroke-width="2.5" filter="url(#glow)" />
          <text x="40" y="5" fill="{accent}" font-family="'Inter', sans-serif" font-size="13" font-weight="800">YEARS 3 - 4</text>
          <text x="145" y="5" fill="#ffffff" font-family="'Inter', sans-serif" font-size="13" font-weight="600">Multi-Site Clinical Trials</text>

          <!-- Year 5-7 -->
          <rect x="100" y="50" width="300" height="75" rx="16" fill="#041226" stroke="#34d399" stroke-width="3" />
          <text x="125" y="95" fill="#34d399" font-family="'Inter', sans-serif" font-size="14" font-weight="800">YEARS 5 - 7</text>
          <text x="250" y="95" fill="#ffffff" font-family="'Inter', sans-serif" font-size="14" font-weight="700">Enterprise Commercial Scale</text>
        </g>
        """
    elif icon_type == "gears":
        return f"""
        <!-- Interlocking Clinical + Business Co-Founder Gears -->
        <g transform="translate(200, 20)">
          <!-- Gear 1: Clinical Credibility -->
          <circle cx="20" cy="-30" r="85" fill="#071b38" stroke="{accent}" stroke-width="4" filter="url(#glow)" />
          <circle cx="20" cy="-30" r="30" fill="{accent}" opacity="0.2" />
          <text x="20" y="-35" fill="#ffffff" font-family="'Inter', sans-serif" font-size="14" font-weight="800" text-anchor="middle">DOCTOR</text>
          <text x="20" y="-15" fill="{accent}" font-family="'Inter', sans-serif" font-size="11" font-weight="600" text-anchor="middle">Clinical Authority</text>

          <!-- Gear 2: Commercial Execution -->
          <circle cx="160" cy="50" r="85" fill="#0a254d" stroke="#34d399" stroke-width="4" filter="url(#glow)" />
          <circle cx="160" cy="50" r="30" fill="#34d399" opacity="0.2" />
          <text x="160" y="45" fill="#ffffff" font-family="'Inter', sans-serif" font-size="14" font-weight="800" text-anchor="middle">OPERATOR</text>
          <text x="160" y="65" fill="#34d399" font-family="'Inter', sans-serif" font-size="11" font-weight="600" text-anchor="middle">Venture Scale</text>

          <!-- Interlocking Spark -->
          <circle cx="90" cy="10" r="10" fill="#ffffff" filter="url(#glow)" />
        </g>
        """
    elif icon_type == "rocket":
        return f"""
        <!-- Sequenced Multi-Stage Rocket Launch -->
        <g transform="translate(180, 20)">
          <!-- Stage 1 -->
          <rect x="-100" y="70" width="160" height="70" rx="14" fill="#071b38" stroke="{accent}" stroke-width="2.5" />
          <text x="-20" y="100" fill="#ffffff" font-family="'Inter', sans-serif" font-size="13" font-weight="700" text-anchor="middle">STAGE 1: RUO</text>
          <text x="-20" y="120" fill="#94a3b8" font-family="'Inter', sans-serif" font-size="10" text-anchor="middle">Research Use Only</text>

          <!-- Stage 2 -->
          <rect x="50" y="-10" width="180" height="75" rx="16" fill="#0a254d" stroke="{accent}" stroke-width="3" filter="url(#glow)" />
          <text x="140" y="25" fill="#ffffff" font-family="'Inter', sans-serif" font-size="14" font-weight="800" text-anchor="middle">STAGE 2: PRIVATE CLINICS</text>
          <text x="140" y="45" fill="{accent}" font-family="'Inter', sans-serif" font-size="11" text-anchor="middle">Immediate Cashflow</text>

          <!-- Stage 3 -->
          <rect x="210" y="-95" width="200" height="85" rx="18" fill="#041226" stroke="#34d399" stroke-width="3.5" />
          <text x="310" y="-55" fill="#34d399" font-family="'Inter', sans-serif" font-size="14" font-weight="800" text-anchor="middle">STAGE 3: HEALTH SYSTEMS</text>
          <text x="310" y="-35" fill="#ffffff" font-family="'Inter', sans-serif" font-size="11" text-anchor="middle">National Enterprise Scale</text>

          <!-- Ascending Trajectory Curve -->
          <path d="M -100 110 Q 150 40 400 -60" fill="none" stroke="{accent}" stroke-width="3" stroke-dasharray="6 4" />
        </g>
        """
    else:
        # Default / Shield / Generic Venture Architecture
        return f"""
        <!-- Futuristic Glass Tech Hub Card -->
        <g transform="translate(180, 20)">
          <rect x="0" y="-110" width="340" height="230" rx="28" fill="#071b38" stroke="{accent}" stroke-width="3.5" filter="url(#glow)" />
          <circle cx="170" cy="-20" r="45" fill="{accent}" opacity="0.2" />
          <path d="M 170 -45 L 170 5 M 145 -20 L 195 -20" stroke="{accent}" stroke-width="5" stroke-linecap="round" />
          <text x="170" y="45" fill="#ffffff" font-family="'Inter', sans-serif" font-size="16" font-weight="800" text-anchor="middle">ZIAN VENTURE BLUEPRINT</text>
          <text x="170" y="75" fill="#94a3b8" font-family="'Inter', sans-serif" font-size="12" text-anchor="middle">Strategic Founder Framework</text>
        </g>
        """

def generate_svg(config):
    accent = config["accent"]
    accent_glow = config["accent_glow"]
    title1 = config["title1"]
    title2 = config["title2"]
    subtitle = config["subtitle"]
    badge = config["badge"]
    category = config["category"]
    icon_svg = render_icon(config["icon_type"], accent, accent_glow)

    svg = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900" width="1600" height="900">
  <defs>
    <!-- Background Gradients -->
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#020611" />
      <stop offset="50%" stop-color="#051933" />
      <stop offset="100%" stop-color="#030c1c" />
    </linearGradient>

    <!-- Glowing Radial Light Orbs -->
    <radialGradient id="orb1" cx="80%" cy="30%" r="60%">
      <stop offset="0%" stop-color="{accent}" stop-opacity="0.25" />
      <stop offset="100%" stop-color="#051933" stop-opacity="0" />
    </radialGradient>
    <radialGradient id="orb2" cx="20%" cy="80%" r="50%">
      <stop offset="0%" stop-color="{accent_glow}" stop-opacity="0.2" />
      <stop offset="100%" stop-color="#020611" stop-opacity="0" />
    </radialGradient>

    <!-- Neon Glow Filter -->
    <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="10" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>

  <!-- Deep High-Contrast Canvas -->
  <rect width="1600" height="900" fill="url(#bg)" />
  <rect width="1600" height="900" fill="url(#orb1)" />
  <rect width="1600" height="900" fill="url(#orb2)" />

  <!-- Subtle Perspective Tech Grid -->
  <g opacity="0.15" stroke="{accent}" stroke-width="1">
    <line x1="0" y1="750" x2="1600" y2="750" />
    <line x1="0" y1="820" x2="1600" y2="820" />
    <line x1="100" y1="900" x2="500" y2="650" />
    <line x1="300" y1="900" x2="600" y2="650" />
    <line x1="1300" y1="900" x2="1000" y2="650" />
    <line x1="1500" y1="900" x2="1100" y2="650" />
  </g>

  <!-- Top Metadata Navigation Bar -->
  <g transform="translate(100, 90)">
    <!-- Pill 1: ZiAn AI Ventures -->
    <rect x="0" y="0" width="180" height="38" rx="19" fill="#071b38" stroke="{accent}" stroke-width="1.5" />
    <circle cx="20" cy="19" r="5" fill="{accent}" filter="url(#glow)" />
    <text x="100" y="24" fill="#ffffff" font-family="'Inter', sans-serif" font-size="12" font-weight="800" text-anchor="middle" letter-spacing="1">ZIAN VENTURES</text>

    <!-- Pill 2: Category -->
    <rect x="195" y="0" width="310" height="38" rx="19" fill="#041226" stroke="{accent}" stroke-opacity="0.4" stroke-width="1.5" />
    <text x="350" y="24" fill="{accent}" font-family="'Inter', sans-serif" font-size="11" font-weight="800" text-anchor="middle" letter-spacing="1">{category}</text>
  </g>

  <!-- Main Left Content Block (High Typography Contrast) -->
  <g transform="translate(100, 240)">
    <!-- Badge -->
    <rect x="0" y="0" width="220" height="30" rx="8" fill="{accent}" fill-opacity="0.15" stroke="{accent}" stroke-width="1.5" />
    <text x="110" y="20" fill="{accent}" font-family="'Inter', sans-serif" font-size="11" font-weight="800" text-anchor="middle" letter-spacing="1.5">{badge}</text>

    <!-- Headline Line 1 -->
    <text x="0" y="90" fill="#ffffff" font-family="'Inter', sans-serif" font-size="52" font-weight="900" letter-spacing="-1.5">
      {title1}
    </text>
    <!-- Headline Line 2 -->
    <text x="0" y="155" fill="{accent}" font-family="'Inter', sans-serif" font-size="52" font-weight="900" letter-spacing="-1.5" filter="url(#glow)">
      {title2}
    </text>

    <!-- Subtitle / Executive Summary -->
    <text x="0" y="225" fill="#94a3b8" font-family="'Inter', sans-serif" font-size="22" font-weight="500">
      {subtitle[:65]}
    </text>
    <text x="0" y="260" fill="#64748b" font-family="'Inter', sans-serif" font-size="20" font-weight="500">
      {subtitle[65:130]}
    </text>

    <!-- Bottom Metadata Cards -->
    <g transform="translate(0, 360)">
      <rect x="0" y="0" width="160" height="44" rx="12" fill="#071b38" stroke="{accent}" stroke-opacity="0.5" stroke-width="1.5" />
      <text x="80" y="27" fill="#ffffff" font-family="'Inter', sans-serif" font-size="12" font-weight="700" text-anchor="middle">⏱ 6 MIN READ</text>

      <rect x="175" y="0" width="180" height="44" rx="12" fill="#071b38" stroke="{accent}" stroke-opacity="0.5" stroke-width="1.5" />
      <text x="265" y="27" fill="{accent}" font-family="'Inter', sans-serif" font-size="12" font-weight="700" text-anchor="middle">📑 FOUNDER BRIEFING</text>
    </g>
  </g>

  <!-- Right Visual / Isometric Diagram Centerpiece -->
  <g transform="translate(850, 430)">
    {icon_svg}
  </g>

  <!-- Subtle Outer Accent Frame -->
  <rect x="30" y="30" width="1540" height="840" rx="28" fill="none" stroke="{accent}" stroke-opacity="0.2" stroke-width="2" />
</svg>"""
    return svg

for item in covers:
    filename = item["filename"]
    path = os.path.join(svg_dir, filename)
    content = generate_svg(item)
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"Generated {filename}")

print("Successfully generated all 16 high-impact meeting notes covers!")
