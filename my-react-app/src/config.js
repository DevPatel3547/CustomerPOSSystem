// config.js
// Base URL of the Express REST API. Defaults to the hosted backend; set
// REACT_APP_API_URL (e.g. http://localhost:9000 under docker compose) to override.
export const API_BASE = (process.env.REACT_APP_API_URL || 'https://project-3-team910-10b-backend.onrender.com').replace(/\/$/, '');
