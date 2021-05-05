import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Grid, TextField } from "@material-ui/core";
import { CVBasicUpdateSchema } from "../../../utils/validation";

export default function CVAboutUpdate(props) {
  const { data, open, onclose, onsubmit } = props;

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(CVBasicUpdateSchema),
  });

  const handleClose = () => {
    if (onclose) onclose();
  };

  const onSubmit = (data) => {
    if (onsubmit) onsubmit(data);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle style={{ paddingBottom: 0 }}>
        Edit contact information
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container style={{ marginBottom: "1rem" }} spacing={2}>
            <Grid item>
              <TextField
                label="* First Name"
                helperText={errors.firstName?.message}
                name="firstName"
                defaultValue={data?.firstName}
                variant="outlined"
                inputRef={register}
              />
            </Grid>
            <Grid item>
              <TextField
                label="* Last Name"
                helperText={errors.lastName?.message}
                defaultValue={data?.lastName}
                name="lastName"
                variant="outlined"
                inputRef={register}
              />
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item>
              <TextField
                label="* Email"
                name="email"
                defaultValue={data?.email}
                helperText={errors.email?.message}
                variant="outlined"
                inputRef={register}
              />
            </Grid>
            <Grid item>
              <TextField
                label="* Phone"
                defaultValue={data?.phone}
                helperText={errors.phone?.message}
                name="phone"
                variant="outlined"
                inputRef={register}
              />
            </Grid>
          </Grid>

          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button type="submit" color="primary">
              Save
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
}
