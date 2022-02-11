let PatientInfo = [
    { PatientId: 1, PatientName: "Harsh G", Ward: "General"},
    { PatientId: 2, PatientName: "Dhawla",  Ward: "Private"},
    { PatientId: 3, PatientName: "Hardik", Ward: "Private"},
    { PatientId: 4, PatientName: "Vinal", Ward: "General"},
    { PatientId: 5, PatientName: "Anurag", Ward: "Special"},
    { PatientId: 6, PatientName: "Siddharth", Ward: "general"}
];
 
// function* is an indicator that internally the iterator will be called
function* dataGenerator(start,step,end=Infinity){
    //console.log("Inside generator");  
    for(let i=start;i<end;i+=step){
        // console.log("Inside for loop");    
        if(PatientInfo[i].Ward=='General' || PatientInfo[i].Ward=='general' )
            yield PatientInfo[i]; // read, return and movenext
            //console.log("Inside If");  
    } 
}
 
const generator = dataGenerator(0, 1,PatientInfo.length);
// start iterating from first record
let dataReader = generator.next();

while(!dataReader.done){
    // console.log("Inside While");
    console.log(" ");
    console.log(`filtered Value = ${JSON.stringify(dataReader.value)}`);
    dataReader = generator.next(); // move next
}