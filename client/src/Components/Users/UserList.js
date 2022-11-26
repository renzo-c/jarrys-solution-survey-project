import React from "react";
import { Link } from "react-router-dom";
import {
  Grid,
  Button,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from "@mui/material";

const UserList = ({ users, deleteUser }) => {
  if (users === null || !users.length) {
    return <div>No users have been created</div>;
  }

  return (
    <Grid container>
      <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
        <TableHead>
          <TableCell align="center">Username</TableCell>
          <TableCell align="center">Email</TableCell>
          <TableCell align="center">Password</TableCell>
          <TableCell align="center">Actions</TableCell>
        </TableHead>
        <TableBody>
          {users && users.length
            ? users.map((user, index) => (
                <TableRow hover key={index}>
                  <TableCell align="center">{user.username}</TableCell>
                  <TableCell align="center">{user.email}</TableCell>
                  <TableCell align="center">******</TableCell>
                  <TableCell align="center">
                    <Link
                      style={{ textDecoration: "none", marginRight: "5px" }}
                      to={`/users/display-user/${user._id}`}
                    >
                      <Button variant="outlined">Show</Button>
                    </Link>
                    <Link
                      style={{ textDecoration: "none", marginLeft: "5px" }}
                      to={`/users/update-user/${user._id}`}
                    >
                      <Button variant="outlined">Update</Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))
            : null}
        </TableBody>
      </Table>
    </Grid>
  );
};

export default UserList;
