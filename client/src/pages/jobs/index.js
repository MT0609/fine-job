import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Grid, Typography } from "@material-ui/core";
import SearchJobBar from "../../components/search/searchJob";
import JobList from "../../container/jobs/jobList";
import JobDetail from "../../container/jobs/jobDetail";
import { getJobs, getJobDetail } from "../../actions/jobActions";

function Jobs() {
  const jobs = useSelector((state) => state.job);
  const job = jobs.job;
  const dispatch = useDispatch();

  const handleSearch = (title) => {
    dispatch(getJobs(title));
  };

  const handleJobClick = (id) => {
    dispatch(getJobDetail(id));
  };

  return (
    <div>
      Some Blow Jobs will go here...
      <SearchJobBar onsearch={handleSearch} />
      <Container style={{ marginTop: "2rem", backgroundColor: "white" }}>
        <Grid container justify="space-between">
          <Grid item xs={12} md={6}>
            {jobs.jobs.length ? (
              <JobList
                jobs={jobs.jobs}
                onclick={handleJobClick}
                change={jobs.searchChange}
              />
            ) : (
              ""
            )}
          </Grid>
          <Grid item xs={0} md={6}>
            {job && job !== "null" && job !== "undefined" ? (
              <JobDetail job={job} />
            ) : (
              ""
            )}
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default Jobs;
