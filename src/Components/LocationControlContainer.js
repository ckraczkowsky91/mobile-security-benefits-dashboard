import React from 'react';
import {
  Button,
  Container,
  Grid,
  IconButton,
  Typography
} from '@material-ui/core';
import {
  LocationOn as LocationIcon,
  Settings as SettingsIcon
} from '@material-ui/icons';

import { deviceThreatData } from '../data';

export default function LocationControlContainer(props){
  return(
    <Container>
      <Grid container>
        <LocationIcon />
        <Typography>Location</Typography>
      </Grid>
      <Grid container>
        <Typography>Devices Monitored: 0</Typography>
        <IconButton>
          <SettingsIcon />
        </IconButton>
      </Grid>
      {deviceThreatData.map((device) => {
        if(props.familyMember.first_name === device.familyMember){
            if(!device.locationThreats){
              return(
                <Typography>No location activity at this time.</Typography>
              )
            } else {
              return(
                device.locationThreats.map((threat) => {
                  return(
                  <Typography key={threat.id}>{threat.description}</Typography>
                  )
                })
              );
            }
          }
        })
      }
      <Button variant="outlined" color="primary">Scream</Button>
      <Button variant="outlined" color="primary">Message</Button>
      <Button variant="outlined" color="primary">Locate</Button>
    </Container>
  );
};
