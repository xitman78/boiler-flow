import React from 'react';

import Typography from 'material-ui/Typography';
import Dialog, {DialogActions, DialogContent, DialogContentText, DialogTitle} from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import {connect} from 'react-redux';

import {hideAlert} from '../../actions/modalsActions';
import type {ModalsState} from '../../sore/storeTypes';

type Props = {
  ...ModalsState,
  hideAlert: () => void
};

class AlertModal extends React.Component {

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
      <Dialog
        open={this.props.show}
        onClose={this.handleClose}
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
          <Button onClick={this.handleClose} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default connect(null, {hideAlert})(AlertModal);