import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography
} from '@material-ui/core';

import Content from './Content';

export default class App extends React.Component{
  render(){
    return(
      <div>
        <AppBar position="static">
          <Toolbar>
            <Typography>Benefits Dashboard</Typography>
          </Toolbar>
        </AppBar>
        {/*
          <nav style={{display: 'inline-block', width: '10%'}}>
            <Menu/>
          </nav>
        */}
        <div style={{display: 'inline-block', width: '100%'}}>
          <Content/>
        </div>
      </div>
    );
  };
};
