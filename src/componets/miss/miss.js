// @flow

import React from 'react';
import Typography from 'material-ui/Typography';
import HotTub from 'material-ui-icons/HotTub';
import { withStyles } from 'material-ui/styles';

const styles = {
  bigIcon: {
    width: 80,
    height: 80,
  },
};

const Miss = ({classes}) => (
  <div>
    <HotTub color="primary" className={classes.bigIcon} />
    <Typography type="headline" component="h3" color={'primary'}>
      Not Found!
    </Typography>
  </div>
);

export default withStyles(styles)(Miss);