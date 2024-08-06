import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../redux/slice/userSlice";
import { Box, Button, styled, Typography } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import UpdateUserRole from "../components/UpdateUserRole";

const AllUsersWrapper = styled(Box)``;

const AllUsers = () => {
  const [userList, setUserList] = useState([]);
  const { isUserPending } = useSelector((s) => s.user);
  const dispatch = useDispatch();

  const handelCallAllusers = () => {
    dispatch(getAllUsers())
      .unwrap()
      .then((response) => {
        setUserList(response?.data);
      });
  };

  useEffect(() => {
    handelCallAllusers();
  }, []);

  return (
    <AllUsersWrapper>
      {isUserPending ? (
        <Typography variant="h2">Loading...</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Sr.</TableCell>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">Email</TableCell>
                <TableCell align="center">Role</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!!userList &&
                userList.length &&
                userList.map((row, index) => (
                  <TableRow
                    key={row.email}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>{index + 1}</TableCell>
                    <TableCell align="center">{row.name}</TableCell>
                    <TableCell align="center">{row.email}</TableCell>
                    <TableCell align="center">{row.role}</TableCell>
                    <TableCell align="center">
                      <UpdateUserRole {...row} handelCallAllusers={handelCallAllusers}/>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </AllUsersWrapper>
  );
};

export default AllUsers;
