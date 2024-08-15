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
  import { Link, useNavigate } from "react-router-dom";
  import * as yup from "yup";
  import { Controller, useForm } from "react-hook-form";
  import { yupResolver } from "@hookform/resolvers/yup";
  import { useDispatch } from "react-redux";
  import { resetPassword } from "../../redux/slice/userSlice";
  import { toast } from "react-toastify";
  import { LoginWrapper } from "./SignUp";
  
  
  const userSchema = yup.object().shape({
    email: yup
      .string()
      .trim()
      .email("Invalid email format")
      .required("Email is Required!!!"),
  });
  
  
  
  const ResetPassword = () => {
  
    const dispatch = useDispatch();
  
    const { handleSubmit, control } = useForm({
      resolver: yupResolver(userSchema),
      defaultValues: {
        email: "",
      },
    });
  
    const formSubmit = (data) => {
      dispatch(resetPassword(data))
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
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography>
                  Did not get link?
                  <Button onClick={()=>handleSubmit(formSubmit)} >Resend Link</Button>
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
    )
  }
  
  export default ResetPassword