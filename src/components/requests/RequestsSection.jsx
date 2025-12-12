// File: src/components/requests/RequestsSection.jsx
import React, { useState, useEffect, useRef } from 'react';
import RequestStatsCards from './RequestStatsCards';
import RequestTabs from './RequestTabs';
import RequestsTable from './RequestsTable';

// NOTE: Ensure 'requests' prop is passed down from parent (App.jsx or Dashboard)
export default function RequestsSection({ requests, stats, activeTab, onTabChange, onResolve }) {
  
  // Ref to track previous request count for the sound alert
  const prevRequestCountRef = useRef(requests ? requests.length : 0);

  // Sound Alert Effect
  useEffect(() => {
    // Check if we have MORE requests than before (meaning a new one arrived)
    if (requests && requests.length > prevRequestCountRef.current) {
      // Play a notification sound
      const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
      
      audio.play().catch((error) => {
        console.warn("Audio play blocked by browser (user must interact first):", error);
      });
    }

    // Update the ref to the current count
    prevRequestCountRef.current = requests ? requests.length : 0;
  }, [requests]); // This effect runs whenever 'requests' array changes

  return (
    <>
      <RequestStatsCards stats={stats} />
      <RequestTabs activeTab={activeTab} onChange={onTabChange} />
      <RequestsTable requests={requests} onResolve={onResolve} />
    </>
  );
}