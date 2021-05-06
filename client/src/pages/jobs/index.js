import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Container, Grid, Typography, useMediaQuery } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import SearchJobBar from "../../components/search/searchJob";
import CircularLoading from "../../components/loading/circular";
import JobDetailDialog from "../../container/jobs/jobDetail/dialog";
import JobList from "../../container/jobs/jobList";
import JobDetail from "../../container/jobs/jobDetail";
import { getJobs, getJobDetail } from "../../actions/jobActions";

function Jobs() {
  const { search } = useLocation();
  const keyword = new URLSearchParams(search).get("keyword") || "";
  const page = new URLSearchParams(search).get("page") || 1;
  const history = useHistory();

  useEffect(() => {
    handleAddressBarSearch(keyword, page);
  }, [keyword, page]);

  const jobs = useSelector((state) => state.job);
  const job = jobs.job;

  const [jobDetailDialog, setJobDetailDialog] = useState(false);

  const theme = useTheme();
  const jobDetailDialogAllow = useMediaQuery(theme.breakpoints.down("sm"));
  const jobDetailGridAllow = useMediaQuery(theme.breakpoints.up("sm"));

  const dispatch = useDispatch();

  useEffect(() => {
    if (jobs.jobs?.[0]?.id) dispatch(getJobDetail(jobs.jobs[0].id));
  }, [dispatch, jobs.jobs]); // show job detail on page first load

  const handleAddressBarSearch = (title = keyword, pg = page) => {
    let queryParams = new URLSearchParams(window.location.search);
    if (!title) queryParams.delete("keyword");
    else queryParams.set("keyword", title);

    const numbersReg = /^[0-9]+$/; // page only contain number
    if (!pg || !numbersReg.test(pg)) {
      queryParams.set("page", 1);
      pg = 1;
    } else queryParams.set("page", pg);
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
    if (jobDetailDialogAllow) setJobDetailDialog(true);
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
          {jobDetailGridAllow && (
            <Grid item xs={0} md={6}>
              {jobs.isLoading && <CircularLoading />}

              {!jobs.isLoading &&
                job &&
                job !== "null" &&
                job !== "undefined" && <JobDetail job={job} />}

              {!jobs.isLoading &&
              jobs.jobs.length &&
              (!job || job === "null" || job === "undefined") ? (
                <Typography variant="h5" style={{ paddingTop: "1rem" }}>
                  No matching job found
                </Typography>
              ) : (
                ""
              )}
            </Grid>
          )}
        </Grid>

        <JobDetailDialog
          job={job}
          show={jobDetailDialog && jobDetailDialogAllow}
          close={() => setJobDetailDialog(false)}
        />
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
