# 🚀 Mahin AI - Frontend Implementation Roadmap

**Organization:** Mahin Ltd  
**Director & CEO:** Tanvir Rahman  
**Official Email:** info.mahin.ltd@gmail.com  
**Document Version:** 1.0.0  
**Date:** Generated for Frontend Development Team

---

## 📋 Executive Summary

This document provides a complete frontend architecture plan and implementation roadmap for Mahin AI, based on thorough analysis of the existing backend infrastructure. The backend is **production-ready** and should be treated as the **source of truth**.

### Key Findings from Backend Analysis

| Category | Status | Details |
|----------|--------|---------|
| **Backend Framework** | ✅ Complete | Node.js + Express.js (v4.21.2) |
| **Database** | ✅ Complete | MongoDB Atlas with Mongoose ODM |
| **Authentication** | ✅ Complete | JWT (30-day expiry), Google OAuth, Local Auth |
| **AI Engine** | ✅ Complete | Puter.js with token rotation, failover mechanism |
| **Payment System** | ✅ Complete | BKash/Nagad/Rocket (manual), PayPal (auto) |
| **Admin Panel** | ✅ Complete | Full CRUD for users, payments, configs |
| **Security** | ✅ Complete | Rate limiting, IP tracking, ban system |
| **Conversation History** | ✅ Complete | Full CRUD operations |
| **User Profile** | ✅ Complete | Preferences, avatar, password change |

---

## 🎯 Product Vision (From mahin-ai.md)

### Core Identity
- **Concept:** No-landing page (Direct-to-Product), Gemini-inspired high-end customized AI chat platform
- **Organization:** Mahin Ltd
- **CEO:** Tanvir Rahman
- **Service Email:** no-reply@mahinai.app

### Design Philosophy
1. **Cosmic Black Theme:** Background `#0B0B0F` with blurred neon glow avatars (`#8B5CF6` Purple, `#06B6D4` Cyan)
2. **Typography:** English - `Plus Jakarta Sans`, Bengali - `Hind Siliguri`
3. **Interface:** Collapsible sidebar (chat history, profile, upgrade button) + main chat window
4. **Glass-morphism Authentication:** Frosted glass effect modal on 3rd message for guest users
5. **10x Visual Experience:** Premium, professional, modern AI chat experience

---

## 🏗️ Frontend Architecture Plan

### Recommended Technology Stack

```javascript
{
  "framework": "React 18+ with Vite",
  "styling": "Tailwind CSS + Custom CSS Variables",
  "stateManagement": "Zustand or React Context + useReducer",
  "routing": "React Router DOM v6+",
  "httpClient": "Axios with interceptors",
  "animations": "Framer Motion",
  "icons": "Lucide React or Heroicons",
  "markdown": "react-markdown + remark-gfm",
  "syntaxHighlighting": "PrismJS or Highlight.js",
  "googleAuth": "@react-oauth/google",
  "paypal": "@paypal/react-paypal-js",
  "forms": "React Hook Form + Zod validation",
  "notifications": "react-hot-toast or sonner",
  "dateHandling": "date-fns",
  "http": "axios"
}
```

### Project Structure

