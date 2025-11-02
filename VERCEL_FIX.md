# Vercel Deployment Fix Guide

## Problem
Your app is stuck on "Initializing Neural Network..." because it cannot connect to the backend server.

## Root Causes

### 1. **Environment Variables Not Configured on Vercel**
   - `.env.local` is NOT deployed to Vercel (it's git-ignored)
   - You must manually add environment variables in Vercel dashboard

### 2. **Render Free Tier Sleep Mode**
   - Your backend on Render (free tier) sleeps after 15 minutes of inactivity
   - First request can take 30-60 seconds to wake up
   - This causes the WebSocket connection to timeout

## Solutions

### Quick Fix: Configure Environment Variables on Vercel

1. **Go to your Vercel Project Dashboard**
   - Visit: https://vercel.com/dashboard
   - Select your project

2. **Add Environment Variables**
   - Go to: Settings → Environment Variables
   - Add the following variables:

   ```
   Name: NEXT_PUBLIC_BACKEND_URL
   Value: https://nexus2-0.onrender.com
   
   Name: NEXT_PUBLIC_WS_URL
   Value: wss://nexus2-0.onrender.com
   ```

3. **Redeploy**
   - After adding variables, trigger a new deployment
   - Either push a new commit or use the "Redeploy" button

### Alternative Solutions

#### Option A: Check if Backend is Running

1. Open a new browser tab and visit:
   ```
   https://nexus2-0.onrender.com/api/health
   ```

2. If you see a timeout or error:
   - Your Render backend is sleeping
   - Wait 30-60 seconds for it to wake up
   - Refresh your frontend

#### Option B: Use Render Paid Tier
- Upgrade to Render's paid tier ($7/month)
- This keeps your backend always running
- No cold start delays

#### Option C: Wake Up Backend with Cron Job
- Use a free service like UptimeRobot or Cron-job.org
- Ping your backend every 5-10 minutes
- Prevents it from sleeping

### What I've Fixed in the Code

I've updated the frontend to:

1. **Show Better Error Messages**
   - After 10 seconds, if no connection, show detailed error
   - Display backend URL being used
   - Explain possible issues

2. **Add Retry Button**
   - Users can retry connection manually
   - Helps after backend wakes up from sleep

3. **Show Connection Status**
   - Clear indicators in sidebar
   - Real-time connection state

## Testing Steps

1. **Verify Environment Variables**
   ```bash
   # Check if variables are set in Vercel
   # Go to: Settings → Environment Variables
   ```

2. **Test Backend Health**
   ```bash
   # In browser or terminal
   curl https://nexus2-0.onrender.com/api/health
   ```

3. **Check Browser Console**
   - Open DevTools (F12)
   - Check Console tab for errors
   - Look for WebSocket connection messages

## Expected Behavior

### First Load (Cold Start)
1. Shows "Initializing Neural Network..." (0-10 seconds)
2. Backend wakes up (10-60 seconds on Render free tier)
3. Connection established
4. Dashboard loads

### Subsequent Loads (When Backend is Awake)
1. Shows "Initializing Neural Network..." (1-3 seconds)
2. Connection established quickly
3. Dashboard loads

## Common Errors and Solutions

### Error: "Connection Failed"
**Solution**: 
- Check if environment variables are set in Vercel
- Verify backend is running
- Wait for backend to wake up

### Error: "WebSocket connection error"
**Solution**:
- Ensure `NEXT_PUBLIC_WS_URL` uses `wss://` (not `ws://`)
- Check CORS settings on backend

### Error: Still shows loading after 1 minute
**Solution**:
- Backend might be having issues
- Check Render logs
- Try redeploying backend

## Verification Checklist

- [ ] Environment variables added to Vercel dashboard
- [ ] Both variables start with `NEXT_PUBLIC_`
- [ ] Backend URL uses `https://`
- [ ] WebSocket URL uses `wss://`
- [ ] Redeployed after adding variables
- [ ] Backend health endpoint responds
- [ ] No errors in browser console

## Support

If issues persist:
1. Check Render logs for backend errors
2. Verify CORS is configured correctly on backend
3. Test with a different browser
4. Clear browser cache and cookies

## Next Steps

1. **Immediate**: Add environment variables to Vercel
2. **Short-term**: Consider Render paid tier for better reliability
3. **Long-term**: Implement backend health monitoring
