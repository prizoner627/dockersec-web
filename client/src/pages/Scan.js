import {
  Button,
  Container,
  Grid,
  IconButton,
  Paper,
  TextField,
  Alert,
  Typography,
  Chip,
} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import Select from "react-select";

import React, { useState, useEffect } from "react";

import Dashboard from "../components/Dashboard";
import Chips from "../components/Chips";

import { makeStyles } from "@mui/styles";
import axios from "axios";

import Lottie from "lottie-react";
import animationData from "../lotties/server";
import { NavLink, useParams } from "react-router-dom";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

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

export default function Scan() {
  const classes = useStyles();

  const [loading, setLoading] = useState(true);
  const [hostscan, sethostccan] = useState(null);
  const [containerscan, setcontainerccan] = useState(null);
  const [count, setCount] = useState(null);

  let { id } = useParams();

  const gethostscan = async () => {
    setLoading(true);

    axios
      .get(`http://localhost:5000/host-result?id=${id}`)
      .then((response) => {
        console.log(response.data);

        sethostccan(response.data);
      })
      .catch((error) => {
        sethostccan(null);
        console.log(error);
      });
  };

  const getcontainerscan = async () => {
    setLoading(true);

    axios
      .get(`http://localhost:5000/container-result?id=${id}`)
      .then((response) => {
        console.log(response.data);

        setcontainerccan(response.data);
      })
      .catch((error) => {
        setcontainerccan(null);
        console.log(error);
      });
  };

  const getBechmark = async () => {
    setLoading(true);

    axios
      .get(`http://localhost:5000/get-benchmark?id=${id}`)
      .then((response) => {
        console.log(response.data);

        setCount(response.data);
      })
      .catch((error) => {
        setCount(null);
        console.log(error);
      });
  };

  const fixIssues = async () => {
    let data = {
      dockerfile: {
        path: "/home/dush/dockersec/cis/samples/Dockerfile",
        version: "latest",
        image: "vulhub/node",
        fixedVersion: count?.docker?.fixedVersion,
      },
    };
  };

  const data = {
    labels: ["Failed", "Information", "Passed"],
    datasets: [
      {
        label: "# of Votes",
        data: [count?.failCount, count?.infoCount, count?.passCount],
        backgroundColor: [
          "rgb(211, 47, 47)",
          "rgb(2, 136, 209)",
          "rgb(46, 125, 50)",
        ],
        borderColor: [
          "rgb(211, 47, 47)",
          "rgb(2, 136, 209)",
          "rgb(46, 125, 50)",
        ],
        borderWidth: 1,
      },
    ],
  };

  useEffect(() => {
    (async () => {
      const hs = await gethostscan();
      const cs = await getcontainerscan();
      const cl = await getBechmark();

      setLoading(false);
    })();
  }, []);

  console.log(count);

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
            <Container
              maxWidth="lg"
              style={{
                marginTop: "50px",
                marginBottom: "50px",
                padding: "24px",
                borderRadius: "8px",
              }}
            >
              <Grid
                container
                direction="row"
                alignItems="start"
                style={{
                  textAlign: "left",
                }}
              >
                <Grid item md={12} xs={12} sm={12}>
                  <Typography
                    variant="h4"
                    color="initial"
                    align="left"
                    style={{ marginBottom: "24px", marginTop: "24px" }}
                  >
                    <b>CIS Benchmark Test</b>
                  </Typography>
                </Grid>

                <Grid item md={9} xs={12} sm={12}>
                  <Typography
                    variant="body1"
                    color="initial"
                    align="left"
                    style={{ marginBottom: "12px", marginTop: "24px" }}
                  >
                    Scan ID : {id}
                  </Typography>
                </Grid>

                <Grid item md={9} xs={12} sm={12}>
                  <Typography
                    variant="body1"
                    color="initial"
                    align="left"
                    style={{ marginBottom: "12px" }}
                  >
                    Public IP : {hostscan?.info?.ip}
                  </Typography>
                </Grid>

                <Grid item md={3} xs={12} sm={12}>
                  <Doughnut data={data} />

                  <Typography
                    variant="h5"
                    color="initial"
                    align="left"
                    style={{
                      marginBottom: "24px",
                      marginTop: "24px",
                      textAlign: "center",
                    }}
                  >
                    <b>CIS Benchmark Value : {count?.bench}%</b>
                  </Typography>
                </Grid>

                <Grid item md={12} xs={12} sm={12}>
                  <Typography
                    variant="h6"
                    color="initial"
                    align="left"
                    style={{ marginBottom: "24px", marginTop: "24px" }}
                  >
                    Host Configuration
                  </Typography>
                </Grid>

                {hostscan && hostscan.cis[0].results.length > 0 ? (
                  <Grid item md={12} xs={12} sm={12}>
                    <TableContainer component={Paper}>
                      <Table
                        className={classes.table}
                        aria-label="simple table"
                      >
                        <TableHead>
                          <TableRow>
                            <TableCell align="left">
                              <b>ID</b>
                            </TableCell>
                            <TableCell>
                              <b>Description</b>
                            </TableCell>
                            <TableCell>
                              <b>Result</b>
                            </TableCell>
                            <TableCell>
                              <b>Details</b>
                            </TableCell>

                            <TableCell></TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {hostscan.cis[0].results.map((scan) => (
                            <TableRow key={scan.scan_id}>
                              <TableCell align="left">{scan.id}</TableCell>
                              <TableCell align="left">{scan.desc}</TableCell>
                              <TableCell align="left">
                                {scan.result === "WARN" ? (
                                  <Chip label={scan.result} color="error" />
                                ) : null}
                                {scan.result === "INFO" ? (
                                  <Chip label={scan.result} color="info" />
                                ) : null}
                                {scan.result === "PASS" ? (
                                  <Chip label={scan.result} color="success" />
                                ) : null}
                              </TableCell>
                              <TableCell align="left">{scan.details}</TableCell>

                              <TableCell align="left"></TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Grid>
                ) : (
                  <Grid item md={12} xs={12} sm={12}>
                    <Typography variant="body1" color="initial">
                      No Data Available
                    </Typography>
                  </Grid>
                )}

                <Grid item md={12} xs={12} sm={12}>
                  <Typography
                    variant="h6"
                    color="initial"
                    align="left"
                    style={{ marginBottom: "24px", marginTop: "24px" }}
                  >
                    Docker daemon configuration
                  </Typography>
                </Grid>

                {hostscan && hostscan.cis[1].results.length > 0 ? (
                  <Grid item md={12} xs={12} sm={12}>
                    <TableContainer component={Paper}>
                      <Table
                        className={classes.table}
                        aria-label="simple table"
                      >
                        <TableHead>
                          <TableRow>
                            <TableCell align="left">
                              <b>ID</b>
                            </TableCell>
                            <TableCell>
                              <b>Description</b>
                            </TableCell>
                            <TableCell>
                              <b>Result</b>
                            </TableCell>
                            <TableCell>
                              <b>Details</b>
                            </TableCell>

                            <TableCell></TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {hostscan.cis[1].results.map((scan) => (
                            <TableRow key={scan.scan_id}>
                              <TableCell align="left">{scan.id}</TableCell>
                              <TableCell align="left">{scan.desc}</TableCell>
                              <TableCell align="left">
                                {scan.result === "WARN" ? (
                                  <Chip label={scan.result} color="error" />
                                ) : null}
                                {scan.result === "INFO" ? (
                                  <Chip label={scan.result} color="info" />
                                ) : null}
                                {scan.result === "PASS" ? (
                                  <Chip label={scan.result} color="success" />
                                ) : null}
                              </TableCell>
                              <TableCell align="left">{scan.details}</TableCell>

                              <TableCell align="left"></TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Grid>
                ) : (
                  <Grid item md={12} xs={12} sm={12}>
                    <Typography variant="body1" color="initial">
                      No Data Available
                    </Typography>
                  </Grid>
                )}

                <Grid item md={12} xs={12} sm={12}>
                  <Typography
                    variant="h6"
                    color="initial"
                    align="left"
                    style={{ marginBottom: "24px", marginTop: "24px" }}
                  >
                    Docker daemon configuration files
                  </Typography>
                </Grid>

                {hostscan && hostscan.cis[2].results.length > 0 ? (
                  <Grid item md={12} xs={12} sm={12}>
                    <TableContainer component={Paper}>
                      <Table
                        className={classes.table}
                        aria-label="simple table"
                      >
                        <TableHead>
                          <TableRow>
                            <TableCell align="left">
                              <b>ID</b>
                            </TableCell>
                            <TableCell>
                              <b>Description</b>
                            </TableCell>
                            <TableCell>
                              <b>Result</b>
                            </TableCell>
                            <TableCell>
                              <b>Details</b>
                            </TableCell>

                            <TableCell></TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {hostscan.cis[2].results.map((scan) => (
                            <TableRow key={scan.scan_id}>
                              <TableCell align="left">{scan.id}</TableCell>
                              <TableCell align="left">{scan.desc}</TableCell>
                              <TableCell align="left">
                                {scan.result === "WARN" ? (
                                  <Chip label={scan.result} color="error" />
                                ) : null}
                                {scan.result === "INFO" ? (
                                  <Chip label={scan.result} color="info" />
                                ) : null}
                                {scan.result === "PASS" ? (
                                  <Chip label={scan.result} color="success" />
                                ) : null}
                              </TableCell>
                              <TableCell align="left">{scan.details}</TableCell>

                              <TableCell align="left"></TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Grid>
                ) : (
                  <Grid item md={12} xs={12} sm={12}>
                    <Typography variant="body1" color="initial">
                      No Data Available
                    </Typography>
                  </Grid>
                )}
              </Grid>

              <Grid
                container
                direction="row"
                alignItems="center"
                style={{
                  textAlign: "left",
                }}
              >
                <Grid item md={12} xs={12} sm={12}>
                  <Typography
                    variant="h6"
                    color="initial"
                    align="left"
                    style={{ marginBottom: "24px", marginTop: "24px" }}
                  >
                    <b>Host Scan</b>
                  </Typography>
                </Grid>

                {hostscan && hostscan.hostscan.length > 0 ? (
                  <Grid item md={12} xs={12} sm={12}>
                    <TableContainer component={Paper}>
                      <Table
                        className={classes.table}
                        aria-label="simple table"
                      >
                        <TableHead>
                          <TableRow>
                            <TableCell align="left">
                              <b>Port</b>
                            </TableCell>
                            <TableCell>
                              <b>State</b>
                            </TableCell>
                            <TableCell>
                              <b>Product</b>
                            </TableCell>
                            <TableCell>
                              <b>Version</b>
                            </TableCell>
                            <TableCell>
                              <b>CPE</b>
                            </TableCell>

                            <TableCell></TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {hostscan.hostscan.map((scan) => (
                            <TableRow key={scan.scan_id}>
                              <TableCell align="left">{scan.port}</TableCell>
                              <TableCell align="left">
                                {scan.details.state}
                              </TableCell>
                              <TableCell align="left">
                                {scan.details.product}
                              </TableCell>
                              <TableCell align="left">
                                {scan.details.version}
                              </TableCell>
                              <TableCell align="left">
                                {scan.details.cpe}
                              </TableCell>

                              <TableCell align="left"></TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Grid>
                ) : (
                  <Grid item md={12} xs={12} sm={12}>
                    <Typography variant="body1" color="initial">
                      No Data Available
                    </Typography>
                  </Grid>
                )}
              </Grid>

              <Grid
                container
                direction="row"
                alignItems="center"
                style={{
                  textAlign: "left",
                }}
              >
                <Grid item md={12} xs={12} sm={12}>
                  <Typography
                    variant="h6"
                    color="initial"
                    align="left"
                    style={{ marginBottom: "24px", marginTop: "24px" }}
                  >
                    <b>Docker File</b>
                  </Typography>
                </Grid>

                <Grid item md={12} xs={12} sm={12}>
                  <Typography
                    variant="body"
                    color="initial"
                    align="left"
                    style={{ marginBottom: "24px", marginTop: "24px" }}
                  >
                    Dockerfile Location : {hostscan?.dockerfile?.location}
                  </Typography>
                </Grid>

                <Grid item md={12} xs={12} sm={12}>
                  <Typography
                    variant="body"
                    color="initial"
                    align="left"
                    style={{ marginBottom: "24px", marginTop: "24px" }}
                  >
                    Dockerfile Image : {hostscan?.dockerfile?.image} :{" "}
                    {hostscan?.dockerfile?.version}
                  </Typography>
                </Grid>
                <Grid item md={12} xs={12} sm={12}>
                  <Typography
                    variant="body"
                    color="initial"
                    align="left"
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <p>Status: </p>
                    {count && count?.docker?.isVulnerable ? (
                      <Typography
                        variant="overline"
                        color="initial"
                        align="left"
                        style={{
                          backgroundColor: "red",
                          color: "white",
                          paddingLeft: "12px",
                          paddingRight: "12px",
                          marginLeft: "12px",
                        }}
                      >
                        <b>Vulnerable</b>
                      </Typography>
                    ) : (
                      <Typography
                        variant="overline"
                        color="initial"
                        align="left"
                        style={{
                          backgroundColor: "green",
                          color: "white",
                          paddingLeft: "12px",
                          paddingRight: "12px",
                          marginLeft: "12px",
                        }}
                      >
                        <b>Safe</b>
                      </Typography>
                    )}
                  </Typography>
                </Grid>
              </Grid>

              <Grid
                container
                direction="row"
                alignItems="center"
                style={{
                  textAlign: "left",
                }}
              >
                <Grid item md={12} xs={12} sm={12}>
                  <Typography
                    variant="h6"
                    color="initial"
                    align="left"
                    style={{ marginBottom: "24px", marginTop: "24px" }}
                  >
                    <b>Compose File</b>
                  </Typography>
                </Grid>

                <Grid item md={12} xs={12} sm={12}>
                  <Typography
                    variant="body"
                    color="initial"
                    align="left"
                    style={{ marginBottom: "24px", marginTop: "24px" }}
                  >
                    Composefile Location : {hostscan?.composefile?.location}
                  </Typography>
                </Grid>

                <Grid item md={12} xs={12} sm={12}>
                  <Typography
                    variant="body"
                    color="initial"
                    align="left"
                    style={{ marginBottom: "24px", marginTop: "24px" }}
                  >
                    Composefile Image : {hostscan?.composefile?.image} :{" "}
                    {hostscan?.composefile?.version}
                  </Typography>
                </Grid>

                <Grid item md={12} xs={12} sm={12}>
                  <Typography
                    variant="body"
                    color="initial"
                    align="left"
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <p>Status: </p>
                    {count && count?.compose?.isVulnerable ? (
                      <Typography
                        variant="overline"
                        color="initial"
                        align="left"
                        style={{
                          backgroundColor: "red",
                          color: "white",
                          paddingLeft: "12px",
                          paddingRight: "12px",
                          marginLeft: "12px",
                        }}
                      >
                        <b>Vulnerable</b>
                      </Typography>
                    ) : (
                      <Typography
                        variant="overline"
                        color="initial"
                        align="left"
                        style={{
                          backgroundColor: "green",
                          color: "white",
                          paddingLeft: "12px",
                          paddingRight: "12px",
                          marginLeft: "12px",
                        }}
                      >
                        <b>Safe</b>
                      </Typography>
                    )}
                  </Typography>
                </Grid>

                <Grid
                  item
                  md={12}
                  xs={12}
                  sm={12}
                  style={{ marginTop: "24px" }}
                >
                  <Button
                    onClick={fixIssues}
                    variant="contained"
                    color="primary"
                    size="large"
                  >
                    <b>Fix Issues</b>
                  </Button>
                </Grid>
              </Grid>
            </Container>
          </Dashboard>
        </>
      )}
    </>
  );
}
