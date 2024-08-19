import {
  Box,
  Container,
  styled,
  Grid,
  Typography,
  Divider,
  Stack,
  Button,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { getOrders } from "../redux/slice/orderSlice";
import { useDispatch, useSelector } from "react-redux";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import AdjustQuantity from "../components/AdjustQuantity/AdjustQuantity";

const AddToCartWrapper = styled(Box)`
  padding: 50px 0 100px 0;
  .title {
    padding: 12px 15px;
  }
`;

const AddToCart = () => {
  const dispatch = useDispatch();
  const { orders,isOrderPending } = useSelector((s) => s.order);

  React.useEffect(() => {
    dispatch(getOrders());
  }, []);

  return (
    <AddToCartWrapper>
      <Container fixed>
        {
            isOrderPending ? <Typography variant="h2">Loading...</Typography>
            :
            <Grid container spacing={3}>
            <Grid item md={8} xs={12}>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <Typography variant="h6">Product Name</Typography>
                      </TableCell>
                      <TableCell align="right" >
                        <Typography variant="h6">Quantity</Typography>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {orders?.productList.map((row) => (
                      <TableRow
                        key={row.name}
                        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                      >
                        <TableCell>{row.productName}</TableCell>
                        <TableCell align="right" sx={{width:'150px'}}>
                            {/* {row.quantity} */}
                            <AdjustQuantity order_id={row?.order_id} quantity={row?.quantity}/>
                            </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
            <Grid item md={4} xs={12}>
              <Paper>
                <Box className="title">
                  <Typography variant="h6">Order Details</Typography>
                </Box>
                <Divider />
                <TableContainer>
                  <Table sx={{ minWidth: "100%" }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>
                          <Typography variant="h6">Product Name</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="h6">Quantity</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="h6">Price</Typography>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {orders?.productList.map((row) => (
                        <TableRow
                          key={row.name}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell>{row.productName}</TableCell>
                          <TableCell>
                            {row.quantity} x {row?.price}
                          </TableCell>
                          <TableCell align="right">
                            {Math.floor(row.quantity * row.price)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <Divider />
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  sx={{ padding: "16px" }}
                >
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: "bold", fontSize: "14px" }}
                  >
                    Total
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: "bold", fontSize: "14px" }}
                  >
                    {orders?.totalPrice}
                  </Typography>
                </Stack>
                <Divider/>
                <Button variant="contained" color="primary" fullWidth>
                    Make Payment
                </Button>
              </Paper>
            </Grid>
          </Grid>
        }
     
      </Container>
    </AddToCartWrapper>
  );
};

export default AddToCart;