```
mahin-ai-frontend/
├── public/
│   ├── favicon.ico
│   └── assets/
├── src/
│   ├── components/
│   │   ├── ui/              # Reusable UI components
│   │   │   ├── Button.jsx
│   │   │   ├── Input.jsx
│   │   │   ├── Modal.jsx
│   │   │   ├── GlassCard.jsx
│   │   │   └── ...
│   │   ├── auth/            # Authentication components
│   │   │   ├── LoginModal.jsx
│   │   │   ├── SignupForm.jsx
│   │   │   └── GoogleButton.jsx
│   │   ├── chat/            # Chat interface components
│   │   │   ├── ChatInterface.jsx
│   │   │   ├── MessageBubble.jsx
│   │   │   ├── ChatInput.jsx
│   │   │   ├── PromptSuggestions.jsx
│   │   │   └── TypingIndicator.jsx
│   │   ├── sidebar/         # Conversation sidebar
│   │   │   ├── Sidebar.jsx
│   │   │   ├── ConversationList.jsx
│   │   │   └── ConversationItem.jsx
│   │   ├── payment/         # Payment components
│   │   │   ├── PaymentSlider.jsx
│   │   │   ├── BDTForm.jsx
│   │   │   └── PayPalButton.jsx
│   │   ├── dashboard/       # User dashboard
│   │   │   ├── DashboardLayout.jsx
│   │   │   ├── UsageStats.jsx
│   │   │   └── PlanInfo.jsx
│   │   ├── admin/           # Admin dashboard
│   │   │   ├── AdminLayout.jsx
│   │   │   ├── UserTable.jsx
│   │   │   ├── PaymentReview.jsx
│   │   │   └── ConfigPanel.jsx
│   │   └── layout/          # Layout components
│   │       ├── MainLayout.jsx
│   │       ├── ProtectedRoute.jsx
│   │       └── ThemeProvider.jsx
│   ├── pages/
│   │   ├── Home.jsx         # Direct chat entry (no landing)
│   │   ├── Pricing.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Settings.jsx
│   │   ├── AdminDashboard.jsx
│   │   └── Legal.jsx        # Privacy & Terms
│   ├── services/
│   │   ├── api.js           # Axios instance + interceptors
│   │   ├── authService.js
│   │   ├── chatService.js
│   │   ├── conversationService.js
│   │   ├── paymentService.js
│   │   ├── userService.js
│   │   └── adminService.js
│   ├── store/               # State management
│   │   ├── authStore.js
│   │   ├── chatStore.js
│   │   ├── themeStore.js
│   │   └── conversationStore.js
│   ├── hooks/
│   │   ├── useAuth.js
│   │   ├── useChat.js
│   │   ├── useTheme.js
│   │   └── useConversations.js
│   ├── utils/
│   │   ├── constants.js
│   │   ├── helpers.js
│   │   └── validators.js
│   ├── contexts/
│   │   └── AuthContext.jsx
│   ├── App.jsx
│   └── main.jsx
├── .env.example
├── tailwind.config.js
├── vite.config.js
└── package.json
```

---

## 📊 Backend API Endpoints Analysis

### Base URL
```
http://localhost:5000/api/v1
Production: https://api.mahinai.app/api/v1
```

### 1. Authentication Routes (`/api/v1/auth`)

| Endpoint | Method | Auth Required | Description | Frontend Page |
|----------|--------|---------------|-------------|---------------|
| `/signup` | POST | ❌ | Register with email/password | Signup Modal |
| `/login` | POST | ❌ | Login with email/password | Login Modal |
| `/google` | POST | ❌ | Google OAuth login/signup | Google Button Handler |

**Request/Response Examples:**

```javascript
// Signup Request
POST /api/v1/auth/signup
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass@123"
}

// Response
{
  "success": true,
  "token": "JWT_TOKEN_HERE",
  "user": {
    "id": "user_mongodb_id",
    "name": "John Doe",
    "email": "john@example.com",
    "currentPlan": "free"
  }
}
```

**Rate Limiting:** 5 requests per 15 minutes per IP  
**Tracking:** IP, device, browser, location auto-recorded

---

### 2. AI Chat Routes (`/api/v1/ai`)

| Endpoint | Method | Auth Required | Description | Frontend Page |
|----------|--------|---------------|-------------|---------------|
| `/chat` | POST | ✅ | Generate AI response | Chat Interface |

**Request:**
```javascript
POST /api/v1/ai/chat
Headers: { Authorization: "Bearer {JWT_TOKEN}" }
{
  "message": "What is the capital of France?",
  "modelType": "light" // light | pro | max
}
```

**Response:**
```javascript
{
  "success": true,
  "modelUsed": "MahinAi-Light",
  "reply": "The capital of France is Paris..."
}
```

**Rate Limiting:** 10 requests per minute per IP  
**Features:** Token rotation, failover, brand persona injection

---

### 3. Conversation Routes (`/api/v1/conversations`)

| Endpoint | Method | Auth Required | Description | Frontend Page |
|----------|--------|---------------|-------------|---------------|
| `/conversations` | GET | ✅ | Get all conversations (paginated) | Sidebar |
| `/conversations` | POST | ✅ | Create new conversation | Chat Interface |
| `/conversations/:id` | GET | ✅ | Get single conversation | Chat View |
| `/conversations/:id` | PUT | ✅ | Rename conversation | Sidebar |
| `/conversations/:id` | DELETE | ✅ | Delete conversation | Sidebar |

**Query Params for GET:** `page`, `limit` (default: 20, max: 100)

---

### 4. User Profile Routes (`/api/v1/user`)

| Endpoint | Method | Auth Required | Description | Frontend Page |
|----------|--------|---------------|-------------|---------------|
| `/profile` | GET | ✅ | Get user profile | Settings/Dashboard |
| `/profile` | PUT | ✅ | Update profile (name, preferences, avatar) | Settings |
| `/change-password` | PUT | ✅ | Change password (local accounts only) | Settings |

**Preferences Schema:**
```javascript
{
  "theme": "light" | "dark" | "system",
  "language": "en" | "bn" | ...,
  "notifications": true | false
}
```

