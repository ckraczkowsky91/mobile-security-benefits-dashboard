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
import { gql } from '@apollo/client';

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

export default function Content(props){
  const [value, setValue] = React.useState(0);
  const [familyMembers, setFamilyMembers] = React.useState([]);
  React.useEffect(() => {
    console.log('inside effect');
    props.apolloClient.query({
      query: gql`
        query {
          getAllFamilyMembers{
            _id
            first_name
            last_name
            devices{
              device_type
            }
          }
        }
      `
    })
    .then((result) => {
      console.log('result', result)
      setFamilyMembers(result.data.getAllFamilyMembers);
    });
  });

  var index = 0;

  const handleChange = (e, newValue) => {
    setValue(newValue);
  };

  const onDelete = () => {
    setValue(0);
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
            {familyMembers.map((familyMember) =>
              <Tab label={familyMember.first_name} key={familyMember._id}/>
            )}
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          <AlertDetail/>
        </TabPanel>
        {
          familyMembers.map((familyMember) => {
              index++;
              return (
                <TabPanel value={value} index={index} key={familyMember._id}>
                  <FamilyMemberDetail familyMember={familyMember} onDelete={onDelete}/>
                </TabPanel>
              );
          })
        }
      </Paper>
    </Container>
  );
};

// {allFamilyMembers.map((familyMember) => {
//   index++;
//   return (
//     <TabPanel value={value} index={index}>
//       <FamilyMemberDetail familyMember={familyMember} />
//     </TabPanel>
//   );
// })}
