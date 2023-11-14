const { authMiddleware, redirectToSignIn } = require("@clerk/nextjs");

// Define the routes that need to be protected
const protectedRoutes = [
  '/dashboard', // Example route
  '/profile',   // Another example route
  // Add more routes as needed
];

// Create a regular expression pattern to match the specified routes
const protectedRoutesPattern = `(${protectedRoutes.join('|')})`;

// Configure the authMiddleware with the updated matcher
module.exports = authMiddleware({});

module.exports.config = {
  matcher: [
    `/((?!\\.\\w+$|_next).*)`, // Exclude static files and _next folder
    '/',                       // Root route
    `/api/.*`,                  // API routes
    protectedRoutesPattern,     // Protected routes
  ],
};
