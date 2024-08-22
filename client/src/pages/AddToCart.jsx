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
import {
  completeOrder,
  fetchPayment,
  getOrders,
  makePayment,
} from "../redux/slice/orderSlice";
import { useDispatch, useSelector } from "react-redux";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import AdjustQuantity from "../components/AdjustQuantity/AdjustQuantity";
import { useAuth } from "../hooks/useAuth";
import { toast } from "react-toastify";

const AddToCartWrapper = styled(Box)`
  padding: 50px 0 100px 0;
  .title {
    padding: 12px 15px;
  }
  .place_order_txt {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px;
  }
`;

const AddToCart = () => {
  const { user } = useAuth();
  const dispatch = useDispatch();
  const { orders, isOrderFetching ,isOrderCompletePending} = useSelector((s) => s.order);

  React.useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);



  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const makeRazorpayPayment = async (amount) => {
    const data = {
      amount: amount * 100,
      currency: "INR",
    };

    dispatch(makePayment(data))
      .unwrap()
      .then((res) => {
        if (res) {
          handelRazorpayScreen(res?.data);
        }
      })
      .catch((err) => {
        if (err) {
          toast.error(err?.message);
        }
      });
  };

  const handelRazorpayScreen = async (data) => {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      toast.error("some error happened!!");
      return;
    }

    const options = {
      key: process.env.RAZOR_PAY_KEY_ID,
      amount: Math.floor(data?.currency / 100),
      currency: data?.currency,
      order_id: data?.id,
      name: "Abhisek E-Commerce",
      description: "Payment to Abhisek E-Commerce",
      image: "https://example.com/your_logo",

      handler: async function (response) {
        dispatch(fetchPayment(response?.razorpay_payment_id))
          .unwrap()
          .then((res) => {
            if (res) {
              dispatch(completeOrder(user._id)).unwrap().then((res)=>{
                if(res){
                  dispatch(getOrders())
                }
              })
              toast.success(
                `${res?.data?.description} has been done successfully!!`

              );
            }
          });
      },
      prefill: {
        name: user?.name,
        email: user?.email,
      },
      notes: {
        address: "Abhisek e-commerce demo",
      },
      theme: {
        color: "#22770f",
      },
    };

    const paymentObject = new window.Razorpay(options);

    paymentObject.open();
  };

  return (
    <AddToCartWrapper>
      <Container fixed>
        {isOrderFetching ? (
          <Typography variant="h2">Loading...</Typography>
        ) : (
          <>
            {!orders ? (
              <Box className="nothing_in_cart">
                <Typography>Oops there is nothing in cart!!!</Typography>
              </Box>
            ) : (
              <Grid container spacing={3}>
                <Grid item md={8} xs={12}>
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>
                            <Typography variant="h6">Product Name</Typography>
                          </TableCell>
                          <TableCell align="right">
                            <Typography variant="h6">Quantity</Typography>
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
                            <TableCell align="right" sx={{ width: "150px" }}>
                              {/* {row.quantity} */}
                              <AdjustQuantity
                                order_id={row?.order_id}
                                quantity={row?.quantity}
                              />
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
                      <Table
                        sx={{ minWidth: "100%" }}
                        aria-label="simple table"
                      >
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
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
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
                    <Divider />
                    {!isOrderCompletePending ? (
                      <Typography className="place_order_txt">
                        Order has been Placed
                      </Typography>
                    ) : (
                      <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={() => makeRazorpayPayment(orders?.totalPrice)}
                      >
                        Make Payment
                      </Button>
                    )}
                  </Paper>
                </Grid>
              </Grid>
            )}
          </>
        )}
      </Container>
    </AddToCartWrapper>
  );
};

export default AddToCart;
