import React from "react";
import TextField from 'material-ui/TextField';

const TextFieldAdapter = ({ input, meta, children, ...rest }) => {
  return <TextField
    {...input}
    {...rest}
    onChange={event => input.onChange(event.target.value)}
    { ... (meta.invalid && meta.touched) ? {helperText: meta.error, error: true} : {}} >
    {children}
  </TextField>
};

export default TextFieldAdapter;