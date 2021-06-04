const mysql = require("mysql2");
const inquirer = require("inquirer");
const consoleTable = require("console.table");
const express = require("express");
require("dotenv").config();

const app = express();
const PORT = 3001;
