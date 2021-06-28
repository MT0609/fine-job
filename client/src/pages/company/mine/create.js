import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import jwt_decode from "jwt-decode";
import {
  Container,
  TextField,
  Grid,
  FormControl,
  InputLabel,
  Select,
} from "@material-ui/core";
import { toast } from "react-toastify";
import LoadingButton from "@material-ui/lab/LoadingButton";
import { createCompany } from "./../../../actions/companyActions";

export default function CreateCompany() {
  const { t } = useTranslation();
  useEffect(() => {
    const token = localStorage.getItem(process.env.REACT_APP_ACCESS_TOKEN);
    if (!token || !jwt_decode(token)?.sub) window.open("/", "_self");
  }, []);

  const { register, handleSubmit } = useForm();

  const companies = useSelector((state) => state.company);
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    const submitData = {
      name: data.name,
      headLine: data.headLine,
      about: data.about,
      baseInfo: {
        founded: data.founded,
        companySize: data.companySize,
        headQuarter: data.headQuarter,
        industry: data.industry,
        specialties: data.specialties,
      },
    };
    const result = await dispatch(createCompany(submitData));
    if (result) toast("Create Successfully");
    else toast.error("Error Creating Company!");
  };

  return (
    <Container
      maxWidth="sm"
      style={{
        padding: "1rem 2rem",
        backgroundColor: "white",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={1}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Name"
              InputLabelProps={{
                shrink: true,
              }}
              style={{ marginBottom: "1rem" }}
              name="name"
              inputRef={register}
              required
            />
          </Grid>
          <Grid item xs={6} md={3}>
            <TextField
              fullWidth
              label="Company Size"
              name="companySize"
              type="number"
              InputProps={{ inputProps: { min: 1 } }}
              InputLabelProps={{
                shrink: true,
              }}
              style={{ marginBottom: "1rem" }}
              inputRef={register}
              required
            />
          </Grid>
          <Grid item xs={6} md={3}>
            <TextField
              fullWidth
              label="Founded Year"
              name="founded"
              type="number"
              InputProps={{ inputProps: { min: 1800 } }}
              InputLabelProps={{
                shrink: true,
              }}
              style={{ marginBottom: "1rem" }}
              inputRef={register}
              required
            />
          </Grid>
        </Grid>

        <TextField
          fullWidth
          label="Headline"
          InputLabelProps={{
            shrink: true,
          }}
          style={{ marginBottom: "1rem" }}
          name="headLine"
          inputRef={register}
          required
        />
        <TextField
          fullWidth
          label="About"
          InputLabelProps={{
            shrink: true,
          }}
          style={{ marginBottom: "1rem" }}
          name="about"
          inputRef={register}
          required
        />
        <FormControl fullWidth style={{ marginBottom: "1rem" }}>
          <InputLabel>Industry</InputLabel>
          <Select name="industry" native inputRef={register} required>
            <option value="Information Technology & Services">
              Information Technology & Services
            </option>
            <option value="Services">Services</option>
            <option value="Information Technology">
              Information Technology
            </option>
          </Select>
        </FormControl>
        <TextField
          fullWidth
          label="Headquarter"
          name="headQuarter"
          InputLabelProps={{
            shrink: true,
          }}
          style={{ marginBottom: "1rem" }}
          inputRef={register}
          required
        />
        <TextField
          fullWidth
          label="specialties"
          name="specialties"
          placeholder="financial,service,business,..."
          InputLabelProps={{
            shrink: true,
          }}
          style={{ marginBottom: "1rem" }}
          inputRef={register}
          required
        />

        <LoadingButton
          variant="outlined"
          style={{ marginTop: "1rem" }}
          type="submit"
          onClick={handleSubmit}
          pending={companies.isLoading}
        >
          {t("job.createButton")}
        </LoadingButton>
      </form>
    </Container>
  );
}
