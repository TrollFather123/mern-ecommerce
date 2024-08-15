import { Box, List, ListItem, styled, Typography } from "@mui/material";
import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch } from "react-redux";
import { getAllUsers, updateUserRole } from "../redux/slice/userSlice";
import { toast } from "react-toastify";

const UpdateUserRoleWrapper = styled(Box)``;

const UpdateUserRole = ({ name, email, role, _id ,handelCallAllusers}) => {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [value, setValue] = React.useState(role);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  console.log(_id, "_id");

  const handleUpdate = () => {
    const data = {
      name,
      email,
      role: value,
    };
    dispatch(updateUserRole({ id: _id, body: data }))
      .unwrap()
      .then((res) => {
        if (res && res?.message) {
          toast.success(res?.message);
          handelCallAllusers()
        }
      })
      .catch((err) => {
        if (err ) {
          toast.error(err?.message);
        }
      });
  };

  return (
    <UpdateUserRoleWrapper>
      <Button
        onClick={() => {
          handleClickOpen();
        }}
      >
        <EditIcon />
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            minWidth: "600px",
          },
        }}
      >
        <DialogTitle>Change User Role</DialogTitle>
        <DialogContent>
          <List>
            <ListItem>Name: {name}</ListItem>
            <ListItem>Email: {email}</ListItem>
          </List>
          <Typography variant="h6">Select Role</Typography>
          <FormControl sx={{ m: 1, minWidth: "100%" }}>
            <Select
              value={value}
              onChange={handleChange}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
              fullWidth
            >
              <MenuItem value="" sx={{ display: "none" }}>
                {role}
              </MenuItem>
              <MenuItem value={"GENERAL"}>GENERAL</MenuItem>
              <MenuItem value={"ADMIN"}>ADMIN</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center" }}>
          <Button variant="contained" color="primary" onClick={handleUpdate}>
            Update User Role
          </Button>
        </DialogActions>
      </Dialog>
    </UpdateUserRoleWrapper>
  );
};

export default UpdateUserRole;
