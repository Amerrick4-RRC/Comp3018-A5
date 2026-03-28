import { CorsOptions } from "cors";

export const authenticatedCorsOptions: CorsOptions = {
    origin: (origin, callback) => {
        const allowed = process.env.ALLOWED_ORIGINS?.split(",") || [];

        console.log(">>> STRICT CORS HIT:", origin);
        console.log("ALLOWED LIST:", allowed);

        // Allow Swagger, Postman, same-origin tools
        if (!origin) {
            return callback(null, true);
        }

        if (allowed.includes(origin)) {
            return callback(null, true);
        }

        return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
};

// Different CORS policies for different API sections
export const publicCorsOptions = {
    origin: "*", // Allow all origins for public endpoints
    methods: ["GET"], // Allow only GET requests for public endpoints
};