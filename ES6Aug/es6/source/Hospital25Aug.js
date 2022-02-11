let gender = ["Male","Female","Transgender"]
let ward = ["General","Private","Special"]
let disease = ["General","Cancer","Heart","Sugar","Pneuomonia","Skin Care","Bone"];
let field = ['PatientId','Patient','Doc','Age','Gender','Disease','Ward','RoomNo']
let data = [];
let count = 0;
let dName = new Set();

// onload functionality
window.onload = function(){
    document.getElementById('gender').innerHTML = DropDownMethod(gender,"Gender");
    document.getElementById('ward').innerHTML = DropDownMethod(ward,"Ward");
    document.getElementById('disease').innerHTML = DropDownMethod(disease,"Disease");
    document.getElementById('submit').addEventListener('click',()=>{
        DataStored();
    },false)
}



// Store value into global variable
let DataStored =()=>{
    let temp = {};
    temp[field[0]] = "PatientID-"+String(count+1);
    for(let i=1; i<field.length; i++){
        if(field[i] == "Doc")
        dName.add(document.getElementById(field[i]).value);
        let te = document.getElementById(field[i]).value;
        te = te[0].toUpperCase() + te.substring(1);
        temp[field[i]] = te;
        document.getElementById(field[i]).value = "";
    }
    count++;
    data.push(temp);

    TableGeneration();
}



let HTMLHead = () => {
    let headHTML = "<tr>";
    for (let ind in field) {
        headHTML += "<th>" + field[ind] + "</th>";
    }
    headHTML += "</tr>"
    return headHTML;
}
let HTMLBody = (DataVal = data) => {
    let bodyHTML = "";
    for(let ind in DataVal)
    {
        let rowHTML = "<tr>"
        for(let ind2 in field)
        {
            rowHTML += "<td id ='entry"+ind+field[ind2]+"'>"+DataVal[ind][field[ind2]]+"</td>"
            console.log("entry"+ind+field[ind2])
        }
        bodyHTML += rowHTML;
    }
    return bodyHTML;
}


//drop down functionality
function DropDownMethod(ddList,id,flag = 0,value=""){
    let temp = "";
    if(flag ==1 )
    {
        console.log("Hello Inside diff drop down");
        temp = `<select id = '${id}' onchange = "SortCategory()" required><option value = ''>--Select--</option>`;    
    }
    else if(flag == 2 )
    {
        console.log("Hello Inside diff drop down");
        temp = `<select id = '${id}' onchange = "SortedCategory(${id})" required><option value = ''>--Select--</option>`;    
    }
    else
    temp = `<select id = '${id}' required><option value = ''>--Select--</option>`;
    ddList.map(item=>{
        console.log(item);
            temp+= `<option value='${item}'>${item}</option>`;
        }
    )
    temp+= "</select>"
    return temp;
}



function SortedCategory(onVal)
{
    //console.log("Inside SortedCategory function..........");
    SortingData(document.getElementById('filter').value,onVal);
}
// filter funtionality
function SortCategory(){
    let raioBt = document.getElementById('filter');
    let radioBtval = raioBt.value;
    // console.log(radioBtval);
    // console.log(dName);
    if(radioBtval == 'Doctor')
    {
        document.getElementById('SortBy2').innerHTML = DropDownMethod(Array.from(dName),'filterDoctor',2);
    }
    else if(radioBtval == "Disease")
    {
        document.getElementById('SortBy2').innerHTML = DropDownMethod(disease,'filterDisease',2);
    }
    else{
        document.getElementById('SortBy2').innerHTML = DropDownMethod(ward,'filterWard',2);
    }
}


// filter data as per the choice..
let SortingData = (onAtt , attVal) =>{
    if(onAtt == 'Doctor')
    onAtt = onAtt + 'Name';
    console.log("OnAtt:- ",onAtt);
    console.log('AttVal:- ',attVal.value);
    let filteredData = [];
    data.map((item) =>{
        console.log("ITEM",item);
        console.log("DATA[ITEM]",data[item]);
        if(item[onAtt] == attVal.value)
        {
            filteredData.push(item);
        }
    })
    console.log("Filtered Data:- ",filteredData);
    document.getElementById('Table').innerHTML =  HTMLHead() + HTMLBody(filteredData);
}
// print table function

let TableGeneration = () =>{
    document.getElementById('SortBy').innerHTML = DropDownMethod(['Doctor','Disease','Ward'],'filter',1);
    document.getElementById('Table').innerHTML = HTMLHead() + HTMLBody();
}

