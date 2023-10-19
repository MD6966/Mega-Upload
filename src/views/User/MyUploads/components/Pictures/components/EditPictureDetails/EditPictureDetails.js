import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, TextField } from '@mui/material'
import React from 'react'
import { useDispatch } from 'react-redux'
import { editPicDetails } from '../../../../../../../store/actions/uploadActions'
import { useSnackbar } from 'notistack'
import { useNavigate } from 'react-router'
import { HashLoader } from 'react-spinners';

const EditPictureDetails = (props) => {
    const initialValues = {
        name:'',
        description:''
    }
    const [formValues, setFormValues] = React.useState(initialValues)
    const [loading, setLoading] = React.useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {enqueueSnackbar} = useSnackbar()
    const handleChange = (e) => {
        const {name, value} = e.target
        setFormValues({...formValues, [name]:value})
    }
    const handleSubmit = (e) => {
        setLoading(true)
        e.preventDefault()
        dispatch(editPicDetails(props.state.id, formValues.name, formValues.description)).then((result) => {
            setLoading(false)
            enqueueSnackbar(result.data.message, {
                variant:'success'
            })
            navigate('/user/uploads')
            props.close()
        }).catch((err) => {
            setLoading(false)
            console.log(err)
        });
    }
    React.useEffect(()=> {
        setFormValues({
            ...formValues,
            name:props.state.name,
            description:props.state.description
        })
    }, [])
  return (
    <div>
      <Dialog open={props.open} onClose={props.close}  fullWidth>
            <form onSubmit={handleSubmit}>
        <DialogTitle>
            Update Details
        </DialogTitle>
        <Divider />
        <DialogContent>
                <TextField label="Name" fullWidth sx={{mb:2}}
                name="name"
                value={formValues.name}
                onChange={handleChange}
                />
                <TextField label="Description" fullWidth multiline rows={5}
                name="description"
                value={formValues.description}
                onChange={handleChange}
                />
        </DialogContent>
        <DialogActions>
            <Button variant='outlined' onClick={props.close}>
                Cancel
            </Button>
            {
                loading ?
                <Button>
                     <HashLoader
            color="#353B48"
            loading={true}
            size={25}
            aria-label="Loading Spinner"
            data-testid="loader"
          />                    
                </Button> :
            <Button variant='contained' type='submit'>
                Update
            </Button>
            }
        </DialogActions>
            </form>
      </Dialog>
    </div>
  )
}

export default EditPictureDetails
