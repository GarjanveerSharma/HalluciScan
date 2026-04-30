import type { Metadata } from 'next';
import './globals.css';

import CustomCursor from '@/components/CustomCursor';

export const metadata: Metadata = {
  title: 'Ghost - AI Hallucination Detection',
  description: 'Advanced AI hallucination detection platform. Real-time analysis for ChatGPT, Gemini, and Claude.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased">
        <CustomCursor />
        <div className="solar-system-bg">
          <div className="sun-core"></div>
          <div className="orbit orbit-1">
            <div className="planet planet-1"></div>
          </div>
          <div className="orbit orbit-2">
            <div className="planet planet-2"></div>
          </div>
          <div className="orbit orbit-3">
            <div className="planet planet-3"></div>
          </div>
        </div>
        {children}
      </body>
    </html>
  );
}