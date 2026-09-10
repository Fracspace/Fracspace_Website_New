import heroImg from "../assets/herobg.webp";
import hilltopImg from "../assets/hilltopImg.webp";
import coOwnImg from "../assets/coOwnImg.webp";
import mainImg from "../assets/mainImg.webp";
import howFsWorksBg from "../assets/howFsWorksBg.webp";

export const blogsData = [
  {
    id: "1",
    slug: "what-is-fractional-real-estate-investment",
    tag: "Guides",
    date: "March 20, 2026",
    readTime: "8 min read",
    author: {
      name: "Unnath Reddy",
      role: "Founder & CEO, Fracspace",
      avatar: "/assets/unnathSir.jpeg"
    },
    title: "What is fractional real estate investment? A complete guide for Indian investors",
    excerpt:
      "How fractional ownership divides high-value holiday homes and commercial assets into manageable units, the legal mechanics behind it, and why it is replacing traditional second-home purchases.",
    image: heroImg,
    secondaryImage: howFsWorksBg,
    keyTakeaways: [
      "Fractional ownership allows multiple investors to co-own luxury real estate with transparent legal titles.",
      "Lower entry barriers: Start investing in ₹5 Cr+ properties from as low as ₹10 Lakhs.",
      "Dual return profile: Enjoy predictable monthly/quarterly rental income plus long-term capital appreciation.",
      "Fully managed hospitality operations ensure 100% passive ownership with zero maintenance hassle."
    ],
    tableOfContents: [
      { id: "introduction", label: "1. What is Fractional Ownership?" },
      { id: "how-it-works", label: "2. How Does It Work in Practice?" },
      { id: "legal-structure", label: "3. The Legal and Regulatory Framework" },
      { id: "returns-yields", label: "4. Expected Returns and Yield Breakdown" },
      { id: "stay-entitlements", label: "5. Complimentary Stay Entitlements" },
      { id: "how-to-start", label: "6. Getting Started with Fracspace" }
    ],
    content: [
      {
        type: "paragraph",
        text: "Real estate has historically been India's favorite asset class, but skyrocketing prices have kept premium vacation homes, luxury villas, and high-yield hospitality assets out of reach for most individual investors. Fractional real estate investment changes this paradigm entirely by democratizing ownership."
      },
      {
        type: "heading",
        id: "introduction",
        text: "1. What is Fractional Ownership?"
      },
      {
        type: "paragraph",
        text: "Fractional ownership is an investment model where multiple vetted investors pool their capital to jointly own high-value tangible assets—typically premium holiday villas, resorts, or commercial real estate. Unlike timeshares, where you only purchase the right to use the property for a few days a year without asset backing, fractional ownership grants you genuine equity ownership and title registration in the asset."
      },
      {
        type: "quote",
        text: "Fractional real estate is not a timeshare—it is real, registered ownership of a physical asset, engineered for yield and long-term appreciation.",
        author: "Fracspace Investment Committee"
      },
      {
        type: "heading",
        id: "how-it-works",
        text: "2. How Does It Work in Practice?"
      },
      {
        type: "paragraph",
        text: "Each property sourced by Fracspace is placed into an asset-specific Special Purpose Vehicle (SPV), such as a registered Private Limited Company or LLP. Investors purchase fractional shares in this SPV corresponding to their invested capital. When the property earns rental income through verified hospitality operators, net profits are distributed directly into your bank account proportionally."
      },
      {
        type: "statsGrid",
        stats: [
          { value: "₹10L+", label: "Accessible Minimum Ticket Size" },
          { value: "8–12%", label: "Target Annual Rental Yield" },
          { value: "100%", label: "Legally Registered Co-ownership" },
          { value: "15–30 Days", label: "Annual Free Owner Stays" }
        ]
      },
      {
        type: "heading",
        id: "legal-structure",
        text: "3. The Legal and Regulatory Framework"
      },
      {
        type: "paragraph",
        text: "The legal foundation of fractional ownership in India is built upon solid corporate and property laws. Every asset undergoes extensive due diligence including 30-year title searches, local municipal compliance checks, and encumbrance verification by top-tier legal counsels before being listed on the platform."
      },
      {
        type: "paragraph",
        text: "All share allocations and co-ownership deeds are registered through the Ministry of Corporate Affairs (MCA) and Registrar of Companies (RoC), ensuring undisputed legal proof of ownership that can be held, gifted, or inherited."
      },
      {
        type: "heading",
        id: "returns-yields",
        text: "4. Expected Returns and Yield Breakdown"
      },
      {
        type: "paragraph",
        text: "Investors in Fracspace assets benefit from two distinct revenue drivers:"
      },
      {
        type: "list",
        items: [
          "**Quarterly Rental Yields**: Driven by active hospitality management, leisure tourism demand, and high Average Daily Rates (ADR) across key tourist corridors like Goa, Munnar, Kabini, and Varanasi.",
          "**Capital Appreciation**: High-growth leisure destinations have shown 8–15% compound annual capital appreciation over the past 5 years.",
          "**Inflation Hedge**: Real estate inherently preserves purchasing power as room tariffs and real estate values adjust upward with inflation."
        ]
      },
      {
        type: "heading",
        id: "stay-entitlements",
        text: "5. Complimentary Stay Entitlements"
      },
      {
        type: "paragraph",
        text: "Beyond financial returns, fractional owners enjoy lifestyle benefits. Each fraction comes with an annual quota of complimentary stay days (typically 15 to 30 nights) at your property or across the Fracspace network of holiday resorts."
      },
      {
        type: "heading",
        id: "how-to-start",
        text: "6. Getting Started with Fracspace"
      },
      {
        type: "paragraph",
        text: "Beginning your fractional investment journey takes less than 10 minutes through the Fracspace mobile app or website. Simply explore available properties, review audited financials and title documents, complete your digital KYC, and reserve your fraction online."
      }
    ]
  },
  {
    id: "2",
    slug: "benefits-of-co-ownership-in-property",
    tag: "Co-ownership",
    date: "March 18, 2026",
    readTime: "6 min read",
    author: {
      name: "Fracspace Research Team",
      role: "Market & Asset Intelligence",
      avatar: "/assets/logo2.png"
    },
    title: "Benefits of co-ownership in property: Why luxury vacation homes are now accessible",
    excerpt:
      "Why pooling capital with co-owners is opening doors to high-yield holiday resorts previously accessible only to high-net-worth buyers.",
    image: coOwnImg,
    secondaryImage: mainImg,
    keyTakeaways: [
      "Avoid 100% of the cost and 100% of the maintenance headaches of owning an entire holiday villa.",
      "Diversification: Invest across 4 different destination properties instead of sinking all your capital into one.",
      "Professional property management keeps your holiday home in pristine 5-star condition 365 days a year.",
      "Flexible resale and exit options with no lock-in hassles."
    ],
    tableOfContents: [
      { id: "the-problem", label: "1. The Dilemma with Traditional Vacation Homes" },
      { id: "key-benefits", label: "2. Key Benefits of Co-Ownership" },
      { id: "diversification", label: "3. Strategic Portfolio Diversification" },
      { id: "management", label: "4. Zero-Hassle Professional Management" },
      { id: "conclusion", label: "5. Is Co-Ownership Right for You?" }
    ],
    content: [
      {
        type: "paragraph",
        text: "Owning a picturesque second home in the serene hills of Munnar or near the sunny beaches of Revora, Goa is a dream for many. However, traditional second-home ownership often turns into a logistical and financial nightmare characterized by low utilization, constant repair expenses, and security worries."
      },
      {
        type: "heading",
        id: "the-problem",
        text: "1. The Dilemma with Traditional Vacation Homes"
      },
      {
        type: "paragraph",
        text: "Research shows the average second-home owner utilizes their property for only 20 to 30 days per year. Yet, they pay 100% of the purchase price, property taxes, maintenance staff salaries, pool upkeep, and utility bills. This leads to substantial negative cash flow on an underutilized asset."
      },
      {
        type: "heading",
        id: "key-benefits",
        text: "2. Key Benefits of Co-Ownership"
      },
      {
        type: "list",
        items: [
          "**Pay Only for What You Use**: Match your financial commitment with your actual usage pattern.",
          "**Fractional Capital Requirement**: Acquire a luxury villa share for ₹10–18 Lakhs instead of ₹3–5 Crores.",
          "**Positive Cash Flow**: Unused nights are monetized through managed hospitality operations to generate recurring income.",
          "**Institutional Due Diligence**: Every asset is thoroughly vetted for legal title, construction quality, and tourism demand."
        ]
      },
      {
        type: "quote",
        text: "Why bear 100% of the cost for a holiday home you only use 30 days a year? Co-ownership aligns your investment with real-world utility.",
        author: "Fracspace Insights"
      },
      {
        type: "heading",
        id: "diversification",
        text: "3. Strategic Portfolio Diversification"
      },
      {
        type: "paragraph",
        text: "Instead of allocating ₹1 Crore into a single plot or flat in one city, fractional co-ownership enables you to spread that same ₹1 Crore across 5 different luxury properties in Goa, Munnar, Varanasi, Kabini, and Manipal. This geographic diversification hedges against regional demand fluctuations."
      },
      {
        type: "heading",
        id: "management",
        text: "4. Zero-Hassle Professional Management"
      },
      {
        type: "paragraph",
        text: "Fracspace partners with seasoned hospitality operators who manage housekeeping, guest check-ins, dynamic room pricing, maintenance, and landscaping. As an investor, your experience is entirely passive—you simply track earnings and reserve your stays from the app."
      },
      {
        type: "heading",
        id: "conclusion",
        text: "5. Is Co-Ownership Right for You?"
      },
      {
        type: "paragraph",
        text: "Whether you are a seasoned investor seeking reliable high-yield assets or a travel enthusiast desiring luxury holiday stays without the burdensome upkeep, fractional co-ownership provides the ideal blend of financial growth and lifestyle rewards."
      }
    ]
  },
  {
    id: "3",
    slug: "how-to-calculate-rental-yield-on-holiday-homes",
    tag: "Market trends",
    date: "March 10, 2026",
    readTime: "5 min read",
    author: {
      name: "Investment Advisory Desk",
      role: "Fracspace Financial Analytics",
      avatar: "/assets/logo2.png"
    },
    title: "How to calculate rental yield on holiday homes: Formulas, benchmarks & case studies",
    excerpt:
      "Gross vs. net yields, factoring in seasonality, management fees, and real-world occupancy benchmarks across popular leisure destinations.",
    image: hilltopImg,
    secondaryImage: heroImg,
    keyTakeaways: [
      "Gross Rental Yield = (Annual Gross Rental Revenue / Total Property Purchase Price) * 100.",
      "Net Rental Yield accounts for operational costs, hospitality fees, property tax, and maintenance reserve.",
      "Leisure hospitality assets in India routinely yield 8–12% net compared to 2–3% in urban residential apartments.",
      "Seasonality modelling is essential when evaluating vacation home projections."
    ],
    tableOfContents: [
      { id: "yield-basics", label: "1. Gross vs Net Rental Yield" },
      { id: "the-formula", label: "2. The Yield Calculation Formula" },
      { id: "case-study", label: "3. Real-World Case Study (Goa Villa)" },
      { id: "seasonality", label: "4. Factoring Seasonality & Occupancy" },
      { id: "summary", label: "5. Key Takeaways for Investors" }
    ],
    content: [
      {
        type: "paragraph",
        text: "Rental yield is the most crucial financial metric for evaluating real estate investments. While urban residential rental yields in major Indian metros hover around 2% to 3.5%, managed holiday homes and boutique resorts in high-demand tourist corridors can generate net yields between 8% and 12% annually."
      },
      {
        type: "heading",
        id: "yield-basics",
        text: "1. Gross vs Net Rental Yield"
      },
      {
        type: "paragraph",
        text: "Gross yield represents total revenue generated before any operational deductions. Net yield is the true metric that matters to an investor, as it accounts for hospitality management commissions, utilities, platform fees, property maintenance reserves, and local taxes."
      },
      {
        type: "statsGrid",
        stats: [
          { value: "2–3.5%", label: "Metro Residential Yield" },
          { value: "8–12%", label: "Fracspace Curated Net Yield" },
          { value: "65–78%", label: "Avg Annual Destination Occupancy" },
          { value: "₹12K–₹25K", label: "Average Daily Rate (ADR)" }
        ]
      },
      {
        type: "heading",
        id: "the-formula",
        text: "2. The Yield Calculation Formula"
      },
      {
        type: "quote",
        text: "Net Yield (%) = [(Total Annual Room Revenue - Operational & Management Costs) / Total Property Value] * 100",
        author: "Financial Modeling Guidelines"
      },
      {
        type: "heading",
        id: "case-study",
        text: "3. Real-World Case Study (Goa 4BHK Villa)"
      },
      {
        type: "list",
        items: [
          "**Asset Value**: ₹2.5 Crores (divided into 25 fractions at ₹10 Lakhs each)",
          "**Average Daily Rate (ADR)**: ₹18,000 / night",
          "**Annual Occupancy**: 65% (237 nights booked per year)",
          "**Gross Annual Revenue**: 237 * ₹18,000 = ₹42.66 Lakhs",
          "**Operating & Hospitality Expenses (35%)**: ₹14.93 Lakhs",
          "**Net Annual Cash Flow**: ₹27.73 Lakhs",
          "**Net Yield to Investors**: 11.09% annual dividend yield"
        ]
      },
      {
        type: "heading",
        id: "seasonality",
        text: "4. Factoring Seasonality & Occupancy"
      },
      {
        type: "paragraph",
        text: "Tourist destinations in India experience distinct peak, shoulder, and monsoon cycles. Accurate yield modeling must incorporate dynamic pricing models where peak season tariffs compensate for monsoon slowdowns, maintaining consistent annualized payouts for investors."
      },
      {
        type: "heading",
        id: "summary",
        text: "5. Key Takeaways for Investors"
      },
      {
        type: "paragraph",
        text: "Always scrutinize the operator's past occupancy history and conservative stress tests before committing capital. At Fracspace, every listed property is backtested against 3-year historical regional tourism data."
      }
    ]
  },
  {
    id: "4",
    slug: "legal-structures-behind-fractional-ownership-in-india",
    tag: "Tax & Legal",
    date: "February 27, 2026",
    readTime: "7 min read",
    author: {
      name: "Fracspace Legal Counsel",
      role: "Corporate & Real Estate Law Desk",
      avatar: "/assets/logo2.png"
    },
    title: "Legal structures behind fractional ownership in India: Title deeds, SPVs & rights",
    excerpt:
      "Understanding SPVs, LLP frameworks, and how title deeds and ownership shares are legally registered and safeguarded for every investor.",
    image: heroImg,
    secondaryImage: howFsWorksBg,
    keyTakeaways: [
      "Properties are held in a ring-fenced Special Purpose Vehicle (SPV) with zero third-party encumbrances.",
      "Investors hold registered equity shares / LLP partner shares corresponding directly to physical property equity.",
      "Clear exit mechanisms are governed by the Articles of Association (AoA) and Shareholder Agreements.",
      "Independent escrow accounts manage all investor deposits and dividend distributions."
    ],
    tableOfContents: [
      { id: "the-spv-model", label: "1. The SPV (Special Purpose Vehicle) Structure" },
      { id: "title-due-diligence", label: "2. Title Due Diligence & Encumbrance Checks" },
      { id: "shareholder-rights", label: "3. Shareholder Agreements & Investor Protections" },
      { id: "tax-implications", label: "4. Tax Implications on Yield and Capital Gains" },
      { id: "regulatory-trends", label: "5. Evolving SEBI / SM REIT Frameworks" }
    ],
    content: [
      {
        type: "paragraph",
        text: "When considering any fractional investment, legal security and title transparency are paramount. In India, fractional ownership operates through well-established corporate and property law mechanisms that ensure each investor's rights are legally enforceable and protected."
      },
      {
        type: "heading",
        id: "the-spv-model",
        text: "1. The SPV (Special Purpose Vehicle) Structure"
      },
      {
        type: "paragraph",
        text: "To eliminate individual liability and facilitate seamless co-ownership, each property is acquired and owned 100% by an asset-specific Private Limited Company or LLP (the SPV). As an investor, you become a registered shareholder in this SPV with equity proportionate to your investment."
      },
      {
        type: "quote",
        text: "By ring-fencing each property inside a dedicated SPV, your investment is completely insulated from any liabilities of other properties or platform operations.",
        author: "Fracspace Legal Compliance"
      },
      {
        type: "heading",
        id: "title-due-diligence",
        text: "2. Title Due Diligence & Encumbrance Checks"
      },
      {
        type: "paragraph",
        text: "Before any property is onboarded to Fracspace, independent legal counsel conducts rigorous searches spanning minimum 30-year revenue records, land registry checks, local zoning sanctions, and environmental clearances to ensure an absolute clear, marketable title."
      },
      {
        type: "heading",
        id: "shareholder-rights",
        text: "3. Shareholder Agreements & Investor Protections"
      },
      {
        type: "list",
        items: [
          "**Right to Information**: Complete access to monthly P&L statements, audited balance sheets, and occupancy reports.",
          "**Voting Rights on Capital Decisions**: Any major capital decisions (e.g. sale of the entire asset) require a supermajority shareholder approval.",
          "**Transferability**: Free right to sell, transfer, or bequeath your shares according to the defined Articles of Association (AoA).",
          "**Escrow Account Safety**: Investor funds are held in regulated bank escrow accounts until property conveyance is fully executed."
        ]
      },
      {
        type: "heading",
        id: "tax-implications",
        text: "4. Tax Implications on Yield and Capital Gains"
      },
      {
        type: "paragraph",
        text: "Returns are distributed as dividends or corporate profits, which are taxed according to standard income tax slabs. When selling your fraction, gains held for over 24 months qualify for Long-Term Capital Gains (LTCG) tax rates with indexation benefits."
      },
      {
        type: "heading",
        id: "regulatory-trends",
        text: "5. Evolving SEBI / SM REIT Frameworks"
      },
      {
        type: "paragraph",
        text: "With SEBI introducing Small and Medium REIT (SM REIT) regulations in India, the fractional ownership sector is gaining formal regulatory backing, enhancing investor trust, transparency, and liquidity across the ecosystem."
      }
    ]
  },
  {
    id: "5",
    slug: "destination-spotlight-why-goa-and-munnar-lead-leisure-yields",
    tag: "Destinations",
    date: "February 15, 2026",
    readTime: "5 min read",
    author: {
      name: "Fracspace Research Team",
      role: "Hospitality & Leisure Analytics",
      avatar: "/assets/logo2.png"
    },
    title: "Destination spotlight: Why Goa and Munnar lead leisure yields in India",
    excerpt:
      "A deep dive into tourism demand, room rates, and long-term appreciation across India's premier holiday-home and hospitality corridors.",
    image: hilltopImg,
    secondaryImage: mainImg,
    keyTakeaways: [
      "Goa continues to lead in luxury villa demand with year-round domestic and international tourist footfalls.",
      "Munnar's eco-resorts and tea plantation retreats boast 70%+ occupancy backed by Southern domestic travel.",
      "Infrastructure expansion (Mopa Airport, National Highway expansions) is fueling 12–15% annual capital growth.",
      "Boutique villas command significant rate premiums over standard hotel rooms."
    ],
    tableOfContents: [
      { id: "goa-market", label: "1. The Goa Leisure Real Estate Boom" },
      { id: "munnar-growth", label: "2. Munnar's Year-Round Eco-Tourism" },
      { id: "adr-comparison", label: "3. ADR and Yield Comparison" },
      { id: "infrastructure", label: "4. Infrastructure Tailwinds" },
      { id: "fracspace-portfolio", label: "5. Fracspace Assets in These Corridors" }
    ],
    content: [
      {
        type: "paragraph",
        text: "Not all real estate locations are created equal. When evaluating fractional vacation homes, destination selection accounts for more than 70% of long-term investment performance. In India, Goa and Munnar stand out as premier corridors delivering the ideal combination of high occupancy and consistent capital growth."
      },
      {
        type: "heading",
        id: "goa-market",
        text: "1. The Goa Leisure Real Estate Boom"
      },
      {
        type: "paragraph",
        text: "Goa has transformed from a seasonal winter getaway into a vibrant 365-day lifestyle and workation hub. The rise of private luxury pool villas in scenic locations like Revora, Assagao, and Siolim has captured affluent domestic travelers who prefer exclusive private stays over crowded hotels."
      },
      {
        type: "heading",
        id: "munnar-growth",
        text: "2. Munnar's Year-Round Eco-Tourism"
      },
      {
        type: "paragraph",
        text: "Nestled in the Western Ghats of Kerala, Munnar benefits from continuous tourist inflow across Tamil Nadu, Karnataka, and Kerala seeking cool weather, tea plantations, and wellness escapes. Hilltop resorts and yurt cottages maintain strong weekend and holiday occupancies year-round."
      },
      {
        type: "statsGrid",
        stats: [
          { value: "11.3%", label: "Goa Villa Net Target Yield" },
          { value: "8.8%", label: "Munnar Eco-Resort Net Target Yield" },
          { value: "40M+", label: "Annual Regional Tourist Inflow" },
          { value: "14%", label: "Annual Historical Capital Appreciation" }
        ]
      },
      {
        type: "heading",
        id: "adr-comparison",
        text: "3. ADR and Yield Comparison"
      },
      {
        type: "paragraph",
        text: "A well-appointed 4BHK private pool villa in North/Central Goa commands between ₹20,000 to ₹45,000 per night during season, generating exceptional returns per fraction. Similarly, boutique plantation cottages in Munnar achieve steady ₹8,000 to ₹15,000 tariffs with high repeat guest rates."
      },
      {
        type: "heading",
        id: "infrastructure",
        text: "4. Infrastructure Tailwinds"
      },
      {
        type: "paragraph",
        text: "The operationalization of Manohar International Airport (Mopa) in North Goa and upgraded highway connectivity in Kerala have significantly reduced travel times, directly driving property valuations upward."
      },
      {
        type: "heading",
        id: "fracspace-portfolio",
        text: "5. Fracspace Assets in These Corridors"
      },
      {
        type: "paragraph",
        text: "Fracspace features curated properties in both destinations—including Stream by Indulge in Revora, Goa, and Hilltop by Fracspace in Munnar, Kerala. Both assets offer active fractional investment tranches."
      }
    ]
  },
  {
    id: "6",
    slug: "exit-strategies-how-and-when-can-you-sell-your-fraction",
    tag: "Guides",
    date: "February 04, 2026",
    readTime: "6 min read",
    author: {
      name: "Investor Relations Team",
      role: "Liquidity & Secondary Market Desk",
      avatar: "/assets/logo2.png"
    },
    title: "Exit strategies: How and when can you sell your fractional property share?",
    excerpt:
      "Everything you need to know about secondary resale windows, lock-in periods, and private transfers on the Fracspace platform.",
    image: coOwnImg,
    secondaryImage: heroImg,
    keyTakeaways: [
      "Multiple exit paths: Fracspace Secondary Marketplace, Private Transfers, and Whole-Asset Sale.",
      "Liquidity windows allow investors to list fractions for resale to other registered platform users.",
      "Whole-asset terminal liquidation is executed at the end of the investment horizon (typically 5–7 years) to unlock full capital gains.",
      "Zero hidden penalties for transfer of verified shares."
    ],
    tableOfContents: [
      { id: "liquidity-myth", label: "1. The Liquidity Question in Real Estate" },
      { id: "exit-routes", label: "2. The Three Primary Exit Routes" },
      { id: "secondary-market", label: "3. Fracspace Resale Marketplace" },
      { id: "whole-asset-sale", label: "4. Terminal Whole-Asset Sale" },
      { id: "step-by-step", label: "5. How to Initiate a Sale" }
    ],
    content: [
      {
        type: "paragraph",
        text: "One of the biggest historical criticisms of physical real estate has been its illiquidity—selling a whole villa or apartment can take anywhere from 6 to 18 months. Fractional ownership fundamentally improves liquidity by enabling owners to trade smaller, affordable fractional units."
      },
      {
        type: "heading",
        id: "liquidity-myth",
        text: "1. The Liquidity Question in Real Estate"
      },
      {
        type: "paragraph",
        text: "Finding a buyer with ₹5 Crores for an entire luxury home takes significant time. In contrast, finding a buyer for a ₹10 Lakh fractional unit backed by verified cash flow and audited titles is substantially faster and more liquid."
      },
      {
        type: "heading",
        id: "exit-routes",
        text: "2. The Three Primary Exit Routes"
      },
      {
        type: "list",
        items: [
          "**Fracspace Secondary Marketplace**: List your fraction on the internal investor exchange after the minimum holding period.",
          "**Private Transfer**: Sell or gift your shares to friends, family, or external third-party buyers with simple board transfer approval.",
          "**Whole-Asset Exit**: At the conclusion of the 5–7 year target investment term, the property is marketed for institutional sale, and total sale proceeds are distributed to co-owners."
        ]
      },
      {
        type: "quote",
        text: "Fractionalization turns illiquid physical real estate into bite-sized units that trade smoothly on transparent secondary marketplaces.",
        author: "Fracspace Liquidity Desk"
      },
      {
        type: "heading",
        id: "secondary-market",
        text: "3. Fracspace Resale Marketplace"
      },
      {
        type: "paragraph",
        text: "Fracspace maintains an active community of verified investors. When you wish to liquidate, your fraction can be listed on the platform alongside historical yield performance, making it attractive to new buyers seeking immediate yield."
      },
      {
        type: "heading",
        id: "whole-asset-sale",
        text: "4. Terminal Whole-Asset Sale"
      },
      {
        type: "paragraph",
        text: "At the end of the predefined investment cycle, co-owners vote to sell the entire property to boutique hotel operators or luxury buyers. This allows all fractional shareholders to realize substantial accumulated capital gains."
      },
      {
        type: "heading",
        id: "step-by-step",
        text: "5. How to Initiate a Sale"
      },
      {
        type: "paragraph",
        text: "Initiating a resale is as simple as clicking 'Request Liquidation' from your Fracspace portfolio dashboard. Our Investor Relations team handles valuation assessment, buyer matching, and share transfer documentation."
      }
    ]
  }
];

export const getBlogBySlug = (slug) => {
  return blogsData.find((b) => b.slug === slug) || null;
};

export const getRelatedBlogs = (currentSlug, limit = 3) => {
  return blogsData.filter((b) => b.slug !== currentSlug).slice(0, limit);
};