---

### 5. Payment Routes (`/api/v1/payment`)

| Endpoint | Method | Auth Required | Description | Frontend Page |
|----------|--------|---------------|-------------|---------------|
| `/manual-submit` | POST | ✅ | Submit BKash/Nagad/Rocket payment | Payment Slider |
| `/paypal-success` | POST | ✅ | Verify PayPal payment | PayPal Handler |

**Manual Payment Request:**
```javascript
POST /api/v1/payment/manual-submit
{
  "gateway": "bkash", // bkash | nagad | rocket
  "transactionId": "ABC123XYZ",
  "senderNumber": "+8801700000000" // optional
}
```

---

### 6. Admin Routes (`/api/v1/admin`)

| Endpoint | Method | Description | Frontend Page |
|----------|--------|-------------|---------------|
| `/users` | GET | Get all users | Admin Dashboard |
| `/user-status/:id` | PUT | Ban/Unban user | Admin Dashboard |
| `/payments/pending` | GET | Get pending payments | Admin Payment Review |
| `/payment-action/:id` | PUT | Approve/Reject payment | Admin Payment Review |
| `/config-update` | PUT | Update system config | Admin Settings |

**Auth Required:** JWT + Admin role OR email === ADMIN_EMAIL

---

## 🔐 Authentication Flow

### Guest Mode Flow
```
1. User visits mahinai.app
2. Direct access to chat interface (no landing page)
3. Show 4 ready-made prompt slider cards
4. Allow maximum 2 messages without login
5. On 3rd message → Show glass-morphism auth modal
6. User chooses: Google OAuth OR Email/Password
7. On success → Store JWT token, continue chat seamlessly
```

### Login Flow
```
1. User clicks "Continue with Google" OR enters email/password
2. Frontend sends credentials to backend
3. Backend validates, tracks IP/device/location
4. Backend returns JWT token (30-day expiry) + user object
5. Frontend stores token in localStorage
6. Frontend updates auth state
7. Redirect to chat interface (if not already there)
```

### Token Management
```javascript
// Storage
localStorage.setItem('token', jwtToken);
localStorage.setItem('user', JSON.stringify(user));

// Axios Interceptor
axios.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auto-logout on 401
axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.reload();
    }
    return Promise.reject(error);
  }
);
```

---

## 💳 Payment Flow

### BDT Payment Flow (Bangladesh - ৳299)
```
1. User clicks "Upgrade to Pro"
2. Payment slider opens from right
3. User selects gateway (BKash/Nagad/Rocket)
4. User completes payment on mobile app
5. User receives Transaction ID
6. User submits TrxID via form
7. Backend stores as "pending"
8. Admin receives email notification
9. Admin verifies manually in admin panel
10. Admin approves → User upgraded to Pro
11. User receives confirmation email
```

### USD Payment Flow (International - $5)
```
1. User clicks "Upgrade to Pro"
2. Payment slider opens
3. User sees PayPal button (for non-BD IPs)
4. User completes PayPal authorization
5. Frontend receives orderId
6. Frontend sends orderId to backend
7. Backend verifies with PayPal servers
8. Backend auto-approves and upgrades user
9. User & admin receive confirmation emails
```

### Dynamic Pricing
```javascript
// Fetch from backend config
GET /api/v1/admin/config (public endpoint needed)
// Or hardcode defaults and update via admin
const defaultPrices = {
  BDT: 299,
  USD: 5
};
```

---

## 🎨 UI/UX Requirements

### Theme Configuration

**Colors:**
```css
:root {
  /* Cosmic Black Theme */
  --background-primary: #0B0B0F;
  --background-secondary: #12121A;
  --background-tertiary: #1A1A2E;
  
  /* Neon Glow Accents */
  --accent-purple: #8B5CF6;
  --accent-cyan: #06B6D4;
  --accent-purple-glow: rgba(139, 92, 246, 0.15);
  --accent-cyan-glow: rgba(6, 182, 212, 0.15);
  
  /* Text Colors */
  --text-primary: #FFFFFF;
  --text-secondary: #A1A1AA;
  --text-muted: #71717A;
  
  /* Semantic Colors */
  --success: #10B981;
  --warning: #F59E0B;
  --error: #EF4444;
  --info: #3B82F6;
}

[data-theme="light"] {
  --background-primary: #FFFFFF;
  --background-secondary: #F9FAFB;
  --background-tertiary: #F3F4F6;
  --text-primary: #111827;
  --text-secondary: #4B5563;
  --text-muted: #9CA3AF;
}
```

