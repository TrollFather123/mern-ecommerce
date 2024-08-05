import {
  Container,
  Paper,
  Grid,
  TextField,
  Stack,
  Typography,
  Button,
  Box,
} from "@mui/material";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import { loginUser, signupUser } from "../../redux/slice/userSlice";
import SigninAvatar from "../../assest/signin.gif";
import { toast } from "react-toastify";
import { LoginWrapper } from "./SignUp";

const userSchema = yup.object().shape({
  email: yup
    .string()
    .trim()
    .email("Invalid email format")
    .required("Email is Required!!!"),

  password: yup
    .string()
    .trim()
    .min(8, "Password must be at least 8 characters")
    .required("Password is Required!!!"),
});

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { handleSubmit, control } = useForm({
    resolver: yupResolver(userSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const formSubmit = (data) => {
    dispatch(loginUser(data))
      .unwrap()
      .then((response) => {
        if (response && response.message) {
          toast.success(response.message);
          setTimeout(() => {
            navigate("/");
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
          <Box className="profile_img">
                     
                     <img src={SigninAvatar} alt="avatar" />
                   </Box>
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="email"
                control={control}
                render={({
                  field: { onChange, value },
                  fieldState: { invalid, error },
                }) => (
                  <TextField
                    fullWidth
                    placeholder="Enter Email"
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
                name="password"
                control={control}
                render={({
                  field: { onChange, value },
                  fieldState: { invalid, error },
                }) => (
                  <TextField
                    fullWidth
                    placeholder="Enter Password"
                    onChange={onChange}
                    value={value}
                    helperText={error?.message}
                    error={invalid}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography>
                  Don't have an account?{" "}
                  <Link to={"/auth/signup"}>Sign Up</Link>
                </Typography>
                <Link>Forgot Password?</Link>
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                type="submit"
              >
                Sign In
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </LoginWrapper>
  );
};

export default Login;
