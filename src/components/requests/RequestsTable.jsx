// ==================== src/components/requests/RequestsTable.jsx ====================
import React from 'react';
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Typography, Chip, Button } from '@mui/material';
import { Warning, CheckCircle } from '@mui/icons-material';

export default function RequestsTable({ requests, onResolve }) {
  return (
    <TableContainer component={Paper} elevation={2}>
      <Table>
        <TableHead>
          <TableRow sx={{ bgcolor: 'background.default' }}>
            <TableCell><strong>Room</strong></TableCell>
            <TableCell><strong>Guest</strong></TableCell>
            <TableCell><strong>Request Detail</strong></TableCell>
            <TableCell><strong>Status</strong></TableCell>
            <TableCell><strong>Action</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {requests.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} align="center" sx={{ py: 8 }}>
                <Warning sx={{ fontSize: 60, color: 'text.disabled', mb: 1 }} />
                <Typography color="text.secondary">No requests in this category</Typography>
              </TableCell>
            </TableRow>
          ) : (
            requests.map((r) => (
              <TableRow key={r.id} hover sx={{ bgcolor: r.priority === 'high' && r.status === 'pending' ? '#fef2f2' : 'inherit' }}>
                <TableCell><strong>{r.room_number}</strong></TableCell>
                <TableCell>{r.guest_name}</TableCell>
                <TableCell>
                  <Typography variant="body2" fontWeight="medium">{r.message_text}</Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                    Bot: {r.bot_response}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip label={r.status.toUpperCase()} size="small" color={r.status === 'pending' ? 'warning' : 'success'} />
                </TableCell>
                <TableCell>
                  {r.status === 'pending' ? (
                    <Button variant="outlined" color="success" size="small" startIcon={<CheckCircle />} onClick={() => onResolve(r.id)}>
                      Mark Done
                    </Button>
                  ) : (
                    <Typography variant="caption" color="text.secondary">Completed</Typography>
                  )}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}