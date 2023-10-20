import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, TextField } from '@mui/material'
import React from 'react'
import { useDispatch } from 'react-redux'
import { editProfileDetails } from '../../../../store/actions/profileActions'

const EditProfileInfo = (props) => {
    const {user} = props
    // console.log(user)
    const initialValues = {
        name:'',
        email:'',
    }
    const [formValues , setFormValues] = React.useState(initialValues)
    const dispatch = useDispatch()
    const handleChange = (e) => {
        const {name,value} = e.target
        setFormValues({...formValues,[name]: value})
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(editProfileDetails(user.id,formValues)).then((result) => {
            console.log(result)
        }).catch((err) => {
            console.log(err)
        });
        console.log(formValues)
    }
    React.useEffect(()=> {
        setFormValues({
            ...formValues,
            name: user?.name || '',
            email: user?.email || ''
        })
    },[])
  return (
    <div>
      <Dialog fullWidth open={props.open} onClose={props.close}>
            <form onSubmit={handleSubmit}>
        <DialogTitle>
            Update your information
        </DialogTitle>
        <Divider />
        <DialogContent>
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
            <Button onClick={props.close} variant='outlined'>
                Cancel
            </Button>
            <Button variant='contained' type="submit">
                Update
            </Button>

        </DialogActions>
            </form>
      </Dialog>
    </div>
  )
}

export default EditProfileInfo
