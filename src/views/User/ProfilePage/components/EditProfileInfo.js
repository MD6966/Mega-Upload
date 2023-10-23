import { Avatar, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, TextField } from '@mui/material'
import React from 'react'
import { useDispatch } from 'react-redux'
import { editProfileDetails, updateAvatar } from '../../../../store/actions/profileActions'
import { useSnackbar } from 'notistack'
import { HashLoader } from 'react-spinners';

const EditProfileInfo = (props) => {
    const {user} = props
    console.log(user)
    const initialValues = {
        name:'',
        email:'',
        profile_image:'',
    }
    const [formValues , setFormValues] = React.useState(initialValues)
    const [selectedFile, setSelectedFile] = React.useState(null)
    const dispatch = useDispatch()
    const {enqueueSnackbar} = useSnackbar()
    const [loading, setLoading] = React.useState(false)
    const handleChange = (e) => {
        const {name,value} = e.target
        setFormValues({...formValues,[name]: value})
    }
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
    };
    const handleSubmit = (e) => {
        setLoading(true)
        e.preventDefault()
        dispatch(editProfileDetails(formValues)).then((result) => {
            setLoading(false)
            enqueueSnackbar(result.data.message, {
                variant:'success'
            })
            // setFormValues(initialValues)
            props.close()
        }).catch((err) => {
            setLoading(false)
            console.log(err)
        });
        console.log(formValues)
    }
    React.useEffect(()=> {
        setFormValues({
            ...formValues,
            name: user?.name || '',
            email: user?.email || '',
            profile_image:user?.profile_image || ''
        })
    },[])
    const handleDialogClose = () => {
        setSelectedFile(null);
        props.close();
    }
    const handleAvatarUpload = () => {
        const formData = new FormData()
        formData.append('file', selectedFile)
        formData.append('name',formValues.name)
        formData.append('email', formValues.email)
       dispatch(updateAvatar(formData)).then((result) => {
        enqueueSnackbar(result.data.message, {
            variant:'success'
        })
        handleDialogClose()
       }).catch((err) => {
        console.log(err)
       });
    }
  return (
    <div>
      <Dialog fullWidth open={props.open} onClose={handleDialogClose}>
            <form onSubmit={handleSubmit}>
        <DialogTitle>
            Update your information
        </DialogTitle>
        <Divider />
        <DialogContent>
            <Box sx={{mb:3}}>

            <Box sx={{display:'flex', justifyContent:'center', mb:2}}>
            <Avatar sx={{ height: '130px', width: '130px', }}
            src={user.profile_image}
            onClick={handleFileChange}
            >
                                <input
                                    type="file"
                                    accept="image/*"
                                    style={{ display: 'none' }}
                                    onChange={handleFileChange}
                                    id="avatar-input"
                                />
                                <label htmlFor="avatar-input" style={{ width: '100%', height: '100%', cursor: 'pointer', display: 'block' }}>
                                    <div
                                        style={{
                                            backgroundImage: selectedFile,
                                            backgroundSize: 'cover',
                                            width: '100%',
                                            height: '100%',
                                        }}
                                    />
                                </label>
                            </Avatar>
                            </Box>
                            <Box sx={{display:'flex', justifyContent:'center'}}>
                            <Button
                                variant="contained"
                                color="primary"
                                component="span"
                                disabled={!selectedFile}
                                onClick={handleAvatarUpload}
                                >
                                Upload
                            </Button>
                                    </Box>
                                </Box>

                <TextField label="Name" fullWidth sx={{mb:2}}
                name='name'
                value={formValues.name}
                type='text'
                onChange={handleChange}
                />
                <TextField label="Email" fullWidth
                name='email'
                value={formValues.email}
                type='email'
                onChange={handleChange}
                />
        </DialogContent>
        <DialogActions>
            <Button onClick={handleDialogClose} variant='outlined'>
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

export default EditProfileInfo
