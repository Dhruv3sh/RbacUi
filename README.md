# RBAC UI Project  

A Role-Based Access Control (RBAC) UI project built with React, Vite, Mock api and Tailwind CSS. This is a students Results application where students can view their result and other information.

## Table of Contents

- [Installation](#installation)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup](#setup)
- [Usage](#usage)

## Installation  

Follow these steps to set up the project on your local machine:

1. **Create Vite App**  
    ```bash  
    npx create-vite@latest  
    ```

2. **Install Tailwind CSS**  
    ```bash  
    npm install -D tailwindcss postcss autoprefixer  
    npx tailwindcss init -p  
    ```

3. **Install React Router for Navigation**  
    ```bash  
    npm install react-router-dom  
    ```

4. **Install Axios for HTTP Requests**  
    ```bash  
    npm install axios  
    ```

5. **Install bcryptjs for Password Hashing**  
    ```bash  
    npm install bcryptjs  
    ```

6. **Install React Toastify for UI/UX Enhancements**  
    ```bash  
    npm install react-toastify  
    ```

## Features  

- **Role-Based Access Control:** Manage user roles and permissions.
- **User Management:**  View and manage users easily through the UI. Add, edit, or delete users with intuitive controls.
- **Role Management:**  Admin can define and edit roles(admin, editor, user) as needed. Every role Include permissions based on their role.
- **Dynamic Permissions:** Admin can assign or modify permissions dynamically for different roles. 
- **Mock API :**  Mock API calls for data and CRUD operations on users and student table.  
- **Secure Authentication:** Password hashing using bcryptjs.  
- **Navigation:** React Router for seamless routing.  
- **HTTP Requests:** Axios for API integration.  
- **UI Enhancements:** Toast notifications with React Toastify.  

## Technologies Used  

- **React** - Frontend library  
- **Vite** - Build tool
- ##Mock Api - CRUD operations
- **Tailwind CSS** - Styling  
- **React Router Dom** - Routing  
- **Axios** - HTTP requests  
- **bcryptjs** - Password hashing  
- **React Toastify** - Toast notifications  

## Setup  

1. Clone the repository:  
    ```bash  
    git clone https://github.com/your-repo/rbac-ui.git  
    ```  

2. Navigate to the project directory:  
    ```bash  
    cd rbac-ui  
    ```  

3. Install dependencies:  
    ```bash  
    npm install  
    ```  

4. Start the development server:  
    ```bash  
    npm run dev  
    ```  

## Usage  

- **Run the application:**  
  Open your browser and go to `http://localhost:5173/` (or the port displayed in the terminal).  
- **Navigate between pages:**  
  Use the navigation bar to move between different sections of the app.
- **Access the admin:**
  admin email-admin@123
  pass-admin123.
