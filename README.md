# PayNexus Merchant Admin Panel

This project is built using a modern, feature-first architecture on top of Next.js, React, Tailwind CSS v4, and shadcn/ui.

## Global Setup & Architecture

### Feature-First Architecture
The project strictly follows a **senior-level feature-first architecture**:
- `src/app/`: Contains strictly routing definitions and layouts. No complex business logic or UI components should be defined directly here.
- `src/features/`: The heart of the application. Each module (Auth, Dashboard, Wallet, Payouts) encapsulates its own UI components, hooks, API files, schemas, and types.
- `src/components/`: Reserved only for globally reusable UI elements (like `shadcn/ui` components or shared layouts).

### Global CSS & Theme Setup (Tailwind v4)
All colors, spacing, and styling tokens are defined globally in `src/app/globals.css`. 
We **do not hardcode hex values** in our components. Instead, we use semantic Tailwind utility classes mapped to CSS variables.

For example, the primary PayNexus purple color is mapped globally:
```css
:root {
  --primary: #4F46C8;
}
```
This enables you to use `bg-primary`, `text-primary`, and `border-primary` everywhere in the codebase. If the brand color changes in the future, you only update it in `globals.css` and the entire application immediately updates.

### What is Completed (Initial Phase)

1. **Project Initialization**
   - Clean Next.js 16 installation using the App Router and pnpm.
   - Initialized Tailwind CSS v4 alongside `shadcn/ui`.
   - Setup `lucide-react` for iconography.

2. **UI & Routing Foundation**
   - Created a strict, modular folder structure separating routes (`app/`) from business logic (`features/`).
   - Built a highly generic, responsive 2-column authentication layout (`src/components/layout/auth-layout.tsx`) complete with a mocked-up dashboard graphic and brand imagery.

3. **Authentication Flows (Auth Feature Module)**
   - **Login Page**: Setup with email/password inputs and "Remember Me" functionality.
   - **Forgot Password**: Password recovery form with navigation.
   - **Verify OTP**: Dynamic 6-digit verification input with resend timers.
   - **Create New Password**: Secure password reset form with live password strength/requirement indicators (Medium strength placeholder, validation checkmarks).

4. **Reusable Common Action Buttons**
   - Created generic placeholder buttons ("Add Funds", "Withdrawal Request") in `src/components/common/action-buttons.tsx` demonstrating how to build robust, stylized components leveraging global CSS variables.

## Getting Started

1. Install dependencies using pnpm:
   ```bash
   pnpm install
   ```

2. Start the development server:
   ```bash
   pnpm dev
   ```

3. Navigate to the authentication flows to preview the UI:
   - `http://localhost:3000/login`
   - `http://localhost:3000/forgot-password`
   - `http://localhost:3000/verify-otp`
   - `http://localhost:3000/reset-password`

# payoutClone
