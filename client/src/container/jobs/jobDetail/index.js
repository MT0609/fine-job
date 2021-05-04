import React from "react";
import { Avatar, Grid, Typography, Link, Box } from "@material-ui/core";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import styles from "./index.module.scss";

function JobDetail(props) {
  const { job } = props;

  return (
    <>
      {job.company && (
        <div className={styles.detail}>
          <Grid container spacing={2}>
            <Grid item>
              <Avatar
                variant="square"
                alt="Company"
                src={
                  job.company?.avatar ||
                  "https://mcnewsmd1.keeng.net/netnews/archive/images/2020/07/20/tinngan_011115_916156142_0.jpg"
                }
              />
            </Grid>
            <Grid item sm={8} style={{ textAlign: "left" }}>
              <Typography variant="h5" style={{ lineHeight: 1 }}>
                {job.title}
              </Typography>
              <Link href={`/company/${job.company?.id}`}>
                {job.company?.name}
              </Link>
              <p className={styles.detail__subheader}>
                <span>Posted on: {new Date(job.posted).toDateString()}</span>
                <span className={styles.detail__viewcount}>
                  {job.viewCount} views
                </span>
              </p>
            </Grid>
            {job.status !== "open" && (
              <Grid item>
                <Box
                  style={{
                    padding: "0.3rem 0.5rem",
                    backgroundColor: "red",
                    color: "white",
                    width: "fit-content",
                  }}
                >
                  {job.status}
                </Box>
              </Grid>
            )}
          </Grid>

          <section className={styles.detail__main}>
            {job.locations && job.locations.length && (
              <Grid container spacing={3}>
                <Grid item>
                  <LocationOnIcon />
                </Grid>
                <Grid item>
                  {job.locations.map((location, index) => (
                    <p key={index}>{location}</p>
                  ))}
                </Grid>
              </Grid>
            )}

            <div className={styles.detail__section}>
              <p>Description</p>
              <span>{job.description}</span>
            </div>

            <div className={styles.detail__section}>
              <p>Skills</p>
              <ul className={styles.detail__skills}>
                {job.skills.length &&
                  job.skills.map((skill, index) => (
                    <li key={index}>{skill}</li>
                  ))}
              </ul>
            </div>

            <div className={styles.detail__section}>
              <p>Employment Type</p>
              <span>{job.job.jobType[0]}</span>
            </div>

            <div className={styles.detail__section}>
              <p>Max Salary</p>
              <span>{job.maxSalary}</span>
            </div>
          </section>
        </div>
      )}
    </>
  );
}

export default JobDetail;
