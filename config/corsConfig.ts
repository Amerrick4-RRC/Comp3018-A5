// Different CORS policies for different API sections
export const publicCorsOptions = {
    origin: "*", // Allow all origins for public endpoints
    methods: ["GET"],
};

export const authenticatedCorsOptions = {
    origin: process.env.ALLOWED_ORIGINS?.split(",") || [],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
};

