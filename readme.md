Finance Dashboard Backend
Overview

This project is a backend system for a finance dashboard. It allows users to manage financial records based on their roles and provides summary data for dashboard visualization.

The system supports user management, role-based access control, financial record operations, and basic analytics.

Tech Stack
Node.js
Express.js
MongoDB with Mongoose
JSON Web Token (JWT) for authentication
Project Structure
src/
  config/
  controllers/
  middleware/
  models/
  routes/
  utils/
  app.js
server.js
Features
1. User and Role Management
Users can be created and managed
Each user has a role: viewer, analyst, or admin
User status can be active or inactive
Access is restricted based on role
2. Authentication
User registration and login
JWT-based authentication
Protected routes using middleware
3. Financial Records Management
Create, read, update, and delete records
Each record contains:
amount
type (income or expense)
category
date
note
Records are linked to a specific user
4. Dashboard APIs
Total income
Total expenses
Net balance
Category-wise totals
Recent records
Monthly trends
5. Access Control
Viewer: can only view data
Analyst: can view and manage records
Admin: full access including user management
6. Validation and Error Handling
Basic validation for required fields
Proper status codes for API responses
Error handling middleware
Installation
Clone the repository
git clone 
cd finance-dashboard-backend
Install dependencies
npm install
Create a .env file
PORT=5000
MONGO_URI=mongodb://localhost:27017/finance-dashboard
JWT_SECRET=your_secret_key
Run the server
npm run dev
API Endpoints
Authentication
POST /api/auth/register
POST /api/auth/login
Users (Admin only)
GET /api/users
PUT /api/users/:id
DELETE /api/users/:id
Records
POST /api/records
GET /api/records
PUT /api/records/:id
DELETE /api/records/:id

Filtering:

/api/records?type=income
/api/records?category=salary
/api/records?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD
Dashboard
GET /api/dashboard/summary
GET /api/dashboard/category
GET /api/dashboard/recent
GET /api/dashboard/monthly
Authorization

All protected routes require a token in the header:

Authorization: Bearer token
Assumptions
Roles are predefined: viewer, analyst, admin
Each record belongs to one user
Basic validation is implemented
MongoDB is used for persistence
Conclusion

This backend demonstrates structured API design, role-based access control, and basic financial data processing suitable for a dashboard system.