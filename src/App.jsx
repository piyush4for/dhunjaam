import React, { useState } from 'react';
import LightingController from './components/LightingController';

function App() {
 

  return (
    <div>
     
      <LightingController
        miniserverAddress
        controllerDetails
        iconFile
      />
    </div>
  );
}

export default App;
