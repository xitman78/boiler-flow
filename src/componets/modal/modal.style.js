// @flow

const styles = (theme: Object) => ({
  modalContainer: {
    minWidth: 400,
  },
});

export default styles;

export type ClassesType = {[$Keys<$Call<typeof styles, {}>>]: string}