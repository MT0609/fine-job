import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import jwt_decode from "jwt-decode";
import {
  Container,
  TextField,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  Select,
  Button,
  IconButton,
} from "@material-ui/core";
import { HighlightOff } from "@material-ui/icons";
import LoadingButton from "@material-ui/lab/LoadingButton";
import {
  getCompanyDetail,
  updateCompany,
} from "./../../../actions/companyActions";
import styles from "./index.module.scss";

export default function UpdateCompany() {
  const { t } = useTranslation();
  useEffect(() => {
    const token = localStorage.getItem(process.env.REACT_APP_ACCESS_TOKEN);
    if (!token || !jwt_decode(token)?.sub) window.open("/", "_self");
  }, []);

  const { id } = useParams();
  const companies = useSelector((state) => state.company);
  const auth = useSelector((state) => state.auth);
  const company = companies.company;

  const { register, handleSubmit } = useForm();

  const history = useHistory();
  const dispatch = useDispatch();

  const [files, setFiles] = useState({
    avatar: { img: null, path: null },
    backgroundAvt: { img: null, path: null },
  });
  useEffect(() => {
    dispatch(getCompanyDetail(id));
  }, [id, dispatch]);

  useEffect(() => {
    if (company && company?.id && company.owner !== auth?.user?.id)
      history.replace("/company/mine");

    setFiles((prev) => ({
      ...prev,
      avatar: { img: company.avatar, path: null },
      backgroundAvt: { img: company.backgroundAvt, path: null },
    }));
  }, [company]);

  const onSubmit = async (data) => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => formData.append(key, data[key]));
    formData.append("avatar", files.avatar.path);
    formData.append("backgroundAvt", files.backgroundAvt.path);
    const result = await dispatch(updateCompany(id, formData));
    if (result) toast("Update Successfully");
    else toast.error("Error Updating!");
  };

  return (
    <>
      {company && company.name ? (
        <div>
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
                    defaultValue={company.name}
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
                    defaultValue={company.baseInfo.companySize}
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
                    defaultValue={company.baseInfo.founded}
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
                defaultValue={company.headLine}
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
                defaultValue={company.about}
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
                <Select
                  name="industry"
                  native
                  defaultValue={company.baseInfo.industry}
                  inputRef={register}
                  required
                >
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
                defaultValue={company.baseInfo.headQuarter}
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
                defaultValue={company.baseInfo.specialties}
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

              <Grid container spacing={2}>
                <Grid item>
                  <Button
                    width="fit-content"
                    variant="contained"
                    component="label"
                    style={{ marginBottom: "0.5rem" }}
                  >
                    Change Avatar
                    <input
                      hidden
                      type="file"
                      onChange={(e) =>
                        setFiles((prev) => ({
                          ...prev,
                          avatar: e?.target?.files[0]
                            ? {
                                img: URL.createObjectURL(e.target.files[0]),
                                path: e.target.files[0],
                              }
                            : { img: null, path: null },
                        }))
                      }
                    />
                  </Button>
                  <br />
                  {files.avatar.img && (
                    <div className={styles.update__imageDiv}>
                      <IconButton
                        className={styles.update__imageDiv__remove}
                        onClick={() =>
                          setFiles((prev) => ({
                            ...prev,
                            avatar: { img: null, path: null },
                          }))
                        }
                      >
                        <HighlightOff />
                      </IconButton>
                      <img width="100" src={files.avatar.img} alt="" />
                    </div>
                  )}
                </Grid>
                <Grid item>
                  <Button
                    width="fit-content"
                    variant="contained"
                    component="label"
                    style={{ marginBottom: "0.5rem" }}
                  >
                    Change Background
                    <input
                      hidden
                      type="file"
                      onChange={(e) =>
                        setFiles((prev) => ({
                          ...prev,
                          backgroundAvt: e?.target?.files[0]
                            ? {
                                img: URL.createObjectURL(e.target.files[0]),
                                path: e.target.files[0],
                              }
                            : { img: null, path: null },
                        }))
                      }
                    />
                  </Button>
                  <br />
                  {files.backgroundAvt.img && (
                    <div className={styles.update__imageDiv}>
                      <IconButton
                        className={styles.update__imageDiv__remove}
                        onClick={() =>
                          setFiles((prev) => ({
                            ...prev,
                            backgroundAvt: { img: null, path: null },
                          }))
                        }
                      >
                        <HighlightOff />
                      </IconButton>
                      <img width="100" src={files.backgroundAvt.img} alt="" />
                    </div>
                  )}
                </Grid>
              </Grid>
              <LoadingButton
                variant="outlined"
                style={{ marginTop: "1rem" }}
                type="submit"
                onClick={handleSubmit}
                pending={companies.isLoading}
              >
                {t("job.updateButton")}
              </LoadingButton>
            </form>
          </Container>
        </div>
      ) : (
        <Typography variant="h5">{t("job.jobNotFound")}</Typography>
      )}
    </>
  );
}
