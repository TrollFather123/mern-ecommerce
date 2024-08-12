import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  List,
  ListItem,
  MenuItem,
  Select,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DeleteIcon from "@mui/icons-material/Delete";
import DialogContent from "@mui/material/DialogContent";
import React, { useCallback, useEffect, useState } from "react";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { categoryList } from "../utils/categoryList.mock";
import { uploadImage } from "../api/api.functions";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { createProduct } from "../redux/slice/productSlice";
import useImageUpload from "../hooks/useImageUpload";
import useImageConverter from "../utils/imageConverter";

export const UploadProductFormWrapper = styled(Box)``;

export const UplaodProductWrapper = styled(Box)`
  .product_img {
    min-height: 50px;
  }
  .show_images {
    ul {
      display: flex;
      flex-wrap: wrap;
      margin: -10px;
      li {
        width: calc(100% / 4);
        padding: 10px;
        figure {
          height: 150px;
          position: relative;
          button {
            position: absolute;
            right: 5px;
            top: 5px;
            background-color: rgba(0, 0, 0, 0.5);
            border-radius: 100%;
            padding: 0;
            width: 30px;
            height: 30px;
            z-index: 1;
            opacity: 0;
          }
          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          &:hover {
            button {
              opacity: 1;
            }
          }
        }
      }
    }
  }
`;

const productSchema = yup.object().shape({
  productName: yup.string().trim().required("product name is Required!!!"),
  brandName: yup.string().trim().required("brand name is Required!!!"),
  category: yup.string().trim().required("category is Required!!!"),
  productImages: yup
    .array()
    .of(
      yup
        .mixed()
        .required("Product Image is required")
        .test("fileType", "Unsupported file format", (value) => {
          if (!value) return false;
          const supportedFormats = [
            "image/jpeg",
            "image/png",
            "image/gif",
            "image/webp",
          ];
          return supportedFormats.includes(value.type);
        })
    )
    .min(1, "At least one product image is required")
    .required("Product Images are required"),
  description: yup.string().trim().required("description is Required!!!"),
  price: yup.number().required("price is Required!!!"),
  sellingPrice: yup.number().required("selling price is Required!!!"),
});

