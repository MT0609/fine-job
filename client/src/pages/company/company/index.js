import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getCompanyDetail } from "./../../../actions/companyActions";
import CompanyHeadContainer from "../../../container/company/headSection";
import PopularSection from "../../../container/company/popularSection";
import styles from "./index.module.scss";
import { Button } from "@material-ui/core";
import { AddToQueue } from "@material-ui/icons";

function Company() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const companies = useSelector((state) => state.company);
  const company = companies.company;

  useEffect(() => {
    dispatch(getCompanyDetail(id));
  }, [id, dispatch]);

  return (
    <div className={styles.company__container}>
      {company && company !== "null" && company !== "undefined" && (
        <>
          <CompanyHeadContainer company={company} />

          <PopularSection title="About" content={company.about} />

          <PopularSection
            title="Specialties"
            list={company.baseInfo?.specialties || []}
          />

          <div className={styles.company__seemore}>
            <Button>
              <Link to="/company">
                <AddToQueue />
                <span>View other companies</span>
              </Link>
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

export default Company;
