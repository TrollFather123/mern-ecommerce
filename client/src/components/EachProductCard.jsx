import { Box, styled, Typography } from "@mui/material";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

const EachProductCardWrapper = styled(Box)`
  .product_fig {
    figure {
      height: 250px;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
  .product_content {
    h3 {
      font-size: 24px;
    }
    h4 {
      font-size: 18px;
    }
    h5 {
      font-size: 16px;
    }
    p {
      font-size: 14px;
    }
  }
`;

const settings = {
  dots: false,
  arrows: false,
  infinite: true,
  autoplay: true,
  autoplaySpeed: 3500,
  pauseOnHover: false,
  speed: 1500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

const EachProductCard = ({
  brandName,
  productName,
  category,
  productImages,
  description,
  sellingPrice,
  price,
}) => {
  return (
    <EachProductCardWrapper>
      <Box className="product_fig">
        {!!productImages && productImages?.length && (
          <Slider {...settings}>
            {productImages?.map((image, index) => (
              <figure key={index}>
                <img src={image} alt="product_images" />
              </figure>
            ))}
          </Slider>
        )}
      </Box>
      <Box className="product_content">
        <Typography variant="h3">Product Name: {productName}</Typography>
        <Typography variant="h4">Brand Name: {brandName}</Typography>
        <Typography variant="h5">Category: {category}</Typography>
        <Typography>Description: {description}</Typography>
        <Typography>
          <Typography variant="caption" sx={{ textDecoration: "line-through" }}>
            Price: {price}{" "}
          </Typography>

          <Typography variant="caption">Offer Price: {sellingPrice}</Typography>
        </Typography>
      </Box>
    </EachProductCardWrapper>
  );
};

export default EachProductCard;
