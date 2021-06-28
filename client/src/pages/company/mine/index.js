import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import {
  Avatar,
  Button,
  Grid,
  Box,
  Typography,
  Paper,
} from "@material-ui/core";
import { LocationCity, Add, Edit, RemoveCircle } from "@material-ui/icons";
import {
  getMyCompanies,
  deleteCompany,
} from "./../../../actions/companyActions";
import styles from "./index.module.scss";

function Company() {
  const dispatch = useDispatch();
  const { i18n } = useTranslation();

  const companies = useSelector((state) => state.company);
  const company = companies.company;

  useEffect(() => {
    dispatch(getMyCompanies());
  }, [dispatch]);

  const handleDeleteCompany = (companyID) => {
    const deleteConfirm = window.confirm("Delete this company");
    if (deleteConfirm) {
      dispatch(deleteCompany(companyID))
        .then((res) => {
          if (res) toast("Delete company successfully");
          else toast.error("Error deleting company!");
        })
        .catch((error) => {
          toast.error("Error deleting company!");
        });
    }
  };

  return (
    <>
      <Helmet>
        <html lang={i18n.language || "en"} />
        <title>
          {company && company.name ? `${company.name} | ` : ""}
          My Companies | Fine Job
        </title>
      </Helmet>

      <div className={styles.companies}>
        <div style={{ textAlign: "right" }}>
          <Link to={`/company/mine/create`}>
            <Button variant="outlined" style={{ color: "#0A66C2" }}>
              <Add />
              <Typography>Create new company</Typography>
            </Button>
          </Link>
        </div>
        <br />
        {companies?.companies?.length ? (
          companies.companies.map((company) => (
            <div key={company.id} className={styles.company}>
              <Grid container spacing={2}>
                <Grid item>
                  <Link to={`/company/${company.id}`}>
                    <Avatar
                      variant="square"
                      src={
                        company.avatar ||
                        "https://res.cloudinary.com/dghvjalhh/image/upload/v1618850154/avatars/sxqvw0io5dmkg4apx30d.jpg"
                      }
                      alt="company"
                    />
                  </Link>
                </Grid>
                <Grid item xs={7} style={{ textAlign: "left" }}>
                  <p className={styles.company__name}>
                    <Link to={`/company/${company.id}`}>{company.name}</Link>{" "}
                  </p>
                  <Box display="flex" alignItems="center">
                    <LocationCity />
                    <span>{company.baseInfo.headQuarter}</span>
                  </Box>
                </Grid>
                <Grid item xs md style={{ textAlign: "right" }}>
                  <Link to={`/company/mine/${company.id}`}>
                    <Button style={{ color: "#0A66C2" }}>
                      <Edit />
                    </Button>
                  </Link>
                  <Button
                    style={{ color: "red" }}
                    onClick={() => handleDeleteCompany(company.id)}
                  >
                    <RemoveCircle />
                  </Button>
                </Grid>
              </Grid>
              <p className={styles.company__caption}>
                <span>
                  Specialties:{" "}
                  {company.baseInfo.specialties.map((item, index) => {
                    let special = item;
                    if (index !== company.baseInfo.specialties.length - 1)
                      special += ", ";
                    return special;
                  })}
                </span>
              </p>
            </div>
          ))
        ) : (
          <Paper
            style={{
              margin: "auto",
              padding: "1rem",
            }}
          >
            <img
              src="https://static-exp1.licdn.com/sc/h/ndc6pztx1685rq1c8bx1tksx"
              alt="oops"
            />
            <Typography variant="h5" style={{ marginBottom: "1rem" }}>
              No Companies
            </Typography>
          </Paper>
        )}
      </div>
    </>
  );
}

export default Company;
