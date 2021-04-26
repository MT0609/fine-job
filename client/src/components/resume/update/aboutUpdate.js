import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { CVAboutUpdateSchema } from "../../../utils/validation";

export default function CVBasicInfoUpdate(props) {
  const { data, open, onclose, onsubmit } = props;

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(CVAboutUpdateSchema),
  });

  const handleClose = () => {
    if (onclose) onclose();
  };

  const onSubmit = (data) => {
    if (onsubmit) onsubmit(data);
    console.log(data);
  };

  return (
    <Dialog maxWidth="xs" fullWidth open={open} onClose={handleClose}>
      <DialogTitle style={{ paddingBottom: 0 }}>Edit Summary</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent style={{ paddingTop: 0 }}>
          <textarea
            label="About"
            style={{ margin: 8, width: "100%" }}
            rows={10}
            defaultValue={data}
            InputLabelProps={{
              shrink: true,
            }}
            name="about"
            variant="outlined"
            ref={register}
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
