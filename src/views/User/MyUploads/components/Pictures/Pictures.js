import React from 'react';
import { useDispatch } from 'react-redux';
import { getPictures } from '../../../../../store/actions/uploadActions';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, Button, CardActionArea, CardActions, FormControl, Grid, IconButton, Input, InputAdornment, InputLabel, useTheme } from '@mui/material';
import moment from 'moment';
import { HashLoader } from 'react-spinners';
import { Search, Visibility, VisibilityOff } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';

const Pictures = () => {
  const dispatch = useDispatch();
  const [data, setData] = React.useState([]);
  const theme = useTheme()
  const [loading, setLoading] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [noDataFound, setNoDataFound] = React.useState(false); 
  const navigate = useNavigate()

  const getPics = () => {
    setLoading(true);
    dispatch(getPictures())
      .then((result) => {
        setLoading(false);
        setData(result.data.data);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  const handleImageClick = (val) => {
    navigate('/user/view-picture', {state:val})
  }

  React.useEffect(() => {
    getPics();
  }, []);

  const filteredData = data.filter((val) =>
    val.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  React.useEffect(() => {
    setNoDataFound(filteredData.length === 0);
  }, [filteredData]);

  return (
    <div>
      {loading ? (
        <Box
          sx={{
            height: '60vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <HashLoader
            color="#353B48"
            loading={loading}
            size={100}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </Box>
      ) : (
        <Box>
          <Box>
            <FormControl sx={{ m: 1, width: '45ch', mb: 5,
            [theme.breakpoints.down('sm')]: {
              width:'25ch'
            }
          }} variant="standard">
              <InputLabel htmlFor="standard-adornment-search">Search in Pictures</InputLabel>
              <Input
                id="standard-adornment-search"
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton aria-label="toggle search visibility">
                      <Search />
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </Box>
          {noDataFound ? (
            <Typography variant="h6" component="div" sx={{ textAlign: 'center' }}>
              No data found! 😒
            </Typography>
          ) : (
            <Grid container spacing={3}>
              {filteredData.map((val) => {
                const formattedDate = moment(val.created_at).format('MMMM D, YYYY');
                return (
                  <Grid item xs={12} md={6} lg={4} key={val.id}>
                    <Card>
                      <CardActionArea>
                        <CardMedia
                          component="img"
                          height="140"
                          image="/assets/images/file-upload.png"
                          alt="green iguana"
                          onClick={() =>handleImageClick(val)}
                        />
                        <CardContent>
                          <Typography gutterBottom variant="h6" component="div">
                            {val.name}
                          </Typography>
                          <Typography>Uploaded at: {formattedDate}</Typography>
                        </CardContent>
                      </CardActionArea>
                      <CardActions>
                        <Button size="small" color="primary"
                        onClick={()=>handleImageClick(val)}
                        variant='outlined'
                        endIcon={<Visibility />}
                        >
                          View
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          )}
        </Box>
      )}
    </div>
  );
};

export default Pictures;