**Typography:**
```css
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Hind+Siliguri:wght@400;500;600;700&display=swap');

.font-sans {
  font-family: 'Plus Jakarta Sans', sans-serif;
}

.font-bengali {
  font-family: 'Hind Siliguri', sans-serif;
}
```

### Component Specifications

#### 1. Glass-morphism Auth Modal
```jsx
// Features:
// - Frosted glass effect (backdrop-filter: blur)
// - Centered on screen
// - Animated entrance (Framer Motion)
// - Two options: Google OAuth (highlighted) + Email/Password
// - Close on outside click or ESC
// - Shown on 3rd message for guest users
```

#### 2. Payment Slider Panel
```jsx
// Features:
// - Slides from right side
// - Detects user IP (BD vs International)
// - Shows BDT form for Bangladesh users
// - Shows PayPal button for international users
// - Real-time validation
// - Success/error notifications
```

#### 3. CEO Hover Card
```jsx
// When "Tanvir Rahman" appears in AI response:
// - Framer Motion hover animation
// - Shows CEO photo + designation
// - Professional card design
// - Clickable email: info.mahin.ltd@gmail.com
```

#### 4. Prompt Suggestions Slider
```jsx
// Features:
// - 4 ready-made prompt cards
// - Horizontal scroll/slider
// - Click to auto-fill chat input
// - Shown to guest users on empty chat
// - Hidden after login or first message
```

#### 5. Conversation Sidebar
```jsx
// Features:
// - Collapsible (hamburger menu)
// - List of conversations (title + date)
// - Active conversation highlight
// - Rename on click/edit
// - Delete with confirmation
// - "New Chat" button at top
// - User profile section at bottom
// - "Upgrade to Pro" CTA button
```

#### 6. Chat Interface
```jsx
// Features:
// - Full-height main area
// - Message bubbles (user vs assistant)
// - Markdown rendering for AI responses
// - Code syntax highlighting
// - Typing indicator during AI generation
// - Auto-scroll to bottom
// - Regenerate response button
// - Copy response button
// - Model selector (light/pro/max)
// - Character counter
```

---

## 📱 Mobile-First Responsive Design

### Breakpoints (Tailwind)
```javascript
{
  screens: {
    'sm': '640px',   // Small tablets
    'md': '768px',   // Tablets
    'lg': '1024px',  // Laptops
    'xl': '1280px',  // Desktops
    '2xl': '1536px'  // Large desktops
  }
}
```

### Mobile Layout Priorities
1. **Chat-first approach:** Chat interface takes full viewport
2. **Hidden sidebar:** Hamburger menu reveals sidebar
3. **Bottom sheet modals:** Auth and payment on mobile
4. **Touch-friendly targets:** Minimum 44px tap targets
5. **Optimized keyboard:** Proper input types, avoid viewport shift
6. **Swipe gestures:** Swipe to delete conversation (future enhancement)

---

## 🗺️ Implementation Roadmap

### Phase 1: Foundation (Days 1-3)
**Priority: CRITICAL**

#### Day 1: Project Setup
- [ ] Initialize Vite + React project
- [ ] Install all dependencies
- [ ] Configure Tailwind CSS with custom theme
- [ ] Set up folder structure
- [ ] Configure ESLint + Prettier
- [ ] Create `.env.example` template
- [ ] Set up Git repository

#### Day 2: Core Infrastructure
- [ ] Create Axios instance with interceptors
- [ ] Implement auth service (login, signup, google, logout)
- [ ] Create auth context/store
- [ ] Build ProtectedRoute component
- [ ] Implement token management
- [ ] Create theme context/store (dark/light/system)
- [ ] Build basic layout components

#### Day 3: UI Component Library
- [ ] Button component (variants: primary, secondary, ghost)
- [ ] Input component (with validation states)
- [ ] Modal component (with animations)
- [ ] GlassCard component
- [ ] LoadingSpinner component
- [ ] Toast notification system
- [ ] Skeleton loaders

**Deliverable:** Functional project skeleton with authentication flow

---

### Phase 2: Authentication (Days 4-6)
**Priority: CRITICAL**

#### Day 4: Login/Signup Modals
- [ ] Login form with validation
- [ ] Signup form with validation
- [ ] Password strength indicator
- [ ] Error handling and display
- [ ] Success state management
- [ ] Form submission logic

#### Day 5: Google OAuth Integration
- [ ] Set up Google Cloud Console project
- [ ] Configure @react-oauth/google
- [ ] Create Google sign-in button component
- [ ] Handle OAuth callback
- [ ] Merge OAuth with existing auth flow
- [ ] Test on localhost and production domain

