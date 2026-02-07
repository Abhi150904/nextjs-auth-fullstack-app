# **AuthForge — Next.js Authentication Boilerplate**

A modern, secure, and production-ready authentication system built with **Next.js (App Router)**, featuring email verification, password reset, protected routes, and a polished dark UI.

This project is designed to help developers skip rebuilding common authentication flows and focus on shipping core product features.

---

##  Features

* **User Authentication**

  * Signup
  * Login
  * Logout

* **Email Verification**

  * Users receive a verification email on signup
  * Account status shown in profile
  * “Send Link” option to resend verification email

* **Password Reset Flow**

  * Forgot password page
  * Secure email-based reset link
  * Token-based password reset

* **Protected Routes**

  * Middleware (`proxy.ts`) protects private pages
  * Redirects unauthenticated users to login

* **Modern Dark UI**

  * Clean landing page with header and footer
  * Styled Login, Signup, Forgot Password, Reset Password, and Profile pages

---

## Tech Stack

* **Next.js 14+ (App Router)**
* **TypeScript**
* **MongoDB + Mongoose**
* **Nodemailer (Mailtrap for emails)**
* **JWT for authentication**
* **Tailwind CSS for styling**
* **Axios for API requests**

---



## ▶ Running the Project

###  Install dependencies

```sh
npm install
```

###  Run the development server

```sh
npm run dev
```

###  Open in browser

```
http://localhost:3000
```






#