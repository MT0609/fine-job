import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useParams, useHistory, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
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
  const { t, i18n } = useTranslation();

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
      toast("👌🏻 " + t("job.saveSuccess"));
    else toast("👌🏻 " + t("job.saveFail"));
  };

  const handleUnSaveJob = async (jobID) => {
    let result = await dispatch(unSaveJob(jobID));

    if (result === JOBCONSTANTS.JOB_UNSAVE_SUCCESS)
      toast(t("job.unSaveSuccess"));
    else toast(t("job.unSaveFail"));
  };

  return (
    <div className={styles.company__container}>
      <Helmet>
        <html lang={i18n.language || "en"} />
        <title>
          {company && company.name ? `${company.name} | ` : ""}
          Company | Fine Job
        </title>
      </Helmet>

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
            <Link to="/company">
              <AddToQueue />
              <span>{t("company.viewOthers")}</span>
            </Link>
          </div>
        </>
      ) : (
        <div>{t("company.noCompany")}</div>
      )}
    </div>
  );
}

export default Company;