const UploadProductForm = ({ open, onClose, handelFetchProduct }) => {
  const dispatch = useDispatch();

  const { handleSubmit, control, watch, setValue, getValues } = useForm({
    resolver: yupResolver(productSchema),
    defaultValues: {
      brandName: "",
      productName: "",
      category: "",
      productImages: [],
      description: "",
      price: null,
      sellingPrice: null,
    },
  });

  // const [getProductImages,setGetProductImages] = useState([])

  // useEffect(()=>{
  //   if(getValues("productImages")){
  //     setGetProductImages(getValues)
  //   }

  // },[getValues])

  // console.log(getProductImages,"getProductImages");

  const [imageList, setImageList] = useState([]);

  const { image, handleImageUpload } = useImageConverter();

  useEffect(() => {
    if (image?.length) {
      setImageList(image);
    }
  }, [image]);

  // const handleDeleteImage = (indexNumber) => {
  //   const newProductImages = getProductImages.filter(
  //     (_data, index) => index !== indexNumber
  //   );

  //   setValue("productImages", newProductImages);

  //   const updatedImageList = imageList.filter(
  //     (_, index) => index !== indexNumber
  //   );

  //   setImageList(updatedImageList);
  // };

  const formSubmit = (productData) => {
    const formData = new FormData();

    formData.append("brandName", productData.brandName);
    formData.append("productName", productData.productName);
    formData.append("category", productData.category);
    formData.append("description", productData.description);
    formData.append("price", productData.price);
    formData.append("sellingPrice", productData.sellingPrice);

    productData.productImages.forEach((file, index) => {
      formData.append("productImages", file);
    });

    dispatch(createProduct(formData))
      .unwrap()
      .then((res) => {
        if (res) {
          toast.success(res?.message);
          onClose();
          handelFetchProduct();
        }
      })
      .catch((err) => {
        if (err) {
          toast.error(err?.message);
        }
      });
  };
  return (
    <UploadProductFormWrapper>
      <Dialog
        open={open}
        onClose={onClose}
        PaperProps={{
          sx: {
            minWidth: "600px",
          },
        }}
      >
        <DialogContent>
          <Box
            className="cmn_form"
            component="form"
            onSubmit={handleSubmit(formSubmit)}
          >
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Controller
                  name="productImages"
                  control={control}
                  render={({
                    field: { onChange },
                    fieldState: { invalid, error },
                  }) => (
                    <UplaodProductWrapper>
                      <Box className="product_img">
                        <input
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={(e) => {
                            const files = Array.from(e.target.files);
                            const concatedFiles = [
                              // ...getProductImages,
                              ...files,
                            ];
                            onChange(concatedFiles);
                            handleImageUpload(files);
                          }}
                        />
                      </Box>
                      {invalid && (
                        <Typography sx={{ color: "red" }}>
                          {error?.message}
                        </Typography>
                      )}
                      <Box className="show_images">
                        <List disablePadding>
                          {imageList?.map((image, index) => (
                            <ListItem key={image}>
                              <figure>
                                {/* <IconButton
                                  onClick={() => handleDeleteImage(index)}
                                >
                                  <DeleteIcon sx={{ color: "#fff" }} />
                                </IconButton> */}
                                <img src={image} alt="upload image" />
                              </figure>
                            </ListItem>
                          ))}
                        </List>
                      </Box>
                    </UplaodProductWrapper>
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="brandName"
                  control={control}
                  render={({
                    field: { onChange, value },
                    fieldState: { invalid, error },
                  }) => (
                    <TextField
                      fullWidth
                      placeholder="Enter Brand Name"
                      onChange={onChange}
                      value={value}
                      helperText={error?.message}
                      error={invalid}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="productName"
                  control={control}
                  render={({
                    field: { onChange, value },
                    fieldState: { invalid, error },
                  }) => (
                    <TextField
                      fullWidth
                      placeholder="Enter Product Name"
                      onChange={onChange}
                      value={value}
                      helperText={error?.message}
                      error={invalid}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="description"
                  control={control}
                  render={({
                    field: { onChange, value },
                    fieldState: { invalid, error },
                  }) => (
                    <TextField
                      fullWidth
                      placeholder="Enter Description"
                      rows={4}
                      onChange={onChange}
                      value={value}
                      helperText={error?.message}
                      error={invalid}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="price"
                  control={control}
                  render={({
                    field: { onChange, value },
                    fieldState: { invalid, error },
                  }) => (
                    <TextField
                      fullWidth
                      type="number"
                      placeholder="Enter price"
                      onChange={onChange}
                      value={value}
                      helperText={error?.message}
                      error={invalid}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="sellingPrice"
                  control={control}
                  render={({
                    field: { onChange, value },
                    fieldState: { invalid, error },
                  }) => (
                    <TextField
                      fullWidth
                      type="number"
                      placeholder="Enter Selling Price"
                      onChange={onChange}
                      value={value}
                      helperText={error?.message}
                      error={invalid}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12}>
                <Controller
                  name="category"
                  control={control}
                  render={({
                    field: { onChange, value },
                    fieldState: { invalid, error },
                  }) => (
                    <FormControl sx={{ minWidth: "100%" }}>
                      <Select
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        displayEmpty
                        inputProps={{ "aria-label": "Without label" }}
                        fullWidth
                        error={invalid}
                      >
                        <MenuItem value="" sx={{ display: "none" }}>
                          Select Category
                        </MenuItem>
                        {categoryList.map((item) => (
                          <MenuItem value={item?.value} key={item?.id}>
                            {item?.name}
                          </MenuItem>
                        ))}
                      </Select>
                      {invalid && (
                        <FormHelperText sx={{ color: "red" }}>
                          {error?.message}
                        </FormHelperText>
                      )}
                    </FormControl>
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  type="submit"
                >
                  Upload
                </Button>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
      </Dialog>
    </UploadProductFormWrapper>
  );
};

export default UploadProductForm;
