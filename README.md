# CA Vakil - Legal & Financial Solutions

CA Vakil is a comprehensive web platform designed to provide professional legal and financial services to businesses and individuals. Built with modern web technologies, it offers a seamless experience for service discovery, consultation booking, and document management.

## 🚀 Key Features

- **Service Catalog:** Explore a wide range of legal and financial services categorized for easy access.
- **Consultation Booking:** "Talk to Lawyer" feature with multiple consultation plans and real-time booking.
- **Secure Payments:** Integrated with Razorpay for safe and seamless transactions.
- **User Dashboard:** Dedicated space for users to manage their orders, track progress, and upload documents.
- **Admin Panel:** Powerful dashboard for administrators to manage services, sub-services, orders, and user data.
- **SEO Optimized:** Built with Next.js App Router for superior performance and search engine visibility.
- **Responsive UI:** Modern, mobile-first design using Tailwind CSS and Framer Motion for smooth animations.

## 🛠️ Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/), [Shadcn UI](https://ui.shadcn.com/)
- **Database:** [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/)
- **Authentication:** [NextAuth.js](https://next-auth.js.org/)
- **Data Fetching:** [TanStack Query](https://tanstack.com/query/latest)
- **Payments:** [Razorpay](https://razorpay.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Media Management:** [Cloudinary](https://cloudinary.com/), [Firebase](https://firebase.google.com/)

## ⚙️ Getting Started

### Prerequisites

- Node.js (Latest LTS version)
- MongoDB Connection String
- Razorpay API Keys

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ravinfsd/Cavakil.git
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add the following variables:
   ```env
   MONGODB_URI=your_mongodb_uri
   NEXTAUTH_SECRET=your_nextauth_secret
   NEXTAUTH_URL=http://localhost:3000

   RAZORPAY_KEY_ID=your_razorpay_key_id
   RAZORPAY_KEY_SECRET=your_razorpay_key_secret

   CLOUDINARY_CLOUD_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📁 Project Structure

```text
src/
├── app/            # App router pages and API routes
├── components/     # Reusable UI components
├── hooks/          # Custom React hooks
├── models/         # Mongoose schemas
├── lib/            # Utility functions and configurations
└── assets/         # Static assets
```

## 📝 License

This project is private and intended for CA Vakil's internal use.
