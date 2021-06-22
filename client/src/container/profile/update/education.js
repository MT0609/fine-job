import React, { useState, useRef, useEffect } from "react";
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
import Autocomplete from "@material-ui/lab/Autocomplete";
import DatePicker from "react-datepicker";
import axios from "./../../../api/axiosClient";
import "react-datepicker/dist/react-datepicker.css";
import "./index.scss";

export default function AboutUpdate(props) {
  const { data, show, onclose, onsubmit } = props; // type: update/insert

  const { t } = useTranslation();
  const typingTimeoutRef = useRef(null);
  const [school, setSchool] = useState({});
  const [schoolSearchResult, setSchoolSearchResult] = useState([]);
  const [rangeDate, setRangeDate] = useState({
    startDate: {},
    endDate: {},
  });
  const [rangeDateError, setRangeDateError] = useState("");
  const { register, handleSubmit, control } = useForm({});

  useEffect(() => {
    setSchool(data?.school);
    setRangeDate((prevState) => ({
      ...prevState,
      startDate: data?.start_date,
      endDate: data?.end_date,
    }));
  }, [data]);

  const handleSearchSchool = (e) => {
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    typingTimeoutRef.current = setTimeout(async () => {
      const result = await axios.get("/v1/universities", {
        params: { name: e.target.value, limit: 10, page: 1 },
      });
      setSchoolSearchResult(result.results);
    }, 300);
  };

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
      setRangeDateError(t("people.education_StartEndTime_error"));
      return;
    }
    if (onsubmit) onsubmit(submitData);
    console.log(submitData);
  };

  return (
    <Dialog fullWidth open={show} onClose={handleClose}>
      <DialogTitle>
        {data ? t("people.updateEducation") : t("people.insertEducation")}
        {/* {type === "insert"
          ? t("people.insertEducation")
          : t("people.updateEducation")} */}
      </DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Controller
            render={(props) => (
              <Autocomplete
                {...props}
                freeSolo
                options={schoolSearchResult}
                getOptionLabel={(option) => option.name || ""}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={`* ${t("people.education")}`}
                    variant="outlined"
                    inputProps={{
                      ...params.inputProps,
                    }}
                    size="small"
                    onChange={handleSearchSchool}
                  />
                )}
                onChange={(_, data) => props.onChange(data)}
              />
            )}
            name="school"
            control={control}
            defaultValue={school}
          />
          <Grid container spacing={1} style={{ marginBottom: "0.5rem" }}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label={t("people.degree")}
                name="degree"
                inputRef={register}
                defaultValue={data?.degree}
                variant="outlined"
                size="small"
                style={{ marginTop: "1rem" }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label={t("people.major")}
                rowsMax={6}
                name="major"
                inputRef={register}
                defaultValue={data?.major}
                variant="outlined"
                size="small"
                style={{ marginTop: "1rem" }}
              />
            </Grid>
          </Grid>
          <Grid container spacing={1}>
            <Grid item xs={12} md={6}>
              <p>{t("people.education_start")}</p>
              <div className="customDatePickerWidth">
                <Controller
                  control={control}
                  name="start_date"
                  defaultValue={
                    rangeDate.startDate ? new Date(rangeDate.startDate) : null
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
              <p>{t("people.education_end")}</p>
              <div className="customDatePickerWidth">
                <Controller
                  control={control}
                  name="end_date"
                  defaultValue={
                    rangeDate.endDate ? new Date(rangeDate.endDate) : null
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
