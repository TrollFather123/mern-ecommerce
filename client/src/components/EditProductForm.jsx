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
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  getSingleProduct,
  updateProduct,
} from "../redux/slice/productSlice";
import {
  UplaodProductWrapper,
  UploadProductFormWrapper,
} from "./UploadProductForm";
import useImageUpload from "../hooks/useImageUpload";

const productSchema = yup.object().shape({
  productName: yup.string().trim().required("product name is Required!!!"),
  brandName: yup.string().trim().required("brand name is Required!!!"),
  category: yup.string().trim().required("category is Required!!!"),
  productImages: yup.mixed(),
  description: yup.string().trim().required("description is Required!!!"),
  price: yup.number().required("price is Required!!!"),
  sellingPrice: yup.number().required("selling price is Required!!!"),
});

const EditProductForm = ({ open, onClose, _id, fetchAllProducts }) => {
  const dispatch = useDispatch();

  const { isSingleProductFetching } = useSelector((s) => s.product);

  const { handleSubmit, control, setValue } = useForm({
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

  const [imageList, setImageList] = useState([]);

  const { imageUrl, handelImageUpload } = useImageUpload();

  useEffect(() => {
    if (imageUrl) {
      setImageList((prev) => [...prev, imageUrl]);
    }
  }, [imageUrl]);

  const handelDeleteImage = useCallback(
    (indexNumber) => {
      const filterData = imageList?.filter(
        (data, index) => index !== indexNumber
      );

      setImageList(filterData);
    },
    [imageList]
  );

  useEffect(() => {
    if (_id) {
      dispatch(getSingleProduct(_id))
        .unwrap()
        .then((res) => {
          if (res) {
            toast.success(res?.message);
            setValue("brandName", res?.data?.brandName);
            setValue("productName", res?.data?.productName);
            setValue("description", res?.data?.description);
            setValue("price", res?.data?.price);
            setValue("sellingPrice", res?.data?.sellingPrice);
            setValue("category", res?.data?.category);
            setImageList(res?.data?.productImages);
          }
        })
        .catch((err) => {
          if (err) {
            toast.error(err?.message);
          }
        });
    }
  }, [_id, dispatch]);

  const formSubmit = (data) => {
    const payload = {
      ...data,
      productImages: imageList,
    };

    dispatch(updateProduct({ id: _id, body: payload }))
      .unwrap()
      .then((res) => {
        if (res) {
          toast.success(res?.message);
          onClose();
          fetchAllProducts();
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
          {isSingleProductFetching ? (
            <Typography variant="h6">Loading...</Typography>
          ) : (
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
                            accept="image/*"
                            onChange={(e) => {
                              onChange(e.target.files[0]);
                              handelImageUpload(e.target.files[0]);
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
                                  <IconButton
                                    onClick={() => handelDeleteImage(index)}
                                  >
                                    <DeleteIcon sx={{ color: "#fff" }} />
                                  </IconButton>
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
          )}
        </DialogContent>
      </Dialog>
    </UploadProductFormWrapper>
  );
};

export default EditProductForm;
