import React, { useState } from 'react';
import Page from '../../../components/page';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import { uploadPicture } from '../../../store/actions/uploadActions';
import { useSnackbar } from 'notistack';
import LinearProgress from '@mui/material/LinearProgress';
import axios from 'axios';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router';

const api = axios.create({
  baseURL: process.env.REACT_APP_URL,
});

const getToken = () => {
  return localStorage.getItem('token');
};

api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
const UploadFile = () => {
  const user = useSelector((state)=>state.auth.user)
  // console.log(user)
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [loading, setLoading] = React.useState(false)
  const navigate = useNavigate()
  const {enqueueSnackbar} = useSnackbar()
  console.log(uploadProgress)
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setSelectedFile(selectedFile);
    } else {
      setSelectedFile(null);
    }
  };

  const getFileAcceptValue = () => {
    switch (selectedOption) {
      case 'picture':
        return '.jpg, .jpeg, .png, .gif';
      case 'document':
        return '.pdf, .docx, .xlsx';
      case 'software':
        return '.exe';
      default:
        return '';
    }
  };
  const handleUpload = () => {
    const formData = new FormData()
    formData.append('name', selectedFile.name)
    formData.append('file', selectedFile)
    formData.append('user_id', user.id)
    let endpoint;
    switch(selectedOption) {
      case "picture": 
      endpoint = 'api/user/upload/pictures';
      break;
      case 'document':
      endpoint = 'api/user/upload/documents';
      break;
      case 'software':
      endpoint = 'api/user/upload/software';
      break;
      default:
      endpoint = 'api/user/upload/pictures';
      break;
    }
    if (endpoint) {
      api
        .post(endpoint, formData, {
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(percentCompleted);
            setLoading(true)

          },
        })
        .then((result) => {
          setLoading(false)
          console.log(result)
          enqueueSnackbar(result.data.message, {
            variant: 'success',
          });
          setUploadProgress(0);
          setSelectedFile('');
          navigate('/user/uploads')
        })
        .catch((err) => {
          setLoading(false)
          console.log(err);
          setUploadProgress(0);
        });
    }
  }
  return (
    <Page title="Upload File">
      <Card>
        <CardContent>
          {selectedOption === '' ? (
            <div>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Please select the type of file to upload:
              </Typography>
              <FormControl fullWidth>
                <InputLabel>Select Option</InputLabel>
                <Select
                  value={selectedOption}
                  onChange={handleOptionChange}
                  label="Select Option"
                >
                  <MenuItem value="picture">Picture</MenuItem>
                  <MenuItem value="document">Document</MenuItem>
                  <MenuItem value="software">Software</MenuItem>
                </Select>
              </FormControl>
            </div>
          ) : (
            <div>
              <label htmlFor="file-input" style={{ cursor: 'pointer' }}>
                <Card
                  variant="outlined"
                  sx={{
                    border: '1px dashed grey',
                    height: '80vh',
                    backgroundImage: 'url("/assets/images/file-upload.png")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    position: 'relative',
                  }}
                >
                  <div
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.7)',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Typography variant="h5">
                      Click anywhere to upload {selectedOption}
                    </Typography>
                    <Typography variant="subtitle1" sx={{ mt: 2 }}>
                      {selectedFile ? selectedFile.name : 'No file chosen'}
                    </Typography>
                   {loading ? 
                           <Box sx={{ width: '50%', mr: 1 }}>
                           <LinearProgress variant="determinate" value={uploadProgress}  />
                           <Typography sx={{mt:1, textAlign:'center', fontWeight:'bold'}}>
                            {uploadProgress} % completed
                           </Typography>
                         </Box> :
                   <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      disabled={!selectedFile}
                      sx={{ mt: 2 }}
                      onClick={handleUpload}
                    >
                      Upload
                    </Button> 
            
      }
                  </div>
                </Card>
              </label>
              <input
                type="file"
                id="file-input"
                style={{ display: 'none' }}
                accept={getFileAcceptValue()}
                onChange={handleFileChange}
              />
            </div>
          )}
        </CardContent>
      </Card>
    </Page>
  );
};

export default UploadFile;
