import { Box, Dialog, DialogContent, DialogTitle, Divider, Grid, styled } from '@mui/material'
import React from 'react'
import Page from '../../../../../../../components/page'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Delete, Edit, Visibility } from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { useDispatch } from 'react-redux';
import { HashLoader } from 'react-spinners';
import { useSnackbar } from 'notistack';
import EditDocumentDetails from '../EditDocumentDetails';
import { delDocument } from '../../../../../../../store/actions/uploadActions';
const StyledRoot = styled(Box)(({theme})=> ({
    minHeight:'80vh',
    padding:theme.spacing(5)
}))
const ViewSingleDocument = () => {
    const [open, setOpen] = React.useState(false)
    const {state} = useLocation()
    // console.log(state)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [loading , setLoading] = React.useState(false)
    const {enqueueSnackbar} = useSnackbar()
    const handleDelete = () => {
        confirmAlert({
            title: "Delete Document",
            message: "Are you sure to delete this document ?",
            buttons: [
              {
                label: "Yes",
                onClick: () => {
                    setLoading(true)
                  dispatch(delDocument(state.id)).then((result) => {
                    enqueueSnackbar(result.data.message, {
                        variant:'success'
                    })
                    setLoading(false)
                      navigate("/user/uploads", { replace: true });
                  }).catch((err) => {
                    console.log(err)
                  });;
                },
              },
              {
                label: "No",
              },
            ],
          });
    }
  return (
    <div>
     <Page title="View Picture">
        <StyledRoot>
        <Card
        elevation={4}
        sx={{border: '1px solid #bababa'}}
        >
      <CardMedia
        sx={{ height: 440 }}
        image="/assets/images/file-upload.png"
        title={state.name}
        />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {state.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {state.description ? state.description : 'No Description found'}
        </Typography>
      </CardContent>
      <CardActions>
      <Button size="small" variant='outlined' 
        endIcon={<Visibility />}
        href={state.path}
        target='_blank'
        sx={{mr:1}}
        >View Doc</Button>
        <Button size="small" variant='outlined' 
        endIcon={<Edit />}
        onClick={() => setOpen(true)}
        >Edit</Button>
        <Button size="small" variant='contained' 
        endIcon={<Delete />} sx={{background:'#E40808'}}
        onClick={handleDelete}
        >Delete</Button>
      </CardActions>
    </Card>
        </StyledRoot>
        {
            loading && 
        <Dialog open={true} fullWidth>
            <DialogTitle>
                Please wait........
            </DialogTitle>
            <Divider />
            <DialogContent>
            <Box
          sx={{
            height: '10vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <HashLoader
            color="#353B48"
            loading={true}
            size={50}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </Box>
            </DialogContent>
        </Dialog>
        }
        <EditDocumentDetails open={open} close={()=>setOpen(false)} state={state} />
    </Page>
    </div>
  )
}

export default ViewSingleDocument
