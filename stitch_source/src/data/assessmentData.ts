import { AssessmentQuestion, AssessmentScores } from '../types';

export const assessmentQuestions: AssessmentQuestion[] = [
  {
    id: 1,
    category: 'predictability',
    categoryLabel: 'Income & Pipeline Predictability',
    question: 'Your business generates income predictably.',
    subtext: 'Consider cash flow consistency over the past 6 to 12 months.',
    options: [
      { label: 'NEVER', score: 0, description: 'Extreme feast-or-famine cycles every quarter.' },
      { label: 'SOMETIMES', score: 1, description: 'Unpredictable peaks and valleys with frequent dry spells.' },
      { label: 'OFTEN', score: 2, description: 'Relatively stable revenue with occasional revenue dips.' },
      { label: 'ALWAYS', score: 3, description: 'Consistent, predictable recurring revenue pipeline.' },
    ],
  },
  {
    id: 2,
    category: 'freedom',
    categoryLabel: 'Operational Autonomy',
    question: 'Your business can operate without you for 30 consecutive days.',
    subtext: 'Without daily WhatsApp pings, emergency escalations, or paused deals.',
    options: [
      { label: 'NEVER', score: 0, description: 'The business halts immediately if I am offline.' },
      { label: 'SOMETIMES', score: 1, description: 'Operations stumble and major projects freeze.' },
      { label: 'OFTEN', score: 2, description: 'The team manages routine work with minor hiccups.' },
      { label: 'ALWAYS', score: 3, description: 'The business operates and grows completely seamlessly.' },
    ],
  },
  {
    id: 3,
    category: 'systems',
    categoryLabel: 'Productization & Systems',
    question: 'Your service offerings are standardized and productized.',
    subtext: 'Clear deliverables, fixed scope, repeatable delivery playbooks.',
    options: [
      { label: 'NEVER', score: 0, description: 'Every client receives custom, bespoke scope work.' },
      { label: 'SOMETIMES', score: 1, description: 'Loose templates exist, but heavy custom work is needed.' },
      { label: 'OFTEN', score: 2, description: 'Most services follow standard core workflows.' },
      { label: 'ALWAYS', score: 3, description: 'Fully productized high-ticket pathways with zero custom creep.' },
    ],
  },
  {
    id: 4,
    category: 'mindset',
    categoryLabel: 'Founder Energy & Freedom',
    question: 'You finish your work week feeling energized rather than depleted.',
    subtext: 'Your mental bandwidth remains intact for personal life and recovery.',
    options: [
      { label: 'NEVER', score: 0, description: 'Constant chronic exhaustion and 70+ hour work weeks.' },
      { label: 'SOMETIMES', score: 1, description: 'Frequent burnout cycles with lingering mental fatigue.' },
      { label: 'OFTEN', score: 2, description: 'Manageable energy levels with occasional intense sprints.' },
      { label: 'ALWAYS', score: 3, description: 'Deep mental clarity, high vitality, and restored weekends.' },
    ],
  },
  {
    id: 5,
    category: 'predictability',
    categoryLabel: 'Client Acquisition Engine',
    question: 'You have a repeatable client acquisition channel that does not rely solely on referrals.',
    subtext: 'Predictable leads from outbound, authority content, or strategic partnerships.',
    options: [
      { label: 'NEVER', score: 0, description: '100% reliant on random word-of-mouth.' },
      { label: 'SOMETIMES', score: 1, description: 'Sporadic inbound inquiries without a repeatable mechanism.' },
      { label: 'OFTEN', score: 2, description: 'Consistent inbound flow with modest conversion tracking.' },
      { label: 'ALWAYS', score: 3, description: 'Engineered pipeline with predictable cost and conversion metrics.' },
    ],
  },
  {
    id: 6,
    category: 'freedom',
    categoryLabel: 'Leadership & Delegation',
    question: 'Your team takes full ownership of outcomes rather than asking you for permission.',
    subtext: 'Empowered leads solving challenges autonomously.',
    options: [
      { label: 'NEVER', score: 0, description: 'I am the bottleneck for every micro-decision.' },
      { label: 'SOMETIMES', score: 1, description: 'Team executes tasks but hesitates to take initiative.' },
      { label: 'OFTEN', score: 2, description: 'Key team members manage their domains well.' },
      { label: 'ALWAYS', score: 3, description: 'Autonomous leaders driving growth with zero hand-holding.' },
    ],
  },
  {
    id: 7,
    category: 'systems',
    categoryLabel: 'Margin & Profit Architecture',
    question: 'Your net profit margins exceed 40% after paying yourself a market CEO salary.',
    subtext: 'High-margin architecture protecting capital and healthy retained earnings.',
    options: [
      { label: 'NEVER', score: 0, description: 'Operating at razor-thin margins or subsidizing payroll.' },
      { label: 'SOMETIMES', score: 1, description: 'Margins fluctuate widely between 10% and 25%.' },
      { label: 'OFTEN', score: 2, description: 'Healthy margins averaging 30% to 40%.' },
      { label: 'ALWAYS', score: 3, description: 'Robust margins consistently above 45%+.' },
    ],
  },
  {
    id: 8,
    category: 'mindset',
    categoryLabel: 'Sleep & Nervous System Regulation',
    question: 'You sleep soundly without waking up anxious about cash flow or client fires.',
    subtext: 'Uninterrupted restorative sleep free of midnight mental loops.',
    options: [
      { label: 'NEVER', score: 0, description: 'Nightly insomnia, heart palpitations, or panic spikes.' },
      { label: 'SOMETIMES', score: 1, description: 'Frequent 3 AM awakenings thinking about business risks.' },
      { label: 'OFTEN', score: 2, description: 'Generally peaceful sleep with occasional stress nights.' },
      { label: 'ALWAYS', score: 3, description: 'Deep, serene restorative sleep every night.' },
    ],
  },
  {
    id: 9,
    category: 'predictability',
    categoryLabel: 'Pricing Power & Value Architecture',
    question: 'You charge premium pricing anchored to client ROI rather than hourly rates.',
    subtext: 'High-ticket positioning reflecting transformational outcomes.',
    options: [
      { label: 'NEVER', score: 0, description: 'Trading time for dollars at standard commodity rates.' },
      { label: 'SOMETIMES', score: 1, description: 'Occasional package deals, but frequent client discounting.' },
      { label: 'OFTEN', score: 2, description: 'Strong project fees with minimal rate resistance.' },
      { label: 'ALWAYS', score: 3, description: 'Elite value pricing with zero scope pushback.' },
    ],
  },
  {
    id: 10,
    category: 'freedom',
    categoryLabel: 'Strategic CEO Focus',
    question: 'You spend at least 40% of your working hours on visionary strategic growth.',
    subtext: 'Working ON the business architecture rather than trapped IN delivery.',
    options: [
      { label: 'NEVER', score: 0, description: '100% consumed by client firefighting and admin.' },
      { label: 'SOMETIMES', score: 1, description: 'Less than 10% of time spent on future strategy.' },
      { label: 'OFTEN', score: 2, description: 'Dedicated half-days for strategic planning.' },
      { label: 'ALWAYS', score: 3, description: '50%+ of week dedicated solely to leverage, vision & culture.' },
    ],
  },
  {
    id: 11,
    category: 'systems',
    categoryLabel: 'Documented SOPs & Knowledge Base',
    question: 'Critical workflows, client onboarding, and delivery are documented in living SOPs.',
    subtext: 'Playbooks enabling rapid onboarding and consistent high-quality execution.',
    options: [
      { label: 'NEVER', score: 0, description: 'All knowledge lives solely inside my head.' },
      { label: 'SOMETIMES', score: 1, description: 'Scattered Google Docs that are quickly outdated.' },
      { label: 'OFTEN', score: 2, description: 'Core workflows are documented and partially maintained.' },
      { label: 'ALWAYS', score: 3, description: 'Comprehensive, institutionalized operational operating system.' },
    ],
  },
  {
    id: 12,
    category: 'mindset',
    categoryLabel: 'Founder Identity & Life Alignment',
    question: 'Your business serves your ideal lifestyle, relationships, and health.',
    subtext: 'Your calendar honors personal boundaries, family presence, and passions.',
    options: [
      { label: 'NEVER', score: 0, description: 'The business has completely consumed my personal life.' },
      { label: 'SOMETIMES', score: 1, description: 'Personal life is constantly sacrificed for business crises.' },
      { label: 'OFTEN', score: 2, description: 'Decent balance with intentional protected family blocks.' },
      { label: 'ALWAYS', score: 3, description: 'Total harmony: the business fuels freedom, wealth, and joy.' },
    ],
  },
];

