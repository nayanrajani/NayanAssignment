"use strict";

window.onload = function () {
  var btnSubmit = document.getElementById('submit');
  btnSubmit.addEventListener('click', function () {
    var fromDate = new Date(document.getElementById('fromDate').value);
    var toDate = new Date(document.getElementById('toDate').value);
    console.log('fromDate:- ', fromDate);
    console.log('toDate:- ', toDate);
    var fromDateSec = fromDate.getTime();
    var toDateSec = toDate.getTime();
    console.log('fromDateSec:- ', fromDateSec);
    console.log('toDateSec:- ', toDateSec);
    var dateDifSec = toDate - fromDateSec;
    console.log('dateDifSec:- ', dateDifSec);
    var yearDiff = 0;
    var monthDiff = 0;
    var daysDiff = Math.floor(dateDifSec / (1000 * 60 * 60 * 24));
    var hrDiff = Math.floor((dateDifSec - daysDiff * (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minDiff = Math.floor((dateDifSec - daysDiff * (1000 * 60 * 60 * 24) - hrDiff * 1000 * 60 * 60) / (1000 * 60));
    var secDiff = Math.floor((dateDifSec - daysDiff * (1000 * 60 * 60 * 24) - hrDiff * (1000 * 60 * 60) - minDiff * 1000 * 60) / 1000);
    var resHTML = "";
    console.log('daysDiff:- ', daysDiff);

    if (daysDiff > 365) {
      yearDiff = Math.floor(daysDiff / 365);
      daysDiff = daysDiff - yearDiff * 365;
      console.log("Years Diff:- ", yearDiff);
      console.log("Days remain after year:- ", daysDiff);
      resHTML += "".concat(yearDiff, " Years, ");
    }

    if (daysDiff > 30) {
      monthDiff = Math.floor(daysDiff / 30);
      daysDiff -= monthDiff * 30;
      console.log("Month Diff:- ", monthDiff);
      resHTML += "".concat(monthDiff, " Month, ");
    }

    if (daysDiff > 0) {
      console.log('Days difference:- ', daysDiff);
    }

    console.log("Hour Diff:-", hrDiff);
    console.log("Number of minutes remaining:- ", minDiff);
    console.log("Number of Seconds remaining:- ", secDiff);
    resHTML += "".concat(daysDiff, " Days, ").concat(hrDiff, " Hours, ").concat(minDiff, " Minutes "); // ${secDiff} Seconds

    document.getElementById('res').innerHTML = resHTML;
  }, false);
};
