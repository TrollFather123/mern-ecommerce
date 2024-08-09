import {
  Box,
  Container,
  Paper,
  Grid,
  TextField,
  Stack,
  Typography,
  Button,
  styled,
} from "@mui/material";
import React from "react";
import SigninAvatar from "../../assest/signin.gif";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {  useDispatch } from "react-redux";
import useImageUpload from "../../utils/imageConverter";
import { signupUser } from "../../redux/slice/userSlice";
import { toast } from "react-toastify";
import { setCookie } from "nookies";

export const LoginWrapper = styled(Box)`
  padding: 50px 0;
  .cmn_form {
    max-width: 600px;
    border-radius: 20px;
    padding: 20px;
    margin: 0 auto;
  }
  .profile_img {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100px;
    height: 100px;
    border-radius: 100%;
    overflow: hidden;
    margin: 0 auto;
    position: relative;
    input {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
      z-index: 9;
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`;

const userSchema = yup.object().shape({
  name: yup.string().trim().required("Name is Required!!!"),

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

  confirmPassword: yup
    .string()
    .trim()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is Required!!!"),

  profilePic: yup
    .mixed()
    .required("Profile picture is required")
    .test("fileType", "Unsupported file format", (value) => {
      if (!value) return false;
      const supportedFormats = ["image/jpeg", "image/png", "image/gif"];
      return supportedFormats.includes(value.type);
    }),
});

const SignUp = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();

  const { image, handleImageUpload } = useImageUpload();

  const onFileChange = (file) => {
    handleImageUpload(file);
  };

  const { handleSubmit, control, setValue } = useForm({
    resolver: yupResolver(userSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      profilePic: null,
    },
  });

  const formSubmit = (data) => {
    // setValue("profilePic", data.profilePic.name);
    const payload = {
      ...data,
      role:"GENERAL"
    }

    console.log(data,"signup")
    dispatch(signupUser(payload))
      .unwrap()
      .then((response) => {
        if (response && response.message) {
          toast.success(response.message);
          navigate(`/auth/verify-otp`);
    
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
                name="profilePic"
                control={control}
                render={({
                  field: { onChange },
                  fieldState: { invalid, error },
                }) => (
                  <>
                    <Box className="profile_img">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          onFileChange(e.target.files[0]);
                          onChange(e.target.files[0]);
                        }}
                      />
                      <img src={image || SigninAvatar} alt="avatar" />
                    </Box>
                    {invalid && (
                      <Typography sx={{ color: "red" }}>
                        {error?.message}
                      </Typography>
                    )}
                  </>
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="name"
                control={control}
                render={({
                  field: { onChange, value },
                  fieldState: { invalid, error },
                }) => (
                  <TextField
                    fullWidth
                    placeholder="Enter Name"
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
              <Controller
                name="confirmPassword"
                control={control}
                render={({
                  field: { onChange, value },
                  fieldState: { invalid, error },
                }) => (
                  <TextField
                    fullWidth
                    placeholder="Enter Confirm Password"
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
                  Already have an account?{" "}
                  <Link to={"/auth/login"}>Sign In</Link>
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
                Sign Up
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </LoginWrapper>
  );
};

export default SignUp;
