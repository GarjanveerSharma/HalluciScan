'use client';
import { motion } from 'framer-motion';
import { AnalysisResult } from '../lib/mockData';

interface ExtendedClaim {
  id: string;
  text: string;
  verified: boolean;
  sources: string[];
  confidence?: number;
  status?: string;
  explanation?: string;
}

interface ResultPanelProps {
  result?: AnalysisResult;
  onSave?: () => void;
}

/* SVG Donut Chart */
function ScoreChart({ score }: { score: number }) {
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const color = score >= 70 ? '#10b981' : score >= 40 ? '#f59e0b' : '#ef4444';

  return (
    <div className="relative w-36 h-36 mx-auto">
      <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
        <circle cx="60" cy="60" r={radius} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="10" />
        <motion.circle
          cx="60" cy="60" r={radius} fill="none" stroke={color} strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-black text-white">{score.toFixed(0)}</span>
        <span className="text-[10px] text-gray-500 uppercase tracking-wider">Trust</span>
      </div>
    </div>
  );
}

/* Mini bar chart for claims breakdown */
function ClaimsChart({ claims }: { claims: ExtendedClaim[] }) {
  const factual = claims.filter(c => c.status === 'factual').length;
  const hallucinated = claims.filter(c => c.status === 'hallucinated').length;
  const uncertain = claims.filter(c => c.status !== 'factual' && c.status !== 'hallucinated').length;
  const total = claims.length || 1;

  const bars = [
    { label: 'Factual', count: factual, color: '#10b981', bg: 'bg-green-500/20' },
    { label: 'Hallucinated', count: hallucinated, color: '#ef4444', bg: 'bg-red-500/20' },
    { label: 'Uncertain', count: uncertain, color: '#f59e0b', bg: 'bg-yellow-500/20' },
  ];

  return (
    <div className="space-y-3">
      {bars.map((b, i) => (
        <div key={i}>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-gray-400">{b.label}</span>
            <span style={{ color: b.color }} className="font-bold">{b.count}</span>
          </div>
          <div className="h-2 rounded-full bg-white/5 overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ backgroundColor: b.color }}
              initial={{ width: 0 }}
              animate={{ width: `${(b.count / total) * 100}%` }}
              transition={{ duration: 1, delay: 0.3 + i * 0.15 }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function ResultPanel({ result, onSave }: ResultPanelProps) {
  if (!result) return null;

  const score = result.score ?? 0;
  const riskLevel = score >= 70 ? 'Low Risk' : score >= 40 ? 'Medium Risk' : 'High Risk';
  const riskColor = score >= 70 ? 'text-green-400' : score >= 40 ? 'text-yellow-400' : 'text-red-400';
  const claims = (result.claims || []) as ExtendedClaim[];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* ---- Row 1: Score + Risk + Claims Chart ---- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        {/* Score donut */}
        <motion.div
          className="glass rounded-2xl p-6 text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <ScoreChart score={score} />
          <div className={`text-lg font-bold mt-3 ${riskColor}`}>{riskLevel}</div>
          <div className="text-xs text-gray-500 mt-1">Hallucination Score</div>
        </motion.div>

        {/* Claims breakdown chart */}
        <motion.div
          className="glass rounded-2xl p-6"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-sm font-semibold text-white mb-4">📊 Claims Breakdown</h3>
          <ClaimsChart claims={claims} />
          <div className="text-center mt-4">
            <span className="text-2xl font-black text-white">{claims.length}</span>
            <span className="text-xs text-gray-500 ml-2">claims found</span>
          </div>
        </motion.div>

        {/* Quick stats */}
        <motion.div
          className="glass rounded-2xl p-6 flex flex-col justify-between"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-sm font-semibold text-white mb-3">⚡ Quick Stats</h3>
          <div className="space-y-3 flex-1">
            <div className="flex items-center justify-between p-2 rounded-lg bg-white/[0.03]">
              <span className="text-xs text-gray-400">Evidence Sources</span>
              <span className="text-sm font-bold text-cyan-400">{result.evidence?.length || 0}</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded-lg bg-white/[0.03]">
              <span className="text-xs text-gray-400">Suspicious Lines</span>
              <span className="text-sm font-bold text-yellow-400">{result.highlights?.length || 0}</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded-lg bg-white/[0.03]">
              <span className="text-xs text-gray-400">Confidence</span>
              <span className="text-sm font-bold text-purple-400">{score.toFixed(1)}%</span>
            </div>
          </div>
          <button
            onClick={onSave}
            className="mt-4 w-full px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm font-semibold hover:from-purple-500 hover:to-blue-500 transition-all"
          >
            💾 Save Report
          </button>
        </motion.div>
      </div>

      {/* ---- Row 2: AI Summary (full width) ---- */}
      {result.geminiAnswer && (
        <motion.div
          className="glass rounded-2xl p-6 mb-4"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-sm font-semibold text-purple-400 mb-3 flex items-center gap-2">
            ✨ AI Analysis Report
          </h3>
          <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-line">
            {result.geminiAnswer}
          </p>
        </motion.div>
      )}

      {/* ---- Row 3: Highlights + Evidence (2 cols) ---- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {/* Suspicious highlights */}
        <motion.div
          className="glass rounded-2xl p-6"
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h3 className="text-sm font-semibold text-yellow-400 mb-3">⚠️ Suspicious Claims</h3>
          {result.highlights && result.highlights.length > 0 ? (
            <div className="space-y-2">
              {result.highlights.map((h) => (
                <div
                  key={h.id}
                  className={`px-4 py-3 rounded-lg text-sm ${
                    h.level === 'high'
                      ? 'bg-red-500/10 border-l-[3px] border-red-500 text-red-300'
                      : h.level === 'medium'
                        ? 'bg-yellow-500/10 border-l-[3px] border-yellow-500 text-yellow-300'
                        : 'bg-blue-500/10 border-l-[3px] border-blue-500 text-blue-300'
                  }`}
                >
                  {h.text}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-gray-500 text-sm text-center py-6">No suspicious claims found ✓</div>
          )}
        </motion.div>

        {/* Evidence sources */}
        <motion.div
          className="glass rounded-2xl p-6"
          initial={{ opacity: 0, x: 15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h3 className="text-sm font-semibold text-cyan-400 mb-3">🔗 Evidence Sources</h3>
          {result.evidence && result.evidence.length > 0 ? (
            <div className="space-y-2">
              {result.evidence.slice(0, 5).map((e) => (
                <div key={e.id} className="bg-white/[0.03] rounded-lg p-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-semibold text-gray-400">{e.source}</span>
                    <span className="text-xs text-green-400 font-bold">{(e.confidence * 100).toFixed(0)}%</span>
                  </div>
                  <p className="text-xs text-gray-400 line-clamp-2">{e.text}</p>
                  {e.url && (
                    <a href={e.url} target="_blank" rel="noopener noreferrer" className="text-[10px] text-purple-400 hover:underline mt-1 inline-block">
                      View Source →
                    </a>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-gray-500 text-sm text-center py-6">No evidence collected</div>
          )}
        </motion.div>
      </div>

      {/* ---- Row 4: All Claims (grid cards) ---- */}
      {claims.length > 0 && (
        <motion.div
          className="glass rounded-2xl p-6"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h3 className="text-sm font-semibold text-white mb-4">📋 All Claims ({claims.length})</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {claims.map((claim, i) => {
              const icon = claim.status === 'factual' ? '✅' : claim.status === 'hallucinated' ? '❌' : '⚠️';
              const borderColor = claim.status === 'factual' ? 'border-green-500/30' : claim.status === 'hallucinated' ? 'border-red-500/30' : 'border-yellow-500/30';
              const statusColor = claim.status === 'factual' ? 'text-green-400' : claim.status === 'hallucinated' ? 'text-red-400' : 'text-yellow-400';

              return (
                <motion.div
                  key={claim.id}
                  className={`border ${borderColor} bg-white/[0.02] rounded-xl p-4 hover:bg-white/[0.04] transition-colors`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + i * 0.05 }}
                >
                  <div className="flex items-start gap-2">
                    <span className="text-base shrink-0">{icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm text-gray-200 mb-1">{claim.text}</div>
                      {claim.explanation && (
                        <div className="text-xs text-gray-500 mb-2">{claim.explanation}</div>
                      )}
                      <div className="flex items-center gap-3 text-[10px]">
                        {claim.confidence !== undefined && (
                          <span className={`font-bold ${statusColor}`}>{claim.confidence}% confidence</span>
                        )}
                        {claim.sources.length > 0 && (
                          <span className="text-gray-600">{claim.sources.join(', ')}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
