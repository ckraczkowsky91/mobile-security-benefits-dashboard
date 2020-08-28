import React from 'react';
import {
  Button,
  Container,
  FormControl,
  Grid,
  MenuItem,
  Paper,
  Select,
  Typography,
} from '@material-ui/core';
import { gql, useMutation } from '@apollo/client';

import AppControlContainer from './AppControlContainer';
import LocationControlContainer from './LocationControlContainer';
import WebControlContainer from './WebControlContainer';

const DELETE_FAMILY_MEMBER = gql`
  mutation RootMutation($_id: ID){
    deleteFamilyMember(_id: $_id){
      first_name
    }
  }
`;

export default function FamilyMemberDetail(props){
  const [device, setDevice] = React.useState('');
  const [deleteFamilyMember, { data }] = useMutation(DELETE_FAMILY_MEMBER);

  const handleOnClick = (props) => {
    deleteFamilyMember({ variables: { _id: props.familyMember._id }});
    props.onDelete();
  };

  console.log('props', props);

  return(
    <Container>
      <Grid container>
          <Typography>Summary</Typography>
          <FormControl>
            <Select displayEmpty value={device} variant='outlined'>
              <MenuItem value=''>All</MenuItem>
              {props.familyMember.devices.map((device) =>
                <MenuItem>{device.device_type}</MenuItem>
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
      <Button variant="contained" color="secondary" onClick={() => {handleOnClick(props)}}>
        Remove
      </Button>
    </Container>
  );
};
