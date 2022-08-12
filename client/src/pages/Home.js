import {
  Button,
  Container,
  Divider,
  Grid,
  IconButton,
  Paper,
  TextField,
  Alert,
  Typography,
  Chip,
} from "@mui/material";
import Select from "react-select";

import React, { useState, useEffect } from "react";

import Dashboard from "../components/Dashboard";

import { makeStyles } from "@mui/styles";
import axios from "axios";

import Lottie from "lottie-react";
import animationData from "../lotties/server";

const useStyles = makeStyles((theme) => ({
  box: {
    backgroundColor: "white",
    borderRadius: "4px",
    padding: "24px",
    boxShadow: `0px 10px 38px rgba(221, 230, 237, 1)`,
  },
  boxContainer: {
    paddingTop: "10px",
    paddingLeft: "25px",
    paddingRight: "25px",
    paddingBottom: "10px",
  },
  textfield: {
    paddingLeft: "16px",
    paddingRight: "16px",
    paddingBottom: "8px",
    paddingTop: "8px",
  },
  formHeading: {
    paddingLeft: "16px",
    paddingRight: "16px",
    paddingBottom: "16px",
    paddingTop: "16px",
  },
  link: {
    display: "flex",
    color: "black",
    textDecoration: "none",
  },
  icon: {
    marginRight: 0.5,
    width: 20,
    height: 20,
  },
  spinner: {
    display: "flex",
    direction: "row",
    alignItems: "center",
    justifyContent: "center",
    height: "90vh",
  },
}));

const style1 = {
  height: 500,
};

export default function Upload() {
  const classes = useStyles();

  const [loading, setLoading] = useState(false);

  return (
    <>
      {loading ? (
        <Grid container component="main" spacing={3}>
          <Grid className={classes.spinner} item md={12} sm={12} xs={12}>
            <Lottie animationData={animationData} loop={true} style={style1} />

            <Typography
              variant="h4"
              color="initial"
              align="center"
              style={{ marginBottom: "24px", marginTop: "24px" }}
            >
              <b>Loading</b>
            </Typography>
          </Grid>
        </Grid>
      ) : (
        <>
          <Dashboard>
            <Container maxWidth="lg">
              <Typography
                variant="h4"
                color="initial"
                align="left"
                style={{ marginBottom: "24px", marginTop: "24px" }}
              >
                <b>Home</b>
              </Typography>
            </Container>
          </Dashboard>
        </>
      )}
    </>
  );
}
