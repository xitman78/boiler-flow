// @flow

import React from 'react';
import {Link} from 'react-router-dom';
import List from 'material-ui/List';
import {ListItem, ListItemIcon, ListItemText} from 'material-ui/List';
import HomeIcon from 'material-ui-icons/Home';
import AccountBox from 'material-ui-icons/AccountBox';

function AuthMenu() {
  return (
    <List>
      <ListItem button component={Link} to='/'>
        <ListItemIcon>
          <HomeIcon/>
        </ListItemIcon>
        <ListItemText inset primary="Home"/>
      </ListItem>
      <ListItem button component={Link} to='/users'>
        <ListItemIcon>
          <AccountBox/>
        </ListItemIcon>
        <ListItemText inset primary="Users"/>
      </ListItem>
    </List>
  );
}

export default AuthMenu;