import { CaseStudy, Program, Testimonial } from '../types';

export const caseStudies: CaseStudy[] = [
  {
    id: 'scaling-to-5m',
    tag: 'SUCCESS STORY',
    title: '"From 80-hour burnout to 140% growth — reclaiming the vision while scaling to $5M."',
    challenge: 'Founder trapped in a 80-hour operational loop, serving as the sole engine for a $2M consultancy with zero exit potential.',
    approach: 'Engineered a high-impact delegation framework, productized complex services, and transitioned from operator to visionary.',
    transformation: 'Moved from high-friction delivery to a scalable, high-margin model managed by an empowered leadership team.',
    result: '140% revenue growth in 12 months. Founder now operates on a 25-hour week with full weekends restored.',
    founder: 'Marcus Vance',
    companyType: 'B2B Strategic Advisory Firm',
    startingMetrics: {
      revenue: '$2.1M ARR',
      hoursPerWeek: '82 hrs/wk',
      margin: '22%',
    },
    endingMetrics: {
      revenue: '$5.04M ARR',
      hoursPerWeek: '25 hrs/wk',
      margin: '48%',
    },
    keyQuote:
      'I was genuinely convinced that if I stepped away for even a long weekend, client contracts would unravel. Ranjitha rebuilt our operational DNA from the ground up.',
    fullStoryParagraphs: [
      'Marcus had spent seven years building what on paper looked like a stellar professional services consultancy. He was generating over $2M annually, yet his bank accounts constantly felt under pressure due to inefficient overhead, and his personal life was virtually nonexistent.',
      'Every major client demanded Marcus on weekly steering calls. Junior team members escalated every trivial decision back to his desk. By 2023, he was averaging 80+ hours weekly, struggling with chronic sleep disturbances, and questioning whether the business was worth the toll on his family.',
      'Through our 1:1 Profit & Mindset architecture partnership, we deployed the 3-Layer Delegation Protocol and productized his core advisory curriculum into repeatable high-ticket sprints. We recruited a formidable Managing Director and established non-negotiable CEO recovery boundaries.',
      'Within twelve months, revenue scaled to $5M with a 48% net profit margin. Marcus now leads high-level vision, travels quarterly with his family completely off-grid, and operates with the calm authority of a true enterprise chairman.',
    ],
  },
  {
    id: 'consultancy-exit-readiness',
    tag: 'FINANCIAL TRANSFORMATION',
    title: '"Doubled EBITDA margins and removed founder dependency in 9 months."',
    challenge: 'Founder was the sole sales Closer and delivery lead, capping revenue at $1.5M with 18% margins.',
    approach: 'Installed the 5-Levers Profit framework, renegotiated client tiering, and built an automated outbound engine.',
    transformation: 'Transitioned from hourly rates to high-ticket outcome-based retainers with 3-year commitments.',
    result: 'EBITDA jumped from 18% to 42%. Secured a 7-figure buyout offer while retaining equity.',
    founder: 'Elena Rostova',
    companyType: 'Digital Transformation Practice',
    startingMetrics: {
      revenue: '$1.5M ARR',
      hoursPerWeek: '70 hrs/wk',
      margin: '18%',
    },
    endingMetrics: {
      revenue: '$3.4M ARR',
      hoursPerWeek: '28 hrs/wk',
      margin: '42%',
    },
    keyQuote:
      'We did not just increase our profit margin — we turned our company into an investable, self-governing machine.',
    fullStoryParagraphs: [
      'Elena was exhausted by the feast-and-famine rhythm of enterprise consulting. Whenever she focused on delivery, pipeline dried up. Whenever she hunted for new business, delivery quality slipped.',
      'Together, we systematically rebuilt her pricing architecture, moving from billable hours to value-driven fixed retainers. We trained her senior consultants to lead discovery audits and close enterprise accounts seamlessly.',
      'The result was an instantaneous spike in net margins and a predictable quarterly pipeline that allowed Elena to finally take a continuous 3-week holiday without receiving a single crisis call.',
    ],
  },
];

