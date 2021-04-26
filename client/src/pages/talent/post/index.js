import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import jwt_decode from "jwt-decode";
import { makeStyles } from "@material-ui/core/styles";
import {
  Container,
  TextField,
  Select,
  Box,
  FormGroup,
  Typography,
  Grid,
} from "@material-ui/core";
import LoadingButton from "@material-ui/lab/LoadingButton";
import { JOBTYPES, JOBSKILLS } from "../../../constants/jobConstants";
import { PostJobSchema } from "../../../utils/validation";
import { getCompanies } from "./../../../actions/companyActions";
import { postJob } from "./../../../actions/jobActions";
import CompanyAutoComplete from "../../../components/talent/autocomplete/company";
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

function PostJob() {
  const classes = useStyles();

  const dispatch = useDispatch();

  const companyState = useSelector((state) => state.company);
  const jobState = useSelector((state) => state.job);
  const companies = companyState.companies;

  useEffect(() => {
    dispatch(getCompanies());
  }, [dispatch]);

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(PostJobSchema),
  });

  const [status, setStatus] = useState("");

  const [companyID, setCompanyID] = useState("");
  const [companyIDError, setCompanyIDError] = useState("");

  const [skills, setSkills] = useState([]);
  const [skillError, setSkillError] = useState("");

  const [locations, setLocations] = useState([""]);
  const [locationsError, setLocationsError] = useState("");

  const onSubmit = async (data) => {
    if (!companyID) {
      setCompanyIDError("Choose company");
      return;
    }

    if (skills.length === 0) {
      setSkillError("Choose at least one skill");
      return;
    }

    const submitedLocations = [...new Set(locations)];
    if (submitedLocations.length === 1 && submitedLocations[0] === "") {
      setLocationsError("Provide at least one working place");
      return;
    }

    data.id = companyID;
    data.skills = skills;
    data.locations = submitedLocations;
    console.log(data);

    const result = await dispatch(postJob(data));
    setStatus(result?.status);
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
      <Typography
        variant="h5"
        style={{ textAlign: "left", color: "blue", fontWeight: "bold" }}
      >
        Post A Job
      </Typography>

      {status === JOBCONSTANTS.JOB_POST_SUCCESS && (
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
            &#10004; Post Job Successfully.{" "}
            <Link to="/talent">Go back to Talent Page</Link>
          </p>
        </Box>
      )}

      {status === JOBCONSTANTS.JOB_POST_FAIL && (
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
            * Fail Posting Job <Link to="/talent">Go back to Talent Page</Link>
          </p>
        </Box>
      )}

      <form onSubmit={handleSubmit(onSubmit)} onChange={() => setStatus("")}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
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
              defaultValue="male"
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
              InputProps={{ inputProps: { min: 0 } }}
              inputRef={register}
            />
            <Box className={classes.error}>
              {errors.maxSalary && <span>* {errors.maxSalary.message}</span>}
            </Box>
          </Grid>
        </Grid>

        <FormGroup style={{ marginTop: "1rem" }}>
          <CompanyAutoComplete
            companies={companies}
            onchange={(id) => setCompanyID(id)}
            error={companyIDError}
            setError={(error) => setCompanyIDError(error)}
          />
        </FormGroup>

        <FormGroup style={{ marginTop: "1rem" }}>
          <Typography variant="h6" style={{ textAlign: "left" }}>
            Job's Descriptions
          </Typography>
          <textarea
            style={{ width: "100%", padding: "1rem" }}
            rows={10}
            placeholder="Some job's decriptions"
            name="description"
            ref={register}
          />
          <Box className={classes.error}>
            {errors.description && <span>* {errors.description.message}</span>}
          </Box>
        </FormGroup>

        <FormGroup style={{ marginTop: "1rem" }}>
          <SkillAutoComplete
            skills={JOBSKILLS}
            error={skillError}
            onchange={(values) => setSkills(values)}
            setError={(err) => setSkillError(err)}
          />
        </FormGroup>

        <FormGroup style={{ marginTop: "1rem" }}>
          <LocationsAdd
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
          pending={jobState.isLoading}
        >
          Create
        </LoadingButton>
      </form>
    </Container>
  );
}

export default PostJob;
