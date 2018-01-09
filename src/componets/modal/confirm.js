import React from 'react';

import Typography from 'material-ui/Typography';
import Dialog, {DialogActions, DialogContent, DialogContentText, DialogTitle} from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import {connect} from 'react-redux';

import {hideModal} from '../../actions/modalsActions';
import type {ModalsState} from '../../sore/storeTypes';

class ConfirmModal extends React.PureComponent<ModalsState> {

  handleConfirm: () => void;
  handleReject: () => void;

  constructor() {
    super();
    this.handleConfirm = this.handleConfirm.bind(this);
    this.handleReject = this.handleReject.bind(this);
  }

  handleConfirm() {
    if (this.props.callback) this.props.callback('confirm');
  }

  handleReject() {
    if (this.props.callback) this.props.callback('reject');
  }

  render() {
    return (
      <Dialog
        open={this.props.show}
        onClose={this.handleReject}
        aria-labelledby={this.props.modalTitle ? this.props.modalTitle : ''}
        aria-describedby={this.props.modalMessage}
      >
        {this.props.modalTitle && <DialogTitle id="alert-dialog-title">{this.props.modalTitle}</DialogTitle>}
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {this.props.modalMessage}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
        <Button onClick={this.handleReject} color="primary">
            {this.props.rejectText ? this.props.rejectText : 'Cancel'}
          </Button>
          <Button onClick={this.handleConfirm} color="primary">
            {this.props.confirmText ? this.props.confirmText : 'Confirm'}
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default ConfirmModal;