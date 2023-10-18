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

const UploadFile = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

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
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      disabled={!selectedFile}
                      sx={{ mt: 2 }}
                    >
                      Upload
                    </Button>
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
