
const devOrigins = [
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  'http://::1:3000',
];

const prodOrigins = [
  process.env.CLIENT_HOST,
];

const allowedOrigins = process.env.NODE_ENV === 'production'
  ? prodOrigins
  : devOrigins;

export default {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    console.warn(`CORS BLOQUEADO: ${origin}`);
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
};
