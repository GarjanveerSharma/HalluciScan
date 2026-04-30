import { Evidence } from '../lib/mockData';

interface EvidenceListProps {
  evidence?: Evidence[];
}

export default function EvidenceList({ evidence }: EvidenceListProps) {
  if (!evidence || evidence.length === 0) {
    return (
      <div className="evidence-list">
        <h3>Evidence Sources</h3>
        <div className="no-results">
          <div className="no-results-icon">🔍</div>
          <p>No evidence sources found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="evidence-list">
      <h3>Evidence Sources</h3>
      {evidence.map((item) => (
        <div key={item.id} className="evidence-item">
          <div className="evidence-source">
            <a href={item.url} target="_blank" rel="noopener noreferrer">
              {item.source}
            </a>
          </div>
          <div className="evidence-text">{item.text}</div>
          <div className="evidence-confidence">
            Confidence: {(item.confidence * 100).toFixed(1)}%
          </div>
          <div className="confidence-bar">
            <div
              className="confidence-fill"
              style={{ width: `${item.confidence * 100}%` }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
}