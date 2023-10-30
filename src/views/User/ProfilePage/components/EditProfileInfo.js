import { Avatar, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, TextField } from '@mui/material'
import React, {useState} from 'react'
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
    const [imagePreview, setImagePreview] = useState(null);
    const [loadingAv, setLoadingAv] = useState(false)
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
        if (file) {
            const imageURL = URL.createObjectURL(file);
            setImagePreview(imageURL);
          }
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
        setLoadingAv(true)
        const formData = new FormData()
        formData.append('file', selectedFile)
        formData.append('name',formValues.name)
        formData.append('email', formValues.email)
       dispatch(updateAvatar(formData)).then((result) => {
        setLoadingAv(false)
        enqueueSnackbar(result.data.message, {
            variant:'success'
        })
        handleDialogClose()
       }).catch((err) => {
        setLoadingAv(false)
        console.log(err)
       });
    }
  return (
    <div>
    <Dialog fullWidth open={props.open} onClose={handleDialogClose}>
      <form onSubmit={handleSubmit}>
        <DialogTitle>Update your information</DialogTitle>
        <Divider />
        <DialogContent>
          <Box sx={{ mb: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
              <Avatar
                sx={{ height: '130px', width: '130px' }}
                src={imagePreview || user.profile_image}
              ></Avatar>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <input
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                id="avatar-file-input"
                onChange={handleFileChange}
              />
              <label htmlFor="avatar-file-input">
                <Button variant="outlined" component="span" sx={{mr:1}}>
                  Choose file
                </Button>
              </label>
              {selectedFile && (
                <Button
                  variant={loadingAv ? 'disabled' :'contained'}
                  color="primary"
                  onClick={handleAvatarUpload}
                >
                  {loadingAv ? 
                  <HashLoader
                  color="#353B48"
                  loading={true}
                  size={25}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                /> : 'Upload'

                }
                </Button>
              )}
            </Box>
          </Box>
          <TextField
            label="User Name"
            fullWidth
            sx={{ mb: 2 }}
            name="name"
            value={formValues.name}
            type="text"
            onChange={handleChange}
          />
           <TextField
            label="Phone number"
            fullWidth
            sx={{ mb: 2 }}
            // name="name"
            // value={formValues.name}
            // type="text"
            // onChange={handleChange}
          />
          <TextField
            label="Email"
            fullWidth
            name="email"
            value={formValues.email}
            type="email"
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} variant="outlined">
            Cancel
          </Button>
          {loading ? (
            <Button>
              <HashLoader
                color="#353B48"
                loading={true}
                size={25}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            </Button>
          ) : (
            <Button variant={loadingAv ? 'disbaled' : 'contained'} type="submit">
              Update
            </Button>
          )}
        </DialogActions>
      </form>
    </Dialog>
  </div>
  )
}

export default EditProfileInfo
