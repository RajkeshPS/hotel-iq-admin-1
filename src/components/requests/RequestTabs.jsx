// ==================== src/components/requests/RequestTabs.jsx ====================
import React from 'react';
import { Paper, Tabs, Tab } from '@mui/material';
import { Hotel, Warning, Build, CleaningServices, Wifi, Luggage, AdminPanelSettings, LocalLaundryService } from '@mui/icons-material';

export default function RequestTabs({ activeTab, onChange }) {
  return (
    <Paper sx={{ mb: 3 }}>
      <Tabs value={activeTab} onChange={onChange} variant="scrollable" scrollButtons="auto">
        <Tab icon={<Hotel />} label="All" iconPosition="start" />
        <Tab icon={<Warning />} label="Emergency" iconPosition="start" />
        <Tab icon={<Build />} label="Maintenance" iconPosition="start" />
        <Tab icon={<LocalLaundryService />} label="Supplies" iconPosition="start" />
        <Tab icon={<CleaningServices />} label="Housekeeping" iconPosition="start" />
        <Tab icon={<Wifi />} label="WiFi/IT" iconPosition="start" />
        <Tab icon={<Luggage />} label="Porter" iconPosition="start" />
        <Tab icon={<AdminPanelSettings />} label="Front Desk" iconPosition="start" />
      </Tabs>
    </Paper>
  );
}