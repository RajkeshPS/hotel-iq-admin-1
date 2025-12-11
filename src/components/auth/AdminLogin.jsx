// ==================== src/components/auth/AdminLogin.jsx ====================
import React, { useState } from 'react';
import { Box, Card, CardContent, TextField, Button, Typography, Avatar } from '@mui/material';
import { Hotel as HotelIcon, Login as LoginIcon } from '@mui/icons-material';

export default function AdminLogin({ onLogin }) {
  const [loginInput, setLoginInput] = useState('111418');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (loginInput) onLogin(loginInput);
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #1e3a8a 0%, #0891b2 100%)',
    }}>
      <Card sx={{ maxWidth: 440, width: '100%', m: 2, p: 2 }}>
        <CardContent>
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <Avatar sx={{ width: 80, height: 80, mx: 'auto', mb: 2, bgcolor: 'primary.main', boxShadow: 3 }}>
              <HotelIcon sx={{ fontSize: 40 }} />
            </Avatar>
            <Typography variant="h4" fontWeight="bold" gutterBottom color="primary">
              HotelIQ Manager
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Enter your Hotel ID to access the dashboard
            </Typography>
          </Box>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              type="number"
              label="Hotel ID"
              value={loginInput}
              onChange={(e) => setLoginInput(e.target.value)}
              placeholder="e.g., 111418"
              sx={{ mb: 3 }}
            />
            <Button fullWidth type="submit" variant="contained" size="large" startIcon={<LoginIcon />} sx={{ py: 1.5 }}>
              Access Dashboard
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}