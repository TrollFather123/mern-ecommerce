import {
  Box,
  Container,
  Paper,
  styled,
  Grid,
  TextField,
  Stack,
  Typography,
  Button,
} from "@mui/material";
import React from "react";

import { Link } from "react-router-dom";
import { LoginWrapper } from "./SignUp";



const Login = () => {
  return (
    <LoginWrapper>
      <Container fixed>
        <Paper className="cmn_form">
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField fullWidth placeholder="Enter Email" />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth placeholder="Enter Password" />
            </Grid>

            <Grid item xs={12}>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography>
                  Don't have an account? <Link to={"/auth/signup"}>Sign Up</Link>
                </Typography>
                <Link>Forgot Password?</Link>
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" fullWidth>
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
