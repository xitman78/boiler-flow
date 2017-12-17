// @flow

import React, {Component} from "react";
import {connect} from "react-redux";
import {decrement, increment} from "./actions";

import type {ActionType} from "../../actions/actionTypes";
import type {CounterState} from "../../store/storeTypes";

type Props = {
  counter: CounterState,
  increment: () => ActionType,
  decrement: () => ActionType,
};

class Counter extends Component<Props> {

  onClick = (event: SyntheticEvent<HTMLButtonElement>) => {
    console.log('target', event.currentTarget);
    this.props.increment();
  };

  render() {
    return <div>
      {this.props.counter.a}
      <hr />
      <button onClick={this.onClick}>PLUS</button><button onClick={this.props.decrement}>MINUS</button>
    </div>;
  }

}


export default connect(
  state => ({
    counter: state.counter
  }),
  {
    increment: increment,
    decrement: decrement,
  })(Counter);

