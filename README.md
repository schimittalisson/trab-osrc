# OpenID Connect Authentication with Google IdP

A complete implementation of OpenID Connect (OIDC) authentication protocol using Google as the Identity Provider (IdP), built with Next.js and Firebase.

**Course:** Network and Computer Security  
**Institution:** Santa Catarina State University/Center for Technological Sciences – UDESC/CCT  
**Department:** DCC - Department of Computer Science  
**Program:** BCC – Bachelor of Computer Science

**Team:**
- Alisson Schimitt
- Guilherme Diel
- Lucas Thomas de Oliveira
- Nicole Carolina Mendes

**Professor:** Charles Christian Miers

---

## 📋 Table of Contents

- [Overview](#overview)
- [What is OpenID Connect?](#what-is-openid-connect)
- [Architecture](#architecture)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Firebase Setup Guide](#firebase-setup-guide)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [Authentication Flow Explained](#authentication-flow-explained)
- [How It Works](#how-it-works)
- [Project Structure](#project-structure)
- [Security Considerations](#security-considerations)
- [Technologies Used](#technologies-used)
- [Troubleshooting](#troubleshooting)
- [Additional Resources](#additional-resources)

---

## 🎯 Overview

This project demonstrates how to implement secure user authentication for a web application using the OpenID Connect (OIDC) protocol with Google as the Identity Provider (IdP). Instead of managing passwords and user data directly, the application delegates authentication to Google's trusted infrastructure, reducing security risks and implementation complexity.

### Key Benefits:

- ✅ **No Password Management** - Passwords handled by Google
- ✅ **Enhanced Security** - Industry-standard protocols
- ✅ **Better UX** - Single sign-on with existing Google accounts
- ✅ **Reduced Complexity** - Firebase handles OAuth flow
- ✅ **Production Ready** - Complete, tested implementation

---

## 🔐 What is OpenID Connect?

**OpenID Connect (OIDC)** is an identity layer built on top of the OAuth 2.0 protocol. It allows clients to verify the identity of end-users based on the authentication performed by an authorization server (Identity Provider), as well as to obtain basic profile information about the user.

### Key Concepts:

- **Identity Provider (IdP):** A trusted service that authenticates users (in this case, Google)
- **Relying Party (RP):** The application that relies on the IdP for authentication (this application)
- **ID Token:** A JSON Web Token (JWT) that contains user identity information
- **OAuth 2.0:** The underlying authorization framework
- **Claims:** Pieces of information about the user (email, name, etc.)

### OIDC vs OAuth 2.0:

- **OAuth 2.0:** Authorization protocol (what you can access)
- **OpenID Connect:** Authentication protocol (who you are) built on OAuth 2.0

---

## 🏗️ Architecture

```
┌─────────────┐         ┌──────────────┐         ┌─────────────┐
│             │         │              │         │             │
│   Browser   │◄───────►│  Next.js App │◄───────►│   Firebase  │
│   (User)    │         │  (Relying    │         │    Auth     │
│             │         │   Party)     │         │             │
└─────────────┘         └──────────────┘         └─────────────┘
       │                                                 │
       │                                                 │
       │                 ┌──────────────┐               │
       └────────────────►│    Google    │◄──────────────┘
                         │     IdP      │
                         │  (Identity   │
                         │   Provider)  │
                         └──────────────┘
```

### Components:

1. **Browser (User)** - End user's web browser
2. **Next.js App (Relying Party)** - Your application
3. **Firebase Auth** - Authentication service middleware
4. **Google IdP** - Identity Provider (Google's OAuth server)


### Understanding the Roles

#### 🔥 Firebase Authentication: The Middleware

Firebase acts as an **authentication middleware** that simplifies OAuth 2.0 implementation. It does NOT store passwords or authenticate users directly.

**What Firebase Does:**

1. **Simplifies OAuth Flow**
   - Abstracts complex OAuth 2.0 implementation
   - Manages redirects and callbacks automatically
   - Handles CSRF protection with state parameter

2. **Token Management**
   - Validates ID tokens (JWT) from Google
   - Stores tokens securely in browser
   - Automatically renews expired tokens
   - Manages refresh token flow

3. **Session Management**
   - Maintains user session across page reloads
   - Provides `onAuthStateChanged` listener
   - Synchronizes auth state across browser tabs
   - Persists authentication state

4. **Unified API**
   - Single interface for multiple providers (Google, Facebook, GitHub, etc.)
   - Consistent API for client and server (Firebase Admin SDK)
   - Simplified error handling

5. **Security Features**
   - Automatic JWT signature verification
   - Claims validation (issuer, audience, expiration)
   - Secure token storage
   - Built-in security best practices

**Code Example:**
```typescript
// Without Firebase: ~200 lines of complex OAuth implementation
// With Firebase: 3 simple lines
const provider = new GoogleAuthProvider();
const result = await signInWithPopup(auth, provider);
console.log(result.user); // Ready to use!

┌─────────────────────────────────────────────────────────────┐
│                    Authentication Flow                       │
└─────────────────────────────────────────────────────────────┘

1. Your App calls Firebase
   ↓
2. Firebase redirects to Google IdP
   ↓
3. Google authenticates user (checks password)
   ↓
4. Google issues tokens (ID Token, Access Token)
   ↓
5. Firebase receives and validates tokens
   ↓
6. Firebase creates local session
   ↓
7. Your App receives authenticated user

---

## ✨ Features

- ✅ **Secure Authentication:** Uses Google's OAuth 2.0 and OIDC implementation
- ✅ **No Password Storage:** Authentication is delegated to Google
- ✅ **Session Management:** Persistent user sessions with Firebase
- ✅ **Protected Routes:** Route protection for authenticated users only
- ✅ **User Profile Display:** Shows user information from ID token claims
- ✅ **Responsive Design:** Modern UI with TailwindCSS
- ✅ **TypeScript:** Full type safety
- ✅ **Real-time Auth State:** React context for authentication state management
- ✅ **Automated Scripts:** One-command startup for development

---

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18.0.0 or higher) - [Download](https://nodejs.org/)
- **npm** or **yarn** package manager (comes with Node.js)
- **Google Account** (for Firebase and OAuth setup)
- **Git** (optional, for version control)

### Check Your Installation:

```bash
node --version  # Should show v18.0.0 or higher
npm --version   # Should show 9.0.0 or higher
```

---

## 🚀 Quick Start

### Automated Setup (Recommended)

The fastest way to get started is using our automated startup scripts:

**Linux/Mac:**
```bash
./start.sh
```

**Windows:**
```batch
start.bat
```

Or simply **double-click** `start.bat` on Windows.

### What the Scripts Do:

1. ✅ Check Node.js installation
2. ⚠️ Verify `.env.local` exists (warns if missing)
3. 📦 Install dependencies automatically (first time only)
4. 🚀 Start development server
5. 🌐 Open at http://localhost:3000

### Manual Setup

If you prefer manual control:

```bash
# 1. Install dependencies
npm install

# 2. Configure environment (see Configuration section)
cp .env.local.example .env.local
# Edit .env.local with your Firebase credentials

# 3. Start development server
npm run dev
```

---

## 🔥 Firebase Setup Guide

Follow these steps carefully to configure Firebase for your application.

### Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Sign in with your Google account
3. Click **"Add project"** or **"Create a project"**
4. Enter a project name (e.g., "openid-connect-demo" or "osrc-project")
5. Click **"Continue"**
6. (Optional) Enable or disable Google Analytics
7. Click **"Create project"**
8. Wait for project creation (takes a few seconds)
9. Click **"Continue"** when ready

### Step 2: Register Your Web App

**On the Project Overview page, you'll see:**
- Your project name at the top
- A welcome message: "Hello, [Your Name]"
- A button labeled **"+ Add app"** below the project name

**Steps:**

1. **Click the "+ Add app" button**
   - Location: Below your project name, next to "Spark plan" indicator

2. **Select Web Platform**
   - A modal will appear with platform options
   - Click the **Web icon** (`</>` symbol)

3. **Register Your App**
   - Enter an **App nickname**: "OpenID Connect Web App" (or any name you prefer)
   - **Do NOT check** "Also set up Firebase Hosting" (unless you plan to deploy)
   - Click **"Register app"**

4. **Copy Firebase Configuration**
   - You'll see a code snippet with your Firebase config
   - It looks like this:
   ```javascript
   const firebaseConfig = {
     apiKey: "AIza...",
     authDomain: "your-project.firebaseapp.com",
     projectId: "your-project-id",
     storageBucket: "your-project.appspot.com",
     messagingSenderId: "123456789",
     appId: "1:123456789:web:abc123"
   };
   ```
   - **Copy these values** - you'll need them for `.env.local`
   - Click **"Continue to console"**

### Step 3: Enable Google Authentication

1. **Navigate to Authentication**
   - Look at the left sidebar
   - Find and click **"Authentication"** (it has a key icon 🔑)
   - If you don't see it, click **"Build"** first to expand the menu

2. **Get Started (if first time)**
   - If this is your first time, click **"Get started"** button
   - This initializes the Authentication service

3. **Go to Sign-in Method Tab**
   - You'll see tabs: "Users", "Sign-in method", "Templates", "Usage", "Settings"
   - Click on **"Sign-in method"** tab

4. **Enable Google Provider**
   - You'll see a list of authentication providers
   - Find **"Google"** in the list (usually near the top)
   - Click on **"Google"** row

5. **Configure Google Sign-in**
   - Toggle the **"Enable"** switch to ON (it will turn blue)
   - Select a **"Project support email"** from the dropdown (usually your email)
   - The **"Project public-facing name"** is auto-filled (you can change it if needed)
   - Click **"Save"**

6. **Verify Setup**
   - Google should now show as "Enabled" in the providers list
   - Status indicator should be green/enabled

### Step 4: Configure Authorized Domains

1. **Go to Settings**
   - Still in the Authentication section
   - Click on the **"Settings"** tab (at the top)

2. **Find Authorized Domains**
   - Scroll down to find **"Authorized domains"** section
   - You should see `localhost` already listed
   - If not, click **"Add domain"** and add `localhost`

### Step 5: Get Your Configuration Values

**Where to find your config:**

1. **Go to Project Settings**
   - Click the **gear icon** ⚙️ next to "Project Overview" in the left sidebar
   - Select **"Project settings"**

2. **Scroll to Your Apps**
   - Scroll down to "Your apps" section
   - You'll see your web app listed

3. **View Config**
   - Click on your app name
   - Scroll down to see **"SDK setup and configuration"**
   - Select **"Config"** radio button (not npm)
   - Copy the values

**Your configuration should look like:**
```javascript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef123456"
};
```

---

## ⚙️ Configuration

### Create Environment File

1. **Copy the example file:**

```bash
# Linux/Mac
cp .env.local.example .env.local

# Windows
copy .env.local.example .env.local
```

2. **Edit `.env.local` with your Firebase configuration:**

```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789012
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789012:web:abcdef123456
```

3. **Save the file**

**⚠️ Important:** 
- Never commit `.env.local` to version control
- It's already included in `.gitignore`
- Don't include quotes around the values
- Make sure there are no extra spaces

---

## 🏃 Running the Application

### Quick Start with Scripts (Recommended)

**Linux/Mac:**
```bash
./start.sh
```

**Windows:**
```batch
start.bat
```

The scripts will:
- Check Node.js installation
- Verify environment configuration
- Install dependencies (if needed)
- Start the development server

### Manual Commands

**Development Mode:**

```bash
# Install dependencies (first time)
npm install

# Start development server
npm run dev
```

The application will start on [http://localhost:3000](http://localhost:3000)

**Production Build:**

```bash
# Build the application
npm run build

# Start the production server
npm start
```

### Stopping the Server

Press `Ctrl + C` in the terminal to stop the development server.

---

## 🔄 Authentication Flow Explained

### Complete Flow Diagram

```
1. USER INITIATES LOGIN
   ┌──────────┐
   │  User    │  Clicks "Sign in with Google"
   │ (Browser)│
   └────┬─────┘
        │
        ▼
   ┌──────────────┐
   │  Next.js App │  Calls signInWithGoogle()
   │  (Frontend)  │
   └────┬─────────┘
        │
        │ Creates GoogleAuthProvider
        │ Opens popup window
        │
        ▼

2. REDIRECT TO GOOGLE
   ┌──────────────┐
   │   Firebase   │  Redirects to Google OAuth endpoint
   │     Auth     │  with client_id, redirect_uri, scope, state
   └────┬─────────┘
        │
        ▼
   ┌──────────────┐
   │    Google    │  Shows Google sign-in page
   │     IdP      │
   └────┬─────────┘
        │
        │ User enters credentials
        │ User grants permissions
        │
        ▼

3. GOOGLE AUTHENTICATES USER
   ┌──────────────┐
   │    Google    │  Validates credentials
   │     IdP      │  Creates authorization code
   └────┬─────────┘
        │
        │ Redirects back with authorization code
        │
        ▼

4. TOKEN EXCHANGE
   ┌──────────────┐
   │   Firebase   │  Exchanges authorization code
   │     Auth     │  for ID token and access token
   └────┬─────────┘
        │
        │ POST request to Google token endpoint
        │
        ▼
   ┌──────────────┐
   │    Google    │  Returns tokens:
   │     IdP      │  - ID Token (JWT with user info)
   └────┬─────────┘  - Access Token (for API calls)
        │            - Refresh Token (optional)
        │
        ▼

5. TOKEN VALIDATION
   ┌──────────────┐
   │   Firebase   │  Validates ID token:
   │     Auth     │  - Signature verification
   └────┬─────────┘  - Expiration check
        │            - Issuer verification
        │            - Audience verification
        │
        ▼

6. SESSION CREATION
   ┌──────────────┐
   │   Firebase   │  Creates user session
   │     Auth     │  Stores user data
   └────┬─────────┘
        │
        │ onAuthStateChanged fires
        │
        ▼
   ┌──────────────┐
   │  Next.js App │  Updates AuthContext
   │  (Frontend)  │  Sets user state
   └────┬─────────┘
        │
        │ Redirects to dashboard
        │
        ▼

7. ACCESS GRANTED
   ┌──────────┐
   │  User    │  Sees dashboard with profile info
   │ (Browser)│
   └──────────┘
```

### Step-by-Step Explanation

#### Step 1: User Initiates Login
- User clicks "Sign in with Google" button
- Application calls `signInWithGoogle()` function
- Loading state is set to show spinner

#### Step 2: OAuth Provider Creation
- Creates a `GoogleAuthProvider` instance
- Requests `profile` and `email` scopes
- Forces account selection screen
- Prepares OAuth parameters

#### Step 3: Sign-In Popup
- Firebase opens a popup window
- Popup navigates to Google's OAuth endpoint
- URL includes:
  - `client_id`: Your Firebase project ID
  - `redirect_uri`: Firebase callback URL
  - `scope`: openid profile email
  - `response_type`: code
  - `state`: CSRF protection token

#### Step 4: User Authentication at Google
- User sees Google sign-in page
- User enters email and password
- Google validates credentials
- User sees permission consent screen
- User grants requested permissions
- Google creates authorization code

#### Step 5: Authorization Code Return
- Google redirects back to Firebase callback URL
- URL includes authorization code
- Firebase receives the code

#### Step 6: Token Exchange
Firebase makes a POST request to Google's token endpoint with:
- Authorization code
- Client ID and secret
- Redirect URI
- Grant type

Google responds with:
- **Access Token** - For API calls
- **ID Token** - JWT with user identity
- **Refresh Token** - For token renewal
- **Expires In** - Token lifetime

#### Step 7: ID Token Validation
Firebase validates the ID token (JWT):
1. **Signature Verification** - Verifies JWT signature using Google's public keys
2. **Claims Validation**:
   - `iss` (issuer): Must be accounts.google.com
   - `aud` (audience): Must match your client ID
   - `exp` (expiration): Must not be expired
   - `iat` (issued at): Must be in the past

**ID Token Structure:**
```json
{
  "header": {
    "alg": "RS256",
    "kid": "1234567890",
    "typ": "JWT"
  },
  "payload": {
    "iss": "https://accounts.google.com",
    "azp": "YOUR_CLIENT_ID",
    "aud": "YOUR_CLIENT_ID",
    "sub": "1234567890",
    "email": "user@example.com",
    "email_verified": true,
    "name": "John Doe",
    "picture": "https://lh3.googleusercontent.com/...",
    "given_name": "John",
    "family_name": "Doe",
    "locale": "en",
    "iat": 1234567890,
    "exp": 1234571490
  }
}
```

#### Step 8: User Object Creation
- Firebase creates a User object
- `onAuthStateChanged` listener fires
- AuthContext updates with user data
- Application state changes to authenticated

#### Step 9: Route Protection
- Protected routes check authentication state
- Unauthenticated users are redirected to home
- Authenticated users can access protected content

#### Step 10: Display User Information
- Dashboard displays user information
- Data comes from ID token claims
- User can sign out

---

## 🔍 How It Works

### 1. Firebase Configuration (`lib/firebase.ts`)

Initializes Firebase with your project credentials:

```typescript
import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase only if it hasn't been initialized yet
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

export const auth = getAuth(app);
export default app;
```

### 2. Authentication Functions (`lib/auth.ts`)

#### Sign In with Google

```typescript
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from './firebase';

export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  
  // Request additional OAuth scopes
  provider.addScope('profile');
  provider.addScope('email');
  
  // Force account selection
  provider.setCustomParameters({
    prompt: 'select_account'
  });

  try {
    const result = await signInWithPopup(auth, provider);
    
    // Get the OAuth access token and ID token
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential?.accessToken;
    const idToken = credential?.idToken;
    
    console.log('Authentication successful');
    console.log('Access Token:', token ? 'Present' : 'Not available');
    console.log('ID Token (OIDC):', idToken ? 'Present' : 'Not available');
    
    return result;
  } catch (error) {
    console.error('Error during Google sign-in:', error);
    throw error;
  }
};
```

**What happens:**
- Creates a Google OAuth provider
- Requests `profile` and `email` scopes
- Opens Google sign-in popup
- Returns user credentials with ID token (JWT)

#### Sign Out

```typescript
import { signOut as firebaseSignOut } from 'firebase/auth';

export const signOut = async () => {
  try {
    await firebaseSignOut(auth);
    console.log('User signed out successfully');
  } catch (error) {
    console.error('Error during sign out:', error);
    throw error;
  }
};
```

### 3. Authentication Context (`contexts/AuthContext.tsx`)

Provides authentication state throughout the application:

```typescript
'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Subscribe to authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
      
      if (user) {
        console.log('User authenticated:', user.email);
      } else {
        console.log('No user authenticated');
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
```

**Features:**
- Listens for authentication state changes
- Provides `user` and `loading` state to all components
- Automatically updates when user signs in/out

### 4. Protected Routes (`components/ProtectedRoute.tsx`)

Ensures only authenticated users can access certain pages:

```typescript
'use client';

import React, { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

export const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return <>{children}</>;
};
```

### 5. User Interface Components

#### Login Button (`components/LoginButton.tsx`)
- Triggers Google sign-in flow
- Handles loading and error states
- Redirects to dashboard on success
- Shows error messages if authentication fails

#### User Profile (`components/UserProfile.tsx`)
- Displays user information from ID token claims
- Shows email, name, photo, and authentication metadata
- Provides sign-out functionality
- Displays provider information

### 6. Pages

#### Home Page (`app/page.tsx`)
- Landing page with login button
- Explains the authentication flow
- Redirects authenticated users to dashboard
- Shows how OpenID Connect works

#### Dashboard (`app/dashboard/page.tsx`)
- Protected route (requires authentication)
- Displays user profile information
- Shows data from ID token claims
- Allows user to sign out

---

## 📁 Project Structure

```
trab-osrc/
├── app/                      # Next.js app directory
│   ├── dashboard/           # Protected dashboard page
│   │   └── page.tsx
│   ├── layout.tsx           # Root layout with AuthProvider
│   ├── page.tsx             # Home/login page
│   └── globals.css          # Global styles
├── components/              # React components
│   ├── LoginButton.tsx      # Google sign-in button
│   ├── ProtectedRoute.tsx   # Route protection wrapper
│   └── UserProfile.tsx      # User information display
├── contexts/                # React contexts
│   └── AuthContext.tsx      # Authentication state management
├── lib/                     # Utility libraries
│   ├── auth.ts             # Authentication functions
│   └── firebase.ts         # Firebase configuration
├── .env.local.example       # Environment variables template
├── .gitignore              # Git ignore rules
├── next.config.js          # Next.js configuration
├── package.json            # Project dependencies
├── postcss.config.js       # PostCSS configuration
├── README.md               # This file
├── LEIA-ME.md              # Portuguese version
├── start.sh                # Linux/Mac startup script
├── start.bat               # Windows startup script
├── tailwind.config.js      # TailwindCSS configuration
└── tsconfig.json           # TypeScript configuration
```

---

## 🔒 Security Considerations

### What Makes This Implementation Secure?

#### 1. No Password Storage
- Passwords are never stored in the application
- Authentication is delegated to Google's secure infrastructure
- Reduces attack surface significantly

#### 2. ID Token Validation
- Firebase automatically validates ID tokens
- Tokens are signed by Google and verified cryptographically
- Signature verification using Google's public keys
- Claims validation (issuer, audience, expiration)

#### 3. HTTPS Required
- OAuth 2.0 and OIDC require HTTPS in production
- Prevents man-in-the-middle attacks
- Protects sensitive data in transit

#### 4. Token Expiration
- ID tokens have limited lifetime (typically 1 hour)
- Automatic token refresh handled by Firebase
- Prevents replay attacks
- Reduces impact of token theft

#### 5. Scope Limitation
- Only requests necessary scopes (`profile`, `email`)
- Follows principle of least privilege
- User can see exactly what's requested
- Minimizes data exposure

#### 6. CSRF Protection
- State parameter in OAuth flow
- Prevents cross-site request forgery
- Built into OAuth 2.0 specification
- Automatically handled by Firebase

#### 7. Secure Token Storage
- Tokens stored securely by Firebase
- Uses browser's secure storage mechanisms
- Automatic encryption
- Protected from XSS attacks

### Best Practices Implemented

- ✅ Environment variables for sensitive configuration
- ✅ Client-side route protection
- ✅ Secure token storage (handled by Firebase)
- ✅ CSRF protection (built into OAuth 2.0 flow)
- ✅ State parameter validation (handled by Firebase)
- ✅ Token expiration and refresh
- ✅ Scope limitation
- ✅ Error handling and user feedback

### Security Recommendations

1. **Never commit `.env.local`** to version control
   - Contains sensitive API keys
   - Already included in `.gitignore`
   - Use environment variables in production

2. **Use HTTPS** in production environments
   - Required by OAuth 2.0 and OIDC
   - Protects data in transit
   - Prevents man-in-the-middle attacks

3. **Implement server-side verification** for sensitive operations
   - Don't trust client-side authentication alone
   - Verify tokens on the server
   - Use Firebase Admin SDK for server-side

4. **Monitor Firebase Authentication logs** for suspicious activity
   - Check for unusual login patterns
   - Monitor failed authentication attempts
   - Set up alerts for anomalies

5. **Keep dependencies updated** to patch security vulnerabilities
   - Regularly run `npm audit`
   - Update packages promptly
   - Review security advisories

6. **Implement rate limiting** for authentication endpoints
   - Prevent brute force attacks
   - Limit failed login attempts
   - Use Firebase security rules

7. **Use Firebase Security Rules** for database/storage access
   - Implement proper access control
   - Validate data on the server
   - Don't rely on client-side validation alone

---

## 🛠️ Technologies Used

### Frontend Framework
- **Next.js 14** - React framework with App Router
- **React 18** - UI library
- **TypeScript** - Type-safe JavaScript

### Authentication
- **Firebase Authentication** - Authentication service
- **Google OAuth 2.0** - Identity provider
- **OpenID Connect** - Authentication protocol

### Styling
- **TailwindCSS** - Utility-first CSS framework
- **Lucide React** - Icon library

### Development Tools
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

---

## 🐛 Troubleshooting

### Common Issues and Solutions

#### 1. "Firebase: Error (auth/popup-blocked)"
**Problem:** Browser blocked the sign-in popup

**Solution:** 
- Allow popups for localhost in your browser settings
- Chrome: Click the popup icon in address bar
- Firefox: Click "Options" → "Allow popups for localhost"
- Safari: Preferences → Websites → Pop-up Windows

#### 2. "Firebase: Error (auth/unauthorized-domain)"
**Problem:** Domain not authorized in Firebase

**Solution:** 
- Go to Firebase Console
- Navigate to Authentication → Settings → Authorized domains
- Add `localhost` for development
- Add your production domain when deploying

#### 3. Environment variables not loading
**Problem:** `.env.local` not being read

**Solution:** 
- Ensure `.env.local` exists in the project root
- Restart the development server after changing environment variables
- Verify variable names start with `NEXT_PUBLIC_`
- Check for typos in variable names
- Don't use quotes around values

#### 4. "Cannot find module" errors
**Problem:** Dependencies not installed

**Solution:** 
- Run `npm install` or `yarn install`
- Delete `node_modules` and `package-lock.json`, then reinstall
- Check Node.js version (should be v18+)

#### 5. TypeScript errors
**Problem:** Type errors in the code

**Solution:** 
- Ensure all dependencies are installed
- Run `npm run build` to check for errors
- Check `tsconfig.json` is properly configured
- Restart your IDE/editor

#### 6. "Port 3000 already in use"
**Problem:** Another application is using port 3000

**Solution:**
- Stop the other application
- Or change the port in `package.json`:
  ```json
  "dev": "next dev -p 3001"
  ```

#### 7. Popup closes immediately
**Problem:** Sign-in popup closes without completing

**Solution:**
- Check browser console for errors
- Verify Firebase configuration is correct
- Ensure Google authentication is enabled in Firebase
- Check internet connection

#### 8. "Network Error" during sign-in
**Problem:** Cannot connect to Firebase/Google

**Solution:**
- Check internet connection
- Verify Firebase project is active
- Check if firewall is blocking connections
- Try disabling VPN if using one

### Getting Help

If you encounter issues not covered here:

1. Check the browser console for error messages
2. Review Firebase Console for authentication logs
3. Verify all configuration steps were completed
4. Check that all environment variables are set correctly
5. Try the manual setup process instead of scripts

---

## 📚 Additional Resources

### OpenID Connect
- [OpenID Connect Specification](https://openid.net/connect/)
- [OAuth 2.0 RFC 6749](https://tools.ietf.org/html/rfc6749)
- [Understanding ID Tokens](https://auth0.com/docs/secure/tokens/id-tokens)
- [JWT.io - JWT Debugger](https://jwt.io/)

### Firebase
- [Firebase Authentication Documentation](https://firebase.google.com/docs/auth)
- [Google Sign-In for Web](https://firebase.google.com/docs/auth/web/google-signin)
- [Firebase Security Best Practices](https://firebase.google.com/docs/rules/basics)
- [Firebase Console](https://console.firebase.google.com/)

### Next.js
- [Next.js Documentation](https://nextjs.org/docs)
- [Next.js Authentication Patterns](https://nextjs.org/docs/authentication)
- [Next.js App Router](https://nextjs.org/docs/app)

### Security
- [OWASP Authentication Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html)
- [OAuth 2.0 Security Best Practices](https://tools.ietf.org/html/draft-ietf-oauth-security-topics)

---

## 📝 License

This project is created for educational purposes as part of the Network and Computer Security course at UDESC/CCT.

---

## 🎓 Educational Context

This implementation serves as a practical demonstration of:

- **OpenID Connect (OIDC)** authentication protocol
- **OAuth 2.0** authorization framework
- **Identity Provider (IdP)** integration
- **Secure authentication** best practices
- **Modern web development** with React and Next.js
- **Firebase** as a Backend-as-a-Service (BaaS)
- **TypeScript** for type-safe development
- **Responsive design** with TailwindCSS

### Learning Outcomes

Students and developers will learn:

1. How OpenID Connect works in practice
2. OAuth 2.0 authorization flow
3. JWT token structure and validation
4. Modern web authentication patterns
5. Firebase integration and configuration
6. React state management with Context API
7. TypeScript development best practices
8. Security considerations for web applications
9. Protected route implementation
10. User session management

### Use Cases

This implementation can be used for:

- **Web Applications** requiring user authentication
- **Educational Projects** demonstrating OIDC
- **Prototypes** needing quick auth setup
- **Enterprise Applications** with Google Workspace
- **SaaS Platforms** with social login
- **Portfolio Projects** showcasing modern auth

---

## 🎯 Project Objectives

### Primary Objective

Implement user authentication for a web application using the OpenID Connect (OIDC) protocol with Google as the Identity Provider (IdP), allowing users to securely sign in with their existing Google accounts instead of creating new credentials.

### Secondary Objectives

1. Demonstrate industry-standard authentication protocols
2. Showcase secure authentication implementation
3. Provide educational resource for learning OIDC
4. Create production-ready code example
5. Document best practices and security considerations

---

## 🏆 Conclusion

This project successfully demonstrates a complete, secure, and production-ready implementation of OpenID Connect authentication using Google as the Identity Provider. It combines modern web technologies with industry-standard security protocols to create a practical example of contemporary authentication patterns.

The implementation is fully documented, easy to understand, and serves as an excellent educational resource for learning about OpenID Connect, OAuth 2.0, and secure web authentication.

### Key Achievements

✅ Complete OIDC implementation with Google IdP  
✅ Secure, production-ready code  
✅ Comprehensive documentation  
✅ Automated setup scripts  
✅ Modern UI with responsive design  
✅ Full TypeScript support  
✅ Educational value for students  

---

**For questions or issues, please contact the project authors or course instructor.**

**Last Updated:** November 2024
