import { Box, Container, styled } from "@mui/material";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import img1 from "../../assest/banner/img1.webp";
import img2 from "../../assest/banner/img2.webp";
import img3 from "../../assest/banner/img3.jpg";
import img4 from "../../assest/banner/img4.jpg";
import img5 from "../../assest/banner/img5.webp";

const BannerSecWrapper = styled(Box)`
figure{
  height: 400px;
  img{
    width: 100%;
    height: 100%;
    object-fit: cover;
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

const BannerSec = () => {
  const productImages = [
    {
      image: img1,
    },
    {
      image: img2,
    },
    {
      image: img3,
    },
    {
      image: img4,
    },

    {
      image: img5,
    },
  ];
  return (
    <BannerSecWrapper>
      <Container maxWidth="xl" fixed>
        <Slider {...settings}>
          {productImages?.map((data, index) => (
            <figure key={index}>
              <img src={data?.image} alt="product_images" />
            </figure>
          ))}
        </Slider>
      </Container>
    </BannerSecWrapper>
  );
};

export default BannerSec;
