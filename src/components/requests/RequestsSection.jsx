// ==================== src/components/requests/RequestsSection.jsx ====================
import React from 'react';
import RequestStatsCards from './RequestStatsCards';
import RequestTabs from './RequestTabs';
import RequestsTable from './RequestsTable';

export default function RequestsSection({ requests, stats, activeTab, onTabChange, onResolve }) {
  return (
    <>
      <RequestStatsCards stats={stats} />
      <RequestTabs activeTab={activeTab} onChange={onTabChange} />
      <RequestsTable requests={requests} onResolve={onResolve} />
    </>
  );
}
