import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Typography } from '@mui/material'
import axios from 'axios'
import React from 'react'

const UserLocation = (props) => {
   const {data} = props
   console.log(data)
  return (
    <div>
      <Dialog open={props.open} onClose={props.close} fullWidth>
            <DialogTitle>
                Your Account Information
            </DialogTitle>
            <Divider />
            <DialogContent>
                <Box sx={{display:'flex', justifyContent:'space-between'}}>
                <Typography variant='h6' fontWeight="bold">
                    Your Country: 
                    <Typography>
                        {data.country_name}
                    </Typography>
                </Typography>
                <Typography variant='h6' fontWeight="bold">
                    Your Ipv4 Address: 
                    <Typography>
                        {data.IPv4}
                    </Typography>
                </Typography>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button variant='contained' onClick={props.close}>Ok</Button>
            </DialogActions>
      </Dialog>
    </div>
  )
}

export default UserLocation
