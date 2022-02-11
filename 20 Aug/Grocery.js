var mydb, tbl;
var tempCount;
var dbEntries;
var categoryList = ['Electrical','Electronics','Food','Fashion','Software','Hardware'];
var manufacturerList = ['Tata','IBM','MacD','Bajaj','Google','Microsoft','Amazon'];
var header = ['ProductRowId', 'ProductId', 'ProductName', 'CategoryName', 'Manufacturer', 'Price', 'Description'];
// Making the DataBase
function createDb() {
    mydb = window.indexedDB.open('Grocery', 1);
    mydb.onupgradeneeded = function (e) {
        var dbReference = e.target.result;
        var columnConstraints = { unique: false };
        tbl = dbReference.createObjectStore('DATA', { keyPath: 'ProductRowId' });
        tbl.createIndex('ProductRowId', 'ProductRowId', { unique: true });
        tbl.createIndex('ProductId', 'ProductId', { unique: true, autoIncrement: true });
        tbl.createIndex('ProductName', 'ProductName', columnConstraints);
        tbl.createIndex('CategoryName', 'CategoryName', columnConstraints);
        tbl.createIndex('Manufacturer', 'Manufacturer', columnConstraints);
        tbl.createIndex('Price', 'Price', columnConstraints);
        tbl.createIndex('Description', 'Description', columnConstraints);
        console.log("Database has been created successfully");
    }
}

// convert to 4 digit number:- 
function convertToFour(num) {
    num = String(num);
    // console.log(num.length)
    if (num.length < 4) {
        return ('0'.repeat(4 - num.length) + num);
    } else { return (num); }
}

function clear(){
    var inputs = document.getElementsByClassName('c');
    for(var i=0;i<inputs.length;i++){
        inputs[i].value = '';
    } 
}

// Generate Product Id
function genratePId(num) {
    return 'Product-' + convertToFour(num);
}

// Store data to database:
function getData() {
    getAllEntries();
    var rpId = tempCount + 1;
    console.log("rpId:- " + rpId);
    console.log("rpId:- " + typeof (rpId));
    var pId = genratePId(rpId);
    var data = {
        ProductRowId: rpId,
        ProductId: pId
    }
    for (var ind = 2; ind < header.length; ind++) {
        let temp = document.getElementById(header[ind]).value;
        temp = temp[0].toUpperCase() + temp.substring(1);
        data[header[ind]] = temp;
        temp = '';
    }
    getAllEntries();
    
    return (data);
}

function storeData() {
    var data = getData();
    mydb = window.indexedDB.open('Grocery');
    if (mydb) {
        mydb.onsuccess = function (e) {
            var tx = e.target.result.transaction('DATA', 'readwrite');
            tbl = tx.objectStore('DATA');
            var operation = tbl.add(data);
            operation.onsuccess = function (e) {
                alert("Data has stored successfully");
            }
            operation.onerror = function (e) {
                alert("Error Ocured");
            }
        }
    }
    else {
        alert("Unable to open DataBase");
    }
}

// total number of entries in database....
function totalEnteries() {
    mydb = window.indexedDB.open('Grocery');
    if (mydb) {
        mydb.onsuccess = function (e) {
            var tx = e.target.result.transaction('DATA', 'readonly');
            tbl = tx.objectStore('DATA');
            var objTotal = tbl.count();
            objTotal.onsuccess = function (e) {
                tempCount = e.target.result;
                console.log("Total Entries in DataBase:-  " + tempCount);
            }
            
        }

    }
    else {
        alert("Unable to load DataBase");
    }
}

// get all entries stored in database
function getAllEntries() {
    mydb = window.indexedDB.open('Grocery');
    if (mydb) {
        mydb.onsuccess = function (e) {
            var tx = e.target.result.transaction('DATA', 'readonly');
            tbl = tx.objectStore('DATA');
            var objTotal = tbl.getAll();
            objTotal.onsuccess = function (e) {
                dbEntries = e.target.result;
                console.log("Entries in DataBase:-  " + dbEntries);
            }
            
        }

    }
    else {
        alert("Unable to load DataBase");
    }
}


// function to delete entry from database

function deleteEntry(ProductRId)
{
    console.log(ProductRId);
    mydb = window.indexedDB.open('Grocery');
    if (mydb) {
        mydb.onsuccess = function (e) {
            var tx = e.target.result.transaction('DATA', 'readwrite');
            tbl = tx.objectStore('DATA');
            var objTotal = tbl.delete(ProductRId,1);
            // console.log("Up side OnSuccess");
            objTotal.onsuccess = function (e) {
                alert( "The Row Id " + ProductRId + " is deleted! ");
                console.log("Entries in DataBase:-  " + dbEntries);
                window.location.reload();
        
            }
            getAllEntries();
        }

    }
    else {
        alert("Unable to load DataBase");
    }
}

// Delete whole DataBase:- 
function deleteDb()
{
    var dbDeleteRequest = window.indexedDB.deleteDatabase("Grocery");
    dbDeleteRequest.onsuccess = function(){
        getData();
        console.log("Database is deleted succesfully");
    }
    alert("Database Deleted");
    window.location.reload();
}

