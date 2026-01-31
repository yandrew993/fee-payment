# School Fee Management System - Admin Dashboard

A React-based admin dashboard for managing school fees, students, classes, and payments.

## Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or pnpm
- Backend API running on `http://localhost:8800`

### Setup

1. **Navigate to admin folder:**
   ```bash
   cd admin
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Start the development server:**
   ```bash
   npm start
   # or
   pnpm start
   ```

   The dashboard will open at `http://localhost:3000`

## 🔐 Default Admin Login Credentials

**Use these credentials to access the admin dashboard:**

- **Username:** `admin`
- **Password:** `password123`

These credentials are displayed on the login page for convenience during development/testing.

## Features

### Dashboard Overview
- **Dashboard Home:** Overview of key metrics and statistics
- **Students:** View and manage student records
- **Classes:** Manage class information
- **Class Fees:** Set up and manage class fees
- **Fee Payments:** Track all fee payments
- **Receipts:** View and manage payment receipts
- **Academic Terms:** Manage school academic terms
- **Users:** Manage admin and user accounts
- **Chat:** Communication with users
- **Profile:** Admin profile management

### Key Functionalities

#### Students Management
- View all students in the system
- Add new students
- Edit student information
- Delete student records
- View student fee statements

#### Class Management
- Create and manage classes
- Edit class details
- Assign class fees

#### Fee Management
- Define fees per class
- Track fee payments
- View payment history
- Generate receipts

#### Payment Tracking
- View all fee payments
- Filter by student, class, or date
- Track payment status
- Generate payment reports

#### Receipt Management
- Generate payment receipts
- View receipt history
- Receipt details and confirmation

## Project Structure

```
admin/
├── public/                 # Static assets
│   ├── bg.png
│   ├── favicon.jpg
│   ├── index.html
│   └── noavatar.jpg
├── src/
│   ├── components/        # Reusable React components
│   │   ├── chart/
│   │   ├── chat/
│   │   ├── datatable/
│   │   ├── featured/
│   │   ├── map/
│   │   ├── navbar/
│   │   ├── newHotel/
│   │   ├── sidebar/
│   │   ├── slider/
│   │   ├── table/
│   │   ├── uploadWidget/
│   │   └── widget/
│   ├── context/           # React context for state management
│   │   ├── AuthContext.js
│   │   ├── darkModeContext.js
│   │   ├── darkModeReducer.js
│   │   └── SocketContext.jsx
│   ├── hooks/             # Custom React hooks
│   │   └── useFetch.js
│   ├── lib/               # Utility functions
│   │   ├── apiRequest.js
│   │   └── notificationStore.js
│   ├── pages/             # Page components
│   │   ├── home/
│   │   ├── list/
│   │   ├── login/
│   │   ├── new/
│   │   ├── newRoom/
│   │   ├── payments/
│   │   ├── profile/
│   │   ├── single/
│   │   └── singleHouse/
│   ├── style/             # Global styles
│   │   └── dark.scss
│   ├── App.js             # Main app component
│   └── index.js           # App entry point
├── package.json
└── pnpm-lock.yaml
```

## API Integration

The admin dashboard connects to the backend API at `http://localhost:8800`. The following endpoints are used:

### Authentication
- `POST /auth/login` - Admin login

### Data Management
- `GET /api/students` - Fetch all students
- `POST /api/students` - Create new student
- `PUT /api/students/:id` - Update student
- `DELETE /api/students/:id` - Delete student

- `GET /api/classes` - Fetch all classes
- `POST /api/classes` - Create new class
- `PUT /api/classes/:id` - Update class
- `DELETE /api/classes/:id` - Delete class

- `GET /api/class-fees` - Fetch all class fees
- `POST /api/class-fees` - Create class fee
- `PUT /api/class-fees/:id` - Update class fee

- `GET /api/fee-payments` - Fetch all payments
- `POST /api/fee-payments` - Create payment
- `GET /api/receipts` - Fetch all receipts

- `GET /api/academic-terms` - Fetch all terms
- `POST /api/academic-terms` - Create new term

- `GET /api/users` - Fetch all users
- `POST /api/users` - Create new user

## Environment Configuration

Create a `.env.local` file (optional) to customize API endpoint:

```
REACT_APP_API_URL=http://localhost:8800
```

Default API URL is `http://localhost:8800` if not specified.

## Available Scripts

### `npm start` or `pnpm start`
Runs the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm test` or `pnpm test`
Launches the test runner in interactive watch mode.

### `npm run build` or `pnpm build`
Builds the app for production to the `build` folder.

## Dark Mode

The application supports dark mode toggle via the navbar. Theme preference is managed through React Context (`darkModeContext.js`).

## Troubleshooting

### Login Issues
- Ensure the backend API is running on `http://localhost:8800`
- Verify the default admin account exists in the database (run seed script on backend)
- Check browser console for API errors
- Default credentials are displayed on login page

### Data Not Loading
- Verify backend API is responding
- Check network tab in browser developer tools
- Ensure authentication token is valid

### Styling Issues
- Clear browser cache
- Restart the development server
- Check for CSS conflicts in dark mode

## Getting Started Workflow

1. **Start Backend API:**
   ```bash
   cd api
   npm install
   npm start
   ```

2. **Seed Database (if needed):**
   ```bash
   cd api
   node scripts/seed-comprehensive.js
   ```

3. **Start Admin Dashboard:**
   ```bash
   cd admin
   npm install
   npm start
   ```

4. **Login with default credentials:**
   - Navigate to `http://localhost:3000`
   - Username: `admin`
   - Password: `password123`

5. **Start using the dashboard!**

## Support

For issues or questions, check the backend API logs and ensure:
1. Backend API is running on `http://localhost:8800`
2. Database is properly seeded with data
3. API endpoints are responding correctly

Refer to the main project README for overall system setup instructions.
