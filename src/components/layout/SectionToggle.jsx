// ==================== src/components/layout/SectionToggle.jsx ====================
import React from 'react';
import { Stack, Button } from '@mui/material';
import { Bed as BedIcon, Warning as WarningIcon } from '@mui/icons-material';

export default function SectionToggle({ activeSection, onSectionChange }) {
  return (
    <Stack direction="row" spacing={2} sx={{ mb: 4 }}>
      <Button fullWidth variant={activeSection === 'bookings' ? 'contained' : 'outlined'} size="large"
        startIcon={<BedIcon />} onClick={() => onSectionChange('bookings')} sx={{ py: 2, fontSize: '1.1rem' }}>
        Bookings Management
      </Button>
      <Button fullWidth variant={activeSection === 'requests' ? 'contained' : 'outlined'} size="large"
        startIcon={<WarningIcon />} onClick={() => onSectionChange('requests')} sx={{ py: 2, fontSize: '1.1rem' }}>
        Guest Requests
      </Button>
    </Stack>
  );
}