import React from 'react';
import {
  Container,
  FormControl,
  Grid,
  MenuItem,
  Paper,
  Select,
  Typography,
} from '@material-ui/core';

import AppControlContainer from './AppControlContainer';
import LocationControlContainer from './LocationControlContainer';
import WebControlContainer from './WebControlContainer';

export default function FamilyMemberDetail(props){
  const [device, setDevice] = React.useState('');

  return(
    <Container>
      <Grid container>
          <Typography>Summary</Typography>
          <FormControl>
            <Select displayEmpty value={device} variant='outlined'>
              <MenuItem value=''>All</MenuItem>
              {props.familyMember.devices.map((device) =>
                <MenuItem key={device.id}>{device.device_type}</MenuItem>
              )}
            </Select>
          </FormControl>
      </Grid>
      <div style={{flexGrow: 1}}>
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <Paper>
              <WebControlContainer familyMember={props.familyMember}/>
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper>
              <AppControlContainer familyMember={props.familyMember}/>
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper>
              <LocationControlContainer familyMember={props.familyMember}/>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
};
