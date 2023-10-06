import { AppBar, Box, Button, Toolbar } from '@mui/material'
import React from 'react'
import Page from '../../components/page/page'
import { ExitToApp } from '@mui/icons-material'
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { useDispatch } from 'react-redux';
import { logOut } from '../../store/actions/authActions';
import { useNavigate } from 'react-router';
const HomePage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleLogOut = () => {
        confirmAlert({
            title: "Log Out",
            message: "Are you sure to log out ?",
            buttons: [
              {
                label: "Yes",
                onClick: () => {
                  dispatch(logOut());
                  navigate("/", { replace: true });
                },
              },
              {
                label: "No",
              },
            ],
          });
    }
  return (
    <Page
    title="Homepage"
    >
      <AppBar position='static'>
        <Toolbar>
            Homepage
            <Box sx={{ml:'auto'}}>
                <Button 
                onClick={handleLogOut}
                variant='contained' endIcon={
                    <ExitToApp />
                }>
                    Sign Out
                </Button>
            </Box>
        </Toolbar>
      </AppBar>
      <Box>
        Welcome to home page 
      </Box>
    </Page>
  )
}

export default HomePage
