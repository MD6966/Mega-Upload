import React from 'react'
import { useDispatch } from 'react-redux'
import { getDocuments } from '../../../../../store/actions/uploadActions'

const Documents = () => {
  const dispatch = useDispatch()
  const getDocs = () => {
    dispatch(getDocuments()).then((result) => {
      console.log(result)
    }).catch((err) => {
      console.log(err)
    });
  }
  React.useEffect(()=> {
    getDocs()
  }, [])
  return (
    <div>
      Documents
    </div>
  )
}

export default Documents
