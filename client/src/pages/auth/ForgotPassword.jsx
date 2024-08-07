import {
  Container,
  Paper,
  Grid,
  TextField,
  Stack,
  Typography,
  Button,
} from "@mui/material";
import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import { changePassword, loginUser, signupUser } from "../../redux/slice/userSlice";
import { toast } from "react-toastify";
import { LoginWrapper } from "./SignUp";

const userSchema = yup.object().shape({
  newPassword: yup
    .string()
    .trim()
    .min(8, "Password must be at least 8 characters")
    .required("Password is Required!!!"),

  confirmNewPassword: yup
    .string()
    .trim()
    .oneOf([yup.ref("newPassword"), null], "Passwords must match")
    .required("Confirm Password is Required!!!"),
});

const ForgotPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { handleSubmit, control } = useForm({
    resolver: yupResolver(userSchema),
    defaultValues: {
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const {id} = useParams()

  const formSubmit = (data) => {
    dispatch(changePassword({id,body:data}))
      .unwrap()
      .then((response) => {
        if (response && response.message) {
          toast.success(response.message);
          setTimeout(() => {
            navigate("/auth/login");
          }, 1000);
        }
      })
      .catch((err) => {
        if (err && err.message) {
          toast.error(err.message);
        }
      });
  };

  return (
    <LoginWrapper>
      <Container fixed>
        <Paper
          className="cmn_form"
          component="form"
          onSubmit={handleSubmit(formSubmit)}
        >
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Controller
                name="newPassword"
                control={control}
                render={({
                  field: { onChange, value },
                  fieldState: { invalid, error },
                }) => (
                  <TextField
                    fullWidth
                    placeholder="Enter New Password"
                    onChange={onChange}
                    value={value}
                    helperText={error?.message}
                    error={invalid}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="confirmNewPassword"
                control={control}
                render={({
                  field: { onChange, value },
                  fieldState: { invalid, error },
                }) => (
                  <TextField
                    fullWidth
                    placeholder="Confirm New Password"
                    onChange={onChange}
                    value={value}
                    helperText={error?.message}
                    error={invalid}
                  />
                )}
              />
            </Grid>

         
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                type="submit"
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </LoginWrapper>
  );
};

export default ForgotPassword;
