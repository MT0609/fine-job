import React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from "@material-ui/core";

export default function AboutUpdate(props) {
  const { data, show, onclose, onsubmit } = props;

  const { t } = useTranslation();

  const { register, handleSubmit } = useForm();

  const handleClose = () => {
    if (onclose) onclose();
  };

  const onSubmit = (data) => {
    if (onsubmit) onsubmit(data);
  };

  return (
    <Dialog fullWidth open={show} onClose={handleClose}>
      <DialogTitle>{t("people.about")}</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <TextField
            fullWidth
            label={t("people.about")}
            multiline
            rowsMax={6}
            name="about"
            inputRef={register}
            defaultValue={data}
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            {t("people.cancelButton")}
          </Button>
          <Button type="submit" color="primary">
            {t("people.saveButton")}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
