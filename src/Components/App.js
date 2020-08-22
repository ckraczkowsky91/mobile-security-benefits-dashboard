import React from 'react';
import {
  AppBar,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography
} from '@material-ui/core';
import {
  Menu as MenuIcon
} from '@material-ui/icons';
import { ApolloClient, gql, InMemoryCache, ApolloProvider } from '@apollo/client';

import Content from './Content';
import FormDialog from './FormDialog';

const apolloClient = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache()
});

apolloClient.query({
  query: gql`
    query {
    familyMember(id: "5f3d8f6fa963fa83534741b6"){
      first_name
      }
    }
  `
}).then(result => console.log(result.data.familyMember.first_name));

export default function App(){
  const [anchorElement, setAnchorElement] = React.useState(null);
  const [formDialogState, setFormDialogState] = React.useState(false);

  const handleClick = (event) => {
    setAnchorElement(event.target);
  };

  const handleClose = () => {
    setAnchorElement(null);
  };

  const toggleFormDialog = () => {
    setFormDialogState(!formDialogState);
  };

  return(
    <ApolloProvider client={apolloClient}>
      <div>
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClick}>
              <MenuIcon />
            </IconButton>
            <Typography>Benefits Dashboard</Typography>
          </Toolbar>
        </AppBar>
        <Menu
          anchorEl={anchorElement}
          open={Boolean(anchorElement)}
          onClose={handleClose}
        >
          <MenuItem onClick={toggleFormDialog}>Add family member</MenuItem>
        </Menu>
        <FormDialog formDialogState={formDialogState} toggleFormDialog={toggleFormDialog} />
        <div style={{display: 'inline-block', width: '100%'}}>
          <Content/>
        </div>
      </div>
    </ApolloProvider>
  );
};