export function calculateAssessmentResult(answers: Record<number, number>): AssessmentScores {
  let totalScore = 0;
  const maxScore = assessmentQuestions.length * 3; // 36

  const categoryScores = {
    predictability: 0,
    freedom: 0,
    systems: 0,
    mindset: 0,
  };

  assessmentQuestions.forEach((q) => {
    const chosenIndex = answers[q.id] ?? 0;
    const score = q.options[chosenIndex]?.score ?? 0;
    totalScore += score;
    categoryScores[q.category] += score;
  });

  const percentage = Math.round((totalScore / maxScore) * 100);

  if (percentage <= 35) {
    return {
      totalScore,
      maxScore,
      percentage,
      categoryScores,
      tier: 'High-Friction Operator',
      headline: 'Founder Trap: High Burnout, Extreme Operational Friction',
      summary:
        'Your business currently functions as a high-stress job rather than an asset. You are the single point of failure for revenue, delivery, and decision-making. Stepping away causes immediate paralysis, and the cognitive overhead is severely impacting your energy and sleep.',
      recommendedProgram: 'Clarity Breakthrough',
      priorityActions: [
        'Perform an immediate Time-Audit to isolate the 20% of high-friction tasks draining your weekly energy.',
        'Productize your primary service offering to eliminate bespoke custom scope drift.',
        'Establish an emergency 3-tier delegation protocol so team members stop routing micro-decisions to you.',
        'Institute a non-negotiable weekend digital curfew to restore nervous system baseline.',
      ],
    };
  } else if (percentage <= 65) {
    return {
      totalScore,
      maxScore,
      percentage,
      categoryScores,
      tier: 'Emerging Delegator',
      headline: 'Transition Stage: Solid Revenue with Bottlenecked Scale',
      summary:
        'You have achieved market traction and healthy revenue, but scaling further requires structural reinvention. You have begun delegating, but still carry the ultimate mental burden of client delivery and cash flow predictability.',
      recommendedProgram: 'Founders Growth Accelerator',
      priorityActions: [
        'Install the 5-Levers Profit Framework to systematically raise average client retainer values by 30-50%.',
        'Standardize delivery into a repeatable 90-day sprint playbook managed by senior lieutenants.',
        'Implement an engineered outbound & authority acquisition channel to eliminate referral reliance.',
        'Transition your weekly schedule from 55+ operational hours to 30 strategic hours.',
      ],
    };
  } else if (percentage <= 85) {
    return {
      totalScore,
      maxScore,
      percentage,
      categoryScores,
      tier: 'Scalable Architect',
      headline: 'High-Leverage Leader: Strong Systems, Approaching True Freedom',
      summary:
        'You have engineered impressive systems, autonomous teams, and strong pricing power. Your primary opportunity now is transitioning from an active Managing Partner to a true Chairman/Sovereign Owner, optimizing enterprise valuation and high-margin expansion.',
      recommendedProgram: 'Business Profit Accelerator',
      priorityActions: [
        'Architect high-touch 1:1 strategic advisory positioning to command institutional enterprise fees.',
        'Build second-in-command leadership accountability scorecards.',
        'Protect executive recovery rhythms with quarterly unplugged retreats.',
        'Develop asset-level intellectual property and high-margin licensing.',
      ],
    };
  } else {
    return {
      totalScore,
      maxScore,
      percentage,
      categoryScores,
      tier: 'Predictable Sovereign',
      headline: 'Architect of Freedom: Predictable Wealth & Total Autonomy',
      summary:
        'Your enterprise operates like a finely tuned Swiss watch. Revenue is predictable, margins are high, leadership is self-sufficient, and you enjoy deep sleep and boundless personal freedom.',
      recommendedProgram: 'Business Profit Accelerator',
      priorityActions: [
        'Formulate advisory board governance and capital allocation strategies.',
        'Explore strategic acquisitions or equity partnerships.',
        'Mentor next-generation founders through institutionalized masterminds.',
      ],
    };
  }
}
