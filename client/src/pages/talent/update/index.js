import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import jwt_decode from "jwt-decode";
import {
  Container,
  TextField,
  Select,
  Box,
  Switch,
  FormGroup,
  Typography,
  Grid,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import LoadingButton from "@material-ui/lab/LoadingButton";
import { getJobDetail, updateJob } from "../../../actions/jobActions";
import { PostJobSchema } from "../../../utils/validation";
import { JOBTYPES, JOBSKILLS } from "../../../constants/jobConstants";
import SkillAutoComplete from "../../../components/talent/autocomplete/skills";
import LocationsAdd from "../../../components/talent/location";
import * as JOBCONSTANTS from "../../../constants/jobConstants";

const useStyles = makeStyles((theme) => ({
  error: {
    color: "red",
    textAlign: "left",
    fontStyle: "italic",
    fontSize: "0.8rem",
  },
}));

export default function UpdateJob() {
  const classes = useStyles();

  useEffect(() => {
    const token = localStorage.getItem(process.env.REACT_APP_ACCESS_TOKEN);
    if (!token || !jwt_decode(token)?.sub) window.open("/jobs", "_self");
  }, []);

  const { id } = useParams();
  const state = useSelector((state) => state.job);
  const job = state.job;

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(PostJobSchema),
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (id) dispatch(getJobDetail(id));
  }, [id, dispatch]);

  useEffect(() => {
    if (job?.status) setStatus(job.status === "open");
    if (job?.skills) setSkills(job.skills);
    if (job?.locations) setLocations(job.locations);
  }, [job?.status, job?.skills, job?.locations]);

  const [updateStatus, setUpdateStatus] = useState("");

  const [status, setStatus] = useState(job?.status === "open");

  const [skills, setSkills] = useState(job?.skills);
  const [skillError, setSkillError] = useState("");

  const [locations, setLocations] = useState(job?.locations);
  const [locationsError, setLocationsError] = useState("");

  const onSubmit = async (data) => {
    if (skills.length === 0) {
      setSkillError("Choose at least one skill");
      return;
    }

    const submitedLocations = [...new Set(locations)];
    if (submitedLocations.length === 1 && submitedLocations[0] === "") {
      setLocationsError("Provide at least one working place");
      return;
    }

    data.jobType = data.jobType.split(" ");
    data.status = status ? "open" : "close";
    data.skills = skills;
    data.locations = submitedLocations;
    console.log(data);

    const result = await dispatch(updateJob(id, data));
    setUpdateStatus(result?.status);
  };

  return (
    <>
      {job && job.title ? (
        <div>
          <Container
            maxWidth="sm"
            style={{
              padding: "1rem 2rem",
              backgroundColor: "white",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
            }}
          >
            <Grid
              container
              style={{ marginBottom: "1rem" }}
              justify="space-between"
            >
              <Grid item>
                <Typography
                  variant="h5"
                  style={{
                    textAlign: "left",
                    color: "blue",
                    fontWeight: "bold",
                  }}
                >
                  {job.title}
                </Typography>
              </Grid>
              <Grid item>
                <Grid
                  component="label"
                  container
                  alignItems="center"
                  spacing={1}
                  style={{ width: "fit-content" }}
                >
                  <Grid item>Close</Grid>
                  <Grid item>
                    <Switch
                      checked={status}
                      onChange={() => setStatus((status) => !status)}
                      name="status"
                      color="primary"
                    />
                  </Grid>
                  <Grid item>Open</Grid>
                </Grid>
              </Grid>
            </Grid>

            {updateStatus === JOBCONSTANTS.JOB_UPDATE_SUCCESS && (
              <Box
                style={{
                  margin: "1rem 0 1rem 0",
                  color: "green",
                  textAlign: "left",
                  fontStyle: "italic",
                  fontSize: "0.9rem",
                }}
              >
                <p>
                  &#10004; Update Job Successfully.{" "}
                  <Link to="/talent">Go back to Talent Page</Link>
                </p>
              </Box>
            )}

            {updateStatus === JOBCONSTANTS.JOB_UPDATE_FAIL && (
              <Box
                style={{
                  margin: "1rem 0 1rem 0",
                  color: "red",
                  textAlign: "left",
                  fontStyle: "italic",
                  fontSize: "0.9rem",
                }}
              >
                <p>
                  * Fail Updating Job{" "}
                  <Link to="/talent">Go back to Talent Page</Link>
                </p>
              </Box>
            )}

            <form
              onSubmit={handleSubmit(onSubmit)}
              onChange={() => setUpdateStatus("")}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    defaultValue={job.title}
                    label="Title"
                    name="title"
                    inputRef={register}
                  />
                  <Box className={classes.error}>
                    {errors.title && <span>* {errors.title.message}</span>}
                  </Box>
                </Grid>
                <Grid item xs={12} md={3}>
                  <Select
                    fullWidth
                    native
                    name="jobType"
                    defaultValue={job.job.jobType}
                    style={{ marginTop: "1rem" }}
                    inputRef={register}
                  >
                    {JOBTYPES.map((type, index) => (
                      <option fullWidth value={type} key={index}>
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </option>
                    ))}
                  </Select>
                  <Box className={classes.error}>
                    {errors.jobType && <span>* {errors.jobType.message}</span>}
                  </Box>
                </Grid>
                <Grid item xs={12} md={3}>
                  <TextField
                    fullWidth
                    name="maxSalary"
                    label="Max Salary"
                    type="number"
                    defaultValue={job.maxSalary}
                    InputProps={{ inputProps: { min: 0 } }}
                    inputRef={register}
                  />
                  <Box className={classes.error}>
                    {errors.maxSalary && (
                      <span>* {errors.maxSalary.message}</span>
                    )}
                  </Box>
                </Grid>
              </Grid>

              <FormGroup style={{ marginTop: "1rem" }}>
                <Typography variant="h6" style={{ textAlign: "left" }}>
                  Job's Descriptions
                </Typography>
                <textarea
                  style={{ width: "100%", padding: "1rem" }}
                  rows={10}
                  defaultValue={job.description}
                  placeholder="Some job's decriptions"
                  name="description"
                  ref={register}
                />
                <Box className={classes.error}>
                  {errors.description && (
                    <span>* {errors.description.message}</span>
                  )}
                </Box>
              </FormGroup>

              <FormGroup style={{ marginTop: "1rem" }}>
                <SkillAutoComplete
                  skills={JOBSKILLS}
                  selectedSkills={job.skills}
                  error={skillError}
                  onchange={(values) => setSkills(values)}
                  setError={(err) => setSkillError(err)}
                />
              </FormGroup>

              <FormGroup style={{ marginTop: "1rem" }}>
                <LocationsAdd
                  defaultValues={job.locations}
                  onEdit={(location) => setLocations(location)}
                  error={locationsError}
                  setError={(error) => setLocationsError(error)}
                />
              </FormGroup>

              <LoadingButton
                variant="outlined"
                style={{ marginTop: "1rem" }}
                type="submit"
                onClick={handleSubmit}
                pending={state.isLoading}
              >
                Update
              </LoadingButton>
            </form>
          </Container>
        </div>
      ) : (
        <Typography variant="h5">Cannot Find Job</Typography>
      )}
    </>
  );
}
