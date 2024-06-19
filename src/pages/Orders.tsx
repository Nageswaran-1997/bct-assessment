import React from 'react'
import {Paper, Typography, Avatar} from '@mui/material';


const Orders: React.FC = () => {
  return (
    <div>
    <Paper style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 10, marginBottom: 20, }}>
      <Typography variant="h6">Orders</Typography>
      <Avatar/>
    </Paper>
    </div>
  )
}

export default Orders