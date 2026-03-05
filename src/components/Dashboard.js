import React, { useEffect, useState } from 'react';
import analyticsService from '../services/analyticsService';

function Dashboard({ trades, onEditTrade }) {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    if (trades.length > 0) {
      const stats = analyticsService.getOverallStats(trades);
      setStats(stats);
    }
  }, [trades]);

  const recentTrades = trades.slice(0, 5);

  return (
    <div className="dashboard">
      <div className="stats-grid">
        {stats && (
          <>
            <div className="stat-card">
              <h3>Total Trades</h3>
              <p className="stat-value">{stats.totalTrades}</p>
            </div>
            <div className="stat-card">
              <h3>Win Rate</h3>
              <p className={`stat-value ${parseFloat(stats.winRate) > 50 ? 'positive' : 'negative'}`}>{stats.winRate}%</p>
            </div>
            <div className="stat-card">
              <h3>Total Profit</h3>
              <p className={`stat-value ${parseFloat(stats.totalProfit) > 0 ? 'positive' : 'negative'}`}>${stats.totalProfit}</p>
            </div>
            <div className="stat-card">
              <h3>Wins / Losses</h3>
              <p className="stat-value">{stats.winCount} / {stats.lossCount}</p>
            </div>
            <div className="stat-card">
              <h3>Profit Factor</h3>
              <p className="stat-value">{stats.profitFactor}</p>
            </div>
            <div className="stat-card">
              <h3>Average Win</h3>
              <p className={`stat-value ${parseFloat(stats.averageWin) > 0 ? 'positive' : 'negative'}`}>${stats.averageWin}</p>
            </div>
            <div className="stat-card">
              <h3>Average Loss</h3>
              <p className={`stat-value ${parseFloat(stats.averageLoss) < 0 ? 'negative' : 'positive'}`}>${stats.averageLoss}</p>
            </div>
            <div className="stat-card">
              <h3>Best Trade</h3>
              <p className={`stat-value ${parseFloat(stats.bestTrade) > 0 ? 'positive' : 'negative'}`}>${stats.bestTrade}</p>
            </div>
            <div className="stat-card">
              <h3>Worst Trade</h3>
              <p className={`stat-value ${parseFloat(stats.worstTrade) < 0 ? 'negative' : 'positive'}`}>${stats.worstTrade}</p>
            </div>
            <div className="stat-card">
              <h3>Expectancy</h3>
              <p className={`stat-value ${parseFloat(stats.expectancy) > 0 ? 'positive' : 'negative'}`}>${stats.expectancy}</p>
            </div>
          </>
        )}
      </div>

      <section className="recent-trades">
        <h2>Recent Trades</h2>
        {recentTrades.length > 0 ? (
          <table className="trades-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Symbol</th>
                <th>Asset Class</th>
                <th>Entry</th>
                <th>Exit</th>
                <th>Profit</th>
                <th>Return %</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentTrades.map(trade => (
                <tr key={trade.id} onClick={() => onEditTrade(trade)}>
                  <td>{new Date(trade.entryDate).toLocaleDateString()}</td>
                  <td className="symbol">{trade.symbol}</td>
                  <td>{trade.assetClass}</td>
                  <td>${parseFloat(trade.entryPrice).toFixed(2)}</td>
                  <td>${parseFloat(trade.exitPrice).toFixed(2)}</td>
                  <td className={parseFloat(trade.profit) > 0 ? 'positive' : 'negative'}>${parseFloat(trade.profit).toFixed(2)}</td>
                  <td className={parseFloat(trade.profitPercent) > 0 ? 'positive' : 'negative'}>{parseFloat(trade.profitPercent).toFixed(2)}%</td>
                  <td>
                    <span className={`badge badge-${trade.outcome}`}>{trade.outcome.charAt(0).toUpperCase() + trade.outcome.slice(1)}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="empty-state">No trades recorded yet. Start by adding your first trade!</p>
        )}
      </section>
    </div>
  );
}

export default Dashboard;