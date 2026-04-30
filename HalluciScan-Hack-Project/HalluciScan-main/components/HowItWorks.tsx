'use client';

import { howItWorksSteps } from '../lib/mockData';

const stepIcons = ['📝', '🤖', '🔍', '📊'];

export default function HowItWorks() {
  return (
    <section className="how-it-works section" id="how-it-works">
      <div className="container">
        <div className="section-header text-center">
          <h2>
            How{' '}
            <span className="gradient-text">HalluciScan</span>{' '}
            Works
          </h2>
          <p>
            Our four-step pipeline ensures thorough analysis and reliable results
            for your AI-generated content.
          </p>
        </div>
        <div className="steps-container">
          {howItWorksSteps.map((step, index) => (
            <div
              key={step.step}
              className="step-item fade-in-up"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="step-number">
                <span>{stepIcons[index] || step.step}</span>
              </div>
              <div className="step-content">
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}