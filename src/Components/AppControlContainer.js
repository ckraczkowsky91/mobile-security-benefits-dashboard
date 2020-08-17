import React from 'react';
import {
  Container,
  Grid,
  IconButton,
  Typography
} from '@material-ui/core';
import {
  Apps as AppsIcon,
  Settings as SettingsIcon
} from '@material-ui/icons';

import { deviceThreatData } from '../data';

export default function AppControlContainer(props){
  return(
    <Container>
      <Grid container>
        <AppsIcon />
        <Typography>App Protection</Typography>
      </Grid>
      <Grid container>
        <Typography>Apps Blocked: 3</Typography>
        <IconButton>
          <SettingsIcon />
        </IconButton>
      </Grid>
      {deviceThreatData.map((device) => {
          if(props.familyMember.first_name === device.familyMember){
            if(!device.appThreats){
              return(
                <Typography key={device.device_id}>No application threats at this time.</Typography>
              );
            } else {
              return(
                device.appThreats.map((threat) => (
                  <Grid container key={threat.id}>
                    <Typography>{threat.name}</Typography>
                    <Typography>{threat.type}</Typography>
                  </Grid>
                ))
              )
            }
          }
        })}
    </Container>
  )
};
