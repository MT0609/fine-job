import React, { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Container, Grid, Typography } from "@material-ui/core";
import SearchJobBar from "../../components/search/searchJob";
import JobList from "../../container/jobs/jobList";
import JobDetail from "../../container/jobs/jobDetail";
import { getJobs, getJobDetail } from "../../actions/jobActions";

function Jobs() {
  const { search } = useLocation();
  const keyword = new URLSearchParams(search).get("keyword") || "";
  const page = new URLSearchParams(search).get("page") || 1;
  const history = useHistory();

  useEffect(() => {
    handleAddressBarSearch();
  }, []);

  const jobs = useSelector((state) => state.job);
  const job = jobs.job;

  const dispatch = useDispatch();

  const handleAddressBarSearch = (title = keyword, pg = page, limit = 5) => {
    let queryParams = new URLSearchParams(window.location.search);
    if (!title) queryParams.delete("keyword");
    else queryParams.set("keyword", title);
    if (!pg) queryParams.set("page", 1);
    else queryParams.set("page", pg);
    history.push(`/jobs?${queryParams}`);
    dispatch(getJobs(title, pg));
  };

  const handleInputSearch = (title) => {
    let queryParams = new URLSearchParams(window.location.search);
    if (!title) queryParams.delete("keyword");
    else queryParams.set("keyword", title);
    queryParams.delete("page");
    history.push(`/jobs?${queryParams}`);
    dispatch(getJobs(title));
  };

  const handleJobClick = (id) => {
    dispatch(getJobDetail(id));
  };

  const handlePageChange = async (page) => {
    handleAddressBarSearch(keyword, page);
  };

  return (
    <div>
      <SearchJobBar onsearch={handleInputSearch} defaultValue={keyword} />
      <Container
        style={{
          marginTop: "2rem",
          padding: 0,
          backgroundColor: "white",
          boxShadow: "0 3px 8px rgba(0, 0, 0, 0.15)",
        }}
      >
        <Grid container justify="space-between">
          <Grid
            item
            xs={12}
            md={6}
            style={{ borderRight: "2px solid #F4F4F4" }}
          >
            {jobs.jobs.length ? (
              <JobList
                jobs={jobs.jobs}
                totalPage={jobs.totalPages}
                currentPage={jobs.page}
                onclick={handleJobClick}
                change={jobs.searchChange}
                onPageChange={handlePageChange}
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

      {!jobs.isLoading && jobs.jobs.length === 0 && (
        <Container maxWidth="xs">
          <img
            alt="not-found"
            src="https://static-exp1.licdn.com/sc/h/63bdabma35siijudbohu19qxi"
          />
          <Typography variant="h6" style={{ marginTop: "1rem" }}>
            No matching jobs found
          </Typography>
        </Container>
      )}
    </div>
  );
}

export default Jobs;
