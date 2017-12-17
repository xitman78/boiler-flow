// @flow

import React, {Component} from "react";
import Counter from '../componets/counter';

class Home extends Component<{}> {

  render() {
    return <div>
      <h3>Counter</h3>
      <Counter />
    </div>;
  }
}

export default Home;