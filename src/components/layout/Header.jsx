// ==================== src/components/layout/Header.jsx ====================
import React from 'react';
import { AppBar, Toolbar, Typography, Box, IconButton, Button, LinearProgress } from '@mui/material';
import { Hotel as HotelIcon, Refresh as RefreshIcon, Logout as LogoutIcon } from '@mui/icons-material';

export default function Header({ hotelId, loading, onRefresh, onLogout }) {
  return (
    <>
      <AppBar position="static" elevation={0} sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Toolbar>
          <HotelIcon sx={{ mr: 2 }} />
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h6" fontWeight="bold">HotelIQ Concierge Operations</Typography>
            <Typography variant="caption">Hotel ID: {hotelId}</Typography>
          </Box>
          <IconButton color="inherit" onClick={onRefresh} sx={{ mr: 1 }}>
            <RefreshIcon className={loading ? 'spin' : ''} />
          </IconButton>
          <Button color="inherit" startIcon={<LogoutIcon />} onClick={onLogout}>Logout</Button>
        </Toolbar>
        {loading && <LinearProgress />}
      </AppBar>
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } } .spin { animation: spin 1s linear infinite; }`}</style>
    </>
  );
}