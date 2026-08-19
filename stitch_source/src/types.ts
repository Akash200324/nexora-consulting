export interface AssessmentOption {
  label: string;
  score: number;
  description?: string;
}

export interface AssessmentQuestion {
  id: number;
  category: 'predictability' | 'freedom' | 'systems' | 'mindset';
  categoryLabel: string;
  question: string;
  subtext?: string;
  options: AssessmentOption[];
}

export interface AssessmentScores {
  totalScore: number;
  maxScore: number;
  percentage: number;
  categoryScores: {
    predictability: number; // max 9
    freedom: number; // max 9
    systems: number; // max 9
    mindset: number; // max 9
  };
  tier: 'High-Friction Operator' | 'Emerging Delegator' | 'Scalable Architect' | 'Predictable Sovereign';
  headline: string;
  summary: string;
  recommendedProgram: 'Founders Growth Accelerator' | 'Business Profit Accelerator' | 'Clarity Breakthrough';
  priorityActions: string[];
}

export interface CaseStudy {
  id: string;
  tag: string;
  title: string;
  challenge: string;
  approach: string;
  transformation: string;
  result: string;
  founder: string;
  companyType: string;
  startingMetrics: {
    revenue: string;
    hoursPerWeek: string;
    margin: string;
  };
  endingMetrics: {
    revenue: string;
    hoursPerWeek: string;
    margin: string;
  };
  fullStoryParagraphs: string[];
  keyQuote: string;
}

export interface Program {
  id: string;
  number: string;
  name: string;
  subheading: string;
  headline: string;
  duration: string;
  price: string;
  priceSub: string;
  bullets: string[];
  idealFor: string;
  ctaText: string;
  badge?: string;
  isDark?: boolean;
  modules: {
    week: string;
    title: string;
    outcome: string;
  }[];
}

export interface Testimonial {
  id: string;
  number: string;
  total: string;
  name: string;
  title: string;
  company: string;
  location: string;
  image: string;
  quote: string;
  metrics: {
    label: string;
    value: string;
  }[];
  extendedQuote?: string;
}
