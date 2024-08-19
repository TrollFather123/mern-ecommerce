import { Box, Button, CircularProgress, Dialog, DialogContent, DialogTitle, Stack, styled, Typography } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteOrders, updateOrders } from "../../redux/slice/orderSlice";
import { toast } from "react-toastify";

const AdjustQuantityWrapper = styled(Stack)`
  border: 1px solid #000;
  color: #000;
`;

const AdjustQuantity = ({ quantity, order_id }) => {
  const [open,setOpen] = useState(false)

  const handleClose = () => {
    setOpen(false);
  };

  const handelOpen = () => {
    setOpen(true);
  };
  const [value, setValue] = useState(0);
  const dispatch = useDispatch();
  const {isOrderUpadtePending} = useSelector((s) => s.order)
  useEffect(() => {
    if (quantity !== null) {
      setValue(quantity);
    }
  }, [quantity]);

  const updateQuantity = useCallback(
    (quantity) => {
      const payload = {
        order_id,
        quantity,
      };
      setTimeout(() => {
        dispatch(updateOrders(payload))
          .unwrap()
          .then((res) => {
            if (res) {
              toast.success(res?.message);
            }
          })
          .catch((err) => {
            if (err) {
              toast.error(err?.message);
            }
          });
      }, 500);
    },
    [dispatch, order_id]
  );

  const handleIncr = useCallback(() => {
    setValue((data) => data + 1);
    updateQuantity(value + 1);
  }, [updateQuantity, value]);

  const handleDecr = useCallback(() => {
    if (value > 1) {
      setValue((data) => data - 1);
      updateQuantity(value - 1);
    }else{
      handelOpen();

    }
  }, [updateQuantity, value]);

  return (
    <AdjustQuantityWrapper
      direction="row"
      alignItems="center"
      justifyContent="space-between"
    >
      <Button onClick={handleDecr} disabled={isOrderUpadtePending}>-</Button>
      {
        isOrderUpadtePending ? <CircularProgress/> :     <Typography>{value}</Typography>
      }
  
      <Button onClick={handleIncr} disabled={isOrderUpadtePending}>+</Button>
      <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Want to delete the item from Cart</DialogTitle>
      <DialogContent>
        <Stack direction='row' alignItems='center' flexWrap='wrap'>
          <Button variant="contained" color="success" onClick={()=>dispatch(deleteOrders(order_id))}>Yes</Button>
          <Button variant="contained" color="error" onClick={handleClose}>No</Button>
        </Stack>
      </DialogContent>
    </Dialog>
    </AdjustQuantityWrapper>
  );
};

export default AdjustQuantity;
