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

class ModalRoot extends React.PureComponent<Props> {

  handleClose: () => void;

  constructor() {
    super();
    this.handleClose = this.handleClose.bind(this);
  }

  handleClose() {
   this.props.hideAlert();
  }

  render() {

    return (
      <div>
        <Dialog
          open={this.props.modals.show}
          onClose={this.handleClose}
          aria-labelledby={this.props.modals.modalTitle ? this.props.modals.modalTitle : ''}
          aria-describedby={this.props.modals.modalMessage}
        >
          {this.props.modals.modalTitle && <DialogTitle id="alert-dialog-title">{this.props.modals.modalTitle}</DialogTitle>}
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {this.props.modals.modalMessage}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Ok
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