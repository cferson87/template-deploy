# ClickUp Template Application

An AI-driven application to automate the process of clicking through and saving each template in the "Process Library" space of ClickUp, streamlining template management.

## 📊 Stakeholder Documentation

**Live Documentation Portal:** [https://cferson87.github.io/template-deploy/](https://cferson87.github.io/template-deploy/)

View comprehensive project information including business value, timeline, features, and success metrics. Updated throughout development.

## Features

- **Automated Template Processing**: Uses AI to navigate through each template in the "Process Library" and save them
- **Simple Interface**: Intuitive React interface for selecting teams and lists
- **ClickUp Integration**: Direct integration with ClickUp API v2
- **Real-time Feedback**: Live updates on processing status

## Tech Stack

- **Frontend**: React 18 with modern hooks
- **Backend**: Node.js with Express
- **API**: ClickUp API v2
- **Styling**: Custom CSS with OuterBox Design branding

## Project Structure

```
src/
├── frontend/        # UI components and pages
├── backend/         # API and ClickUp integration
├── ai/             # AI automation logic
└── utils/          # Shared utilities

config/             # Configuration files
docs/               # Documentation
tests/              # Unit and integration tests
```

## Getting Started

### Quick Start

1. **Get your ClickUp API Token**
   - Go to ClickUp Settings > Apps > API Token
   - Generate and copy your token

2. **Backend Setup**
   ```bash
   cd "Template Deploy/src/backend"
   npm install
   cp .env.example .env
   # Add your ClickUp API token to .env
   npm run dev
   ```

3. **Frontend Setup** (in a new terminal)
   ```bash
   cd "Template Deploy/src/frontend"
   npm install
   npm start
   ```

4. **Open** http://localhost:3000

📖 **Full Setup Guide**: See [SETUP.md](./SETUP.md) for detailed instructions and troubleshooting.

## Current Status

✅ Phase 1: Project Setup - Complete
✅ Phase 2: Core Development - In Progress
- ✅ Backend API with ClickUp integration
- ✅ Frontend interface for team/list selection
- 🔄 Template processing logic (next)
- ⏳ AI automation engine

## License

(License information coming soon)
