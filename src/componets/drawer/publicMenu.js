// @flow

import React from 'react';
import {Link} from 'react-router-dom';
import List from 'material-ui/List';
import {ListItem, ListItemIcon, ListItemText} from 'material-ui/List';
import HomeIcon from 'material-ui-icons/Home';

function PublicMenu() {
  return (
    <List>
      <ListItem button component={Link} to='/'>
        <ListItemIcon>
          <HomeIcon/>
        </ListItemIcon>
        <ListItemText inset primary="Home"/>
      </ListItem>
    </List>
  );
}

export default PublicMenu;