#### Day 6: Guest Mode & Auth Modal Trigger
- [ ] Implement guest message counter (max 2 messages)
- [ ] Create glass-morphism auth modal
- [ ] Trigger modal on 3rd message
- [ ] Seamless transition after login
- [ ] Persist guest messages after login (optional)

**Deliverable:** Complete authentication system with guest mode

---

### Phase 3: Chat Interface (Days 7-10)
**Priority: CRITICAL**

#### Day 7: Chat Layout & Input
- [ ] Main chat container layout
- [ ] Chat input component
- [ ] Send button with loading state
- [ ] Character counter
- [ ] Keyboard shortcuts (Enter to send)
- [ ] Mobile-optimized input area

#### Day 8: Message Rendering
- [ ] Message bubble component (user vs assistant)
- [ ] Markdown rendering (react-markdown)
- [ ] Code syntax highlighting (PrismJS)
- [ ] CEO name detection and hover card
- [ ] Email link detection and clickable button
- [ ] Timestamp formatting

#### Day 9: AI Integration
- [ ] Chat service (API call to /ai/chat)
- [ ] Loading/typing indicator
- [ ] Error handling and retry
- [ ] Model selector (light/pro/max)
- [ ] Response streaming simulation
- [ ] Auto-scroll to bottom

#### Day 10: Advanced Chat Features
- [ ] Regenerate response button
- [ ] Copy response button
- [ ] Message actions menu
- [ ] Conversation auto-save integration
- [ ] Chat history persistence

**Deliverable:** Fully functional AI chat interface

---

### Phase 4: Conversation Management (Days 11-13)
**Priority: HIGH**

#### Day 11: Sidebar Layout
- [ ] Collapsible sidebar component
- [ ] Hamburger menu toggle
- [ ] Sidebar header (New Chat button)
- [ ] User profile section at bottom
- [ ] Upgrade to Pro CTA button
- [ ] Responsive behavior (mobile vs desktop)

#### Day 12: Conversation List
- [ ] Fetch conversations from API
- [ ] Conversation list item component
- [ ] Active conversation highlight
- [ ] Infinite scroll or pagination
- [ ] Empty state design
- [ ] Loading skeletons

#### Day 13: Conversation Actions
- [ ] Create new conversation
- [ ] Switch between conversations
- [ ] Rename conversation (inline edit)
- [ ] Delete conversation (with confirmation)
- [ ] Auto-title generation from first message
- [ ] Conversation sync across devices

**Deliverable:** Complete conversation management system

---

### Phase 5: Payment System (Days 14-16)
**Priority: HIGH**

#### Day 14: Payment Slider
- [ ] Slide-out panel component
- [ ] Animation (Framer Motion)
- [ ] Pricing display (dynamic from config)
- [ ] Plan comparison (Free vs Pro vs Max)
- [ ] Feature list
- [ ] Close button and outside click handler

#### Day 15: BDT Payment Form
- [ ] Gateway selection (BKash/Nagad/Rocket)
- [ ] Transaction ID input with validation
- [ ] Sender number input (optional)
- [ ] Instructions and guide
- [ ] Form submission
- [ ] Success/error states
- [ ] Pending status messaging

#### Day 16: PayPal Integration
- [ ] IP-based gateway detection (BD vs International)
- [ ] PayPal SDK integration
- [ ] PayPal button component
- [ ] Order creation and approval flow
- [ ] Backend verification handler
- [ ] Instant upgrade confirmation
- [ ] Receipt/invoice display

**Deliverable:** Complete payment system for both BDT and USD

---

### Phase 6: User Dashboard & Settings (Days 17-19)
**Priority: MEDIUM**

#### Day 17: Dashboard Layout
- [ ] Dashboard page structure
- [ ] Navigation tabs
- [ ] Usage statistics display
- [ ] Current plan information
- [ ] Quick actions

#### Day 18: Profile Settings
- [ ] Profile picture upload (Cloudinary)
- [ ] Name edit
- [ ] Email display (non-editable)
- [ ] Preferences section:
  - Theme toggle (light/dark/system)
  - Language selector
  - Notifications toggle
- [ ] Save/cancel functionality

#### Day 19: Account Settings
- [ ] Change password form (local accounts)
- [ ] Account status display
- [ ] Subscription management
- [ ] Payment history (if backend supports)
- [ ] Logout from all devices (future)
- [ ] Delete account (future)

**Deliverable:** Complete user settings and profile management

---

### Phase 7: Admin Dashboard (Days 20-23)
**Priority: MEDIUM** (Only if admin users exist)

#### Day 20: Admin Layout & User Management
- [ ] Admin-specific layout
- [ ] User table component
- [ ] Search and filter
- [ ] Pagination
- [ ] User details modal
- [ ] Ban/Unban action

