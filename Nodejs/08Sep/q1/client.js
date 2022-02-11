const serviceClient = require('./callexternalservice');

const clientObject = new serviceClient(); 
var method;

// the 'http' is the default value for the protocol
const options = {
    host: 'apiapptrainingnewapp.azurewebsites.net',
    path: '/api/Products',
    method: method
};

if (method === 'GET'){
    // make call to the method of the module
    clientObject.getData(options).then((data)=>{
        console.log(`Received Data ${data}`);
    }).catch((error)=>{
        console.log(`Communication Error ${error}`);
    });

}

else if(method === 'POST'){
    clientObject.postData(options).then((data)=>{
        console.log(`Received Data ${data}`);
    }).catch((error)=>{
        console.log(`Communication Error ${error}`);
    });
}
else if(method === 'PUT'){
    clientObject.putData(options).then((data)=>{
        console.log(`Received Data ${data}`);
    }).catch((error)=>{
        console.log(`Communication Error ${error}`);
    });
    
}
else if(method === 'DELETE'){
    clientObject.deleteData(options).then((data)=>{
        console.log(`Received Data ${data}`);
    }).catch((error)=>{
        console.log(`Communication Error ${error}`);
    });    
}







