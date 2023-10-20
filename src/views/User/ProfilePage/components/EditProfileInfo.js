import { Dialog } from '@mui/material'
import React from 'react'

const EditProfileInfo = (props) => {
  return (
    <div>
      <Dialog fullWidth open={props.open} onClose={props.close}>
        Hello Jee
      </Dialog>
    </div>
  )
}

export default EditProfileInfo
