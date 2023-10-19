import React from 'react'
import { useDispatch } from 'react-redux'
import { getPictures } from '../../../../../store/actions/uploadActions'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, Button, CardActionArea, CardActions, Grid } from '@mui/material';
import moment from 'moment';
import {HashLoader} from "react-spinners";

const Pictures = () => {
  const dispatch = useDispatch()
  const [data, setData] = React.useState([])
  const [loading , setLoading] = React.useState(false)
  const getPics = () => {
    setLoading(true)
    dispatch(getPictures()).then((result) => {
      setLoading(false)
      setData(result.data.data)
    }).catch((err) => {
      setLoading(false)
      console.log(err)
    });
  }
  React.useEffect(()=> {
    getPics()
  }, [])
  return (
    <div>
      {
        loading ?
      <Box sx={{
        height:'60vh',
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
      }}>
           <HashLoader
            color="#353B48"
            loading={loading}
            size={100}
            aria-label="Loading Spinner"
            data-testid="loader"
            />
      </Box> :
      <Grid container spacing={3}>
        {
          data.map((val)=> {
            const formattedDate = moment(val.created_at).format("MMMM D, YYYY");
           return(
        <Grid item
        xs={12}
        md={6}
        lg={4}
        >
       <Card >
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="/assets/images/file-upload.png"
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {val.name}
          </Typography>
          <Typography>
            Uploaded at: {formattedDate}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
      </CardActions>
    </Card>

        </Grid>
           ) 
          })
        }
      </Grid>
      }
    </div>
  )
}

export default Pictures
