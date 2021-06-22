import React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
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

  const { t } = useTranslation();

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
      <DialogTitle>{t("people.editBasicInfo")}</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent style={{ paddingTop: 0 }}>
          <Grid container spacing={2}>
            <Grid item>
              <TextField
                label={t("people.firstName")}
                defaultValue={data.baseInfo?.firstName}
                helperText={
                  errors.firstName?.message &&
                  `* ${t(errors.firstName?.message)}`
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
                label={t("people.lastName")}
                defaultValue={data.baseInfo?.lastName}
                helperText={
                  errors.lastName?.message && `* ${t(errors.lastName?.message)}`
                }
                name="lastName"
                inputRef={register}
              />
            </Grid>
          </Grid>
          <TextField
            label={t("people.phone")}
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
