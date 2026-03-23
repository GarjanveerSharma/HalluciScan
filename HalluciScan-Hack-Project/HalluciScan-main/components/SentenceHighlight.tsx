import { Highlight } from '../lib/mockData';

interface SentenceHighlightProps {
  highlights?: Highlight[];
  text?: string;
}

export default function SentenceHighlight({ highlights, text }: SentenceHighlightProps) {
  if (!highlights || highlights.length === 0 || !text) {
    return (
      <div className="highlight-container">
        <h3>Sentence Analysis</h3>
        <div className="no-results">
          <div className="no-results-icon">📝</div>
          <p>No highlighted content</p>
        </div>
      </div>
    );
  }

  // Simple highlighting by replacing text
  let highlightedText = text;
  const sortedHighlights = [...highlights].sort((a, b) => b.start - a.start);

  sortedHighlights.forEach((highlight) => {
    const before = highlightedText.slice(0, highlight.start);
    const highlighted = highlightedText.slice(highlight.start, highlight.end);
    const after = highlightedText.slice(highlight.end);

    highlightedText = `${before}<span class="highlight highlight-${highlight.level}" title="${highlight.level} risk">${highlighted}</span>${after}`;
  });

  return (
    <div className="highlight-container">
      <h3>Sentence Analysis</h3>
      <div
        className="highlighted-text"
        dangerouslySetInnerHTML={{ __html: highlightedText }}
      />
      <div style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#718096' }}>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <span>🟢 Low Risk</span>
          <span>🟡 Medium Risk</span>
          <span>🔴 High Risk</span>
        </div>
      </div>
    </div>
  );
}