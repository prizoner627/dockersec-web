const mongoose = require("mongoose");
const moment = require("moment");
// const { v4: uuidv4 } = require("uuid");
const _ = require("lodash");
const axios = require("axios");

const { HostResult } = require("../schema/HostResult");
const { ContainerResult } = require("../schema/ContainerResult");
const { Vulneralabilitie } = require("../schema/Vul");

exports.PostHostResults = async (req, res) => {
  try {
    let data = req.body;

    console.log(data);
    console.log(data.info.scanId);

    const newResult = new HostResult({
      createdAt: moment(new Date()).format("YYYY-MM-DD"),
      scanId: data.info.scanId,
      cis: data.cis,
      hostscan: data.hostscan,
      dockerfile: data.dockerfile,
      composefile: data.composefile,
      info: data.info,
    });
    const result = await newResult.save();
    return res.send(result);
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      status: "500",
      message: "Something went wrong, please try again later",
      data: null,
    });
  }
};

exports.GetHostResults = async (req, res) => {
  try {
    const result = await HostResult.find({});
    return res.send(result);
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      status: "500",
      message: "Something went wrong, please try again later",
      data: null,
    });
  }
};

exports.GetHostResult = async (req, res) => {
  try {
    let id = req.query.id;

    const result = await HostResult.findOne({ scanId: id });
    return res.send(result);
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      status: "500",
      message: "Something went wrong, please try again later",
      data: null,
    });
  }
};

exports.PostContainerResults = async (req, res) => {
  try {
    let data = req.body;
    let id = req.query.id;

    console.log(data);
    console.log(id);

    const newResult = new ContainerResult({
      createdAt: moment(new Date()).format("YYYY-MM-DD"),
      scanId: id,
      container: data.container,
      containerscan: data.containerscan,
    });
    const result = await newResult.save();
    return res.send(result);
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      status: "500",
      message: "Something went wrong, please try again later",
      data: null,
    });
  }
};

exports.GetContainerResults = async (req, res) => {
  try {
    const result = await ContainerResult.find({});
    return res.send(result);
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      status: "500",
      message: "Something went wrong, please try again later",
      data: null,
    });
  }
};

exports.GetContainerResult = async (req, res) => {
  try {
    let id = req.query.id;

    const result = await ContainerResult.findOne({ scanId: id });
    return res.send(result);
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      status: "500",
      message: "Something went wrong, please try again later",
      data: null,
    });
  }
};

exports.GetBench = async (req, res) => {
  try {
    let id = req.query.id;

    const result = await HostResult.findOne({ scanId: id });

    let arr1 = result.cis[0].results;
    let arr2 = result.cis[1].results;
    let arr3 = result.cis[2].results;

    let dockerfile = result.dockerfile;
    let composefile = result.composefile;

    // const dRes = await Vulneralabilitie.find({ "cpes.vendor": "nodejs" });
    const dRes = await Vulneralabilitie.find({
      $and: [{ "cpes.vendor": "nodejs" }, { "cpes.version": "*" }],
    });
    const cRes = await Vulneralabilitie.find({
      $and: [{ "cpes.vendor": "nodejs" }, { "cpes.version": "*" }],
    });

    let docker = {
      baseimage: dockerfile.image,
      version: dockerfile.version,
      isVulnerable: false,
      fixedVersion: "",
    };

    if (dRes.length > 0) {
      docker = {
        baseimage: dockerfile.image,
        version: dockerfile.version,
        isVulnerable: true,
        fixedVersion: "latest",
      };
    }

    let compose = {
      baseimage: composefile.image,
      version: composefile.version,
      isVulnerable: false,
      fixedVersion: "",
    };

    if (cRes.length > 0) {
      compose = {
        baseimage: composefile.image,
        version: composefile.version,
        isVulnerable: true,
        fixedVersion: "latest",
      };
    }

    console.log(dRes);
    console.log(dRes.length);

    // host hardning
    dbase = dockerfile.baseimage[0];
    dversion = dockerfile.baseimage[1];

    let cis = [];

    mainArr = [...arr1, ...arr2, ...arr3];

    cis.push(mainArr);
    console.log(mainArr.length);

    let info = _.filter(cis[0], function (o) {
      return o.result === "INFO";
    });

    let pass = _.filter(cis[0], function (o) {
      return o.result === "PASS";
    });

    let warn = _.filter(cis[0], function (o) {
      return o.result === "WARN";
    });

    let p = pass.length + info.length;
    let bench = (p / 62) * 100;

    let out = {
      pass: pass,
      fail: warn,
      info: info,
      passCount: pass.length,
      failCount: warn.length,
      infoCount: info.length,
      bench: bench.toFixed(2),
      docker: docker,
      compose: compose,
    };

    return res.send(out);
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      status: "500",
      message: "Something went wrong, please try again later",
      data: null,
    });
  }
};
