# AutoLegal - Frontend Quick Start Guide 🚀

## Installation

```bash
# Navigate to project directory
cd "c:\Users\hp\OneDrive\phy\Documents\Custom Office Templates\auto-legal-drafting-frontend"

# Install dependencies (if not already installed)
npm install --legacy-peer-deps
```

## Running the Application

```bash
# Start development server
npm start
```

The application will open at `http://localhost:3000`

## Login Credentials

### Admin Dashboard
- **Email:** admin@demo.com
- **Password:** 123456
- **Route:** `/admin/dashboard`

### Lawyer Dashboard
- **Email:** lawyer@demo.com
- **Password:** 123456
- **Route:** `/lawyer/dashboard`

### User Dashboard
- **Email:** user@demo.com
- **Password:** 123456
- **Route:** `/user/dashboard`

## Project Structure

```
src/
├── components/
│   ├── admin/          # Admin dashboard components
│   ├── lawyer/         # Lawyer dashboard components
│   ├── user/           # User dashboard components
│   ├── auth/           # Authentication components
│   ├── common/         # Shared components (Navbar, Footer, etc.)
│   └── document/       # Document-related components
├── pages/              # Page components for routing
├── store/              # Redux store and slices
├── utils/              # Utility functions and mock data
├── App.jsx             # Main app component
└── index.js            # Entry point
```

## Key Features Implemented

### Admin Dashboard
✅ Statistics overview with 11 key metrics  
✅ Pending lawyer verifications management  
✅ Flagged reviews moderation  
✅ Platform health monitoring  
✅ Recent actions tracking  
✅ Quick action buttons  

### User Dashboard
✅ Document creation wizard  
✅ AI-powered document generation  
✅ Lawyer connection system  
✅ Document history and management  
✅ Review request workflow  

### Lawyer Dashboard
✅ Pending review requests  
✅ Document annotation tools  
✅ Earnings tracking  
✅ Availability toggle  
✅ Client feedback system  

## Tech Stack

- **React** 18.2.0 - UI framework
- **Redux Toolkit** - State management
- **React Router** 6.20.0 - Routing
- **Tailwind CSS** - Styling
- **React Hot Toast** - Notifications
- **React Icons** - Icon library
- **Axios** - HTTP client

## Available Scripts

```bash
npm start          # Start development server
npm run build      # Build for production
npm test           # Run tests
npm run lint       # Run ESLint
npm run lint:fix   # Fix ESLint errors
npm run format     # Format code with Prettier
```

## Environment Variables

The `.env` file contains:
- API base URL (currently localhost:5000)
- Feature flags
- Application metadata

To connect to a backend, update `REACT_APP_API_BASE_URL` in `.env`

## Troubleshooting

### Server won't start
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
```

### Styles not loading
- Verify `tailwind.config.js` exists
- Check `@tailwind` directives in `index.css`

### Toast notifications not showing
- Verify `<Toaster />` is in `App.jsx`

## Next Steps

1. **Backend Integration:** Connect to actual API endpoints
2. **Authentication:** Implement real JWT-based auth
3. **Payment Gateway:** Integrate Razorpay for payments
4. **File Upload:** Implement S3 for document storage
5. **Real-time Updates:** Add WebSocket for live notifications
6. **Testing:** Write unit and integration tests
7. **Deployment:** Deploy to production (Vercel/Netlify)

## Support

For issues or questions, refer to the [walkthrough.md](file:///C:/Users/hp/.gemini/antigravity/brain/5d79919f-3552-4b59-a5c3-9b6dd0ab8f23/walkthrough.md) for detailed documentation.

---

**Status:** ✅ Frontend Complete - Ready for Development Testing