// Update data into dataBase
function storeUpdatedData(data)
{
    // data = getUpdatedData(ProductRId);
    mydb = window.indexedDB.open('Grocery');
    if (mydb) {
        mydb.onsuccess = function (e) {
            var tx = e.target.result.transaction('DATA', 'readwrite');
            tbl = tx.objectStore('DATA');
            var operation = tbl.put(data);
            operation.onsuccess = function (e) {
                console.log("Data has Updated successfully.....");
            }
            operation.onerror = function (e) {
                console.log("Their is some error in updating the data.....");
            }
        }
    }
    else {
        console.log("Unable to open DataBase...");
    }
}


// function to edit entry from database
function editEntry(ProductRId){
    
    getAllEntries();
    var tempProductName = 'entry'+(ProductRId-1) + "ProductName";
    var tempCategoryName = 'entry'+(ProductRId-1) +"CategoryName";
    var tempManufacturer = 'entry'+(ProductRId-1) +"Manufacturer";
    var tempPrice = 'entry'+(ProductRId-1) +"Price";
    var tempDescription = 'entry'+(ProductRId-1) +"Description";
    console.log(dbEntries[ProductRId]);
    document.getElementById(tempProductName).innerHTML = "<input type = 'text' id = 'UpdatedProductName' value = '"+dbEntries[ProductRId-1]['ProductName']+"'>";
    document.getElementById(tempCategoryName).innerHTML = "<select id = 'UpdatedCategoryName'>"+dropDownFunc(categoryList)+"</select>";
    document.getElementById(tempManufacturer).innerHTML = "<select id= 'UpdatedManufacturer'>"+dropDownFunc(manufacturerList)+"</select>";
    document.getElementById(tempDescription).innerHTML = "<input type = 'text' id='UpdatedDescription' value = '"+dbEntries[ProductRId-1]['Description']+"'>";
    document.getElementById(tempPrice).innerHTML = "<input type = 'number' id= 'UpdatedPrice' min='0' value = '"+dbEntries[ProductRId-1]['Price']+"'>";
    document.getElementById('edit'+ProductRId).innerHTML = "Done";
    
}

// function editEntry() {
//     mydb = window.indexedDB.open("Grocery");
//     if (mydb) {
//         mydb.onsuccess = function (e) {
//             var tx = e.target.result.transaction("DATA", "readwrite");
//             // point to the ObjectSTore and start the transaction

//             tbl = tx.objectStore("DATA");
          
//             var data = {
//                 "ProductRowId": parseInt(document.getElementById('ProductRowId').value),
//                 "ProductId": document.getElementById('ProductId').value,
//                 "ProductName": document.getElementById("ProductName").value,
//                 "CategoryName": document.getElementById("CategoryName").value,
//                 "Manufacturer": document.getElementById("Manufacturer").value,
//                 "Price": document.getElementById('Price').value,
//                 "Description": document.getElementById("Description").value

//             };
//             console.log("data here")
//             console.log(data);
//             var requestUpdate = tbl.put(data);
//             requestUpdate.onerror = function (event) {
//                 document.getElementById('dvstatus').innerHTML = "Record is not updated successfully";
//             };
//             requestUpdate.onsuccess = function (event) {
//                 document.getElementById('dvstatus').innerHTML = "Record is updated successfully";
//                 document.getElementById("Price").value = '';
//                 document.getElementById("ProductName").value = '';
//                 document.getElementById("CategoryName").value = '';
//                 document.getElementById("Manufacturer").value = '';
//                 document.getElementById("Description").value = '';
//                 getAllEntries();
//             };

//         }
//     }
// }

function generateHeading() {
    var headHTML = "<tr>";
    for (var ind in header) {
        headHTML += "<th>" + header[ind] + "</th>";
    }
    headHTML += "<th>Edit</th><th>Delete</th></tr>"
    return headHTML;
}

function generateBody() {
    console.log("Inside generate body function...");
    var bodyHTML = "";
    for(var ind in dbEntries)
    {
        var rowHTML = "<tr>"
        console.log(dbEntries[ind]);
        for(var ind2 in header)
        {
            rowHTML += "<td id ='entry"+ind+header[ind2]+"'>"+dbEntries[ind][header[ind2]]+"</td>"
            console.log("entry"+ind+header[ind2])
        }
        rowHTML += "<td><button id = 'edit"+dbEntries[ind]['ProductRowId']+"' value = '"+dbEntries[ind]['ProductRowId']+"' onclick = 'editEntry("+dbEntries[ind]['ProductRowId']+")'>Edit</button></td><td><button id='dlt"+dbEntries[ind]['ProductRowId']+"' value = '"+dbEntries[ind]['ProductRowId']+"' onclick = 'deleteEntry("+dbEntries[ind]['ProductRowId']+")'>Delete</button></td></tr>"
        bodyHTML += rowHTML;
    }
    return bodyHTML;
}

// create the drop down list
function dropDownFunc(dropDownList)
{   
    var temp = "<option value=''>--Select--</option>";
    for(var i in dropDownList)
    {
        temp+= "<option value='"+dropDownList[i]+"'>"+dropDownList[i]+"</option>";
    }
    return temp;
}