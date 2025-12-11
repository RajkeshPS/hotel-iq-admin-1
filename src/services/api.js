import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Guest Requests API
export const getAdminRequests = async (hotelId) => {
  const response = await api.get(`/api/admin/requests?hotel_id=${hotelId}`);
  return response.data;
};

export const updateRequestStatus = async (requestId, status, assignedTo) => {
  const response = await api.patch(`/api/admin/requests/${requestId}`, {
    status,
    assigned_to: assignedTo
  });
  return response.data;
};

// Bookings API
export const getHotelBookings = async (hotelId) => {
  const response = await api.get(`/api/admin/bookings?hotel_id=${hotelId}`);
  return response.data;
};

export const updateBookingStatus = async (bookingId, status) => {
  const response = await api.patch(`/api/admin/bookings/${bookingId}/status`, {
    status
  });
  return response.data;
};

// Knowledge Base API
export const uploadKnowledgeBase = async (hotelId, file) => {
  const formData = new FormData();
  formData.append('file', file);
  
  const response = await api.post(
    `/api/admin/upload-knowledge?hotel_id=${hotelId}`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );
  return response.data;
};

export default api;