import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'HalluciScan — AI Hallucination Detection',
  description: 'Detect and verify AI-generated content. HalluciScan analyzes AI responses to identify hallucinations, factual errors, and unsupported claims in real-time.',
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
        {children}
      </body>
    </html>
  );
}