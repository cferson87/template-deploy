# Setup Guide - ClickUp Template Application

This guide will walk you through setting up the development environment for the ClickUp Template Application.

## Prerequisites

- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)
- **ClickUp API Token** - [Get your token](https://app.clickup.com/settings/apps)

## Project Structure

```
src/
├── backend/          # Node.js/Express API server
│   ├── server.js     # Main server file
│   ├── package.json  # Backend dependencies
│   ├── .env          # Environment variables (you'll create this)
│   ├── api/
│   │   └── routes/   # API route definitions
│   └── services/
│       └── clickup/  # ClickUp API integration
└── frontend/         # React application
    ├── package.json  # Frontend dependencies
    ├── public/       # Static files
    └── src/          # React components
        ├── App.js
        ├── components/
        └── index.js
```

## Getting Your ClickUp API Token

1. Log in to your ClickUp account
2. Go to **Settings** (click your avatar in the bottom-left corner)
3. Click **Apps** in the left sidebar
4. Scroll down to **API Token**
5. Click **Generate** (or **Regenerate** if you already have one)
6. Copy the token - you'll need it in the next step

**Important:** Keep this token secure! Anyone with this token can access your ClickUp data.

## Backend Setup

### 1. Navigate to the backend directory

```bash
cd "Template Deploy/src/backend"
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create environment configuration

Create a `.env` file in the backend directory:

```bash
cp .env.example .env
```

Edit the `.env` file and add your ClickUp API token:

```env
# ClickUp API Configuration
CLICKUP_API_TOKEN=pk_your_actual_token_here

# Server Configuration
PORT=3001
NODE_ENV=development

# CORS Configuration
FRONTEND_URL=http://localhost:3000
```

### 4. Start the backend server

```bash
npm run dev
```

You should see:
```
🚀 ClickUp Template Application - Backend API
Server running on port 3001
Environment: development
Health check: http://localhost:3001/health
```

### 5. Test the backend

Open your browser or use curl:
```bash
curl http://localhost:3001/health
```

You should see:
```json
{
  "status": "ok",
  "timestamp": "2024-...",
  "environment": "development"
}
```

## Frontend Setup

### 1. Open a new terminal and navigate to the frontend directory

```bash
cd "Template Deploy/src/frontend"
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the React development server

```bash
npm start
```

The application should automatically open in your browser at `http://localhost:3000`

## Using the Application

### First Time Setup

1. **Verify Backend Connection:**
   - The frontend should automatically connect to the backend
   - If you see teams loading, you're all set!

2. **Select a Team:**
   - Choose from the dropdown which team (workspace) you want to work with
   - This will load all available lists from that team

3. **Select a List:**
   - Choose the destination list where templates will be processed
   - Lists are organized by Space and Folder for easy navigation

4. **Process Templates:**
   - Click the "Process Templates" button
   - (Template processing logic to be implemented in next phase)

## Troubleshooting

### Backend won't start

**Error:** `CLICKUP_API_TOKEN is not set`
- **Solution:** Make sure you created the `.env` file and added your API token

**Error:** `Port 3001 is already in use`
- **Solution:** Either stop the process using port 3001, or change the PORT in `.env`

### Frontend can't connect to backend

**Error:** `Failed to connect to server`
- **Solution:** Make sure the backend is running on port 3001
- Check that `http://localhost:3001/health` returns a response

### No teams showing up

**Error:** `No teams found`
- **Solution:** Verify your ClickUp API token is correct
- Check that your ClickUp account has access to at least one workspace/team
- Look at the backend console for error messages

### Lists not loading

**Error:** `Failed to fetch lists`
- **Solution:** Make sure you selected a team first
- Check the backend console for API errors
- Verify your API token has permission to access lists

## Development Workflow

### Running Both Servers

You'll need two terminal windows:

**Terminal 1 - Backend:**
```bash
cd "Template Deploy/src/backend"
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd "Template Deploy/src/frontend"
npm start
```

### Making Changes

- **Backend changes:** Server will automatically restart (using nodemon)
- **Frontend changes:** Page will automatically reload (using React's hot reload)

### Stopping the Servers

Press `Ctrl + C` in each terminal to stop the servers.

## Next Steps

Once you have both servers running and can see your ClickUp teams and lists:

1. ✅ Backend API is working
2. ✅ Frontend is connected
3. ✅ ClickUp integration is functioning
4. 🔜 Ready to implement template processing logic!

## Need Help?

- Check the backend console for detailed error messages
- Check the browser console (F12 > Console) for frontend errors
- Review the API endpoints in `src/backend/api/routes/clickupRoutes.js`
- Check ClickUp API documentation: https://clickup.com/api

## Security Notes

- **Never commit your `.env` file** to git (it's already in `.gitignore`)
- **Never share your API token** publicly
- For production, use OAuth instead of API tokens
- Keep your dependencies updated for security patches
