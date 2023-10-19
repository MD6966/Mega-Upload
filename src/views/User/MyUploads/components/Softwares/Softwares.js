import React from 'react'
import { useDispatch } from 'react-redux'
import { getSoftwares } from '../../../../../store/actions/uploadActions'

const Softwares = () => {
  const dispatch = useDispatch()
  const getSW = () => {
    dispatch(getSoftwares()).then((result) => {
      console.log(result)
    }).catch((err) => {
      console.log(err)
    });
  }
  React.useEffect(()=> {
    getSW()
  }, [])
    return (
    <div>
      Softwares
    </div>
  )
}

export default Softwares
