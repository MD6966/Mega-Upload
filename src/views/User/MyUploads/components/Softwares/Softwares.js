import React from 'react';
import { useDispatch } from 'react-redux';
import { getSoftwares } from '../../../../../store/actions/uploadActions';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, Button, CardActionArea, CardActions, FormControl, Grid, IconButton, Input, InputAdornment, InputLabel } from '@mui/material';
import moment from 'moment';
import { HashLoader } from 'react-spinners';
import { Search, Visibility } from '@mui/icons-material';
import { useNavigate } from 'react-router';

const Softwares = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [noDataFound, setNoDataFound] = React.useState(false);

  const getSW = () => {
    setLoading(true);
    dispatch(getSoftwares())
      .then((result) => {
        setLoading(false);
        setData(result.data.data);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  React.useEffect(() => {
    getSW();
  }, []);

  const filteredData = data.filter((val) =>
    val.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  React.useEffect(() => {
    setNoDataFound(filteredData.length === 0);
  }, [filteredData]);
  const handleSoftwareClick = (val) => {
    navigate('/user/view-software', {state:val})

  }
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
        <div>
          <FormControl sx={{ m: 1, width: '45ch', mb: 5 }} variant="standard">
            <InputLabel htmlFor="standard-adornment-search">Search in Softwares</InputLabel>
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
          {noDataFound ? (
            <Typography variant="h6" component="div" sx={{ textAlign: 'center' }}>
              No data found ☹️
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
                          onClick={()=>handleSoftwareClick(val)}

                        />
                        <CardContent>
                          <Typography
                            gutterBottom
                            variant="h6"
                            component="div"
                            style={{
                              display: '-webkit-box',
                              WebkitLineClamp: 1,
                              WebkitBoxOrient: 'vertical',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                            }}
                          >
                            {val.name}
                          </Typography>
                          <Typography>Uploaded at: {formattedDate}</Typography>
                        </CardContent>
                      </CardActionArea>
                      <CardActions>
                        <Button size="small" color="primary"
                        variant='outlined'
                        endIcon={<Visibility />}
                        onClick={()=>handleSoftwareClick(val)}
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
        </div>
      )}
    </div>
  );
};

export default Softwares;
