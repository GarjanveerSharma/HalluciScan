import Navbar from '../../components/Header';
import Footer from '../../components/Footer';
import { userStats, mockAnalysisResult } from '../../lib/mockData';

export default function DashboardPage() {
  const recentAnalyses = [
    { ...mockAnalysisResult, date: '2024-03-07', title: 'Eiffel Tower Analysis' },
    { ...mockAnalysisResult, date: '2024-03-06', title: 'Climate Change Report' },
    { ...mockAnalysisResult, date: '2024-03-05', title: 'Medical AI Output' },
  ];

  return (
    <main>
      <Navbar />
      <section className="dashboard-page section">
        <div className="container">
          <div className="dashboard-header">
            <h1>Dashboard</h1>
            <p>Track your analysis history and performance metrics</p>
          </div>

          <div className="stats-grid">
            <div className="stat-card card">
              <h3>Total Analyses</h3>
              <div className="stat-number">{userStats.totalAnalyses}</div>
            </div>
            <div className="stat-card card">
              <h3>Average Risk Score</h3>
              <div className="stat-number">{userStats.averageScore}%</div>
            </div>
            <div className="stat-card card">
              <h3>Saved Reports</h3>
              <div className="stat-number">{userStats.savedReports}</div>
            </div>
          </div>

          <div className="dashboard-content">
            <div className="recent-analyses">
              <h2>Recent Analyses</h2>
              <div className="analyses-list">
                {recentAnalyses.map((analysis, index) => (
                  <div key={index} className="analysis-item card">
                    <div className="analysis-header">
                      <h4>{analysis.title}</h4>
                      <span className="analysis-date">{analysis.date}</span>
                    </div>
                    <div className="analysis-summary">
                      <div className="analysis-score">
                        Risk: {analysis.score.toFixed(1)}%
                      </div>
                      <div className="analysis-text">
                        {analysis.text.substring(0, 100)}...
                      </div>
                    </div>
                    <div className="analysis-actions">
                      <button className="btn btn-secondary">View Details</button>
                      <button className="btn">Re-analyze</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="saved-reports">
              <h2>Saved Reports</h2>
              <div className="reports-list">
                {Array.from({ length: userStats.savedReports }, (_, i) => (
                  <div key={i} className="report-item card">
                    <h4>Report {i + 1}</h4>
                    <p>Saved analysis from recent session</p>
                    <button className="btn btn-secondary">Download</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}