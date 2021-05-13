import React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Divider,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Work, LocationCity } from "@material-ui/icons";

function CompanyCard(props) {
  const { id, avatar, name, headLine, industry, headQuarter } = props;

  const useStyles = makeStyles((theme) => ({
    root: {
      height: "100%",
      width: "100%",
    },
    media: {
      height: 0,
      paddingTop: "50%", // 16:9
      fontSize: "1rem",
    },
    expand: {
      transform: "rotate(0deg)",
      marginLeft: "auto",
      transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: "rotate(180deg)",
    },
  }));

  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea href={`/company/${id}`}>
        <CardMedia
          className={classes.media}
          image={
            avatar ||
            "https://media-exp1.licdn.com/dms/image/C560BAQGVFcyITngckQ/company-logo_200_200/0/1612233454537?e=1626912000&v=beta&t=F2DRY0utOedLtfpaxyI_pA2N2OMop9-dmFCgZD3rsEw"
          }
          title="Contemplative Reptile"
        />
        <Divider />
        <CardContent>
          <Typography gutterBottom variant="h6" style={{ color: "blue" }}>
            {name}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            style={{ marginBottom: "0.5rem" }}
          >
            {headLine}
          </Typography>

          <Box display="flex" alignItems="flex-start">
            <Work />
            <Box ml={1} style={{ textAlign: "left" }}>
              Insdustry: {industry}
            </Box>
          </Box>

          <Box
            display="flex"
            alignItems="flex-start"
            justifyContent="flex-start"
          >
            <LocationCity />
            <Box ml={1} style={{ textAlign: "left" }}>
              {headQuarter}
            </Box>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default CompanyCard;