#### Day 21: Payment Review
- [ ] Pending payments list
- [ ] Transaction details view
- [ ] Approve/Reject actions
- [ ] Bulk actions (future)
- [ ] Payment history

#### Day 22: System Configuration
- [ ] Model name editing
- [ ] Model kill-switch toggles
- [ ] Price updates (BDT/USD)
- [ ] Privacy Policy editor (Markdown)
- [ ] Terms & Conditions editor (Markdown)
- [ ] Save confirmation

#### Day 23: Analytics & Communication
- [ ] User count dashboard
- [ ] Revenue overview
- [ ] Email composer (single user)
- [ ] Bulk email sender (future)
- [ ] Activity logs (future)

**Deliverable:** Full-featured admin control panel

---

### Phase 8: Polish & Optimization (Days 24-26)
**Priority: HIGH**

#### Day 24: Performance Optimization
- [ ] Code splitting and lazy loading
- [ ] Image optimization
- [ ] Bundle size reduction
- [ ] Memoization (React.memo, useMemo, useCallback)
- [ ] Virtual scrolling for long lists
- [ ] Service worker setup (PWA)

#### Day 25: Accessibility & SEO
- [ ] ARIA labels and roles
- [ ] Keyboard navigation
- [ ] Focus management
- [ ] Screen reader testing
- [ ] Meta tags and Open Graph
- [ ] Favicon and app icons
- [ ] robots.txt and sitemap.xml

#### Day 26: Testing & Bug Fixes
- [ ] Manual testing checklist
- [ ] Cross-browser testing
- [ ] Mobile device testing
- [ ] Edge case handling
- [ ] Error boundary implementation
- [ ] Bug fixes and refinements

**Deliverable:** Production-ready, optimized application

---

### Phase 9: Deployment (Day 27+)
**Priority: CRITICAL**

#### Deployment Checklist
- [ ] Environment variables configuration
- [ ] Build optimization
- [ ] CDN setup for static assets
- [ ] SSL certificate
- [ ] Domain configuration
- [ ] CI/CD pipeline (GitHub Actions)
- [ ] Monitoring setup (Sentry, LogRocket)
- [ ] Analytics integration (Google Analytics)
- [ ] Performance monitoring (Core Web Vitals)

**Recommended Hosting:**
- **Frontend:** Vercel, Netlify, or Cloudflare Pages
- **Backend:** Already deployed (confirm URL)
- **Database:** MongoDB Atlas (already configured)

---

## 🔍 Backend Feature Analysis

### ✅ Features Already Supported (Ready for Frontend)

| Feature | Backend Status | Frontend Readiness |
|---------|---------------|-------------------|
| User Registration (Email/Password) | ✅ Complete | Ready |
| User Login (Email/Password) | ✅ Complete | Ready |
| Google OAuth | ✅ Complete | Ready |
| JWT Authentication (30-day tokens) | ✅ Complete | Ready |
| AI Chat Generation | ✅ Complete | Ready |
| Token Rotation & Failover | ✅ Complete | Ready |
| Conversation CRUD | ✅ Complete | Ready |
| User Profile Management | ✅ Complete | Ready |
| Password Change | ✅ Complete | Ready |
| Theme Preferences | ✅ Complete | Ready |
| Manual Payment (BDT) | ✅ Complete | Ready |
| PayPal Payment (USD) | ✅ Complete | Ready |
| Payment Approval Workflow | ✅ Complete | Ready |
| User Ban/Unban | ✅ Complete | Ready |
| Admin User Management | ✅ Complete | Ready |
| Admin Payment Review | ✅ Complete | Ready |
| System Config Management | ✅ Complete | Ready |
| IP/Device/Location Tracking | ✅ Complete | Transparent |
| Rate Limiting | ✅ Complete | Transparent |
| CORS Protection | ✅ Complete | Configured for localhost:5173 |

---

### ⚠️ Features Missing from Backend (Require Backend Changes)

| Feature | Priority | Impact | Recommendation |
|---------|----------|--------|----------------|
| **Public Config Endpoint** | HIGH | Pricing display needs this | Create `GET /api/v1/config/public` endpoint |
| **Guest Message Tracking** | MEDIUM | Guest mode enforcement | Add session-based guest tracking |
| **Avatar Upload Endpoint** | LOW | Profile picture feature | Enable multipart/form-data on `/user/profile` |
| **Payment History for Users** | MEDIUM | User can see past payments | Add `GET /api/v1/payment/history` |
| **Model Type per Plan** | MEDIUM | Restrict free users to light model | Add plan-based model validation |
| **Email Verification** | LOW | Security enhancement | Add email verification flow |
| **Password Reset** | MEDIUM | User experience | Add forgot password flow |
| **Real-time Notifications** | LOW | Engagement | Add WebSocket or polling for payment status |
| **Conversation Export** | LOW | User utility | Add export to PDF/TXT |
| **Usage Statistics** | LOW | Dashboard enhancement | Add usage metrics endpoint |

