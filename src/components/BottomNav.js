import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import PersonIcon from '@material-ui/icons/Person';
import HomeIcon from '@material-ui/icons/Home';
import CreateIcon from '@material-ui/icons/Create';
import ListIcon from '@material-ui/icons/List';
import InfoIcon from '@material-ui/icons/Info';
// import Grid from '@material-ui/core/Grid';

const styles = {
  stickToBottom: {
      width: '100%',
      position: 'fixed',
      bottom: 0,
    //   background: '#0033A1',
  }
};

class LabelBottomNavigation extends React.Component {
  state = {
    value: 'person',
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <BottomNavigation value={value} onChange={this.handleChange} className={classes.stickToBottom}>
        <BottomNavigationAction label="Profile" value="profile" icon={<PersonIcon />} />
        <BottomNavigationAction label="Unit" value="unit" icon={<HomeIcon />} />
        <BottomNavigationAction label="Create" value="create" icon={<CreateIcon />} />
        <BottomNavigationAction label="Resources" value="resources" icon={<ListIcon />} />
        <BottomNavigationAction label="Info" value="info" icon={<InfoIcon />} />
      </BottomNavigation>
    );
  }
}

LabelBottomNavigation.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LabelBottomNavigation);