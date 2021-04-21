import React, { useEffect, useState } from "react";
import { Container, Grid, Typography } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { getCompanies } from "./../../../actions/companyActions";
import CompanyCard from "../../../container/company/companyCard";
import SearchCompanyBar from "../../../components/search/searchCompany";

function Companies() {
  const state = useSelector((state) => state.company);
  const companies = state.companies;

  const dispatch = useDispatch();

  const [searchCompanyName, setSearchCompanyName] = useState("");

  const handleSearch = (title) => {
    setSearchCompanyName(title);
  };

  useEffect(() => {
    dispatch(getCompanies(searchCompanyName));
  }, [searchCompanyName, dispatch]);

  return (
    <Container maxWidth="md">
      <SearchCompanyBar onsearch={handleSearch} />
      {companies.length ? (
        <Grid container direction="row" alignItems="stretch" spacing={2}>
          {companies.map((company, index) => (
            <Grid item key={index}>
              <CompanyCard
                id={company.id}
                avatar={company.avatar}
                name={company.name}
                headLine={company.headLine}
                headQuarter={company.baseInfo.headQuarter}
                industry={company.baseInfo.industry}
                linkWeb={company.baseInfo.linkWeb}
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="h5">Oops! No Company Found</Typography>
      )}
    </Container>
  );
}

export default Companies;
