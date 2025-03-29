# Manage Users

## Overview

This is a React application that interacts with the [Reqres API](https://reqres.in/) to perform basic user management operations. It includes basic authentication, user listing with pagination, editing, and deletion functionalities along with client-side searching and filtering.

## Installation & Setup

### Prerequisites
Ensure you have **Node.js** and **npm/yarn** installed.

### Steps to run the project
1. Clone the repository:
```bash
git clone https://github.com/dipeshhhh/User_Manager.git
cd User_Manager
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a new `.env` file in the root directory (use `.env.example` as a reference).

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

### Test Credentials
- Email: `eve.holt@reqres.in`
- Password: `cityslicka` (anything works as the password)

## Deployment
Live Demo deployed on [Netlify](https://67e7774604f4b200087ec35b--user-manager-frontend.netlify.app/).

## Additional Features (Bonus Implementations)
- Client-side search and filtering.
- Persistent authentication using local storage and session storage.
- Responsive design for mobile, desktop and ultrawide desktop.
- Used React Router for navigation between pages.

## Assumptions & Considerations
- User authentication is simulated as the API does not provide actual authentication.
- Data persistence is limited to API responses and does not affect the Reqres database.
- All routes, except '/login,' are redirected to the Users List page as no additional pages have been implemented.
- User details are edited within a dialog on the Users List page, as only a few fields require modification.
