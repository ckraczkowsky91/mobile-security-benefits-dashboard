import React from 'react';
import {
  Container,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography
} from '@material-ui/core';
import {
  Language as WebIcon,
  Settings as SettingsIcon
} from '@material-ui/icons';

import { deviceThreatData } from '../data';

export default function WebControlContainer(props){
  return(
    <Container>
      <Grid container>
        <WebIcon />
        <Typography>Web Protection</Typography>
      </Grid>
      <Grid container>
        <Typography>Protection level: High</Typography>
        <IconButton>
          <SettingsIcon />
        </IconButton>
      </Grid>
      <Typography>Active Categories</Typography>
      <List>
        {deviceThreatData.map((member) => {
            if(member.familyMember === props.familyMember.first_name){
              return (
                member.webThreats.map((threat) => {
                  return(
                    <ListItem key={threat.id}>
                      <ListItemText>{threat.category}</ListItemText>
                      <ListItemText>{threat.count}</ListItemText>
                    </ListItem>
                  )})
              );
          };
        })}
      </List>
    </Container>
  );
};
