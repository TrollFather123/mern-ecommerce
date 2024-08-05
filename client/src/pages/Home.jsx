import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrentUser } from '../redux/slice/userSlice';
import { Box, Container, styled, Typography } from '@mui/material';
import AuthGuard from '../components/AuthGuard';
import { useAuth } from '../hooks/useAuth';

const CommonWrapper = styled(Box)`
  padding: 100px 0;
`

const Home = () => {


  const {user} = useAuth()


  console.log(user,"user")

  return (
    <CommonWrapper>
      <Container fixed>
        <Typography variant='h2'>Hello {user?.name}</Typography>
      </Container>
      {/* <AuthGuard/> */}
    </CommonWrapper>
  )
}

export default Home