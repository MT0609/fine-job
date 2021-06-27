import React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { CVAboutUpdateSchema } from "../../../utils/validation";

export default function CVBasicInfoUpdate(props) {
  const { data, open, onclose, onsubmit } = props;

  const { t } = useTranslation();
  const { register, handleSubmit } = useForm({
    resolver: yupResolver(CVAboutUpdateSchema),
  });

  const handleClose = () => {
    if (onclose) onclose();
  };

  const onSubmit = (data) => {
    if (onsubmit) onsubmit(data);
  };

  return (
    <Dialog maxWidth="xs" fullWidth open={open} onClose={handleClose}>
      <DialogTitle style={{ paddingBottom: 0 }}>
        {t("people.about")}
      </DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <TextField
            fullWidth
            multiline
            label={t("people.about")}
            rows={4}
            defaultValue={data}
            name="about"
            variant="outlined"
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
