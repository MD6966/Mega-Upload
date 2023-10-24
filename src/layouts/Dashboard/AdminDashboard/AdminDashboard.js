import { Box, Drawer, styled, useTheme } from '@mui/material';
import React from 'react'
import TopBar from './components/Header/TopBar';
import Nav from './components/NavBar';
import { Outlet } from 'react-router';
const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;
const StyledRoot = styled('div')({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden',
});

const Main = styled('div')(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '100vh',
  background:'#e2e2e2',
  // paddingTop: APP_BAR_MOBILE + 24,
  // paddingBottom: theme.spacing(10),
  [theme.breakpoints.up('lg')]: {
    // paddingTop: APP_BAR_DESKTOP - 30,
    // paddingLeft: theme.spacing(2),
    // paddingRight: theme.spacing(2),
  },
}));
const AdminDashboard = () => {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme()
  return (
    <div>
       <StyledRoot>
        <Box sx={{
          [theme.breakpoints.up('lg')]: {
            display:'none'
          }
        }}>
      <TopBar  onOpenNav={() => setOpen(true)}  />
        </Box>
      <Nav openNav={open} onCloseNav={() => setOpen(false)} />
      <Main>
        <Outlet />
      </Main>
    </StyledRoot>
    </div>
  )
}

export default AdminDashboard
