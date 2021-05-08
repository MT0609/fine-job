import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "@material-ui/core";
import { AddToQueue } from "@material-ui/icons";
import CompanyHeadContainer from "../../../container/company/headSection";
import CompanyHome from "../../../container/company/home";
import CompanyJobs from "../../../container/company/job";
import CircularLoading from "../../../components/loading/circular";
import { getCompanyDetail } from "./../../../actions/companyActions";
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
      history.push(`/company/${id}`);
      setTabValue(0);
    }
  }, []);

  const companies = useSelector((state) => state.company);
  const company = companies.company;

  useEffect(() => {
    dispatch(getCompanyDetail(id));
  }, [id, dispatch, tabValue]);

  return (
    <div className={styles.company__container}>
      {company ? (
        <>
          <CompanyHeadContainer
            company={company}
            tabValue={tabValue}
            onTabChange={handleChange}
          />

          {!companies.isLoading ? (
            tabValue === 0 ? (
              <CompanyHome company={company} />
            ) : (
              <CompanyJobs company={company} />
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
