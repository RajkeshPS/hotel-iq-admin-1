# HotelIQ Admin Portal

Admin dashboard for managing hotel bookings, guest requests, and hotel operations.

## Features

- 📊 Real-time booking management with check-in/check-out
- 🔔 Guest request tracking and resolution
- 📈 Live statistics dashboard
- 📁 Knowledge base file uploads
- 🔄 Auto-refresh every 5 seconds
- 🎨 Modern Material-UI design

## Quick Start

### Installation

\`\`\`bash
npm install
\`\`\`

### Configuration

Create a `.env` file:
\`\`\`env
REACT_APP_API_BASE_URL=http://your-backend-url:8000
\`\`\`

### Run Development Server

\`\`\`bash
npm start
\`\`\`

Access at: http://localhost:3000

### Build for Production

\`\`\`bash
npm run build
\`\`\`

## Tech Stack

- React 18
- Material-UI 5
- Axios
- React Hooks

## API Endpoints

The portal connects to these backend endpoints:

- `GET /api/admin/requests?hotel_id={id}`
- `PATCH /api/admin/requests/{id}`
- `GET /api/admin/bookings?hotel_id={id}`
- `PATCH /api/admin/bookings/{id}/status`
- `POST /api/admin/upload-knowledge?hotel_id={id}`

## Project Structure

\`\`\`
src/
├── components/
│   ├── auth/          # Authentication
│   ├── bookings/      # Booking management
│   ├── requests/      # Request management
│   ├── layout/        # Layout components
│   └── common/        # Shared components
├── services/          # API services
├── theme/             # MUI theme config
└── App.jsx            # Main app component
\`\`\`

## License

MIT