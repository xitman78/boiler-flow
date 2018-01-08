// @flow

import React from 'react';

import Typography from 'material-ui/Typography';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

import {hideAlert} from '../../actions/modalsActions';

import type {ModalsState} from '../../store/storeTypes';

function rand() {
  return Math.floor(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    position: 'absolute',
    width: 8 * 50,
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
    border: '1px solid #e5e5e5',
    backgroundColor: '#fff',
    boxShadow: '0 5px 15px rgba(0, 0, 0, .5)',
    padding: 8 * 4,
    zIndex: 1000,
  };
}

type Props = {
  modals: ModalsState,
  hideAlert: () => void
};

class ModalRoot extends React.Component<Props> {
  // state = {
  //   open: false,
  // };

  handleOpen = () => {
   // this.setState({ open: true });
  };

  handleClose = () => {
   // this.setState({ open: false });
   this.props.hideAlert();
  };

  render() {

    return (
      <div style={{backgroundColor: '#FF0000'}}>
        <Dialog
          open={this.props.modals.show}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Let Google help apps determine location. This means sending anonymous location data to
              Google, even when no apps are running.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Disagree
            </Button>
            <Button onClick={this.handleClose} color="primary" autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

const selector = createStructuredSelector({
  modals: state => state.modals
});

export default connect(selector, {hideAlert})(ModalRoot);