---

### 🚀 Features That Can Be Implemented Immediately

These features work with current backend:

1. **Full Authentication Flow** (Login, Signup, Google OAuth)
2. **AI Chat Interface** (All model types)
3. **Conversation Management** (Create, Read, Update, Delete)
4. **User Profile Settings** (Name, preferences, password)
5. **Theme Toggle** (Light/Dark/System - stored in backend)
6. **Payment Submission** (Both BDT and PayPal)
7. **Admin Dashboard** (All CRUD operations)
8. **Guest Mode** (With local message counting)
9. **Responsive Design** (Mobile-first approach)
10. **Error Handling** (All backend error scenarios covered)

---

### 🔧 Features Requiring Backend Changes

These need backend modifications before frontend implementation:

1. **Public Pricing Display**
   - Need: `GET /api/v1/config/public` (no auth required)
   - Purpose: Show pricing on payment slider without requiring login

2. **Avatar Upload**
   - Need: Enable `multer` middleware on `/user/profile` PUT route
   - Purpose: Allow direct image upload to Cloudinary

3. **User Payment History**
   - Need: `GET /api/v1/payment/my-payments` endpoint
   - Purpose: Show users their payment history

4. **Plan-Based Model Restrictions**
   - Need: Add validation in `/ai/chat` based on `user.currentPlan`
   - Purpose: Free users limited to light model only

5. **Forgot Password Flow**
   - Need: `POST /auth/forgot-password` and `POST /auth/reset-password`
   - Purpose: Password recovery for local accounts

6. **Email Verification**
   - Need: `POST /auth/verify-email` and resend functionality
   - Purpose: Verify email addresses on signup

7. **Real-time Payment Status**
   - Need: WebSocket endpoint or polling endpoint for payment status
   - Purpose: Notify users when payment is approved

8. **Message Count for Guest Users**
   - Need: Session-based or cookie-based guest tracking
   - Purpose: Enforce 2-message limit server-side

---

## 📝 Implementation Priority Matrix

### Critical Path (Must Have - MVP)
1. ✅ Authentication (Login, Signup, Google)
2. ✅ AI Chat Interface
3. ✅ Conversation Sidebar
4. ✅ Payment System (BDT + PayPal)
5. ✅ Mobile Responsiveness
6. ✅ Dark/Light Theme

### High Priority (Should Have)
1. ✅ User Dashboard & Settings
2. ✅ Admin Dashboard
3. ✅ Glass-morphism Auth Modal
4. ✅ Payment Slider
5. ✅ CEO Hover Card
6. ✅ Prompt Suggestions

### Medium Priority (Nice to Have)
1. ⏳ Avatar Upload (needs backend)
2. ⏳ Payment History (needs backend)
3. ⏳ Forgot Password (needs backend)
4. ⏳ Email Verification (needs backend)
5. ✅ Advanced Animations
6. ✅ Keyboard Shortcuts

### Low Priority (Future Enhancements)
1. ⏳ Real-time Notifications (needs backend)
2. ⏳ Conversation Export (needs backend)
3. ⏳ Usage Statistics (needs backend)
4. ⏳ Bulk Email (admin feature)
5. ⏳ PWA Installation
6. ⏳ Multi-language Support

---

## 🎯 Success Metrics

### Technical KPIs
- **Page Load Time:** < 3 seconds on 3G
- **Time to Interactive:** < 5 seconds
- **Lighthouse Score:** > 90 (Performance, Accessibility, SEO, Best Practices)
- **Bundle Size:** < 500KB (gzipped)
- **API Response Time:** < 500ms (depends on AI engine)

### User Experience KPIs
- **Guest to Registered Conversion:** > 40%
- **Free to Pro Conversion:** > 5%
- **User Retention (7-day):** > 30%
- **Mobile Usage:** > 60% of traffic
- **Customer Satisfaction:** > 4.5/5 rating

---

## 🛡️ Security Considerations for Frontend

### Token Security
```javascript
// DO: Store JWT in localStorage (acceptable for this use case)
localStorage.setItem('token', token);

// DON'T: Store sensitive data in plain text
// DON'T: Log tokens to console
// DON'T: Pass tokens in URL parameters
```

