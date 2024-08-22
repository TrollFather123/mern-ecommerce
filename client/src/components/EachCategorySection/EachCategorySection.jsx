import { Box, Container, Grid, styled, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductsByCategory } from "../../redux/slice/productSlice";
import EachProductCard from "../EachProductCard";

const EachCategorySectionWrapper = styled(Box)`
  padding: 50px 0 0 0;
`;

const EachCategorySection = ({ categoryName }) => {
  const [productList, setProductList] = useState([]);
  const disapatch = useDispatch();
  const { isGetAllProductsByCategory } = useSelector((s) => s.product);
  useEffect(() => {
    if (categoryName) {
      disapatch(getProductsByCategory(categoryName))
        .unwrap()
        .then((res) => {
          if (res?.data) {
            setProductList(res?.data);
          }
        });
    }
  }, [categoryName]);

  return (
    <EachCategorySectionWrapper>
     <Container maxWidth="xl" fixed>
        <Typography
          variant="h5"
          sx={{ textTransform: "capitalize", marginBottom: "30px" }}
        >
          {categoryName}
        </Typography>
        {isGetAllProductsByCategory ? (
          <Typography variant="h6">Loading...</Typography>
        ) : (
          <Box>
            <Grid container spacing={3}>
              {!!productList &&
                productList?.length &&
                productList?.map((item) => (
                  <Grid item lg={3} xs={12} key={item?.description}>
                    <EachProductCard
                      productImages={item?.productImages}
                      productName={item?.productName}
                      price={item?.price}
                      sellingPrice={item?.sellingPrice}
                      _id={item?._id}
                      isEdit={false}
                      isAddToCart
                    />
                  </Grid>
                ))}
            </Grid>
          </Box>
        )}
      </Container>
    </EachCategorySectionWrapper>
  );
};

export default EachCategorySection;
