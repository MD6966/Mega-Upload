import React,  { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { styled, alpha } from '@mui/material/styles';
import { Box, Button, Drawer, Typography, Avatar, 
    List, ListItem,ListItemButton, ListItemIcon,ListItemText } from '@mui/material';
import Scrollbar from '../../../../../components/scrollbar';
import useResponsive from '../../../../../components/hooks/useResponsive';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SettingsIcon from '@mui/icons-material/Settings';
import CloudIcon from '@mui/icons-material/Cloud';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx'
import { useDispatch } from 'react-redux';
import InsightsIcon from '@mui/icons-material/Insights';
import { BiMoneyWithdraw } from 'react-icons/bi';
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
    const navigate  = useNavigate()
    const dispatch = useDispatch()
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
            id:3,
            title:'Statistics',
            icon: <InsightsIcon />,
            to:"/user/stats"

          },
          {
            id:4,
            title:'Withdrawl',
            icon: <BiMoneyWithdraw />,
            to:'/user/checkout'
          },
        {
          id: 5,
          title: "Settings",
          icon: <SettingsIcon />,
          to: "/user/profile",
        },
      ];
  const location = useLocation();
  const [dOpen, setDopen] = React.useState(false);
    const [selectedIndex, setSelectedIndex] = React.useState(1);
    const isDesktop = useResponsive('up', 'md');
    const classes = useStyles()
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
              <Box sx={{display:'flex', justifyContent:'center'}}>
              
              </Box>
        </Box>  
        <Box sx={{ flexGrow: 1 }} />

        
      </Scrollbar>
    );
  
    return (
      <Box
        component="nav"
        sx={{
          flexShrink: { md: 0 },
          width: { md: NAV_WIDTH },
        }}
      >
        {isDesktop ? (
          <Drawer
            open
            variant="permanent"
            PaperProps={{
              sx: {
                width: NAV_WIDTH,
                bgcolor: '#353B48',
                borderRightStyle: 'dashed',
              },
            }}
          >
            {renderContent}
          </Drawer>
        ) : null
        }
      </Box>
    );
  }