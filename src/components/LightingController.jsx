import React, { useState } from 'react';
import { Button, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import axios from 'axios';
import '../App.css'

function LightingController() {
  const [miniserverAddress, setMiniserverAddress] = useState('');
  const [controllerDetails, setControllerDetails] = useState('');
  const [iconFile, setIconFile] = useState(null);
  const [response, setResponse] = useState('');
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertType, setAlertType] = useState('success');

  const handleAddressChange = (e) => {
    setMiniserverAddress(e.target.value);
  };

  const handleControllerChange = (e) => {
    setControllerDetails(e.target.value);
  };

  const handleIconUpload = (e) => {
    const file = e.target.files[0];
    setIconFile(file);
  };

  const handleTurnOn = async () => {
    try {
      const response = await axios.get(`${miniserverAddress}/dev/sps/io/${controllerDetails}/On`);
      setResponse(response.data);
      setAlertType('success');
      setAlertOpen(true);
    } catch (error) {
      console.error('Error:', error);
      setAlertType('error');
      setAlertOpen(true);
    }
  };

  const handleTurnOff = async () => {
    try {
      const response = await axios.get(`${miniserverAddress}/dev/sps/io/${controllerDetails}/Off`);
      setResponse(response.data);
      setAlertType('success');
      setAlertOpen(true);
    } catch (error) {
      console.error('Error:', error);
      setAlertType('error');
      setAlertOpen(true);
    }
  };

  const handleAlertClose = () => {
    setAlertOpen(false);
  };

  return (
    <div className="controller-section">
    <h2>Lighting Control</h2>
    <input type="text" value={miniserverAddress} onChange={handleAddressChange} placeholder="Miniserver Address" />
    <input type="text" value={controllerDetails} onChange={handleControllerChange} placeholder="Controller Details" />
    <input type="file" onChange={handleIconUpload} accept="image/*" />

    {/* Display selected icon */}
    {iconFile && (
      <div className="selected-icon">
        <p>Selected Icon:</p>
        <img src={URL.createObjectURL(iconFile)} alt="Selected Icon" />
      </div>
    )}
      <Button variant="contained" color="primary" onClick={handleTurnOn}>
        Turn On
      </Button>
      <Button variant="contained" color="secondary" onClick={handleTurnOff}>
        Turn Off
      </Button>
      <Snackbar open={alertOpen} autoHideDuration={6000} onClose={handleAlertClose}>
        <MuiAlert onClose={handleAlertClose} severity={alertType}>
          {response}
        </MuiAlert>
      </Snackbar>
    </div>
  );
}

export default LightingController;
