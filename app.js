//jshint esversion:8
const express = require("express");
const https = require("https");
const ejs = require("ejs");
const _ = require("lodash");
const bodyParser = require("body-parser");
const e = require("express");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));

const baseUrl = "https://corona.lmao.ninja/v2/countries/";
let query = "";

const options = {
  method: "GET",
};

app.post("/", function (req, res) {
  if (req.body.query === "") {
    query = "india";
  } else {
    query = req.body.query;
  }
  let url = baseUrl + query;
  let getReq = https.get(url, function (response) {
    if (response.statusCode === 200) {
      let data = "";
      response.on("data", function (chunks) {
        data += chunks;
        response.on("end", function () {
          let json = JSON.parse(data);
          let country = json.country;
          let cases = json.cases;
          let todayCases =  json.todayCases;
          let todayDeaths = json.todayDeaths;
          let deaths = json.deaths;
          let actvCases = json.active;
          let critical = json.critical;
          let tests = json.tests;
          let flag = json.countryInfo.flag;
          if(json.todayCases){
            todayCases = "+ " + json.todayCases;
          }
         else if(json.todayCases ===0){
           todayCases = "";
         }
          if(json.todayDeaths){
            todayDeaths = "+ " + json.todayDeaths;
          }
          else if(json.todayDeaths === 0){
            todayDeaths = "";
          }

          res.render("country", {
            country: country,
            flag:flag,
            cases: cases,
            todayCases: todayCases,
            todayDeaths: todayDeaths,
            deaths: deaths,
            actvCases: actvCases,
            critical: critical,
            tests: tests,
            
          });
        });
      });
    } else if (response.statusCode === 404) {
      res.render("error", { errorCode: response.statusCode, message: "Country not found." });
    } else {
      res.render("error", { errorCode: response.statusCode, message: "Unkown Error." });
    }
  });
  getReq.end();
  // getReq.on("error", function (e) {
    // console.log(e);
  // });
});

app.get("/", function (req, res) {
  res.render("home");
});

app.listen(process.env.PORT || 3000, function () {
  console.log("Server has started");
});
