import { Box, Container, Stack, styled, Typography } from "@mui/material";
import React from "react";

const FooterWrapper = styled(Box)`
  padding: 20px 0;
  background-color: #1976d2;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  z-index: 9;
  p{
    color: #fff;
  }
`;

const Footer = () => {
  return (
    <FooterWrapper>
      <Container fixed>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography>Copyright Claim</Typography>
          <Typography>By Abhisek</Typography>
        </Stack>
      </Container>
    </FooterWrapper>
  );
};

export default Footer;
