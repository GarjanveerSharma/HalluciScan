export interface AnalysisResult {
  id: string;
  text: string;
  score: number;
  geminiAnswer?: string;
  evidence: Evidence[];
  highlights: Highlight[];
  claims: Claim[];
}

export interface Evidence {
  id: string;
  source: string;
  url: string;
  text: string;
  confidence: number;
}

export interface Highlight {
  id: string;
  text: string;
  level: 'low' | 'medium' | 'high';
  start: number;
  end: number;
}

export interface Claim {
  id: string;
  text: string;
  verified: boolean;
  sources: string[];
}

export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
}

export interface UserStats {
  totalAnalyses: number;
  averageScore: number;
  savedReports: number;
}

export const mockAnalysisResult: AnalysisResult = {
  id: '1',
  text: 'The Eiffel Tower was built in 1889 and stands at 324 meters tall. It was designed by Gustave Eiffel and is located in Paris, France.',
  score: 15.7,
  geminiAnswer: 'The Eiffel Tower is a wrought-iron lattice tower on the Champ de Mars in Paris, France. It is named after the engineer Gustave Eiffel, whose company designed and built the tower as the centerpiece of the 1889 World\'s Fair.',
  evidence: [
    {
      id: '1',
      source: 'Wikipedia',
      url: 'https://en.wikipedia.org/wiki/Eiffel_Tower',
      text: 'The Eiffel Tower is a wrought-iron lattice tower on the Champ de Mars in Paris, France.',
      confidence: 0.95
    },
    {
      id: '2',
      source: 'Official Website',
      url: 'https://www.toureiffel.paris/en',
      text: 'The Eiffel Tower was inaugurated on 31 March 1889.',
      confidence: 0.98
    }
  ],
  highlights: [
    {
      id: '1',
      text: 'stands at 324 meters tall',
      level: 'low',
      start: 45,
      end: 67
    }
  ],
  claims: [
    {
      id: '1',
      text: 'Built in 1889',
      verified: true,
      sources: ['Official records', 'Historical documents']
    },
    {
      id: '2',
      text: '324 meters tall',
      verified: true,
      sources: ['Engineering specs', 'Tourist guides']
    }
  ]
};

export const features: Feature[] = [
  {
    id: '1',
    title: 'Real-time Analysis',
    description: 'Instantly detect hallucinations in AI-generated text with our advanced algorithms.',
    icon: '⚡'
  },
  {
    id: '2',
    title: 'Source Verification',
    description: 'Cross-reference claims with reliable external sources for maximum accuracy.',
    icon: '🔍'
  },
  {
    id: '3',
    title: 'Sentence Highlighting',
    description: 'Visual indicators show exactly which parts of the text may contain hallucinations.',
    icon: '🎯'
  },
  {
    id: '4',
    title: 'PDF Support',
    description: 'Upload and analyze PDF documents directly in your browser.',
    icon: '📄'
  },
  {
    id: '5',
    title: 'Dashboard Analytics',
    description: 'Track your analysis history and improve your AI content quality over time.',
    icon: '📊'
  },
  {
    id: '6',
    title: 'Research Blog',
    description: 'Stay updated with the latest in AI hallucination detection and mitigation.',
    icon: '📚'
  }
];

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Understanding AI Hallucinations: A Comprehensive Guide',
    excerpt: 'Learn about the different types of hallucinations in AI systems and how to detect them.',
    date: '2024-03-01',
    author: 'Dr. Sarah Chen'
  },
  {
    id: '2',
    title: 'The Future of AI Content Verification',
    excerpt: 'Exploring emerging technologies for automated fact-checking in AI-generated content.',
    date: '2024-02-15',
    author: 'Mark Johnson'
  },
  {
    id: '3',
    title: 'Case Study: Hallucination Detection in Medical AI',
    excerpt: 'How HalluciScan helped improve accuracy in AI-assisted medical diagnosis.',
    date: '2024-02-01',
    author: 'Dr. Emily Rodriguez'
  }
];

export const userStats: UserStats = {
  totalAnalyses: 247,
  averageScore: 23.4,
  savedReports: 15
};

export const howItWorksSteps = [
  {
    step: 1,
    title: 'Input Text',
    description: 'Paste your AI-generated text or upload a PDF document.'
  },
  {
    step: 2,
    title: 'AI Analysis',
    description: 'Our algorithms scan for potential hallucinations and fact-check claims.'
  },
  {
    step: 3,
    title: 'Source Verification',
    description: 'Cross-reference with external sources to verify accuracy.'
  },
  {
    step: 4,
    title: 'Results & Insights',
    description: 'Get detailed reports with highlighted issues and evidence sources.'
  }
];