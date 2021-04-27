import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Button,
} from "@material-ui/core";
import { ProfileUpdateSchema } from "../../../utils/validation";

export default function ProfileUpdate(props) {
  const { data, show, onclose, onsubmit } = props;

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(ProfileUpdateSchema),
  });

  const handleClose = () => {
    if (onclose) onclose();
  };

  const onSubmit = (data) => {
    if (!data.phone) delete data.phone;
    if (onsubmit) onsubmit(data);
  };

  return (
    <Dialog fullWidth open={show} onClose={handleClose}>
      <DialogTitle>Edit Introduction</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent style={{ paddingTop: 0 }}>
          <Grid container spacing={2}>
            <Grid item>
              <TextField
                label="First Name"
                defaultValue={data.baseInfo?.firstName}
                helperText={
                  errors.firstName?.message && `* ${errors.firstName?.message}`
                }
                InputLabelProps={{
                  shrink: true,
                }}
                name="firstName"
                inputRef={register}
              />
            </Grid>
            <Grid item>
              <TextField
                label="Last Name"
                defaultValue={data.baseInfo?.lastName}
                helperText={
                  errors.lastName?.message && `* ${errors.lastName?.message}`
                }
                name="lastName"
                inputRef={register}
              />
            </Grid>
          </Grid>
          <TextField
            label="Phone"
            style={{ marginTop: 8 }}
            defaultValue={data.contact?.phone}
            InputLabelProps={{
              shrink: true,
            }}
            name="phone"
            inputRef={register}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button type="submit" color="primary">
            Save
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
