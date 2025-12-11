// ==================== src/components/bookings/BookingsTable.jsx ====================
import React from 'react';
import {
  Paper, Box, Stack, Typography, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Avatar, Button, Chip
} from '@mui/material';
import { Bed, Person, CalendarToday, CheckCircle } from '@mui/icons-material';

export default function BookingsTable({ bookings, onCheckInOut }) {
  return (
    <Paper elevation={2}>
      <Box sx={{ p: 2, bgcolor: 'primary.light', color: 'white' }}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Bed />
          <Box>
            <Typography variant="h6" fontWeight="bold">All Bookings</Typography>
            <Typography variant="caption">Manage guest check-ins and check-outs</Typography>
          </Box>
        </Stack>
      </Box>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: 'background.default' }}>
              <TableCell><strong>Booking ID</strong></TableCell>
              <TableCell><strong>Guest</strong></TableCell>
              <TableCell><strong>Room</strong></TableCell>
              <TableCell><strong>Check-in</strong></TableCell>
              <TableCell><strong>Check-out</strong></TableCell>
              <TableCell><strong>Guests</strong></TableCell>
              <TableCell><strong>Status</strong></TableCell>
              <TableCell><strong>Action</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bookings.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} align="center" sx={{ py: 8 }}>
                  <Bed sx={{ fontSize: 60, color: 'text.disabled', mb: 1 }} />
                  <Typography color="text.secondary">No bookings found</Typography>
                </TableCell>
              </TableRow>
            ) : (
              bookings.map((b) => (
                <TableRow key={b.id} hover>
                  <TableCell><Typography fontWeight="bold" color="primary">#{b.id}</Typography></TableCell>
                  <TableCell>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Avatar sx={{ bgcolor: 'secondary.main', width: 36, height: 36 }}>
                        <Person fontSize="small" />
                      </Avatar>
                      <Box>
                        <Typography variant="body2" fontWeight="medium">{b.guest_name}</Typography>
                        <Typography variant="caption" color="text.secondary">{b.guest_email}</Typography>
                      </Box>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Typography fontWeight="medium">{b.room_number || 'TBA'}</Typography>
                    <Typography variant="caption" color="text.secondary">{b.room_type}</Typography>
                  </TableCell>
                  <TableCell>
                    <Stack direction="row" alignItems="center" spacing={0.5}>
                      <CalendarToday fontSize="small" color="action" />
                      <Typography variant="body2">{new Date(b.check_in_date).toLocaleDateString()}</Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Stack direction="row" alignItems="center" spacing={0.5}>
                      <CalendarToday fontSize="small" color="action" />
                      <Typography variant="body2">{new Date(b.check_out_date).toLocaleDateString()}</Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>{b.num_guests}</TableCell>
                  <TableCell>
                    <Chip
                      label={b.check_in_status ? b.check_in_status.replace('_', ' ').toUpperCase() : 'CONFIRMED'}
                      size="small"
                      color={
                        b.check_in_status === 'checked_out' ? 'default' :
                        b.check_in_status === 'checked_in' ? 'success' : 'primary'
                      }
                    />
                  </TableCell>
                  <TableCell>
                    {(!b.check_in_status || b.check_in_status === 'confirmed' || b.check_in_status === 'pending') && (
                      <Button variant="contained" size="small" onClick={() => onCheckInOut(b.id, b.check_in_status || 'confirmed')}>Check In</Button>
                    )}
                    {b.check_in_status === 'checked_in' && (
                      <Button variant="contained" color="secondary" size="small" onClick={() => onCheckInOut(b.id, b.check_in_status)}>Check Out</Button>
                    )}
                    {b.check_in_status === 'checked_out' && (
                      <Stack direction="row" alignItems="center" spacing={0.5}>
                        <CheckCircle fontSize="small" color="success" />
                        <Typography variant="caption" color="text.secondary">Completed</Typography>
                      </Stack>
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}