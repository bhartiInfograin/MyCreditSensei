import React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

export default function Step2(props) {

  const steps = [
    "Select Items",
    'Add Dispute Reason',
    'Confirmation',
  ];
  return (
    <>
     <Box sx={{ p:2, width: '100%' }} >
     <Stepper activeStep={props.progress} alternativeLabel>
        {steps.map((label) => (
          <Step key={label} className="demo1" >
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

     
       </Box>
    </>
  )
}
