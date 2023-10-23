import { AppBar, Toolbar, styled, Typography, Stack, Avatar, Box, Menu, MenuItem, 
    Container, Divider, List, ListItemIcon, ListItemText, ListItem, Button, IconButton, TextField, InputAdornment, OutlinedInput, InputLabel, FormControl, Badge, useTheme, Drawer, ListItemButton } from '@mui/material';
import React, {useState, useRef} from 'react'
import {bgBlur} from './../../../../../utils/cssStyles'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import SearchIcon from '@mui/icons-material/Search';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { logOut } from '../../../../../store/actions/authActions';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';
import clsx from 'clsx'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SettingsIcon from '@mui/icons-material/Settings';
import CloudIcon from '@mui/icons-material/Cloud';
import { makeStyles } from '@mui/styles';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import UserLocation from './components/UserLocation';
import axios from 'axios';
import InfoIcon from '@mui/icons-material/Info';
const ListData = [
  {
    id: 1,
    title: "Upload File",
    icon: <CloudUploadIcon />,
    to: "/user/upload",
  },
  {
      id: 2,
      title: "My Uploads",
      icon: <CloudIcon />,
      to: "/user/uploads",
    },
  {
    id: 3,
    title: "Settings",
    icon: <SettingsIcon />,
    to: "/user/profile",
  },
  {
    id:4,
    title:"Account Info",
    icon: <InfoIcon />
  }
];

const NAV_WIDTH = 280;

const HEADER_MOBILE = 54;

const HEADER_DESKTOP = 62;

const StyledRoot = styled(AppBar)(({theme})=> ({
    ...bgBlur({color: theme.palette.background.default}),
    [theme.breakpoints.up('md')]: {
        width: `calc(100% - ${NAV_WIDTH + 1}px)`,
      },
  
  }))
  const StyledToolbar = styled(Toolbar)(({theme})=> ({
    minHeight: HEADER_MOBILE,
    display:'flex',
    justifyContent:'space-between',
    [theme.breakpoints.up('lg')]: {
        minHeight: HEADER_DESKTOP,
        padding: theme.spacing(0, 5),
        display:'flex',
        justifyContent:'space-between'
      },
   }))
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
const TopBar = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const theme = useTheme()
    const classes = useStyles()
    const [openD, setOpenD] = React.useState(false)
    const [openDialog, setOpen] = React.useState(false)
    const [selectedIndex, setSelectedIndex] = React.useState(1);
    const user = useSelector((state)=>state.auth.user)
    // console.log(user)
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const [openNotifications, setOpenNotifications] = useState(false);
    const notificationsRef = useRef(null);
    const [data, setData] = React.useState([])
    const notifications = [

    ]
    const getLocationData = async () => {
      await axios.get('https://geolocation-db.com/json/f2e84010-e1e9-11ed-b2f8-6b70106be3c8').then((result) => {
          setData(result.data)
      }).catch((err) => {
          console.log(err)
      });
  }
  React.useEffect(()=> {
      getLocationData()
  }, [])
  const handleProfile = () => {
    setAnchorEl(null)
    navigate('/user/profile')
  }
  const handleInfo = () => {
    setOpen(true)
  }
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
        setOpenD(false)
        confirmAlert({
            title: 'Log Out',
            message: 'Are you sure to log out ?',
            buttons:[
              {
                label: 'Yes',
                onClick: ()=>{
                  dispatch(logOut())
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
      if (index === 4) {
        handleInfo();
      }
      setSelectedIndex(index);
      setOpenD(false);
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
                        src={user.profile_image}
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
              endIcon={
                <ExitToAppIcon />
              } 
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
        <Typography sx={{color:'#000000', fontWeight:800, fontSize:'1.5rem',}}>
         {location.pathname == '/user/upload' ? 'Upload File' :
         location.pathname == '/user/uploads' ? 'My Uploads' :
         location.pathname == '/admin/order' ? 'Orders' : 'Dashboard'

         }
        </Typography>
        <Box />
        <Stack
        direction="row"
        alignItems="center"
        spacing={{
          xs:0.5,
          sm:1
        }}
        sx={{
          [theme.breakpoints.down('md')]:{
            display:'none'
          }
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
            <Avatar src={user.profile_image} sx={{cursor:'pointer', height:'40px', width:'40px', mr:1}} onClick={handleAvatarClick}/>
            <Box>
            <Typography sx={{color:'#000',mb:-0.5, fontWeight:'bold'}}> {user.name}</Typography>
            </Box>
            <IconButton onClick={handleAvatarClick}>
                <ArrowDropDownIcon />
            </IconButton>
          </Box>
        </Stack>
        <Box 
        sx={{
          [theme.breakpoints.up('md')]: {
            display:'none'
          }
        }}
        >
          <IconButton
          onClick={()=>setOpenD(true)}
          >
            <MenuIcon />
          </IconButton>
        </Box>
        <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleProfile}>Profile</MenuItem>
        <MenuItem onClick={handleInfo}>My Info</MenuItem>
        <MenuItem onClick={handleSignOut}>Logout</MenuItem>
      </Menu>
      </StyledToolbar>
      
      <Drawer variant='temporary' open={openD} onClose={()=>setOpenD(false)}
       PaperProps={{
        sx: {
          bgcolor: '#353B48',
          width:'280px'
        },
      }}
      >
          <IconButton 
          onClick={()=>setOpenD(false)}
          style={{ alignSelf: 'flex-end', paddingRight: '18px', 
          paddingTop: '8px', fontSize:'1.5rem', color:'#fff' }}>
            <CloseIcon />
          </IconButton>
          {renderContent}
      </Drawer>
  </StyledRoot>
  <UserLocation open={openDialog} close={() =>setOpen(false)} data={data} />
  </div>
  )
}

export default TopBar
