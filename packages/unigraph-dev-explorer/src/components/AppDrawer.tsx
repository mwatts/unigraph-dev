import React from 'react';
import { Link, Redirect } from 'react-router-dom';

import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import { Bookmarks, Category, Comment, CompareArrows, FileCopy, Home, Info, LibraryBooks, PlaylistAddCheck, Settings, Storage } from '@material-ui/icons';
import { ListSubheader } from '@material-ui/core';
import { NavigationContext } from '../utils';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  toolbar: {
    minHeight: '48px !important'
  },
}));

export default function DrawerRouter() {
  const classes = useStyles();

  return (
    <NavigationContext.Consumer>
        { (navigator: any) => <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
          anchor="left"
        >
          
          <div className={classes.toolbar} />
          <List>
            <ListSubheader component="div" id="subheader-home"> Home </ListSubheader>
            <ListItem button onClick={()=>navigator('/')}>
              <ListItemIcon><Home /></ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
            <ListItem button onClick={()=>navigator('/about')}>
              <ListItemIcon><Info /></ListItemIcon>
              <ListItemText primary="About" />
            </ListItem>
            <ListItem button onClick={()=>navigator('/library')}>
              <ListItemIcon><LibraryBooks /></ListItemIcon>
              <ListItemText primary="Library" />
            </ListItem>
            <ListItem button onClick={()=>navigator('/schema/new')}>
              <ListItemIcon><Storage /></ListItemIcon>
              <ListItemText primary="Add Schema" />
            </ListItem>
            <ListItem button onClick={()=>navigator('/object-editor')}>
              <ListItemIcon><FileCopy /></ListItemIcon>
              <ListItemText primary="Object Editor" />
            </ListItem>
            <ListItem button onClick={()=>navigator('/settings')}>
              <ListItemIcon><Settings /></ListItemIcon>
              <ListItemText primary="User Settings" />
            </ListItem>
            <ListItem button onClick={()=>navigator('/package-manager')}>
              <ListItemIcon><Category /></ListItemIcon>
              <ListItemText primary="Package Manager" />
            </ListItem>
            <Divider/>
            <ListSubheader component="div" id="subheader-developer-tools"> Developer Tools </ListSubheader>
            <ListItem button onClick={()=>navigator('/request')}>
              <ListItemIcon><Comment /></ListItemIcon>
              <ListItemText primary="Request" />
            </ListItem>
            <ListItem button onClick={()=>navigator('/datamodel-playground')}>
              <ListItemIcon><CompareArrows /></ListItemIcon>
              <ListItemText primary="DataModel Playground" />
            </ListItem>
            <Divider/>
          </List>
        </Drawer>}
    </NavigationContext.Consumer>
    
  );
}