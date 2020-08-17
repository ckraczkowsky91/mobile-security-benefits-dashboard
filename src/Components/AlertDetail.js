import React from 'react';
import {
  Avatar,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Menu,
  MenuItem
} from '@material-ui/core';
import {
  Delete as DeleteIcon,
  Error as ErrorIcon,
  Help as HelpIcon,
  MoreVert as VerticalMenuIcon,
  Warning as WarningIcon
} from '@material-ui/icons';

import { alertData } from '../data';

export default function AlertDetail(){
  const [anchorElement, setAnchorElement] = React.useState(null);

  const handleClick = (event) => {
      setAnchorElement(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorElement(null);
  };

  const pickIcon = (type) => {
    if (type === "alert"){
      return <WarningIcon />
    } else {
      return <ErrorIcon />
    };
  };

  return(
    <List>
      {alertData.map((alert) =>
        <ListItem key={alert.id}>
          <ListItemAvatar>
            <Avatar>
              {pickIcon(alert.type)}
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={alert.detail} />
          <ListItemSecondaryAction>
            <IconButton onClick={handleClick}>
              <VerticalMenuIcon />
            </IconButton>
            <Menu anchorEl={anchorElement} open={Boolean(anchorElement)} onClose={handleClose}>
              <MenuItem>
                <ListItemIcon>
                  <DeleteIcon />
                </ListItemIcon>
                <ListItemText>Delete</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <HelpIcon />
                </ListItemIcon>
                <ListItemText>Help</ListItemText>
              </MenuItem>
            </Menu>
          </ListItemSecondaryAction>
        </ListItem>
      )}
    </List>
  );
}
