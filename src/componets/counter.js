// @flow

import React, {Component} from "react";
import {connect} from "react-redux";
import {decrement, increment} from "../actions";

import type {ActionType} from "../actionTypes";
import type {IncState} from "../storeTypes";

type Props = {
  red1: IncState,
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
      {this.props.red1.a}
      <hr />
      <button onClick={this.onClick}>PLUS</button><button onClick={this.props.decrement}>MINUS</button>
    </div>;
  }

}


export default connect(
  state => ({
    red1: state.red1
  }),
  {
    increment: increment,
    decrement: decrement,
  })(Counter);

