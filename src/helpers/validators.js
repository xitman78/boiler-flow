// @flow

export const validateRequired = (val: ?string)  => (val && val.trim().length > 0) ? undefined : 'Required';