// @flow

import React from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

import AlertModal from './alert';
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
      return null;
  }
  return null;
}

const selector = createStructuredSelector({
  modals: state => state.modals,
});

export default connect(selector)(ModalRoot);