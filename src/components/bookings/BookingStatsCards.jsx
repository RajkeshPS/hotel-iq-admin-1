// ==================== src/components/bookings/BookingStatsCards.jsx ====================
import React from 'react';
import { Grid, Card, CardContent, Typography } from '@mui/material';

export default function BookingStatsCards({ stats }) {
  const cards = [
    { label: 'CONFIRMED BOOKINGS', value: stats.confirmed, color: '#2563eb' },
    { label: 'CHECKED IN', value: stats.checkedIn, color: '#10b981' },
    { label: 'CHECKED OUT TODAY', value: stats.checkedOut, color: '#64748b' },
  ];

  return (
    <Grid container spacing={2} sx={{ mb: 4 }}>
      {cards.map((card, idx) => (
        <Grid item xs={12} sm={4} key={idx}>
          <Card sx={{ borderLeft: 5, borderColor: card.color, borderRadius: 3, bgcolor: '#f8fafc' }}>
            <CardContent sx={{ py: 2 }}>
              <Typography variant="caption" color="text.secondary" fontWeight="bold" letterSpacing={0.5}>
                {card.label}
              </Typography>
              <Typography variant="h2" fontWeight="bold" sx={{ color: card.color, mt: 0.5 }}>
                {card.value}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
