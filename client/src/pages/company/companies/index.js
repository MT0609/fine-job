import React, { useEffect, useState } from "react";
import { Box, Grid, Typography } from "@material-ui/core";
import { useMediaQuery } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import { getCompanies } from "./../../../actions/companyActions";
import CompanyCard from "../../../container/company/companyCard";
import SearchCompanyBar from "../../../components/search/searchCompany";
import SkeletonBoxLoading from "../../../components/loading/skeleton";

function Companies() {
  const companyState = useSelector((state) => state.company);
  const companies = companyState.companies;

  const theme = useTheme();
  const boxWidthBelowSm = useMediaQuery(theme.breakpoints.down("sm"));
  const boxWidthAboveMd = useMediaQuery(theme.breakpoints.up("md"));

  const dispatch = useDispatch();

  const [searchCompanyName, setSearchCompanyName] = useState("");

  const handleSearch = (title) => {
    setSearchCompanyName(title);
  };

  useEffect(() => {
    dispatch(getCompanies(searchCompanyName));
  }, [searchCompanyName, dispatch]);

  return (
    <Box
      width={boxWidthBelowSm ? "100%" : boxWidthAboveMd ? "70%" : "100%"}
      margin="auto"
    >
      <div style={{ margin: "1rem 0" }}>
        <SearchCompanyBar onsearch={handleSearch} />
      </div>
      {!companyState.isLoading ? (
        companies.length ? (
          <Grid container direction="row" alignItems="stretch" spacing={2}>
            {companies.map((company, index) => (
              <Grid item key={index} xs={12} sm={4}>
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
        )
      ) : (
        <Grid container spacing={2}>
          <Grid item sm={4} xs={12}>
            <SkeletonBoxLoading />
          </Grid>
          <Grid item sm={4} xs={12}>
            <SkeletonBoxLoading />
          </Grid>
          <Grid item sm={4} xs={12}>
            <SkeletonBoxLoading />
          </Grid>
        </Grid>
      )}
    </Box>
  );
}

export default Companies;
