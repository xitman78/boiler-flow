import React, {Component} from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import { withStyles } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableHead, TableRow, TableFooter,
  TablePagination, } from 'material-ui/Table';
import Paper from 'material-ui/Paper';

import {getUsers} from "../../actions/usersActions";

import type {ActionType} from "../../actions/actionTypes";
import type {UsersState, User} from "../../store/storeTypes";

import './list.css';

const styles = theme => ({
  root: {
   // width: '100%',
   // marginTop: theme.spacing.unit * 3,
   // overflowX: 'auto',
    margin: 20
  },
  table: {
    minWidth: 700,
  },
});

type Props = {
  users: UsersState,
  getUser: () => ActionType,
  classes: {root: 'string', table: 'string'},
};

class UsersList extends Component<Props> {

  componentWillMount() {
    this.props.getUsers();
  }

  handleChangePage = (event, page) => {
    console.log('handleChangePage', page);
    this.props.getUsers(page + 1);
  };

  handleChangeRowsPerPage = (event) => {
    console.log('handleChangeRowsPerPage', event.target.value);
    this.props.getUsers(this.props.users.page, event.target.value);
  };

  render() {

    return <div className="users-list-container">
        <Link to='/users/new'>New User</Link><br />
        <Paper className={this.props.classes.root}>
          <Table className={this.props.classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>E-mail</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.props.users.list.map((user: User) => {
                return (
                  <TableRow key={user._id}>
                    <TableCell><Link to={`/users/${user._id}`}>{user.firstName + ' ' + user.lastName}</Link></TableCell>
                    <TableCell>{user.email}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  count={this.props.users.count}
                  rowsPerPage={this.props.users.itemsPerPage}
                  page={this.props.users.page - 1}
                  onChangePage={this.handleChangePage}
                  onChangeRowsPerPage={this.handleChangeRowsPerPage}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </Paper>
      </div>;
  }

}


// {this.props.users.list.map((user: User) => <div key={user._id}><Link to={`/users/${user._id}`}>{`${user.firstName} ${user.lastName}`}</Link></div>)}

export default connect(
  state => ({
    users: state.users
  }),
  {
    getUsers: getUsers,
  })(withStyles(styles)(UsersList));
