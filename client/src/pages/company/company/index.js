import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Link } from "@material-ui/core";
import { AddToQueue } from "@material-ui/icons";
import CompanyHeadContainer from "../../../container/company/headSection";
import CompanyHome from "../../../container/company/home";
import CompanyJobs from "../../../container/company/job";
import CircularLoading from "../../../components/loading/circular";
import {
  getCompanyDetail,
  followCompany,
  UnFollowCompany,
} from "./../../../actions/companyActions";
import { saveJob, unSaveJob } from "../../../actions/jobActions";
import * as JOBCONSTANTS from "../../../constants/jobConstants";
import styles from "./index.module.scss";

function Company() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const [tabValue, setTabValue] = useState(0);
  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  useEffect(() => {
    let newPathName = window.location.pathname;
    newPathName = newPathName.replace(/\/+$/, "");
    if (newPathName === `/company/${id}`) setTabValue(0);
    else if (newPathName === `/company/${id}/jobs`) setTabValue(1);
    else {
      history.replace(`/company/${id}`);
      setTabValue(0);
    }
  }, [history, id]);

  const companies = useSelector((state) => state.company);
  const company = companies.company;

  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getCompanyDetail(id));
  }, [
    id,
    dispatch,
    tabValue,
    companies.followStatus,
    companies.unFollowStatus,
  ]);

  const handleFollowCompany = () => {
    dispatch(followCompany(id));
  };

  const handleUnFollowCompany = () => {
    dispatch(UnFollowCompany(id));
  };

  const handleSaveJob = async (jobID) => {
    let result = await dispatch(saveJob(jobID));

    if (result === JOBCONSTANTS.JOB_SAVE_SUCCESS)
      toast("👌🏻 Save Job Successfully");
    else toast.error("Error Saving Job");
  };

  const handleUnSaveJob = async (jobID) => {
    let result = await dispatch(unSaveJob(jobID));

    if (result === JOBCONSTANTS.JOB_UNSAVE_SUCCESS) toast("Unsave Job");
    else toast.error("Error Unsave Job");
  };

  return (
    <div className={styles.company__container}>
      {company ? (
        <>
          <CompanyHeadContainer
            company={company}
            tabValue={tabValue}
            onTabChange={handleChange}
            user={auth}
            onFollow={handleFollowCompany}
            onUnFollow={handleUnFollowCompany}
          />

          {!companies.isLoading ? (
            tabValue === 0 ? (
              <CompanyHome company={company} />
            ) : (
              <CompanyJobs
                company={company}
                onSave={handleSaveJob}
                onUnSave={handleUnSaveJob}
                user={auth}
              />
            )
          ) : (
            <CircularLoading />
          )}

          <div className={styles.company__seemore}>
            <Link href="/company">
              <AddToQueue />
              <span>View other companies</span>
            </Link>
          </div>
        </>
      ) : (
        <div>Not Found</div>
      )}
    </div>
  );
}

export default Company;
