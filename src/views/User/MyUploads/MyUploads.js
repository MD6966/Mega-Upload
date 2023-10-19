import React, { useState } from 'react';
import Page from '../../../components/page';
import { Box, Typography, styled } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import VerifiedIcon from '@mui/icons-material/Verified';
import { useSelector } from 'react-redux';
import Pictures from './components/Pictures'
import Documents from './components/Documents'
import Softwares from './components/Softwares'
const StyledRoot = styled(Box)(({ theme }) => ({
  padding: theme.spacing(5),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2)
  }
}));
const StyledContent = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  marginTop: theme.spacing(2)
}));

const MyUploads = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };
  const user = useSelector((state)=>state)
  console.log(user)
  return (
    <Page title="Uploaded Files">
      <StyledRoot>
        <Box sx={{display:'flex', justifyContent:'center'}}>
        <Typography sx={{color:'#353B48', mb:2, fontWeight:'bold'}} variant='h4'>My Uploads</Typography>
        <VerifiedIcon sx={{verticalAlign:'bottom', fontSize:'2.5rem', ml:1, color:'#353B48'}} />
        </Box>
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          centered
        >
          <Tab label="Pictures" />
          <Tab label="Documents" />
          <Tab label="Softwares" />
        </Tabs>
        {selectedTab === 0 && (
          <StyledContent>
              <Pictures />
          </StyledContent>
        )}
        {selectedTab === 1 && (
          <StyledContent>
              <Documents />
          </StyledContent>
        )}
        {selectedTab === 2 && (
          <StyledContent>
              <Softwares />
          </StyledContent>
        )}
      </StyledRoot>
    </Page>
  );
};

export default MyUploads;
