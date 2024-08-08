import { Box, IconButton, styled, Typography } from "@mui/material";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import EditProductForm from "./EditProductForm";
import EditIcon from "@mui/icons-material/Edit";
import currencyINRConvertor from "../utils/currencyConvertor";

const EachProductCardWrapper = styled(Box)`
  background-color: #fff;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
  position: relative;
  &:hover {
    .edit_icon {
      opacity: 1;
    }
  }
  .edit_icon {
    width: 30px;
    height: 30px;
    background-color: rgba(0, 0, 0, 0.25);
    min-width: auto;
    padding: 0;
    border-radius: 100%;
    position: absolute;
    right: 20px;
    top: 20px;
    opacity: 0;
    z-index: 99;
    transition: all 0.5s ease;
  }
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
  _id,
  fetchAllProducts,
}) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <EachProductCardWrapper>
      <IconButton className="edit_icon">
        <EditIcon
          onClick={() => {
            handleClickOpen();
          }}
          sx={{ color: "#fff" }}
        />
      </IconButton>
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
        <Typography sx={{ textDecoration: "line-through" ,color:'red'}}>
          Price: {currencyINRConvertor(price)}{" "}
        </Typography>
        <Typography>
          Offer Price: {currencyINRConvertor(sellingPrice)}
        </Typography>
      </Box>
      {open && (
        <EditProductForm
          open={open}
          _id={_id}
          onClose={handleClose}
          fetchAllProducts={fetchAllProducts}
        />
      )}
    </EachProductCardWrapper>
  );
};

export default EachProductCard;
