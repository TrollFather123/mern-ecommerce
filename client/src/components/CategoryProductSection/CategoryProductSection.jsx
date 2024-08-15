import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSingleProductByCategory } from "../../redux/slice/productSlice";
import { Box, Container, Grid, styled, Typography } from "@mui/material";




const CommonWrapper = styled(Box)`
  padding: 30px 0;
  .category_wrapper {
    /* padding: 0 10px;
    margin: 0 auto; */
    overflow-x: auto;
    &::-webkit-scrollbar {
      display: none;
    }
    /* @media (min-width: 1920px) {
      max-width: 1900px;
    } */
  }
  .category_wrapper_inner {
    min-width: 1370px;
  }
`;

const EachCategoryProductWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  figure {
    height: 80px;
    width: 80px;
    background-color: #afafaf;
    border-radius: 100%;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
  h6 {
    text-transform: capitalize;
  }
`;

const EachCategoryProduct = ({ image, category }) => {
  return (
    <EachCategoryProductWrapper>
      <figure>
        <img src={image} alt="product_img" />
      </figure>
      <Typography variant="h6">{category}</Typography>
    </EachCategoryProductWrapper>
  );
};


const CategoryProductSection = () => {


    const { singleCategoryProductList, isSingleCategoryProductFetching } =
      useSelector((s) => s.product);
  
    const [singleProductList, setsingleProductList] = useState([]);
  
    const dispatch = useDispatch();
  
    useEffect(() => {
      dispatch(getSingleProductByCategory());
    }, [dispatch]);
  
    useEffect(() => {
      if (singleCategoryProductList?.length) {
        setsingleProductList(singleCategoryProductList);
      }
    }, [singleCategoryProductList]);
  
    console.log(singleProductList, "singleProductList");
  return (
    <CommonWrapper>
      {isSingleCategoryProductFetching ? (
        <Typography variant="h3">Loading....</Typography>
      ) : (
        <Container maxWidth="xl" fixed>
          <Box className="category_wrapper">
            <Box className="category_wrapper_inner">
              <Grid container spacing={2}>
                {!!singleProductList &&
                  singleProductList?.length &&
                  singleProductList.map((data) => (
                    <Grid item xs={1} key={data?.category}>
                      <EachCategoryProduct
                        {...data}
                        image={data?.productImages[0]}
                      />
                    </Grid>
                  ))}
              </Grid>
            </Box>
          </Box>
      
          </Container>
      )}
    </CommonWrapper>
  )
}

export default CategoryProductSection