import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { useHistory, useLocation } from "react-router-dom";
import { Container, Divider, Typography } from "@material-ui/core";
import SavedJobs from "../../../container/jobs/myJob/save";
import AppliedJobs from "../../../container/jobs/myJob/applied";
import CircularLoading from "../../../components/loading/circular";
import { getUserData } from "../../../actions/authActions";
import { unSaveJob } from "../../../actions/jobActions";
import styles from "./index.module.scss";

function MyJob() {
  const history = useHistory();
  const { search } = useLocation();
  const saveType = new URLSearchParams(search).get("type") || "saved";

  const { t } = useTranslation();
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [tabValue, setTabValue] = useState(0); // 0: saved; 1: applied

  useEffect(() => {
    const handleLoadPage = (saveType) => {
      let queryParams = new URLSearchParams(window.location.search);
      if (saveType === "applied") {
        setTabValue(1);
        queryParams.set("type", "applied");
      } else {
        setTabValue(0);
        queryParams.set("type", "saved");
      }
      history.replace(`/jobs/my-jobs?${queryParams}`);
      dispatch(getUserData());
    };

    handleLoadPage(saveType);
  }, [dispatch, history, tabValue, saveType]);

  const handleChangeActiveTab = (value) => {
    setTabValue(value);
    let queryParams = new URLSearchParams(window.location.search);
    if (value === 0) queryParams.set("type", "saved");
    else queryParams.set("type", "applied");
    history.push(`/jobs/my-jobs?${queryParams}`);
  };

  const handleUnSaveJob = (jobID) => {
    dispatch(unSaveJob(jobID));
  };

  return (
    <div className={styles.myjob}>
      <Helmet>
        <html lang="en" />
        <title>My Jobs | Fine Job</title>
      </Helmet>

      <Container
        maxWidth="sm"
        style={{
          padding: "1rem",
          backgroundColor: "white",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
        }}
      >
        <Typography
          variant="h5"
          style={{
            paddingLeft: "1rem",
            textAlign: "left",
            color: "blue",
            fontWeight: "bold",
          }}
        >
          {t("job.myJobs")}
        </Typography>

        <div className={styles.myjob__tabBtns}>
          <button
            className={`${styles["myjob__tabBtn"]} ${
              tabValue === 0 && `${styles["myjob__tabBtn--active"]}`
            }`}
            onClick={() => handleChangeActiveTab(0)}
          >
            {t("job.save")}
          </button>
          <button
            className={`${styles["myjob__tabBtn"]} ${
              tabValue === 1 && `${styles["myjob__tabBtn--active"]}`
            }`}
            onClick={() => handleChangeActiveTab(1)}
          >
            {t("job.apply")}
          </button>
        </div>

        <Divider />

        {!auth.isLoading ? (
          tabValue === 0 ? (
            <SavedJobs
              savedJobs={auth.user?.savePosts}
              onUnSave={handleUnSaveJob}
            />
          ) : (
            <AppliedJobs appliedJobs={auth.user?.applies} />
          )
        ) : (
          <CircularLoading />
        )}
      </Container>
    </div>
  );
}

export default MyJob;
