import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Button,
} from "@material-ui/core";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./index.scss";

export default function ProfileUpdate(props) {
  const { data, show, onclose, onsubmit } = props;

  const { t } = useTranslation();
  const { register, control, handleSubmit } = useForm();
  const [rangeDateError, setRangeDateError] = useState("");

  const handleClose = () => {
    if (onclose) onclose();
  };

  const onSubmit = (submitData) => {
    submitData.id = data?.id;
    if (
      submitData.start_date &&
      submitData.end_date &&
      submitData.start_date > submitData.end_date
    ) {
      setRangeDateError(t("people.accomplishment_StartEndTime_error"));
      return;
    }
    if (onsubmit) onsubmit(submitData);
    console.log(submitData);
  };

  return (
    <Dialog fullWidth open={show} onClose={handleClose}>
      <DialogTitle>
        {data ? t("people.editAccomplishment") : t("people.addAccomplishment")}
      </DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <TextField
            fullWidth
            required
            label={t("people.projectName")}
            defaultValue={data?.name}
            name="name"
            inputRef={register}
            size="small"
            variant="outlined"
          />
          <TextField
            fullWidth
            label={t("people.projectDescription")}
            style={{ marginTop: 15, marginBottom: 15 }}
            defaultValue={data?.description}
            name="description"
            inputRef={register}
            size="small"
            variant="outlined"
          />
          <TextField
            fullWidth
            label={t("people.projectURL")}
            style={{ marginBottom: 15 }}
            defaultValue={data?.url}
            name="url"
            inputRef={register}
            size="small"
            variant="outlined"
          />
          <Grid container spacing={1}>
            <Grid item xs={12} md={6}>
              <p>{t("people.accomplishment_start")}</p>
              <div className="customDatePickerWidth">
                <Controller
                  control={control}
                  name="start_date"
                  defaultValue={
                    data?.start_date ? new Date(data.start_date) : null
                  }
                  render={({ onChange, value }) => (
                    <DatePicker
                      onChange={(e) => {
                        onChange(e);
                        setRangeDateError("");
                      }}
                      selected={value}
                      dateFormat="MM/yyyy"
                      showMonthYearPicker
                      isClearable={true}
                    />
                  )}
                />
              </div>
            </Grid>
            <Grid item xs={12} md={6}>
              <p>{t("people.accomplishment_end")}</p>
              <div className="customDatePickerWidth">
                <Controller
                  control={control}
                  name="end_date"
                  defaultValue={data?.end_date ? new Date(data.end_date) : null}
                  render={({ onChange, value }) => (
                    <DatePicker
                      onChange={(e) => {
                        onChange(e);
                        setRangeDateError("");
                      }}
                      selected={value}
                      dateFormat="MM/yyyy"
                      showMonthYearPicker
                      isClearable={true}
                    />
                  )}
                />
              </div>
            </Grid>
          </Grid>
          {rangeDateError && (
            <div className="customDatePickerWidth__error">{rangeDateError}</div>
          )}
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
