// @flow

import React, {PureComponent} from "react";
import {connect} from "react-redux";
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import MinusIcon from 'material-ui-icons/Remove';
import {createStructuredSelector} from 'reselect';

import {decrement, increment} from "../../actions/counterActions";
import type {SimpleActionType} from "../../actions/actionTypes";
import type {CounterState, StoreType} from "../../store/storeTypes";

type Props = {
  counter: CounterState,
  increment: () => SimpleActionType,
  decrement: () => SimpleActionType,
};

class Counter extends PureComponent<Props> {

  render() {
    return <div>
      {this.props.counter.a}
      <hr />
      <Button fab mini color="primary" aria-label="add" onClick={this.props.increment}>
        <AddIcon />
      </Button>
      <Button fab mini color="primary" aria-label="add" onClick={this.props.decrement}>
        <MinusIcon />
      </Button>
    </div>;
  }

}

const selector = createStructuredSelector({
  counter: (state: StoreType) => state.counter,
});

const actionsMap = {
  increment: increment,
  decrement: decrement,
};


export default connect(selector, actionsMap)(Counter);