### XSS Prevention
```javascript
// DO: Use React's built-in XSS protection
// DO: Sanitize user-generated content
// DO: Use DOMPurify for HTML content

// DON'T: Use dangerouslySetInnerHTML without sanitization
// DON'T: Trust user input
```

### CSRF Protection
```javascript
// Backend uses JWT in Authorization header
// No cookies = No CSRF vulnerability
// Ensure CORS is properly configured
```

### Rate Limiting Awareness
```javascript
// Frontend should handle 429 errors gracefully
// Show user-friendly messages
// Implement exponential backoff for retries
```

---

## 📚 Developer Resources

### Documentation Links
- [Backend API Documentation](./BACKEND_DOCUMENTATION.md)
- [Product Vision](./mahin-ai.md)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion/)

### Design Inspiration
- [Gemini UI](https://gemini.google.com)
- [ChatGPT UI](https://chat.openai.com)
- [Claude UI](https://claude.ai)
- [Perplexity UI](https://perplexity.ai)

### Tools
- **Design:** Figma (create mockups first)
- **API Testing:** Postman or Insomnia
- **Code Editor:** VS Code with recommended extensions
- **Version Control:** Git + GitHub
- **Project Management:** GitHub Projects or Trello

---

## 🎬 Getting Started Checklist

### Before Coding
- [ ] Read this entire roadmap
- [ ] Review backend documentation thoroughly
- [ ] Understand authentication flow
- [ ] Familiarize with API endpoints
- [ ] Set up development environment
- [ ] Create Figma mockups (optional but recommended)
- [ ] Define coding standards with team

### Day 1 Setup Commands
```bash
# Create project
npm create vite@latest mahin-ai-frontend -- --template react

# Navigate to project
cd mahin-ai-frontend

# Install dependencies
npm install axios react-router-dom framer-motion @react-oauth/google
npm install react-markdown remark-gfm prismjs react-hot-toast
npm install zustand date-fns lucide-react
npm install -D tailwindcss postcss autoprefixer

# Initialize Tailwind
npx tailwindcss init -p

# Start development server
npm run dev
```

### Environment Variables (.env)
```env
VITE_API_BASE_URL=http://localhost:5000/api/v1
VITE_GOOGLE_CLIENT_ID=your_google_client_id
VITE_PAYPAL_CLIENT_ID=your_paypal_client_id
VITE_PAYPAL_MODE=sandbox
```

---

## 🤝 Team Coordination

### Recommended Team Structure (from mahin-ai.md)
- **Project Lead:** Tanvir Rahman (Daily standups, architecture tracking)
- **Frontend Team (4 developers):**
  - 2 developers: Main Gemini layout, sidebar, chat history, theming
  - 2 developers: Auth modal, payment slider, Framer Motion animations
- **QA Engineers (2):** Testing, bug reporting, UX validation

### Communication Channels
- **Daily Standup:** 15 minutes (progress, blockers, plans)
- **Code Reviews:** Mandatory PR reviews before merge
- **Documentation:** Update this doc as features are completed
- **Bug Tracking:** GitHub Issues

---

## 📅 Timeline Summary

| Phase | Duration | Deliverable |
|-------|----------|-------------|
| Phase 1: Foundation | 3 days | Project skeleton + auth infrastructure |
| Phase 2: Authentication | 3 days | Complete auth flow with guest mode |
| Phase 3: Chat Interface | 4 days | Full AI chat experience |
| Phase 4: Conversations | 3 days | Sidebar + conversation management |
| Phase 5: Payment System | 3 days | BDT + PayPal integration |
| Phase 6: Dashboard | 3 days | User settings & profile |
| Phase 7: Admin Panel | 4 days | Admin control room |
| Phase 8: Polish | 3 days | Optimization + testing |
| Phase 9: Deployment | 1-2 days | Production launch |
| **Total** | **27 days** | **Production-ready frontend** |

---

## 🎉 Final Notes

This roadmap provides a comprehensive plan for building a **Gemini-quality frontend** for Mahin AI. The backend is robust, secure, and production-ready. The frontend team should focus on:

1. **User Experience First:** Every interaction should feel premium and polished
2. **Mobile-First:** Design for mobile, enhance for desktop
3. **Performance:** Optimize bundle size, lazy load components
4. **Accessibility:** Make the app usable for everyone
5. **Testing:** Test thoroughly before deployment

Remember: The goal is to create a **10x visual experience** that matches the quality of the backend infrastructure.

**Good luck, team! Let's build something amazing together! 🚀**

---

*Document prepared for Mahin Ltd Frontend Development Team*  
*Based on analysis of backend codebase and product requirements*  
*Version 1.0 - Ready for implementation*
