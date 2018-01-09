// @flow

import React from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

import AlertModal from './alert';
import ConfirmModal from './confirm';
import type {ModalsState} from '../../store/storeTypes';

type Props = {
  modals: ModalsState,
};

const ModalRoot = ({modals}) => {

  if (!modals.show) return null;

  switch(modals.modalType) {
    case 'ALERT':
      return <AlertModal {...modals} />
    case 'CONFIRM':
      return <ConfirmModal {...modals} />
  }
  return null;
}

const selector = createStructuredSelector({
  show: state => state.modals.show,
  modals: state => state.modals,
});

export default connect(selector)(ModalRoot);