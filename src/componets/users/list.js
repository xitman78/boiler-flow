import React, {Component} from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import { withStyles } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableHead, TableRow, TableFooter, TableSortLabel,
  TablePagination, } from 'material-ui/Table';
import Tooltip from 'material-ui/Tooltip';
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';
import PersonAdd from 'material-ui-icons/PersonAdd'
import {createStructuredSelector} from 'reselect';

import {getUsers} from "../../actions/usersActions";

import type {StoreType, UsersState} from "../../store/storeTypes";

import './list.css';

const styles = theme => ({
});

type Props = {
  users: UsersState,
  getUser: (page?: number, perPage?: number) => ActionType,
  classes: {},
};

class UsersList extends Component<Props, {perPage: number, page: number}> {

  componentWillMount() {
    this.setState({perPage: this.props.users.itemsPerPage, page: this.props.users.page});
    this.props.getUsers();
  }

  handleChangePage = (event, page) => {
    this.setState({page: page + 1});
    //Fix - prevent load users twice
    if ((page +1) !== this.props.users.page || this.props.users.itemsPerPage !== this.state.perPage) {
      this.props.getUsers(page + 1, this.state.perPage);
    }

  };

  handleChangeRowsPerPage = (event) => {
    this.setState({perPage: event.target.value, page: 1});
    this.props.getUsers(1, event.target.value);
  };

  createSortHandler =  property => event => {
    console.log('createSortHandler', property);
  };

  render() {

    return <div className="users-list-container">
        <Paper className="users-list-root">
          <div className="user-list-table-header">
            <div className="user-list-table-title">
              <Typography type="title">User Accounts</Typography>
            </div>
            <div className="user-list-table-new-icon">
              <Button fab mini color="primary" aria-label="Create User" component={Link} to='/users/new'>
                <PersonAdd color="inherit" style={{ fontSize: 26 }} />
              </Button>
            </div>
          </div>
          <Table className="users-list-table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <Tooltip
                    title="Sort by name"
                    placement={true ? 'bottom-end' : 'bottom-start'}
                    enterDelay={300}
                  >
                    <TableSortLabel
                      active={true}
                      direction={'asc'}
                      onClick={this.createSortHandler('name')}
                    >
                      Name
                    </TableSortLabel>
                  </Tooltip>
                  </TableCell>
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


const selector = createStructuredSelector({
  users: (state: StoreType) => state.users,
  });

const actionsMap = {
  getUsers: getUsers,
};

export default connect(selector, actionsMap)(withStyles(styles)(UsersList));
