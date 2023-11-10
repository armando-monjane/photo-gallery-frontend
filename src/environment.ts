export const Environment = {
  /**
   * Base URL of the API.
   */
  API_BASE_URL: process.env.API_BASE_URL || 'http://localhost:3000/api',
  /**
   * Base URL of static files.
   */
  STATIC_BASE_URL:
    process.env.STATIC_BASE_URL || 'http://localhost:3000/public',
};
