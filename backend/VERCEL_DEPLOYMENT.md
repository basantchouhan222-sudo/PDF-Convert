# Vercel Deployment Guide

## Prerequisites
- Vercel account (free account works fine)
- Git repository with your code

## Steps to Deploy on Vercel

### 1. Install Vercel CLI
```bash
npm install -g vercel
```

### 2. Prepare Backend for Deployment
The backend has already been configured with:
- `vercel.json` - Configuration for Vercel
- Serverless function in `/api` directory
- Temporary file storage using system temp directory (compatible with Vercel's ephemeral filesystem)

### 3. Deploy to Vercel
```bash
# From the backend directory
cd backend
vercel
```

### 4. Follow Vercel Setup Prompts
- Link to your Vercel project
- Select project settings
- Deploy

### 5. Environment Variables
Set these in Vercel Dashboard -> Settings -> Environment Variables:
```
NODE_ENV=production
```

### 6. Get Your Backend URL
After deployment, Vercel will provide your backend URL like:
```
https://your-project-name.vercel.app
```

### 7. Update Frontend
Update your frontend API calls to use the Vercel backend URL:
```javascript
// In your frontend API service
const API_URL = 'https://your-project-name.vercel.app/api';
```

## Important Notes
- File uploads use system temporary directory (not persistent)
- Maximum request size: 4.5MB (free tier) / configurable (pro)
- Function timeout: 60 seconds (default, up to 900 for pro)
- Cold starts may take a few seconds

## Troubleshooting
- Check Vercel deployment logs for errors
- Ensure all dependencies are in package.json
- Use `.vercelignore` to exclude unnecessary files (already configured)
