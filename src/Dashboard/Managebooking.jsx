import React from 'react'
import { Box, Typography, Button, Paper, Stack } from '@mui/material';

const Managebooking = ({ bookings = [], setBookings }) => {
  
  console.log("Bookings received:", bookings); 

  const updateStatus = (index, status) => {
    const updated = [...bookings];
    updated[index].status = status;
    setBookings(updated);
  
    localStorage.setItem('bookings', JSON.stringify(updated));
  };

  return (
    <div>
      <Box sx={{ p: 4 }}>
        <Typography variant="h4" mb={4}>
          Admin – Booking Requests
        </Typography>

        
        {!bookings || bookings.length === 0 ? (
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Typography color="text.secondary">No bookings found</Typography>
          </Paper>
        ) : (
          bookings.map((b, i) => (
            <Paper key={i} sx={{ p: 2, mb: 2 }}>
              <Typography fontWeight="bold">
                {b.car_name || 'N/A'}
              </Typography>
                                          <Typography>
                Name: {b.name || 'N/A'}
              </Typography>
                            <Typography>
              Mobile: {b.mobile || 'N/A'}
              </Typography>
                                          <Typography>
               Email: {b.email || 'N/A'}
              </Typography>
              <Typography>
                Pickup: {b.pickup || 'N/A'} | Return: {b.returnDate || 'N/A'}
              </Typography>
              <Typography>Status: {b.status || 'Pending'}</Typography>

              {b.status === "Pending" && (
                <Stack direction="row" spacing={2} mt={2}>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={() => updateStatus(i, "Approved")}
                  >
                    Approve
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => updateStatus(i, "Rejected")}
                  >
                    Reject
                  </Button>
                </Stack>
              )}
            </Paper>
          ))
        )}
      </Box>
    </div>
  )
}

export default Managebooking