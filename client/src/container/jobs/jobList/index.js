import React, { useEffect, useState, useRef } from "react";
import {
  Avatar,
  Grid,
  Typography,
  Link,
  Box,
  Divider,
} from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import { timeDiff } from "../../../utils/time";
import styles from "./index.module.scss";

function JobList(props) {
  const { jobs = [], onclick, totalPage, currentPage, onPageChange } = props;

  const [jobSelection, setJobSelection] = useState(jobs[0]?.id || "");

  useEffect(() => {
    if (onclick) {
      onclick(jobSelection);
    }
  }, [jobSelection]); // them cai change nay thi setpage bi lag/loi

  useEffect(() => {
    setJobSelection(jobs[0]?.id);
  }, [currentPage]);

  const onJobClick = (id) => {
    setJobSelection(id);
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
              className={`${styles.jobList__main} ${
                jobSelection === job.id && `${styles["jobList__main--active"]}`
              }`}
              onClick={() => onJobClick(job.id)}
            >
              <div className={`${styles.jobList__item} `} key={index}>
                <Grid
                  style={{ textAlign: "left", marginBottom: "1rem" }}
                  container
                  justify="flex-start"
                >
                  <Grid item sm={1.5} style={{ marginRight: "1rem" }}>
                    <Avatar
                      variant="square"
                      alt="Company"
                      src={
                        job.company.avatar ||
                        "https://mcnewsmd1.keeng.net/netnews/archive/images/2020/07/20/tinngan_011115_916156142_0.jpg"
                      }
                    />
                  </Grid>
                  <Grid item sm={7}>
                    <Typography
                      variant="h6"
                      style={{ color: "#0A66C2", lineHeight: 1 }}
                    >
                      {job.title}
                    </Typography>
                    <Link href={`/jobs/${job.company.id}`}>
                      {job.company.name}
                    </Link>
                  </Grid>
                  <Grid
                    item
                    xs
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      alignItems: "center",
                    }}
                  >
                    {job.job.jobType.length > 0 &&
                      job.job.jobType.map((type, index) => (
                        <Box
                          style={{
                            padding: "0.4rem 0.8rem",
                            fontSize: "0.8rem",
                            borderRadius: "20px",
                            border: "2px solid #569BDB",
                            color: "#1E66C2",
                            width: "fit-content",
                          }}
                          key={index}
                        >
                          {type}
                        </Box>
                      ))}
                  </Grid>
                </Grid>
                <p className={styles.jobList__caption}>
                  <span>
                    Posted {timeDiff(new Date(job.posted), new Date())}
                  </span>
                  <span className={styles.jobList__applicantCount}>
                    {job.job.applicantCount} applicants
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
