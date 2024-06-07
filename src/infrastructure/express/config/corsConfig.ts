import { enviroment } from "./dotEnvConfig";

export default {
    origin: function (origin, callback) {
        const allowedOrigins = [
            `${enviroment.CLIENT_HOST}:${enviroment.CLIENT_PORT}`
        ];
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
};
