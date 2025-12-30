const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
// PostHog removed from backend (frontend only)

const authRoutes = require('./routes/authRoutes');
const tripRoutes = require('./routes/tripRoutes');
const inquiryRoutes = require('./routes/inquiryRoutes');
const listingsRoutes = require('./routes/listings');
const uploadRoutes = require('./routes/uploadRoutes');
const adminRoutes = require('./routes/adminRoutes');
const clientRoutes = require('./routes/clientRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// PostHog removed from backend (frontend only)

app.use(helmet());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
// Configure CORS origins from env. Support a single origin or a
// comma-separated list in `CLIENT_URL` or `CORS_ORIGINS`.
const clientUrl = process.env.CLIENT_URL || '';
const extraOrigins = process.env.CORS_ORIGINS || '';
let corsOrigins = true;
const merged = [
  ...clientUrl.split(',').map((s) => s.trim()).filter(Boolean),
  ...extraOrigins.split(',').map((s) => s.trim()).filter(Boolean),
];
if (merged.length > 0) {
  corsOrigins = merged.length === 1 ? merged[0] : merged;
}

app.use(
  cors({
    origin: corsOrigins,
    credentials: true,
  })
);

// Rate limiter
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });
app.use(limiter);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/trips', tripRoutes);
app.use('/api/inquiries', inquiryRoutes);
app.use('/api/listings', listingsRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/clients', clientRoutes);

app.use(errorHandler);

module.exports = app;
