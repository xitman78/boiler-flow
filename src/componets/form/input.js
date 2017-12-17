// @flow

import React, {PureComponent} from 'react';

type Props = {
  label: string,
  value: string,
  property: string,
  onChange: Function,
};


class FormInput extends PureComponent<Props> {

  onChange = (event: SyntheticInputEvent<>) => {
    this.props.onChange(event.target.value, this.props.property);
  };

  render() {

    return <div>
      {this.props.label}
      <input type="text" value={this.props.value} onChange={this.onChange} />
    </div>;

  }

}

export default FormInput;