export const programs: Program[] = [
  {
    id: 'fga',
    number: '01',
    name: 'FOUNDERS GROWTH ACCELERATOR',
    subheading: 'FOUNDERS GROWTH ACCELERATOR',
    headline: 'Scale your consultancy with precision.',
    duration: '13-week cohort',
    price: 'AED 1,500',
    priceSub: 'or $1,500 USD equivalent',
    badge: 'Next cohort starting soon',
    isDark: false,
    bullets: [
      '13-week cohort with intimate peer group of 6-8 figure founders',
      'AED 1,500 / $1,500 investment tier',
      'Next cohort starting soon with limited seats',
      'The complete 5-Levers Profit & Systemization Blueprint',
      'Weekly live tactical teardown sessions with Ranjitha',
      'Plug-and-play SOPs, delegation frameworks & contracts library',
    ],
    idealFor: 'B2B Founders & Consultants generating $250k–$1.5M wanting to break through the 60-hour work week trap.',
    ctaText: 'EXPLORE FGA',
    modules: [
      { week: 'Week 1-3', title: 'The Profit Architecture', outcome: 'Eliminate revenue leakage and raise retainer pricing by 30%+' },
      { week: 'Week 4-7', title: 'Productization & Delivery Sprints', outcome: 'Standardize core offerings and eradicate bespoke scope creep' },
      { week: 'Week 8-10', title: 'The 3-Layer Delegation Protocol', outcome: 'Empower leadership lieutenants to run day-to-day operations' },
      { week: 'Week 11-13', title: 'Predictable Growth Engine', outcome: 'Install automated authority client acquisition channels' },
    ],
  },
  {
    id: 'bpa',
    number: '02',
    name: 'BUSINESS PROFIT ACCELERATOR',
    subheading: 'BUSINESS PROFIT ACCELERATOR',
    headline: 'High-touch 1:1 strategic partnership.',
    duration: '6-Month Bespoke Advisory',
    price: 'Bespoke / By Application',
    priceSub: 'Includes USD 499 comprehensive diagnostic',
    badge: 'Limited to 5 Founders per Quarter',
    isDark: true,
    bullets: [
      'High-touch 1:1 pathway directly with Ranjitha',
      'Includes Business Growth Assessment (USD 499 value)',
      'Bi-weekly private executive advisory & capital allocation sprints',
      'Direct WhatsApp emergency access for high-stakes decisions',
      'Comprehensive organizational redesign and leadership scorecarding',
      'Private offsite retreat access in Dubai & London',
    ],
    idealFor: 'Enterprise Founders & CEOs generating $1M–$10M preparing for scalable expansion, buyout readiness, or CEO sovereignty.',
    ctaText: 'EXPLORE BPA',
    modules: [
      { week: 'Month 1', title: 'Full Enterprise Forensic Audit', outcome: 'Uncover hidden margin leakages and operational bottlenecks' },
      { week: 'Month 2-3', title: 'Executive Team Restructuring', outcome: 'Transition founder out of delivery into pure governance' },
      { week: 'Month 4-5', title: 'High-Margin Expansion Sprints', outcome: 'Launch institutional-grade tier offerings with 50%+ EBITDA' },
      { week: 'Month 6', title: 'Autonomous Exit / Sovereignty Roadmap', outcome: 'Achieve zero founder dependency with restored vitality' },
    ],
  },
];

