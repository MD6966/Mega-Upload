import React, { Component } from 'react';
import Page from '../../../components/page';
import { Box, Button, Divider, TextField, Typography, styled } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const StyledRoot = styled(Box)(({ theme }) => ({
  padding: theme.spacing(6),
}));

class CheckOut extends Component {
  paypal = null;

  constructor(props) {
    super(props);

    // Initialize the state
    this.state = {
      age: 10, // Set an initial value for age
    };
  }

  componentDidMount() {
    // Load the PayPal script
    const script = document.createElement('script');
    script.src =
      'https://www.paypal.com/sdk/js?client-id=AUEtDjXeLd4lUTeG7iuBH1G4THfrp6-mOK_SjTWs5uX-jdSEsDph5iEZJinkOIPVLi7BnxclzVr2Hbsm&currency=CAD';
    script.async = true;
    script.onload = this.initializePayPalButtons;
    document.body.appendChild(script);
  }

  initializePayPalButtons = () => {
    window.paypal
      .Buttons({
        createOrder: (data, actions, err) => {
          return actions.order.create({
            intent: 'CAPTURE',
            purchase_units: [
              {
                description: 'My Ads revenue',
                amount: {
                  currency_code: 'CAD',
                  value: 20.50,
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          console.log(order);
        },
        onError: (err) => {
          console.log(err);
        },
      })
      .render(this.paypal);
  };
  handleChange = (event) => {
    this.setState({ age: event.target.value });
  };

  render() {
    const { age } = this.state;

    return (
      <Page title="Check Out">
        <StyledRoot>
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{
              mb: 4,
              textAlign: 'center',
            }}
          >
            Choose Your Payment Method
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box sx={{ width: '100%', borderRight: '1px dashed grey', pr: 2, }}>
              <div ref={(ref) => (this.paypal = ref)}></div>
            </Box>
            <Box sx={{ width: '100%', ml: 2 }}>
              <TextField fullWidth label="Your Name" sx={{mb:2}}/>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Select Bank</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={age}
                  label="Select Bank"
                  onChange={this.handleChange} 
                >
                  <MenuItem value={10}>ABC</MenuItem>
                  <MenuItem value={20}>Super Bank</MenuItem>
                  <MenuItem value={30}>Test Bank</MenuItem>
                </Select>
              </FormControl>
              <TextField fullWidth label="Account Number" sx={{mt:2}}/>
              <TextField fullWidth label="Routing Number" sx={{mt:2, mb:2}}/>
                <Button variant='contained' fullWidth sx={{height:'40px'}}>
                    Pay Now
                </Button>
            </Box>
          </Box>
        </StyledRoot>
      </Page>
    );
  }
}

export default CheckOut;
