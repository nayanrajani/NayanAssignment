const http = require("http");

const ProductDetails = [
  { Product_Id: 1, Product_Name: "Charger", Product_Price: 100 },
  { Product_Id: 2, Product_Name: "Mobile", Product_Price: 8200 },
  { Product_Id: 3, Product_Name: "Laptop", Product_Price: 83300 },
  { Product_Id: 4, Product_Name: "Mouse", Product_Price: 400 },
  { Product_Id: 5, Product_Name: "Keyboard", Product_Price: 3500 },
  {Product_Id:6,Product_Name:"cover",Product_Price:40},
  {Product_Id:7,Product_Name:"headphone",Product_Price:4000}
];

const server = http.createServer((request, response) => {
  let id = request.headers.id;
  if(request.method === "GET"){
    if (id === undefined || id === 0) {
        // write a response Header
        response.writeHead(200, { "Content-Type": "application/json" });
        // write response data in header
        response.write(JSON.stringify(ProductDetails));
        // end the response
        response.end();
      } else {
            // write a response Header
        response.writeHead(200, {'Content-Type': 'application/json'});
        // write response data in header
        let res =  ProductDetails.filter((e,i)=> {return e.Product_Id === parseInt(id);});
        console.log(`Data in Else ${JSON.stringify(res)}`)
        response.write(JSON.stringify(res));
        // end the response
        response.end();
      }
  }
  if(request.method === "POST") {
      // the global object for current request to save the received data
      let receivedData;
      request.on('data', (chunk)=>{
         // read data and store locally
         // wrte logic to validate the data, etc
         receivedData = JSON.parse(chunk);
      });
      // end the request and finally complete the processing
      request.on('end', ()=>{
          ProductDetails.push(receivedData);
          response.end(JSON.stringify(ProductDetails));
      });
  }
  
  // if(request.method === "PUT") {
    // 1. Receive the id from the header
    // 2. Search the Record from array based on the header
    // 3. if found then read data from the body using request.on()
    // 4. Update the original data from array based on receibed data from body
    // 5. if based on id data is not found generate error response e.g. not found
    // 6. if data is successful the send the updated record back
  if (request.method === "PUT") {
        let res = ProductDetails.filter((e, i) => {
            return e.Product_Id === parseInt(id);
        });
        if (res.length === 0){
            response.write("No Record Found");
            response.end();
        }
        else {
            let receivedData;
            request.on('data', (chunk) => {
                receivedData = JSON.parse(chunk);
            });
            request.on('end', () => {
                response.write("Before Update Array is :- ");
                response.write(JSON.stringify(ProductDetails)+"\n");
                res[0].Product_Id=receivedData.Product_Id;
                res[0].Product_Name=receivedData.Product_Name;
                res[0].Product_Price=receivedData.Product_Price;
                response.write("After Update Array is :- ");
                response.end(JSON.stringify(ProductDetails));
            });
        }
    }
// }
  
//if(request.method === "DELETE") {
    // 1. Receive the id from the header
    // 2. Search the Record from array based on the header
    // 3. if found then delete from  the array and generate response
    // 4. if based on id data is not found generate error response e.g. not found

// }

if(request.method === "DELETE") {
        
  let id = request.headers.id;
  if (id === undefined || id === 0) { 
    response.writeHead(404);
    response.write("Invalid ID");
    response.end();
  }
  else{ 
    let res=0;
    ProductDetails.forEach((rec,i)=> {
      if(rec.Product_Id === parseInt(id)){  
        ProductDetails.splice(i,1);
        res=1;
        response.writeHead(200);
        response.write("ID Deleted");
        response.end();
        return;
      }
    });
   
    if(res==0){
      response.writeHead(404, { "Content-Type": "application/json" });
      response.write(JSON.stringify("ID Not Found"));
      response.end();
    }
    
  } 
}
   
  
});

// start listening on a port
server.listen(9080);
console.log("STarted listening on port 9080");
