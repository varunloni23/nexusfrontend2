'use client'

import { Box, Container, Paper, Typography, Alert } from '@mui/material';

export default function DebugEnvPage() {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper sx={{ p: 4, background: '#1A1F2E' }}>
        <Typography variant="h4" gutterBottom sx={{ color: '#00E5FF', mb: 3 }}>
          🔍 Environment Debug Page
        </Typography>
        
        <Alert severity="info" sx={{ mb: 3 }}>
          This page shows the environment variables being used by your frontend.
        </Alert>

        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" sx={{ color: '#40C4FF', mb: 2 }}>
            Backend Configuration:
          </Typography>
          
          <Paper sx={{ p: 2, background: '#0A0E1A', mb: 2 }}>
            <Typography variant="body2" sx={{ color: '#A0AEC0', mb: 1 }}>
              <strong>NEXT_PUBLIC_BACKEND_URL:</strong>
            </Typography>
            <Typography variant="body1" sx={{ color: '#00E5FF', fontFamily: 'monospace' }}>
              {process.env.NEXT_PUBLIC_BACKEND_URL || '❌ NOT SET (using fallback)'}
            </Typography>
          </Paper>

          <Paper sx={{ p: 2, background: '#0A0E1A', mb: 2 }}>
            <Typography variant="body2" sx={{ color: '#A0AEC0', mb: 1 }}>
              <strong>NEXT_PUBLIC_WS_URL:</strong>
            </Typography>
            <Typography variant="body1" sx={{ color: '#00E5FF', fontFamily: 'monospace' }}>
              {process.env.NEXT_PUBLIC_WS_URL || '❌ NOT SET (using fallback)'}
            </Typography>
          </Paper>

          <Paper sx={{ p: 2, background: '#0A0E1A', mb: 2 }}>
            <Typography variant="body2" sx={{ color: '#A0AEC0', mb: 1 }}>
              <strong>NODE_ENV:</strong>
            </Typography>
            <Typography variant="body1" sx={{ color: '#FFB74D', fontFamily: 'monospace' }}>
              {process.env.NODE_ENV || 'not set'}
            </Typography>
          </Paper>
        </Box>

        <Alert severity="warning" sx={{ mt: 3 }}>
          <Typography variant="body2">
            <strong>Expected values:</strong>
            <br />
            NEXT_PUBLIC_BACKEND_URL = https://nexus2-0.onrender.com
            <br />
            NEXT_PUBLIC_WS_URL = wss://nexus2-0.onrender.com
            <br /><br />
            If you see "❌ NOT SET", go to Vercel Dashboard → Settings → Environment Variables and add them.
          </Typography>
        </Alert>

        <Alert severity="info" sx={{ mt: 2 }}>
          <Typography variant="body2">
            After adding/updating environment variables in Vercel, you must:
            <br />
            1. Trigger a redeploy (push a new commit or use Redeploy button)
            <br />
            2. Wait 2-3 minutes for the build to complete
            <br />
            3. Hard refresh this page (Ctrl+Shift+R or Cmd+Shift+R)
          </Typography>
        </Alert>
      </Paper>
    </Container>
  );
}
