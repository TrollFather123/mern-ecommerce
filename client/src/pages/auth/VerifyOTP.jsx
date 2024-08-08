import {
  Container,
  Paper,
  Grid,
  TextField,
  Stack,
  Typography,
  Button,
} from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import {
  resendOTP,
  resetPassword,
  verifyOTP,
} from "../../redux/slice/userSlice";
import { toast } from "react-toastify";
import { LoginWrapper } from "./SignUp";
import OtpInput from "react-otp-input";
import { parseCookies } from "nookies";

const userSchema = yup.object().shape({
  otp: yup.string().trim().required("Please Enter OTP"),
});

const VerifyOTP = () => {
  const dispatch = useDispatch();

  const { handleSubmit, control } = useForm({
    resolver: yupResolver(userSchema),
    defaultValues: {
      email: "",
    },
  });

  const cookies = parseCookies();
  const id = cookies?.userID;

  console.log(id)


  const navigate = useNavigate();

  const formSubmit = (data) => {
    const payload = {
        otp:data?.otp,
        id
    }
    dispatch(verifyOTP(payload))
      .unwrap()
      .then((response) => {
        if (response && response.message) {
          toast.success(response.message);
          setTimeout(() => {
            navigate("/");
          }, 1500);
        }
      })
      .catch((err) => {
        if (err && err.message) {
          toast.error(err.message);
        }
      });
  };

  const handelResendOTP = () => {
    const payload = {
        id
    }
    dispatch(resendOTP(payload))
      .unwrap()
      .then((response) => {
        if (response && response.message) {
          toast.success(response.message);
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
                name="otp"
                control={control}
                render={({
                  field: { onChange, value },
                  fieldState: { invalid, error },
                }) => (
                  <>
                    <OtpInput
                      value={value}
                      onChange={onChange}
                      numInputs={6}
                      renderSeparator={<span>-</span>}
                      renderInput={(props) => <input {...props} />}
                    />
                    {invalid && <Typography>{error?.message}</Typography>}
                  </>
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
                  Did not get OTP?
                  <Button onClick={() => handelResendOTP()}>
                    Resend
                  </Button>
                </Typography>
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

export default VerifyOTP;
