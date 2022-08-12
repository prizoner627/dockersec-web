const express = require("express");
const cors = require("cors");
const connect = require("./util/connction");

var app = express();
connect();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000", "http://34.142.253.123:3001"],
    credentials: true,
  })
);

const {
  PostHostResults,
  GetHostResults,
  GetContainerResults,
  GetHostResult,
  PostContainerResults,
  GetContainerResult,
  GetBench,
} = require("./api/Results");

//routes
app.post("/host-results", PostHostResults);
app.post("/container-results", PostContainerResults);
app.get("/host-results", GetHostResults);
app.get("/container-results", GetContainerResults);
app.get("/host-result", GetHostResult);
app.get("/container-result", GetContainerResult);
app.get("/get-benchmark", GetBench);

var server = app.listen(5000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log("Example app listening at http://%s:%s", host, port);
});
