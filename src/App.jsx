// ==================== src/App.jsx ====================
import React, { useState, useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { Box, Container } from '@mui/material';
import theme from './theme/theme';
import {
  getAdminRequests,
  updateRequestStatus,
  getHotelBookings,
  updateBookingStatus,
  uploadKnowledgeBase
} from './services/api';

// Components
import AdminLogin from './components/auth/AdminLogin';
import Header from './components/layout/Header';
import SectionToggle from './components/layout/SectionToggle';
import BookingsSection from './components/bookings/BookingsSection';
import RequestsSection from './components/requests/RequestsSection';
import KnowledgeUpload from './components/common/KnowledgeUpload';

const REQUEST_CATEGORIES = ['all', 'emergency', 'repair', 'supplies', 'cleaning', 'wifi', 'porter', 'admin'];
const AUTO_REFRESH_INTERVAL = 5000;

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hotelId, setHotelId] = useState('');
  const [activeSection, setActiveSection] = useState('bookings');
  const [activeRequestTab, setActiveRequestTab] = useState(0);
  const [loading, setLoading] = useState(false);
  const [requests, setRequests] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [stats, setStats] = useState({ emergency: 0, pending: 0, resolved: 0 });
  const [bookingStats, setBookingStats] = useState({ confirmed: 0, checkedIn: 0, checkedOut: 0 });

  useEffect(() => {
    const storedId = localStorage.getItem('adminHotelId');
    if (storedId) {
      setHotelId(storedId);
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn && hotelId) {
      fetchData();
      const interval = setInterval(fetchData, AUTO_REFRESH_INTERVAL);
      return () => clearInterval(interval);
    }
  }, [isLoggedIn, hotelId]);

  const handleLogin = (id) => {
    localStorage.setItem('adminHotelId', id);
    setHotelId(id);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminHotelId');
    setIsLoggedIn(false);
    setHotelId('');
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const reqData = await getAdminRequests(hotelId);
      setRequests(reqData);
      const pending = reqData.filter(r => r.status === 'pending').length;
      const resolved = reqData.filter(r => r.status === 'resolved').length;
      const emergency = reqData.filter(r => r.request_type === 'emergency' && r.status === 'pending').length;
      setStats({ emergency, pending, resolved });

      const bookData = await getHotelBookings(hotelId);
      setBookings(bookData);
      const confirmed = bookData.filter(b => b.status === 'confirmed').length;
      const checkedIn = bookData.filter(b => b.status === 'checked_in').length;
      const checkedOut = bookData.filter(b => b.status === 'checked_out').length;
      setBookingStats({ confirmed, checkedIn, checkedOut });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setLoading(false);
  };

  const handleResolveRequest = async (id) => {
    try {
      await updateRequestStatus(id, 'resolved', 'Manager');
      fetchData();
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to update request');
    }
  };

  const handleCheckInOut = async (bookingId, currentStatus) => {
    // Determine next status based on current status
    let newStatus;
    if (!currentStatus || currentStatus === 'confirmed' || currentStatus === 'pending') {
      newStatus = 'checked_in';
    } else if (currentStatus === 'checked_in') {
      newStatus = 'checked_out';
    } else {
      return; // Already checked out
    }
    
    try {
      await updateBookingStatus(bookingId, newStatus);
      fetchData();
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to update booking');
    }
  };

  const handleKnowledgeUpload = async (file) => {
    await uploadKnowledgeBase(hotelId, file);
  };

  const getFilteredRequests = () => {
    const category = REQUEST_CATEGORIES[activeRequestTab];
    return category === 'all' ? requests : requests.filter(r => r.request_type === category);
  };

  if (!isLoggedIn) {
    return (
      <ThemeProvider theme={theme}>
        <AdminLogin onLogin={handleLogin} />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
        <Header hotelId={hotelId} loading={loading} onRefresh={fetchData} onLogout={handleLogout} />
        <Container maxWidth="xl" sx={{ py: 4 }}>
          <SectionToggle activeSection={activeSection} onSectionChange={setActiveSection} />
          {activeSection === 'bookings' ? (
            <BookingsSection bookings={bookings} stats={bookingStats} onCheckInOut={handleCheckInOut} />
          ) : (
            <RequestsSection
              requests={getFilteredRequests()}
              stats={stats}
              activeTab={activeRequestTab}
              onTabChange={(e, val) => setActiveRequestTab(val)}
              onResolve={handleResolveRequest}
            />
          )}
          <KnowledgeUpload onUpload={handleKnowledgeUpload} />
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
