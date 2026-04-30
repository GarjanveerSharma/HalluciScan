'use client';

import { features } from '../lib/mockData';

export default function FeatureCards() {
  return (
    <section className="features section" id="features">
      <div className="container">
        <div className="section-header text-center">
          <h2>
            Powerful Features for{' '}
            <span className="gradient-text">AI Verification</span>
          </h2>
          <p>
            Comprehensive tools to detect, analyze, and verify AI-generated content
            with industry-leading accuracy.
          </p>
        </div>
        <div className="grid grid-3">
          {features.map((feature, index) => (
            <div
              key={feature.id}
              className="card feature-card fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="feature-icon">
                <span style={{ fontSize: '1.8rem' }}>{feature.icon}</span>
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}