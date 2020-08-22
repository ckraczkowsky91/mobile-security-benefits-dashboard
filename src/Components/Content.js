import React from 'react';
import {
  AppBar,
  Collapse,
  Container,
  List,
  ListItem,
  ListItemText,
  Paper,
  Tab,
  Tabs,
  Typography
} from '@material-ui/core';

import { familyData, countFamily, countDevices } from '../data';
import AlertDetail from './AlertDetail';
import FamilyMemberDetail from './FamilyMemberDetail';

function TabPanel(props){
  return(
    <div>
    { props.value === props.index && (
      <div>{props.children}</div>
    )}
    </div>
  );
};

export default function Content(){
  const [value, setValue] = React.useState(0);
  var index = 0;

  const handleChange = (e, newValue) => {
    setValue(newValue);
  };

  return(
    <Container>
      <Paper>
        <Typography>Summary</Typography>
        <Typography>Family Members Enrolled: {countFamily(familyData)}</Typography>
        <Typography>Devices Activated: {countDevices(familyData)}</Typography>
      </Paper>
      <Paper>
        <Typography>Details</Typography>
        <AppBar position="static">
          <Tabs value={value} onChange={handleChange}>
            <Tab label="Alerts"/>
            {familyData.map((familyMember) =>
              <Tab label={familyMember.first_name} key={familyMember.id}/>
            )}
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          <AlertDetail/>
        </TabPanel>
        {familyData.map((familyMember) => {
          index++;
          return (
            <TabPanel value={value} index={index}>
              <FamilyMemberDetail familyMember={familyMember} />
            </TabPanel>
          );
        })}
      </Paper>
    </Container>
  );
};
