import { Box, Button, Grid, Stack, styled, Typography } from "@mui/material";

import React, { useCallback, useEffect, useState } from "react";

import UploadProductForm from "../components/UploadProductForm";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../redux/slice/productSlice";
import { toast } from "react-toastify";

import EachProductCard from "../components/EachProductCard";

const AllProductsWrapper = styled(Box)``;



const AllProducts = () => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();

  const { isProductFetchPending } = useSelector((s) => s.product);

  const [productList, setProductList] = useState([]);

  const fetchAllProducts = useCallback(() =>{
    dispatch(getProducts())
    .unwrap()
    .then((res) => {
      if (res?.status === 200) {
        setProductList(res?.data);
        toast.success(res?.message);
      }
    })
    .catch((err) => {
      if (err) {
        toast.error(err?.message);
      }
    });
  },[])

  useEffect(() => {
    fetchAllProducts()
  },[]);


  return (
    <AllProductsWrapper>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        flexWrap="wrap"
        sx={{marginBottom:"50px"}}
      >
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          {" "}
          All Products
        </Typography>
        <Button variant="contained" color="primary" onClick={handleClickOpen}>
          Upload Product
        </Button>
      </Stack>
      <UploadProductForm open={open} onClose={handleClose} handelFetchProduct={fetchAllProducts}/>
      {isProductFetchPending ? (
        <Typography variant="h3" sx={{ fontWeight: "bold" }}>
          Loading...
        </Typography>
      ) : (
        <Box>
            <Grid container spacing={3}>
              {!!productList && productList?.length && productList?.map((item) => (
                <Grid item lg={3} xs={12} key={item?.description}>
                  <EachProductCard {...item} fetchAllProducts={fetchAllProducts}/>
                </Grid>
              ))}
            </Grid>
      
        </Box>
      )}
    </AllProductsWrapper>
  );
};

export default AllProducts;
