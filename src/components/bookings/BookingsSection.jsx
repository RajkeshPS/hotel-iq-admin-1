// ==================== src/components/bookings/BookingsSection.jsx ====================
import React from 'react';
import BookingStatsCards from './BookingStatsCards';
import BookingsTable from './BookingsTable';

export default function BookingsSection({ bookings, stats, onCheckInOut }) {
  return (
    <>
      <BookingStatsCards stats={stats} />
      <BookingsTable bookings={bookings} onCheckInOut={onCheckInOut} />
    </>
  );
}