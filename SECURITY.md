# Security Considerations
This project implements several security measures to protect against common web vulnerabilities and ensure secure communication between clients and the server. Below are the key security features implemented:

## Helmet Configuration
The application uses the Helmet middleware to set various HTTP headers that enhance security. The `apiHelmetConfig` is a custom configuration that includes:

- ### `contentSecurityPolicy: false` — CSP is disabled because this is a JSON API and CSP is not required for non‑HTML responses.
    -- OWASP CSP Cheat Sheet: https://cheatsheetseries.owasp.org/cheatsheets/Content_Security_Policy_Cheat_Sheet.html (cheatsheetseries.owasp.org in Bing)  
    -- https://helmetjs.github.io/docs/content-security-policy/ (helmetjs.github.io in Bing)

- ### `crossOriginEmbedderPolicy: false` — Disabled because it is not needed for API responses.
    -- MDN COEP documentation: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cross-Origin-Embedder-Policy (developer.mozilla.org in Bing)  
    -- Helmet COEP docs: https://helmetjs.github.io/docs/cross-origin-embedder-policy/ (helmetjs.github.io in Bing)

- ### `hsts` — Enforces HTTPS for one year, including subdomains, with preload enabled.
    -- OWASP HSTS Cheat Sheet: https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Strict_Transport_Security_Cheat_Sheet.html (cheatsheetseries.owasp.org in Bing)  
    -- MDN Strict-Transport-Security: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security (developer.mozilla.org in Bing)

- ### `hidePoweredBy: true` — Removes the `X-Powered-By` header to avoid exposing Express.
    -- OWASP Secure Headers Project (Information Leakage): https://owasp.org/www-project-secure-headers/ (owasp.org in Bing)  
    -- Helmet hidePoweredBy docs: https://helmetjs.github.io/docs/hide-powered-by/ (helmetjs.github.io in Bing)

- ### `noSniff: true` — Prevents MIME type sniffing.
    -- OWASP Secure Headers Project — X‑Content‑Type‑Options: https://owasp.org/www-project-secure-headers/#x-content-type-options (owasp.org in Bing)  
    -- MDN X‑Content‑Type‑Options: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Content-Type-Options (developer.mozilla.org in Bing)
- ### `frameguard: { action: "deny" }` — Protects against clickjacking.
    -- OWASP Clickjacking Defense Cheat Sheet: https://cheatsheetseries.owasp.org/cheatsheets/Clickjacking_Defense_Cheat_Sheet.html (cheatsheetseries.owasp.org in Bing)  
    -- MDN X‑Frame‑Options: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options (developer.mozilla.org in Bing)



## Cors Configuration
The application uses the CORS middleware to control cross-origin requests. Two different CORS policies are implemented:
- **Public Endpoints**: For endpoints like `/api/v1/health` and `/api-docs`, a relaxed CORS policy is applied, allowing requests from any origin.
    --`origin:"*"` allows all origins
    --`methods:["GET"]` only read operations are allowed for public endpoints
    --`allowedHeaders:["Content-Type"]` minimal headers allowed for public endpoints
    --`credentials:false` no auth tokens allowed for public endpoints
- **Authenticated Endpoints**: For endpoints like `/api/v1/events`, a strict CORS policy is applied, allowing requests only from specified origins defined in the `ALLOWED_ORIGINS` environment variable.
    --`origin: ALLOWED_ORIGINS` defined list of allowed origins for authenticated endpoints
    --`methods:["GET","POST","PUT","DELETE"]` all CRUD operations allowed for authenticated endpoints
    --`allowedHeaders:["Content-Type","Authorization"]` auth tokens allowed for authenticated endpoints 
    --`credentials:true` allows cookies and auth headers for authenticated endpoints
- **Citations:
    -- MDN Web Docs — CORS and public resources: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS (developer.mozilla.org in Bing)
    -- OWASP API Security Top 10 — APIs may expose public, unauthenticated endpoints safely when no sensitive data is involved: https://owasp.org/API-Security/ (owasp.org in Bing)