export const testimonials: Testimonial[] = [
  {
    id: 'mark-sullivan',
    number: '01',
    total: '03',
    name: 'Mark Sullivan',
    title: 'BUSINESS OWNER',
    company: 'Sullivan & Co. Capital Advisory',
    location: 'London, UK',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop',
    quote:
      "Ranjitha's framework didn't just grow my revenue; it gave me my life back. I went from 70-hour weeks to pure CEO focus.",
    extendedQuote:
      "Before working with Ranjitha, I felt like a hostage to my own success. We were generating top-line numbers, but I couldn't remember the last time I slept past 5 AM without a pit in my stomach. Her operational diagnostic pinpointed the 3 critical points of founder dependency. Today our EBITDA is at 44%, my team handles 95% of delivery, and my relationship with my family has never been stronger.",
    metrics: [
      { label: 'Weekly Hours', value: '70h -> 24h' },
      { label: 'Revenue Growth', value: '+115%' },
      { label: 'Net Margins', value: '22% -> 44%' },
    ],
  },
  {
    id: 'elena-rostova',
    number: '02',
    total: '03',
    name: 'Elena Rostova',
    title: 'MANAGING PARTNER',
    company: 'Apex Digital Transformations',
    location: 'Dubai, UAE',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=1000&auto=format&fit=crop',
    quote:
      'We productized our core offering in 45 days. The clarity and financial predictability we unlocked is unlike anything I have experienced in 15 years in business.',
    extendedQuote:
      'Ranjitha brings an unparalleled blend of cold financial rigor and profound mindset recalibration. She helps you see where you are sabotaging your own freedom out of habit or fear of delegation.',
    metrics: [
      { label: 'Deal Size', value: '3.2x Increase' },
      { label: 'EBITDA Margin', value: '+24%' },
      { label: 'Vacation Time', value: '6 Weeks Off-Grid' },
    ],
  },
  {
    id: 'david-chen',
    number: '03',
    total: '03',
    name: 'David Chen',
    title: 'FOUNDER & CEO',
    company: 'Novus Infrastructure Group',
    location: 'Singapore',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1000&auto=format&fit=crop',
    quote:
      'The Business Reality Assessment was a massive wake-up call. Taking action on Ranjitha’s recommendations saved my health and doubled our bottom line.',
    extendedQuote:
      'Within three months of restructuring our executive rhythms, my leadership team took full autonomy. I was finally able to focus purely on acquisitions and high-level strategy.',
    metrics: [
      { label: 'Hours Saved / Wk', value: '35 Hours' },
      { label: 'Team Autonomy', value: '98% Non-Escalated' },
      { label: 'Revenue', value: '$1.8M -> $4.2M' },
    ],
  },
];

export const threeSteps = [
  {
    number: '01',
    title: 'ASSESS',
    description: 'Take the 2-minute diagnostic assessment to uncover hidden gaps in your profit and operational architecture.',
    icon: 'Search',
  },
  {
    number: '02',
    title: 'DISCOVER',
    description: 'Book your 15-minute discovery call to review your personalized results and gap analysis with our team.',
    icon: 'Compass',
  },
  {
    number: '03',
    title: 'GROW',
    description: 'Enroll in the appropriate programme to scale your business, restore your weekends, and sleep soundly.',
    icon: 'TrendingUp',
  },
];

export const navCategories = {
  founders: [
    { title: 'Founders Growth Accelerator', desc: '13-week cohort for 6-7 figure consulting founders', badge: 'Cohort' },
    { title: 'Business Profit Accelerator', desc: 'Bespoke 1:1 strategic advisory partnership', badge: '1:1 VIP' },
    { title: 'Clarity Breakthrough', desc: 'Deep dive 90-minute operational triage session', badge: 'Rapid' },
    { title: 'Business Clarity Diagnostic', desc: 'Comprehensive organizational forensic audit', badge: 'Audit' },
  ],
  teams: [
    { title: 'Team Performance & Autonomy', desc: 'Instill ownership culture in senior lieutenants' },
    { title: 'Sales Performance Architecture', desc: 'Systematize high-ticket B2B conversions' },
    { title: 'Leadership Performance', desc: 'Executive presence & high-stakes decision making' },
    { title: 'Mental Wellness & Energy', desc: 'Nervous system regulation for high-stress teams' },
  ],
  learn: [
    { title: 'Executive Masterclass', desc: 'On-demand masterclasses on profit engineering' },
    { title: 'The 5 Levers Framework', desc: 'The mathematical model to multiply retained earnings' },
    { title: 'Impact Library', desc: 'Templates, playbooks, SOPs, and delegation guides' },
    { title: 'Live Workshops', desc: 'Quarterly virtual and in-person deep dives' },
  ],
  free: [
    { title: 'Business Reality Assessment', desc: '2-minute personalized organizational diagnostic', badge: 'Free' },
    { title: 'Executive Webinars', desc: 'Monthly live masterclasses on profit & freedom' },
    { title: 'WhatsApp Communities', desc: 'Exclusive peer group of high-growth founders' },
    { title: 'The Coached CEO Newsletter', desc: 'Weekly strategic insights delivered Sunday morning' },
  ],
};
