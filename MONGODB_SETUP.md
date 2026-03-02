# MongoDB Setup Guide for CareerViewX

## Installation Steps

### 1. Download & Install MongoDB
1. Visit: https://www.mongodb.com/try/download/community
2. Select Version: 7.0 or latest
3. Platform: Windows
4. Package: MSI
5. Download and run the installer
6. During installation:
   - Choose "Complete" installation
   - Install MongoDB as a Service ✅ (IMPORTANT)
   - Service Name: MongoDB
   - Data Directory: C:\Program Files\MongoDB\Server\7.0\data
   - Log Directory: C:\Program Files\MongoDB\Server\7.0\log

### 2. Verify Installation

Open PowerShell as Administrator and run:
```powershell
# Check MongoDB service status
Get-Service -Name "MongoDB"

# Start MongoDB service if not running
Start-Service -Name "MongoDB"

# Verify MongoDB is running
mongod --version
```

### 3. Test Connection

```powershell
# Connect to MongoDB shell
mongosh
```

If successful, you should see:
```
Current Mongosh Log ID: ...
Connecting to: mongodb://127.0.0.1:27017/
```

Type `exit` to leave the shell.

### 4. Start Your CareerViewX Server

```powershell
cd D:\SGP\careerviewx\server
node server.js
```

You should see:
```
✅ MongoDB Connected Successfully
🚀 Server running on port 5000
```

## Alternative: Use MongoDB Atlas (Cloud Database)

If you prefer not to install MongoDB locally:

1. Visit: https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a free cluster (M0)
4. Get your connection string
5. Update `server/.env`:
   ```
   MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/careerviewx
   ```

## Troubleshooting

### MongoDB Service Not Starting
```powershell
# Check logs
Get-Content "C:\Program Files\MongoDB\Server\7.0\log\mongod.log" -Tail 20
```

### Port 27017 Already in Use
```powershell
# Find what's using port 27017
netstat -ano | findstr :27017

# Stop the process (replace PID with actual process ID)
Stop-Process -Id <PID> -Force
```

### Add MongoDB to PATH (if commands not found)
1. Search "Environment Variables" in Windows
2. Edit System Environment Variables
3. Add to Path: `C:\Program Files\MongoDB\Server\7.0\bin`
4. Restart PowerShell

## Quick Start Commands

```powershell
# Start MongoDB service
Start-Service -Name "MongoDB"

# Stop MongoDB service
Stop-Service -Name "MongoDB"

# Check service status
Get-Service -Name "MongoDB"

# Start backend server
cd D:\SGP\careerviewx\server
node server.js

# Start frontend (in new terminal)
cd D:\SGP\careerviewx
npm start
```
