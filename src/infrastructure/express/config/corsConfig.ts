export default {
    origin: function (origin, callback) {
        const allowedOrigins = [
            `${process.env.CLIENT_HOST}:${process.env.CLIENT_PORT}`
        ];
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
};
