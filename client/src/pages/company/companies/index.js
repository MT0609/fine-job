import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Grid, Typography } from "@material-ui/core";
import { useMediaQuery } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";
import { getCompanies } from "./../../../actions/companyActions";
import CompanyCard from "../../../components/company/companyCard";
import SearchCompanyBar from "../../../components/search/searchCompany";
import SkeletonBoxLoading from "../../../components/loading/skeleton";

function Companies() {
  const companyState = useSelector((state) => state.company);
  const companies = companyState.companies;

  const theme = useTheme();
  const boxWidthBelowSm = useMediaQuery(theme.breakpoints.down("sm"));
  const boxWidthAboveMd = useMediaQuery(theme.breakpoints.up("md"));
  const boxWidthAboveLg = useMediaQuery(theme.breakpoints.up("lg"));

  const dispatch = useDispatch();

  const [searchCompanyName, setSearchCompanyName] = useState("");

  const handleSearch = (title) => {
    setSearchCompanyName(title);
  };

  const [page, setPage] = useState(companyState.currentPage);

  useEffect(() => {
    dispatch(getCompanies(searchCompanyName, page));
  }, [searchCompanyName, dispatch, page]);

  const handleChangePage = (e, page) => {
    setPage(page);
  };

  return (
    <Box
      width={
        boxWidthBelowSm
          ? "100%"
          : boxWidthAboveLg
          ? "60%"
          : boxWidthAboveMd
          ? "80%"
          : "100%"
      }
      margin="auto"
    >
      <div style={{ margin: "1rem 0" }}>
        <SearchCompanyBar onsearch={handleSearch} />
      </div>
      {!companyState.isLoading ? (
        companies?.length ? (
          <Box display="flex" flexDirection="column" alignItems="center">
            <Grid
              container
              alignItems="stretch"
              spacing={1}
              style={{ margin: "2rem 0" }}
            >
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

            {companyState.totalPages > 1 && (
              <div>
                <Pagination
                  color="primary"
                  count={companyState.totalPages}
                  page={companyState.currentPage}
                  onChange={handleChangePage}
                />
              </div>
            )}
          </Box>
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
