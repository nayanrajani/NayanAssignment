"use strict";

var gender = ["Male", "Female", "Transgender"];
var ward = ["General", "Private", "Special"];
var disease = ["General", "Cancer", "Heart", "Sugar", "Pneuomonia", "Skin Care", "Bone"];
var field = ['PatientId', 'Patient', 'Doc', 'Age', 'Gender', 'Disease', 'Ward', 'RoomNo'];
var data = [];
var count = 0;
var dName = new Set(); // onload functionality

window.onload = function () {
  document.getElementById('gender').innerHTML = DropDownMethod(gender, "Gender");
  document.getElementById('ward').innerHTML = DropDownMethod(ward, "Ward");
  document.getElementById('disease').innerHTML = DropDownMethod(disease, "Disease");
  document.getElementById('submit').addEventListener('click', function () {
    DataStored();
  }, false);
}; // Store value into global variable


var DataStored = function DataStored() {
  var temp = {};
  temp[field[0]] = "Pt-" + String(count + 1);

  for (var i = 1; i < field.length; i++) {
    if (field[i] == "Doc") dName.add(document.getElementById(field[i]).value);
    var te = document.getElementById(field[i]).value;
    te = te[0].toUpperCase() + te.substring(1);
    temp[field[i]] = te;
    document.getElementById(field[i]).value = "";
  }

  count++;
  data.push(temp);
  TableGeneration();
};

var HTMLHead = function HTMLHead() {
  var headHTML = "<tr>";

  for (var ind in field) {
    headHTML += "<th>" + field[ind] + "</th>";
  }

  headHTML += "</tr>";
  return headHTML;
};

var HTMLBody = function HTMLBody() {
  var DataVal = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : data;
  var bodyHTML = "";

  for (var ind in DataVal) {
    var rowHTML = "<tr>";

    for (var ind2 in field) {
      rowHTML += "<td id ='entry" + ind + field[ind2] + "'>" + DataVal[ind][field[ind2]] + "</td>";
      console.log("entry" + ind + field[ind2]);
    }

    bodyHTML += rowHTML;
  }

  return bodyHTML;
}; //drop down functionality


function DropDownMethod(ddList, id) {
  var flag = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  var value = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "";
  var temp = "";

  if (flag == 1) {
    console.log("Hello Inside diff drop down");
    temp = "<select id = '".concat(id, "' onchange = \"SortCategory()\" required><option value = ''>--Select--</option>");
  } else if (flag == 2) {
    console.log("Hello Inside diff drop down");
    temp = "<select id = '".concat(id, "' onchange = \"SortedCategory(").concat(id, ")\" required><option value = ''>--Select--</option>");
  } else temp = "<select id = '".concat(id, "' required><option value = ''>--Select--</option>");

  ddList.map(function (item) {
    console.log(item);
    temp += "<option value='".concat(item, "'>").concat(item, "</option>");
  });
  temp += "</select>";
  return temp;
}

function SortedCategory(onVal) {
  //console.log("Inside SortedCategory function..........");
  SortingData(document.getElementById('filter').value, onVal);
} // filter funtionality


function SortCategory() {
  var raioBt = document.getElementById('filter');
  var radioBtval = raioBt.value; // console.log(radioBtval);
  // console.log(dName);

  if (radioBtval == 'Doctor') {
    document.getElementById('SortBy2').innerHTML = DropDownMethod(Array.from(dName), 'filterDoctor', 2);
  } else if (radioBtval == "Disease") {
    document.getElementById('SortBy2').innerHTML = DropDownMethod(disease, 'filterDisease', 2);
  } else {
    document.getElementById('SortBy2').innerHTML = DropDownMethod(ward, 'filterWard', 2);
  }
} // filter data as per the choice..


var SortingData = function SortingData(onAtt, attVal) {
  if (onAtt == 'Doctor') onAtt = onAtt + 'Name';
  console.log("OnAtt:- ", onAtt);
  console.log('AttVal:- ', attVal.value);
  var filteredData = [];
  data.map(function (item) {
    console.log("ITEM", item);
    console.log("DATA[ITEM]", data[item]);

    if (item[onAtt] == attVal.value) {
      filteredData.push(item);
    }
  });
  console.log("Filtered Data:- ", filteredData);
  document.getElementById('Table').innerHTML = HTMLHead() + HTMLBody(filteredData);
}; // print table function


var TableGeneration = function TableGeneration() {
  document.getElementById('SortBy').innerHTML = DropDownMethod(['Doctor', 'Disease', 'Ward'], 'filter', 1);
  document.getElementById('Table').innerHTML = HTMLHead() + HTMLBody();
};
