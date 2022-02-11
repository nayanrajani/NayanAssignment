const http = require("http");
const fs = require('fs');
const path = require('path');

const serverPath = path.join(__dirname, '/views');

let products = [
    
    {ProductId:1, ProductName:"Lenovo ThinkPad", CategoryName:"Electronics", Price:49999},
    {ProductId:2, ProductName:"Refrigerator", CategoryName:"Appliances", Price:34999},
    {ProductId:3, ProductName:"TV", CategoryName:"Electronics", Price:54999},
    {ProductId:4, ProductName:"Charger", CategoryName:"Electronics", Price:999},
    {ProductId:5, ProductName:"Sony Headphones", CategoryName:"Electronics", Price:3999},

];


let users=["Basic nayan.rajani@blazeclan.com:pass@123"];

function validateProduct(product){
    let check1=false,check2=false,check3=false;
    let letters = /^[A-Za-z]+$/;
    if(product.ProductName.length>0 && product.ProductName.length<=80){
        if(product.ProductName.charAt(0).match(/[a-zA-z]/)){
            check1=true;
        }
    }
    if(product.CategoryName.length>0){
        if(product.CategoryName.match(letters)){
            check2=true;
        }
    }
    if(typeof(product.Price)==='number'){
        if(product.Price>0){
            check3=true;
        }
    };
    if(check1 && check2 && check3) return true;
    else return false;
}

function checkProduct(product,validate1,validate2){
    let check=false;
    let index=-1;
    products.forEach((prod,i)=>{
        if(prod.ProductId==product.ProductId){
            check=true;
            index=i;
            return;
        }
    });
    if(validate1&&validate2){
        if(check){return "Product Id already present";}
        else{
            return validateProduct(product);
        }
    }
    if(validate1 && !(validate2)){
        return validateProduct(product);
    }
    else{
        if(check){return index;}
        else return "Product Id not present";
    }
    
                
}

const server = http.createServer((request, response) => {

    if(request.method === "GET" && request.url=== '/'){
        
        fs.readFile(`${serverPath}/index.html`, {encoding:'ascii'},(error,file)=>{
            if(error){
                response.writeHead(404,{'Content-Type':'text/html'});
                response.write(`File Not Found ${error.message}`);
                response.end();
            }
            response.writeHead(200,{'Content-Type':'text/html'});
            response.write(file);
            response.end();
        });
    }
  
    if(request.method === "GET" && request.url=== '/home'){
        console.log('In GET method');
      let id = request.headers.id;
      if (id === undefined || id === 0) {
          
          response.writeHead(200, { "Content-Type": "application/json"});
          
          response.write(JSON.stringify(products));
          
          response.end();
        } else {
              id=parseInt(id);
          response.writeHead(200, {'Content-Type': 'application/json'});
         
          let res =  products.filter((e,i)=> {return e.ProductId === parseInt(id);});
          if(res.length==0){
            response.write(JSON.stringify("No Product Found for the given ID"));
            
            response.end();
          }
          else{
            response.write(JSON.stringify(res));
            
            response.end();
          }
        }
    }

    if(request.method === "POST" && request.url=== '/home') {
        let receivedData;
        console.log('In Post method');
        request.on('data', (chunk)=>{
           receivedData = JSON.parse(chunk);
        });
        
        request.on('end', ()=>{
            let res= checkProduct(receivedData,true,true);
            if(typeof(res)==='string'){
                
                response.end(JSON.stringify(res));
            }
            else{
                if(res){
                    products.push(receivedData);
                    response.end(JSON.stringify(products));
                }
                else{
                    response.end("Entered Product does not have valid details");
                }    
            }
            
        });
    }

    if(request.method === "POST" && request.url==='/') {
        console.log('in check url');
        const auth = request.headers.authorization;
        let flag=false;
        for(let i=0;i<users.length;i++){
            if(auth === users[i]){
                flag=true;
                response.writeHead(200, { "Content-Type": "application/json" });
              
                response.write(JSON.stringify("Valid"));
              
                response.end();
                break;
            }
        }
        if(!flag){
            response.writeHead(400, { "Content-Type": "application/json" });
            
            response.write(JSON.stringify("Invalid"));
            
            response.end();
        }       
    }

    if(request.method === "PUT" && request.url=== '/home') {
        let id = request.headers.id;
        if (id === undefined || id === 0) { 
          response.writeHead(400, { "Content-Type": "application/json" });
          response.write(JSON.stringify("Invalid ID"));
          response.end();
        }
        else{
            request.on('data', (chunk)=>{
                receivedData = JSON.parse(chunk);
            });

            request.on('end', ()=>{
                let i=checkProduct(receivedData,false,false);
                if(typeof(i)==='number'){
                    let res=checkProduct(receivedData,true,false)
                    if(res){
                        products[i]=receivedData;
                
                        response.writeHead(200, { "Content-Type": "application/json" });
                        response.write(JSON.stringify(products[i]));
                        response.end();
                    }
                    else{
                        response.writeHead(400, { "Content-Type": "application/json" });
                        response.write(JSON.stringify("Invalid Data Entry"));
                        response.end();

                    }
                }
                else{
                    response.writeHead(404, { "Content-Type": "application/json" });
                    response.write(JSON.stringify(i));
                    response.end();
                }
            });
        }    

            
          
    
    }

    if(request.method === "DELETE" && request.url=== '/home') {
        console.log('In Delete');
        let id = request.headers.id;
        if (id === undefined || id === 0) { 
          response.writeHead(400, { "Content-Type": "application/json" });
          response.write(JSON.stringify("Invalid ID"));
          response.end();
        }
        else{
          
          let res=0;
          products.forEach((rec,i)=> {
            if(rec.ProductId === parseInt(id)){
              
              products.splice(i,1);
              res=1;
              response.writeHead(200, { "Content-Type": "application/json" });
              response.write(JSON.stringify("ID Deleted"));
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
console.log("Started listening on port 9080");    