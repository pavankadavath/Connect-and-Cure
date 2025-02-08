# Connect and Cure - Doctor Appointment Booking System

## Overview
**Connect and Cure** is a web-based doctor appointment booking system designed to streamline the scheduling process between patients and healthcare providers. The platform ensures efficient appointment management, doctor verification, and real-time notifications to enhance the healthcare experience.
![image](https://github.com/user-attachments/assets/341cfd35-164a-4740-9e08-8c13881d38d0)
![image](https://github.com/user-attachments/assets/93a5cd4a-1f30-45d0-9321-0c55c7c9f857)
![image](https://github.com/user-attachments/assets/42fa5dea-43de-4e1b-b2fc-608dbfe85ddc)
## Credentials
##Doctor
Email ID : kadavathpavan12345@gmail.com
password: 12345

##User
Email ID : kpavan@gmail.com
password : pavan123
## Features
### **For Patients**
- **User Registration & Login**: Secure authentication using JWT.
  
  ![image](https://github.com/user-attachments/assets/a5231480-3236-4bda-b99d-5e86837b49d3)
- **Doctor Search & Booking**: Search doctors by specialization and availability.
  
  ![image](https://github.com/user-attachments/assets/41211c8e-ac5c-43aa-ad25-b37ba8f1f9b0)
- **Manage Appointments**: View, cancel, or reschedule appointments.
- **Apply for Doctor Role**: Submit credentials and license for verification.

### **For Doctors**
- **Doctor Dashboard**: View and manage patient appointments.
- **Appointment Control**: Accept or reject appointment requests.
  
 ![image](https://github.com/user-attachments/assets/1f4f893f-4f82-496f-bdc1-434efad30dab)
- **Profile Management**: Update availability, specialization, and fees.

### **For Admin**
- **User Management**: Monitor and manage all users.
  
  ![image](https://github.com/user-attachments/assets/a08ca1e0-34a7-4cbf-999f-b057fa90db8a)
- **Doctor Verification**: Approve or reject doctor applications.
  
  ![Screenshot 2025-02-08 111440](https://github.com/user-attachments/assets/57af91c5-d66c-49af-b0e1-d5ef125e3c6e)
- **System Monitoring**: Oversee appointments and resolve conflicts.
  
![Screenshot 2025-02-08 111018](https://github.com/user-attachments/assets/93ef3982-e2c9-4729-b111-8f6936e7d813)

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


