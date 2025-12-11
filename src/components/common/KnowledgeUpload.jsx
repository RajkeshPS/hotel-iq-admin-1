// ==================== src/components/common/KnowledgeUpload.jsx ====================
import React, { useState } from 'react';
import { Card, CardContent, Stack, Box, Typography, Chip, Divider, TextField, Alert } from '@mui/material';
import { Upload } from '@mui/icons-material';

export default function KnowledgeUpload({ onUpload }) {
  const [uploadStatus, setUploadStatus] = useState('');

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setUploadStatus('uploading');
    try {
      await onUpload(file);
      setUploadStatus('success');
      e.target.value = '';
      setTimeout(() => setUploadStatus(''), 3000);
    } catch (error) {
      setUploadStatus('error');
    }
  };

  return (
    <Card sx={{ mt: 4 }}>
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="start" mb={2}>
          <Box>
            <Typography variant="h6" fontWeight="bold" gutterBottom>🏨 Hotel Knowledge Base</Typography>
            <Typography variant="body2" color="text.secondary">
              Upload text files with menus, WiFi passwords, or policy updates
            </Typography>
          </Box>
          <Chip label="AI Context" color="primary" size="small" />
        </Stack>
        <Divider sx={{ my: 2 }} />
        <Stack direction="row" spacing={2} alignItems="center">
          <TextField type="file" fullWidth inputProps={{ accept: '.txt' }} onChange={handleFileChange} />
          <Upload color="action" />
        </Stack>
        {uploadStatus && (
          <Alert severity={uploadStatus === 'success' ? 'success' : uploadStatus === 'error' ? 'error' : 'info'} sx={{ mt: 2 }}>
            {uploadStatus === 'success' && '✅ Knowledge Base Updated!'}
            {uploadStatus === 'error' && '❌ Upload failed'}
            {uploadStatus === 'uploading' && 'Uploading...'}
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}