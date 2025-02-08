# Connect and Cure - Doctor Appointment Booking System

## Overview
**Connect and Cure** is a web-based doctor appointment booking system designed to streamline the scheduling process between patients and healthcare providers. The platform ensures efficient appointment management, doctor verification, and real-time notifications to enhance the healthcare experience.

## Features
### **For Patients**
- **User Registration & Login**: Secure authentication using JWT.
- **Doctor Search & Booking**: Search doctors by specialization and availability.
- **Manage Appointments**: View, cancel, or reschedule appointments.
- **Apply for Doctor Role**: Submit credentials and license for verification.

### **For Doctors**
- **Doctor Dashboard**: View and manage patient appointments.
- **Appointment Control**: Accept or reject appointment requests.
- **Profile Management**: Update availability, specialization, and fees.

### **For Admin**
- **Doctor Verification**: Approve or reject doctor applications.
- **User Management**: Monitor and manage all users.
- **System Monitoring**: Oversee appointments and resolve conflicts.

## Tech Stack
- **Frontend**: React.js, Redux, React Router, Axios, Flatpickr
- **Backend**: Node.js, Express.js, JWT Authentication
- **Database**: MongoDB Atlas (Mongoose ODM)
- **Storage**: Cloudinary (for file uploads)
- **Styling**: CSS, Tailwind (Optional)

## Installation & Setup
1. **Clone the Repository**:
   ```sh
   git clone https://github.com/yourusername/connect-and-cure.git
   cd connect-and-cure
   ```
2. **Backend Setup**:
   ```sh
   cd server
   npm install
   npm start
   ```
3. **Frontend Setup**:
   ```sh
   cd client
   npm install
   npm start
   ```
4. **Environment Variables**:
   - Create a `.env` file in the backend folder and configure:
     ```env
     PORT=5000
     MONGO_URI=your_mongo_db_uri
     JWT_SECRET=your_secret_key
     CLOUDINARY_CLOUD_NAME=your_cloud_name
     CLOUDINARY_API_KEY=your_api_key
     CLOUDINARY_API_SECRET=your_api_secret
     ```

## How It Works
1. **Users Register/Login** (Patients & Doctors)
2. **Doctors Apply for Approval** (License Upload & Admin Verification)
3. **Patients Book Appointments** with available doctors
4. **Doctors Manage Appointments** (Accept/Reject)
5. **Admin Approves New Doctors** and Monitors the System
6. **Real-time Notifications** keep all users informed

## Contribution
Feel free to contribute by raising issues, submitting PRs, or suggesting improvements.


