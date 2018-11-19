import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';

export const mainListItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <DashboardIcon style={{ color: '#D5D5D5' }} />
      </ListItemIcon>
      <ListItemText primary="Dashboard" disableTypography="true" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <ShoppingCartIcon style={{ color: '#D5D5D5' }} />
      </ListItemIcon>
      <ListItemText primary="Orders" disableTypography="true" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <PeopleIcon style={{ color: '#D5D5D5' }} />
      </ListItemIcon>
      <ListItemText primary="Customers" disableTypography="true" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <BarChartIcon style={{ color: '#D5D5D5' }} />
      </ListItemIcon>
      <ListItemText primary="Reports" disableTypography="true" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <LayersIcon style={{ color: '#D5D5D5' }} />
      </ListItemIcon>
      <ListItemText primary="Integrations" disableTypography="true" />
    </ListItem>
  </div>
);

export const secondaryListItems = (
  <div>
    <ListSubheader inset style={{ color: '#D5D5D5' }}>Projects</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon style={{ color: '#D5D5D5' }} />
      </ListItemIcon>
      <ListItemText
        primary="Karnak"
        disableTypography={true}
        style={{ color: '#D5D5D5' }}
      />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon style={{ color: '#D5D5D5' }} />
      </ListItemIcon>
      <ListItemText primary="Colossi" disableTypography={true} style={{ color: '#D5D5D5' }} />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon style={{ color: '#D5D5D5' }} />
      </ListItemIcon>
      <ListItemText primary="Habanero" disableTypography={true} style={{ color: '#D5D5D5' }} />
    </ListItem>
  </div>
);
