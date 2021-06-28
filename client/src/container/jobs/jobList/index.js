import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Avatar, Grid, Typography, Divider } from "@material-ui/core";
import { useMediaQuery } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";
import { timeDiff } from "../../../utils/time";
import styles from "./index.module.scss";

function JobList(props) {
  const { jobs = [], onclick, totalPage, currentPage, onPageChange } = props;

  const [jobSelection, setJobSelection] = useState(jobs[0]?.id || "");

  const { t } = useTranslation();

  const theme = useTheme();
  const jobSelectHightlight = useMediaQuery(theme.breakpoints.up("sm"));

  const onJobClick = (id) => {
    setJobSelection(id);
    if (onclick) {
      onclick(id);
    }
  };

  const usePrevious = (value) => {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    }, [value]);
    return ref.current; // Return previous value (happens before update in useEffect above)
  };
  const prevPage = usePrevious(currentPage);

  const handleChangePage = (event, value) => {
    if (onPageChange && prevPage !== value) onPageChange(value);
  };

  return (
    <>
      <div className={`${styles.jobList__container}`}>
        {jobs.length > 0 &&
          jobs.map((job, index) => (
            <div
              key={job.id}
              className={`${styles.jobList__main}${
                jobSelection === job.id && jobSelectHightlight
                  ? ` ${styles["jobList__main--active"]}`
                  : ""
              }`}
              onClick={() => onJobClick(job.id)}
            >
              <div className={`${styles.jobList__item} `} key={index}>
                <Grid
                  style={{ textAlign: "left", marginBottom: "0.2rem" }}
                  container
                  justify="flex-start"
                  spacing={2}
                >
                  <Grid item>
                    <Avatar
                      variant="square"
                      alt="Company"
                      src={
                        job.company.avatar ||
                        "https://carleton.ca/career/wp-content/uploads/icon_job_postings.png"
                      }
                    />
                  </Grid>
                  <Grid item sm>
                    <Typography
                      variant="h6"
                      style={{ color: "#0A66C2", lineHeight: 1 }}
                    >
                      {job.title}
                    </Typography>
                    <Link to={`/company/${job.company.id}`}>
                      {job.company.name}
                    </Link>
                  </Grid>
                </Grid>
                <p className={styles.jobList__caption}>
                  <span>
                    {t("job.postedTimeAgo", {
                      timeDiff: timeDiff(new Date(job.posted), new Date()),
                    })}
                  </span>
                  <span className={styles.jobList__applicantCount}>
                    {t("job.applicantNumber", {
                      number: job.job.applicantCount,
                    })}
                  </span>
                </p>
              </div>
              <Divider />
            </div>
          ))}
      </div>

      {jobs.length > 0 && (
        <div className={styles.jobList__paginate}>
          <Pagination
            color="primary"
            count={totalPage}
            page={currentPage}
            onChange={handleChangePage}
          />
        </div>
      )}
    </>
  );
}

export default JobList;
