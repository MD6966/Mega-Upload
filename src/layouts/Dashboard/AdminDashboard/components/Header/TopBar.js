import { AppBar, Toolbar, styled, Typography, Stack, Avatar, Box, Menu, MenuItem, 
    Container, Divider, List, ListItemIcon, ListItemText, ListItem, Button, IconButton, TextField, InputAdornment, OutlinedInput, InputLabel, FormControl, Badge } from '@mui/material';
import React, {useState, useRef} from 'react'
import {bgBlur} from './../../../../../utils/cssStyles'
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import SearchIcon from '@mui/icons-material/Search';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
const NAV_WIDTH = 280;

const HEADER_MOBILE = 54;

const HEADER_DESKTOP = 62;

const StyledRoot = styled(AppBar)(({theme})=> ({
    ...bgBlur({color: theme.palette.background.default}),
    [theme.breakpoints.up('lg')]: {
        width: `calc(100% - ${NAV_WIDTH + 1}px)`,
      },
  
  }))
  const StyledToolbar = styled(Toolbar)(({theme})=> ({
    minHeight: HEADER_MOBILE,
    [theme.breakpoints.up('lg')]: {
        minHeight: HEADER_DESKTOP,
        padding: theme.spacing(0, 5),
        display:'flex',
        justifyContent:'space-between'
      },
   }))
const TopBar = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const [openNotifications, setOpenNotifications] = useState(false);
    const notificationsRef = useRef(null);
    const notifications = [

    ]

    const handleAvatarClick =(event) => {
        setAnchorEl(event.currentTarget);
    
      }
      const handleClose = () => {
        setAnchorEl(null);
    
      }
      const handleNotificationsOpen = () => {
        setOpenNotifications(true);
      };
    
      const handleNotificationsClose = () => {
        setOpenNotifications(false);
      };
  return (
    <div>
    <StyledRoot >
      <StyledToolbar>
        <Typography sx={{color:'#000000', fontWeight:800, fontSize:'1.5rem'}}>
         {location.pathname == '/admin/dashboard' ? 'Dashboard' :
         location.pathname == '/admin/leaderboard' ? 'LeaderBoard' :
         location.pathname == '/admin/order' ? 'Orders' : 'Dashboard'

         }
        </Typography>
        <Box>
        <FormControl sx={{ m: 1, width:'400px'}} variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password"> Search</InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          startAdornment={
            <InputAdornment position="start">
                <SearchIcon />
            </InputAdornment>
          }
          label="Search"
          size='small'
          placeholder='Search here.....'
          sx={{borderRadius:'10px', background:'#f7f7f7'}}
        />
      </FormControl> 
        </Box>
        <Box />
        <Stack
        direction="row"
        alignItems="center"
        spacing={{
          xs:0.5,
          sm:1
        }}
        >
          <IconButton
          onClick={handleNotificationsOpen}
          ref={notificationsRef}
          >
            <Badge badgeContent={102}  color="primary">
            <NotificationsNoneIcon sx={{color:'#bc9000', fontSize:'2rem'}} /> 
            </Badge>
          </IconButton>
          <Box sx={{display:'flex', alignItems:'center'}}>
            <Avatar src="/assets/images/admin.png" sx={{cursor:'pointer',}} onClick={handleAvatarClick}/>
            <Box>
            <Typography sx={{color:'#000',mb:-0.5}}> Mudasser</Typography>
            <Typography sx={{color:'#000', fontSize:'12px', fontWeight:'bold'}}>Admin </Typography>
            </Box>
            <IconButton>
                <ArrowDropDownIcon />
            </IconButton>
          </Box>
        </Stack>

      </StyledToolbar>
  </StyledRoot>
  </div>
  )
}

export default TopBar
