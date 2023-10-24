import React,  { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { styled, alpha } from '@mui/material/styles';
import { Box, Button, Drawer, Typography, Avatar, 
    List, ListItem,ListItemButton, ListItemIcon,ListItemText, Divider } from '@mui/material';
import Scrollbar from '../../../../../components/scrollbar';
import useResponsive from '../../../../../components/hooks/useResponsive';
import DashboardIcon from "@mui/icons-material/Dashboard";
import SettingsIcon from '@mui/icons-material/Settings';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx'
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { useDispatch } from 'react-redux';
import { logOutAdmin } from '../../../../../store/actions/adminActions';
const NAV_WIDTH = 280;
const StyledAccount = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(2, 2.5),
    borderRadius: Number(theme.shape.borderRadius) * 1.5,
    backgroundColor: alpha(theme.palette.grey[500], 0.12),
  }));
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
  export default function Nav({ openNav, onCloseNav }) {
    const ListData = [
        {
          id: 1,
          title: "Dashboard",
          icon: <DashboardIcon />,
        //   to: "/admin/dashboard",
        },
        {
          id: 2,
          title: "Settings",
          icon: <SettingsIcon />,
          // to: "/admin/new-invoices",
        },
        // {
        //   id: 3,
        //   title: "Signout",
        //   icon: <ExitToAppIcon />,
        //   to: "/admin/approved-by-admin",
        // },
      ];
  const location = useLocation();
  const [dOpen, setDopen] = React.useState(false);
    const [selectedIndex, setSelectedIndex] = React.useState(1);
    const isDesktop = useResponsive('up', 'lg');
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const classes = useStyles()
    const handleSignOut = () => {
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
    React.useEffect(() => {
        const matchingItem = ListData.find((item) => item.to === location.pathname);
        if (matchingItem) {
          setSelectedIndex(matchingItem.id);
        }
      }, [location.pathname]);
      const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
        setDopen(false);
      };
    useEffect(() => {
      if (openNav) {
        onCloseNav();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location]);
  
    const renderContent = (
      <Scrollbar
        sx={{
          height: 1,
          '& .simplebar-content': { height: 1, display: 'flex', flexDirection: 'column' },
        }}
      >
        <Box sx={{ px: 2.5, py: 3, display: 'inline-flex', }}>
        <Box sx={{display:'flex'}}>
                        <img src='/assets/images/logo.png' alt="logo" />
                        </Box>
        </Box>
        <Box sx={{display:'flex', justifyContent:'center'}}>
            <Avatar
            src="/assets/images/admin.png" 
            sx={{
              height:'100px',
              width:'100px'
            }}
            />
        </Box>
        <Box>
        <Typography sx={{
                  fontFamily:'Bebas Neue', 
                  textAlign:'center', 
                  fontSize:'1.95rem', 
                  color:'#fff',
                  textShadow:'2px 2px 3px #e2e2e2',
                }}>Syed Mudasser </Typography>
                <Typography textAlign="center" sx={{color:'#fff'}}>
                  (Admin)
                </Typography>
        </Box>
        <Box sx={{mt:2}}>
          <Divider sx={{borderColor:'#878787'}}/>
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
                                },
                              }}
                          >
                            <ListItemIcon
                              sx={{
                                color:
                                  selectedIndex === val.id ? "#fff" : "#686868",
                              }}
                            >
                              {val.icon}
                            </ListItemIcon>
                            <ListItemText
                              primary={val.title}
                              sx={{
                                color:
                                  selectedIndex === val.id ? "#fff" : "#686868",
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

        
      </Scrollbar>
    );
  
    return (
      <Box
        component="nav"
        sx={{
          flexShrink: { lg: 0 },
          width: { lg: NAV_WIDTH },
        }}
      >
        {isDesktop ? (
          <Drawer
            open
            variant="permanent"
            PaperProps={{
              sx: {
                width: NAV_WIDTH,
                bgcolor: '#000',
                borderRightStyle: 'dashed',
                borderColor:'#fff',
              },
            }}
          >
            {renderContent}
          </Drawer>
        ) : (
          <Drawer
            open={openNav}
            onClose={onCloseNav}
            ModalProps={{
              keepMounted: true,
            }}
            PaperProps={{
              sx: { width: NAV_WIDTH },
            }}
          >
            {renderContent}
          </Drawer>
        )}
      </Box>
    );
  }