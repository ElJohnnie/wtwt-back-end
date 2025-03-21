export default {
    origin: function (origin, callback) {
        const allowedOrigins = [
            `${process.env.CLIENT_HOST}:${process.env.CLIENT_PORT}`,
            `${process.env.CLIENT_HOST}`
        ];
        if (allowedOrigins.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS', ));
        }
    }
};
