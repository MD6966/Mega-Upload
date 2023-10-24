import { AppBar, Toolbar, styled, Typography, Stack, Avatar, Box, Menu, MenuItem, 
    Container, Divider, List, ListItemIcon, ListItemText, ListItem, Button, IconButton, TextField, InputAdornment, OutlinedInput, InputLabel, FormControl, Badge, Drawer, ListItemButton } from '@mui/material';
import React, {useState, useRef} from 'react'
import {bgBlur} from './../../../../../utils/cssStyles'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { makeStyles } from '@mui/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SettingsIcon from '@mui/icons-material/Settings';
import CloudIcon from '@mui/icons-material/Cloud';
import InfoIcon from '@mui/icons-material/Info';
import clsx from 'clsx'
import { Link } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { logOutAdmin } from '../../../../../store/actions/adminActions';

const NAV_WIDTH = 280;

const HEADER_MOBILE = 54;

const HEADER_DESKTOP = 62;

const useStyles = makeStyles((theme) => ({
  selected: {
    background: "#474bd1",
    borderRadius: 10,
  },
  icon: {
    marginLeft: "auto",
  },
  drawer: {},
  btn: {},
}));

const StyledRoot = styled(AppBar)(({theme})=> ({
    background:'#000',
    // ...bgBlur({color: '#000'}),
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
   const ListData = [
    {
      id: 1,
      title: "Upload File",
      icon: <CloudUploadIcon />,
      // to: "/user/upload",
    },
    {
        id: 2,
        title: "My Uploads",
        icon: <CloudIcon />,
        // to: "/user/uploads",
      },
    {
      id: 3,
      title: "Settings",
      icon: <SettingsIcon />,
      // to: "/user/profile",
    },
    {
      id:4,
      title:"Account Info",
      icon: <InfoIcon />
    }
  ];
const TopBar = () => {
  const classes = useStyles()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const [openDrawer, setOpenDrawer] = React.useState(false)
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [selectedIndex, setSelectedIndex] = React.useState(1);
    const open = Boolean(anchorEl);
    const [openNotifications, setOpenNotifications] = useState(false);
    const notificationsRef = useRef(null);
    const user = useSelector((state)=>state.auth.user)

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
      const handleSignOut = () => {
        setOpenDrawer(false)
        confirmAlert({
            title: 'Log Out',
            message: 'Are you sure to log out ?',
            buttons:[
              {
                label: 'Yes',
                onClick: ()=>{
                  dispatch(logOutAdmin())
                  navigate('/',{ replace: true})
                }
              },
             {
              label: 'No',
             }
      
            ]
          })
    }
      const handleListItemClick = (event, index) => {
        // if (index === 4) {
        //   handleInfo();
        // }
        setSelectedIndex(index);
        // setOpenD(false);
      };
      const renderContent = (
        <Box
          sx={{
            height: 1,
            '& .simplebar-content': { height: 1, display: 'flex', flexDirection: 'column' },
          }}
        >
          <Box sx={{ px: 2.5, py: 3,  }}>
          <Box sx={{display:'flex',justifyContent:'center'}}>
                          <Avatar sx={{
                            height:'70px',
                            width:'70px',
                          }} 
                          src="/assets/images/admin.png"
                          />
                          </Box>
          </Box>
          <Box sx={{p:2}}>
          <List component="nav">
                  {ListData.map((val) => {
                    return (
                      <>
                      <ListItem
                            key={val}
                            disablePadding
                            className={clsx(classes.root, {
                              [classes.selected]: selectedIndex === val.id,
                            })}
                            component={Link}
                            to={val.to}
                            sx={{mb:2}}
                          >
                            <ListItemButton
                              selected={selectedIndex === val.id}
                              onClick={(event) =>
                                handleListItemClick(event, val.id)
                              }
                              sx={{
                                  "&:hover": {
                                    borderRadius: "10px",
                                    backgroundColor: "#686868"
                                  },
                                }}
                            >
                              <ListItemIcon
                                sx={{
                                  color:
                                    selectedIndex === val.id ? "#fff" : "#fff",
                                }}
                              >
                                {val.icon}
                              </ListItemIcon>
                              <ListItemText
                                primary={val.title}
                                sx={{
                                  color:
                                    selectedIndex === val.id ? "#fff" : "#fff",
                                }}
                              />
                            </ListItemButton>
                          </ListItem>    
                      
                      </>
                    );
                  })}
                </List>
          <Button variant='contained' fullWidth
                onClick={handleSignOut}
                // endIcon={
                //   <ExitToAppIcon />
                // } 
                sx={{
                  mt:3, 
                  background:'#f7f7f7', 
                  color:'#000',
                  '&:hover' : {
                    background:'#e2e2e2',
                  }
                  }}>
                  Log Out
                </Button>
                  </Box>  
          <Box sx={{ flexGrow: 1 }} />
  
          
        </Box>
      );
  return (
    <div>
    <StyledRoot >
      <StyledToolbar>
        <Typography sx={{color:'#fff', fontWeight:800, fontSize:'1.5rem'}}>
         {location.pathname == '/admin/dashboard' ? 'Dashboard' :
         location.pathname == '/admin/leaderboard' ? 'LeaderBoard' :
         location.pathname == '/admin/order' ? 'Orders' : 'Dashboard'
         }
        </Typography>
        <Stack
        direction="row"
        alignItems="center"
        sx={{ml:'auto'}}
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
            <Typography sx={{color:'#fff',mb:-0.5}}> Mudasser</Typography>
            <Typography sx={{color:'#fff', fontSize:'12px', fontWeight:'bold'}}>Admin </Typography>
            </Box>
            <IconButton onClick={()=>setOpenDrawer(true)}>
                <MenuIcon sx={{color:'#fff',  ml:1}}/>
            </IconButton>
          </Box>
        </Stack>

      </StyledToolbar>
      <Drawer variant='temporary' open={openDrawer} onClose={()=>setOpenDrawer(false)}
       PaperProps={{
        sx: {
          bgcolor: '#353B48',
          width:'280px'
        },
      }}
      >
          <IconButton 
          onClick={()=>setOpenDrawer(false)}
          style={{ alignSelf: 'flex-end', paddingRight: '18px', 
          paddingTop: '8px', fontSize:'1.5rem', color:'#fff' }}>
            <CloseIcon />
          </IconButton>
          {renderContent}
      </Drawer>
  </StyledRoot>
  </div>
  )
}

export default TopBar
