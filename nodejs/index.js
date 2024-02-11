const express = require('express');
const app = express();

const dateToday = new Date();
console.log("Hello ASL!");
console.log(dateToday.toLocaleDateString());