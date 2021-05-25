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
import FilterBar from "../../container/filter";
import {
  getJobs,
  getJobDetail,
  applyJob,
  saveJob,
  unSaveJob,
} from "../../actions/jobActions";
import { searchUsers } from "../../actions/userActions";
import { getCompanies } from "../../actions/companyActions";

function Jobs() {
  const { search } = useLocation();
  const keyword = new URLSearchParams(search).get("keyword");
  const page = new URLSearchParams(search).get("page") || 1;
  const cate = new URLSearchParams(search).get("cate") || "job";
  const history = useHistory();

  const dispatch = useDispatch();

  useEffect(() => {
    const handleAddressBarSearch = (title = keyword, pg = page) => {
      let queryParams = new URLSearchParams(window.location.search);
      if (!title) queryParams.delete("keyword");
      else queryParams.set("keyword", title);

      const numbersReg = /^[0-9]+$/; // page only contain number
      if (!pg || !numbersReg.test(pg) || pg < 1) {
        queryParams.set("page", 1);
        pg = 1;
      } else queryParams.set("page", pg);
      history.replace(`/jobs?${queryParams}`);
      dispatch(getJobs(title, pg));
    };

    handleAddressBarSearch(keyword, page);
  }, [keyword, page, dispatch, history]);

  const jobs = useSelector((state) => state.job);
  const job = jobs.job;

  const [jobDetailDialog, setJobDetailDialog] = useState(false);

  const theme = useTheme();
  const jobDetailDialogAllow = useMediaQuery(theme.breakpoints.down("sm"));
  const jobDetailGridAllow = useMediaQuery(theme.breakpoints.up("sm"));

  useEffect(() => {
    if (jobs.jobs?.[0]?.id) dispatch(getJobDetail(jobs.jobs[0].id));
  }, [dispatch, jobs.jobs]); // show job detail on page first load

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
    if (jobDetailDialogAllow) {
      setJobDetailDialog(true);
      console.log(jobDetailDialogAllow);
    }
  };

  const handlePageChange = async (page) => {
    let queryParams = new URLSearchParams(window.location.search);
    queryParams.set("page", page);
    history.push(`/jobs?${queryParams}`);
    dispatch(getJobs(keyword, page));
  };

  const handleSearchByCate = (cate) => {
    let queryParams = new URLSearchParams(window.location.search);
    if (cate === "job") {
      let queryString = `/jobs`;
      if (queryParams.get("keyword")) queryString += `?keyword=${keyword}`;
      history.push(queryString);
      return;
    }

    if (cate === queryParams.get("cate")) return;
    queryParams.set("cate", cate);
    queryParams.set("page", 1);
    history.push(`/search?${queryParams}`);

    if (cate === "people")
      dispatch(searchUsers(keyword, +queryParams.get("page")));
    else if (cate === "company")
      dispatch(getCompanies(keyword, +queryParams.get("page")));
    else {
      dispatch(searchUsers(keyword, page));
      dispatch(getCompanies(keyword, page));
    }
  };

  const handleApplyJob = (jobID, formData) => {
    dispatch(applyJob(jobID, formData));
  };

  const handleSaveJob = (jobID) => {
    dispatch(saveJob(jobID));
  };

  const handleUnSaveJob = (jobID) => {
    dispatch(unSaveJob(jobID));
  };

  return (
    <div>
      <FilterBar onclick={handleSearchByCate} option={cate} />

      <SearchJobBar onsearch={handleInputSearch} defaultValue={keyword} />
      <Container
        maxWidth="lg"
        style={{
          marginTop: "1rem",
          padding: 0,
          backgroundColor: "white",
          boxShadow: "0 3px 8px rgba(0, 0, 0, 0.15)",
        }}
      >
        <Grid container justify="space-between">
          <Grid
            item
            xs={12}
            sm={6}
            style={{ borderRight: "2px solid #F4F4F4" }}
          >
            {jobs?.jobs?.length ? (
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
            <Grid item sm={6}>
              {jobs.isLoading && <CircularLoading />}

              {!jobs.isLoading && job && (
                <JobDetail
                  job={job}
                  onApply={handleApplyJob}
                  onSave={handleSaveJob}
                  onUnSave={handleUnSaveJob}
                />
              )}

              {!jobs.isLoading &&
              jobs?.jobs?.length &&
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
          onApply={handleApplyJob}
          onSave={handleSaveJob}
          onUnSave={handleUnSaveJob}
        />
      </Container>

      {!jobs.isLoading && jobs?.jobs?.length === 0 && (
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
