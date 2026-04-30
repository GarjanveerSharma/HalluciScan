/**
 * HalluciScan Content Script
 * Runs on ChatGPT, Gemini, and Claude pages.
 * Detects AI responses in the DOM and sends them for analysis.
 */

// ---- Configuration ----
// CHANGE THIS TO YOUR DEPLOYED URL LATER (e.g. 'https://your-app-name.vercel.app/api/analyze')
const API_URL = 'http://localhost:3000/api/analyze';
const SCAN_INTERVAL = 3000; // Check for new responses every 3 seconds

// ---- State ----
let analyzedTexts = new Set();
let panelVisible = false;

// ---- DOM Selectors for each platform ----
function getResponseSelector() {
  const host = window.location.hostname;
  if (host.includes('chatgpt.com') || host.includes('chat.openai.com')) {
    return '[data-message-author-role="assistant"]';
  }
  if (host.includes('gemini.google.com')) {
    return '.model-response-text, .response-content';
  }
  if (host.includes('claude.ai')) {
    return '[data-is-streaming="false"] .font-claude-message';
  }
  return null;
}

// ---- Extract latest AI response text ----
function getLatestResponse() {
  const selector = getResponseSelector();
  if (!selector) return null;

  const elements = document.querySelectorAll(selector);
  if (elements.length === 0) return null;

  const latest = elements[elements.length - 1];
  const text = latest.innerText?.trim();

  if (!text || text.length < 20 || analyzedTexts.has(text)) return null;
  return text;
}

// ---- Send to HalluciScan API ----
async function analyzeText(text) {
  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    });
    if (!res.ok) throw new Error('API error');
    return await res.json();
  } catch (err) {
    console.error('[HalluciScan] Analysis failed:', err);
    return null;
  }
}

// ---- Create Floating Panel ----
function createPanel() {
  const existing = document.getElementById('halluciscan-panel');
  if (existing) existing.remove();

  const panel = document.createElement('div');
  panel.id = 'halluciscan-panel';
  panel.innerHTML = `
    <div class="hs-header">
      <span class="hs-logo">🛡️ HalluciScan</span>
      <button id="hs-close" class="hs-close-btn">✕</button>
    </div>
    <div id="hs-content" class="hs-content">
      <div class="hs-loading">Analyzing response...</div>
    </div>
  `;
  document.body.appendChild(panel);

  document.getElementById('hs-close').addEventListener('click', () => {
    panel.style.display = 'none';
    panelVisible = false;
  });

  return panel;
}

// ---- Update Panel with Results ----
function updatePanel(result) {
  const content = document.getElementById('hs-content');
  if (!content) return;

  const score = result.score ?? 0;
  const risk = score >= 70 ? 'Low' : score >= 40 ? 'Medium' : 'High';
  const riskColor = score >= 70 ? '#10b981' : score >= 40 ? '#f59e0b' : '#ef4444';

  let claimsHTML = '';
  if (result.claims && result.claims.length > 0) {
    claimsHTML = result.claims.map(c => {
      const icon = c.status === 'factual' ? '✅' : c.status === 'hallucinated' ? '❌' : '⚠️';
      const color = c.status === 'factual' ? '#10b981' : c.status === 'hallucinated' ? '#ef4444' : '#f59e0b';
      return `<div class="hs-claim" style="border-left: 3px solid ${color}">
        <span>${icon} ${c.text.substring(0, 80)}${c.text.length > 80 ? '...' : ''}</span>
        <span class="hs-badge" style="color:${color}">${c.confidence}%</span>
      </div>`;
    }).join('');
  }

  content.innerHTML = `
    <div class="hs-score-section">
      <div class="hs-score-ring" style="border-color: ${riskColor}">
        <span class="hs-score-num">${score}</span>
      </div>
      <div>
        <div class="hs-score-label">Trust Score</div>
        <div class="hs-risk" style="color: ${riskColor}">Risk: ${risk}</div>
      </div>
    </div>
    ${claimsHTML ? `<div class="hs-claims-title">Claims Analyzed</div>${claimsHTML}` : ''}
  `;
}

// ---- Main Observer Loop ----
function startObserver() {
  setInterval(async () => {
    const text = getLatestResponse();
    if (!text) return;

    analyzedTexts.add(text);
    const panel = createPanel();
    panel.style.display = 'block';
    panelVisible = true;

    const result = await analyzeText(text);
    if (result && !result.error) {
      updatePanel(result);
    } else {
      const content = document.getElementById('hs-content');
      if (content) content.innerHTML = '<div class="hs-error">Analysis unavailable. Is the server running?</div>';
    }
  }, SCAN_INTERVAL);
}

// ---- Initialize ----
console.log('[HalluciScan] Extension loaded on', window.location.hostname);
startObserver();
