import React from 'react'
import Page from '../../../components/page'
import { Avatar, Box, Button, DialogActions, DialogContent, DialogTitle, Divider, Grid, Typography, styled, useTheme } from '@mui/material';
import { useSelector } from 'react-redux';
import EditIcon from '@mui/icons-material/Edit';
import EditProfileInfo from './components/EditProfileInfo';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { Link } from 'react-router-dom';
const StyledRoot = styled(Box)(({ theme }) => ({
  padding: theme.spacing(6),
  // [theme.breakpoints.down('sm')]: {
  //   padding: theme.spacing(2)
  // }
}));
const StyledGrid = styled(Grid)(({theme})=>({
        height:'70vh', 
        borderRadius:'5px',
        boxShadow:'2px 2px 5px #000'
}))
const ProfilePage = () => {
  const user = useSelector((state)=>state.auth.user)
  // console.log(user)
  const [open, setOpen] = React.useState(false)
  const theme = useTheme()
  return (
    <Page title="Profile">
      <StyledRoot>
        <StyledGrid container>
          <Grid item xs={12} md={5} lg={4}
          sx={{
            borderRight:'1px solid #bababa',
            background: 'linear-gradient(to top, #353B48, #a5a5a5)',
            display:'flex',
            justifyContent:'center',
            alignItems:'center'
          }}
          >
            <Box sx={{mt:-4}}>
              <Divider sx={{mb:1, [theme.breakpoints.down('md')]:{display:'none'}}}/>
            <Box sx={{display:'flex', justifyContent:'center'}}>
                <Avatar sx={{
                  height:'130px', 
                  width:'130px',
                  [theme.breakpoints.down('md')]: {
                    mt:-4,
                    mb:2,
                    border:'6px solid white',
                    height:'100px', 
                  width:'100px',
                  }
                  }} 
                  src={user.profile_image}/>
            </Box>
            <Typography sx={{
                  fontFamily:'Bebas Neue', 
                  textAlign:'center', 
                  fontSize:'2.5rem', 
                  color:'#fff',
                  textShadow:'2px 2px 5px #000',
                  mt:-1,
                  [theme.breakpoints.down('sm')]: {
                    fontSize:'1.75rem'
                  }
                }}> {user.name} </Typography>
              <Divider sx={{mt:1, [theme.breakpoints.down('md')]:{display:'none'}}} />
                </Box>
          </Grid>
          <Grid item xs={12} md={7} lg={8} sx={{background:'#f7f7f7'}}>
              <DialogTitle>
                <Typography variant='h6' fontWeight="bold">
                  Personal Information
                </Typography>
              </DialogTitle>
              <Box sx={{px:2}}>
              <Divider />
              </Box>
            <DialogContent>
              <Grid container spacing={4}>
                <Grid item xs={6} md={4} lg={4}>
                  <Typography fontWeight="bold" variant='h6'>
                    Name
                  </Typography>
                  <Typography sx={{
                    mt:1,
                    fontWeight:'bold',
                    color:'#5e5e5e'
                  }}>
                    {user.name}
                  </Typography>
                </Grid>
                <Grid item xs={6} md={4} lg={4}>
                <Typography fontWeight="bold" variant='h6'>
                    Email
                  </Typography>
                  <Typography sx={{
                    mt:1,
                    fontWeight:'bold',
                    color:'#5e5e5e'
                  }}>
                    {user.email}
                  </Typography>
                </Grid>
                <Grid item xs={6} md={4} lg={4}>
                <Typography fontWeight="bold" variant='h6'>
                    Phone
                  </Typography>
                  <Typography sx={{
                    mt:1,
                    fontWeight:'bold',
                    color:'#5e5e5e'
                  }}>
                    -&nbsp;-&nbsp;-&nbsp;-&nbsp;-&nbsp;-
                  </Typography>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogTitle>
                <Typography variant='h6' fontWeight="bold">
                  Your Revenue
                </Typography>
              </DialogTitle>
              <Box sx={{px:2}}>
              <Divider />
              </Box>
              <DialogContent>
              <Grid container spacing={4}>
                <Grid item xs={6} md={4} lg={4}>
                  <Typography fontWeight="bold" variant='h6'>
                    Current
                  </Typography>
                  <Typography sx={{
                    mt:1,
                    fontWeight:'bold',
                    color:'#5e5e5e'
                  }}>
                    52.05 $
                  </Typography>
                </Grid>
                <Grid item xs={6} md={4} lg={4}>
                <Typography fontWeight="bold" variant='h6'>
                    Last month
                  </Typography>
                  <Typography sx={{
                    mt:1,
                    fontWeight:'bold',
                    color:'#5e5e5e'
                  }}>
                    225.5 $
                  </Typography>
                </Grid>
                <Grid item xs={6} md={4} lg={4}>
                <Typography fontWeight="bold" variant='h6'>
                    Lifetime
                  </Typography>
                  <Typography sx={{
                    mt:1,
                    fontWeight:'bold',
                    color:'#5e5e5e'
                  }}>
                    828.6 $
                  </Typography>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button variant='contained' sx={{mt:3, mr:2}}
              component={Link}
              to="/user/checkout"
              endIcon={
                <AccountBalanceIcon />
              }
              >
                CheckOut
              </Button>
              <Button 
              onClick={()=>setOpen(true)}
              endIcon={
                <EditIcon />
              }
              variant='contained'
              sx={{
                mr:2,
                mt:3
              }}
              >Edit</Button>
            </DialogActions>
          </Grid>
        </StyledGrid>
      </StyledRoot>
      <EditProfileInfo open={open} close={()=>setOpen(false)} user={user} />
    </Page>
  )
}

export default ProfilePage
