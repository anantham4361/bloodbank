# Blood Bank Management System - AWS Deployment Guide

This guide provides step-by-step instructions for deploying the Blood Bank Management System on AWS using EC2 for hosting and RDS for the database.

## Architecture
- Frontend: Apache HTTP Server
- Backend: Node.js
- Database: MySQL (AWS RDS)
- Hosting: AWS EC2

## Prerequisites
- AWS Account with appropriate permissions
- SSH client
- Git installed on your local machine

## Step 1: Set up AWS RDS Instance
1. Login to AWS Console and navigate to RDS
2. Create a new MySQL database instance:
```bash
Database name: bloodbank
Username: admin
Password: [your-secure-password]
```

## Step 2: Set up EC2 Instance
1. Launch a new EC2 instance:
   - Choose Amazon Ubuntu
   - Select t2.micro (free tier eligible)
   - Configure security group to allow:
     - SSH (Port 22)
     - HTTP (Port 80)
     - HTTPS (Port 443)
     - Custom TCP (Port 3000 for Node.js)

2. Connect to your EC2 instance:
```bash
ssh -i "your-key-pair.pem" ec2-user@your-ec2-public-dns
```

## Step 3: Install Required Software
Run the following commands on your EC2 instance:

```bash
# Update system packages
sudo apt update -y

# Install Apache2
sudo apt install apache2 -y

# Install Node.js
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
. ~/.nvm/nvm.sh
nvm install 16
nvm use 16

# Install Git
sudo apt install git -y

# Install MySQL client
sudo apt install mysql -y
```

## Step 4: Clone and Set Up the Project
```bash
# Clone the repository
git clone https://github.com/anantham4361/bloodbank.git
cd bloodbank

# Install backend dependencies
cd backend
npm install

# Configure database connection
# Edit config/db.js with RDS endpoint and credentials
```

## Step 5: Configure Apache for Frontend
```bash
# Copy frontend files to Apache root directory
sudo cp -r ../frontend/* /var/www/html/

# Configure environment variables
# Edit frontend/env.js with appropriate API endpoint
```

## Step 6: Set Up and Start the Backend
```bash
# Create a PM2 process (for keeping Node.js running)
cd backend
node server.js
```

## Step 7: Initialize the Database
```bash
# Connect to RDS and run setup script
mysql -h your-rds-endpoint -u admin -p
Enter your password:
source setup-database.sql
```

## Step 8: Final Configuration
1. Create .env file in /backend
```bash
cd /backend/
sudo nano .env
```

2. Update `backend/.env` with RDS connection details:
```
PORT=3000
DB_HOST=<your amazon endpoint>
DB_USER=admin
DB_PASSWORD=<your secure password>
DB_NAME=bloodbank
```

## Accessing the Application
- Frontend: `http://your-ec2-public-ip`
- Backend API: `http://your-ec2-public-ip:3000`
