const http = require('http');

// instaed of using http, you can use fetch, axios
// instaed of using q, you can use the bluebird
const q  =require('q');
class ServiceConsumer {
    // options will be the object taht is going to contain
    // the remore server definition 
    getData(options){
        // use the q to set the promise monitor
        let defer  = q.defer();
        let request; // request object
        let products; // obejct to store the result
        if(!options){
            // reject the promise execution
            defer.reject('The Server Information is missing');
        }else {
            request = http.request(options, (result)=>{
                result.on('data', (data)=>{
                    products = data;
                });

                result.on('end', ()=>{
                    try {
                        // if the data received and processed Successfully
                        defer.resolve(products);
                    }catch(ex){
                        // if any error occur
                        defer.reject(`Error Occured ${ex}`);
                    }
                });
            });
        }
        // end the request (Complete it either success /failure)
        request.end();
        // return the promise object
        return defer.promise;
    }

    postData(options){
        // use the q to set the promise monitor
        let defer  =q.defer();
        let request; // request object
        let products; // obejct to store the result
        if(!options){
            // reject the promise execution
            defer.reject('The Server Information is missing');
        }else {
            request = http.request(options, (result)=>{

                result.on('data', (data)=>{
                    // read data and store locally
                    // wrte logic to validate the data, etc
                    products = JSON.parse(data);
                 });
                 // end the request and finally complete the processing
                 result.on('end', ()=>{
                    try {
                        // if the data received and processed Successfully
                        data.push(products)
                        defer.resolve(products);
                    }catch(ex){
                        // if any error occur
                        defer.reject(`Error Occured ${ex}`);
                    }

                    //  ProductDetails.push(receivedData);
                    //  response.end(JSON.stringify(ProductDetails));
                 });

                // result.on('data', (data)=>{
                //     products = data;
                // });

                // result.on('end', ()=>{
                //     try {
                //         // if the data received and processed Successfully
                //         defer.resolve(products);
                //     }catch(ex){
                //         // if any error occur
                //         defer.reject(`Error Occured ${ex}`);
                //     }
                // });
            });
        }
        // end the request (Complete it either success /failure)
        request.end();
        // return the promise object
        return defer.promise;
    }

    putData(options){
        // use the q to set the promise monitor
        let defer  =q.defer();
        let request; // request object
        let products; // obejct to store the result
        if(!options){
            // reject the promise execution
            defer.reject('The Server Information is missing');
        }else {
            request = http.request(options, (result)=>{
                result.on('data', (data)=>{
                    products = data;
                });

                result.on('end', ()=>{
                    try {
                        let res = data.filter((e, i) => {
                            return e.ProductRowId === parseInt(id);
                        });
                        if (res.length === 0){
                            response.write("No Record Found");
                            response.end();
                        }
                        else {
                            let products;
                            request.on('data', (data) => {
                                products = JSON.parse(data);
                            });
                            request.on('end', () => {
                                res[0].ProductRowId=products.ProductRowId;
                                res[0].ProductId=products.ProductId;
                                res[0].ProductName=products.ProductName;
                                res[0].Manufacturer=products.Manufacturer;
                                res[0].CategoryName=products.CategoryName;
                                res[0].Description=products.Description;
                                res[0].BasePrice=products.BasePrice;
                                response.status(200).send({message: "Id deleted"});
                                return;
                            });
                        
                        }

                        // {
                        //     "ProductRowId": 75,
                        //     "ProductId": "Prfgh-iuhu8",
                        //     "ProductName": "okayupdated",
                        //     "Manufacturer": "-updated",
                        //     "CategoryName": "Electronics-updated",
                        //     "Description": "Samrtphone-updated",
                        //     "BasePrice": 67890
                        //   }
                        // if the data received and processed Successfully
                        // data.push(products);
                        defer.resolve(data);
                    }catch(ex){
                        // if any error occur
                        defer.reject(`Error Occured ${ex}`);
                    }
                });
            });
        }
        // end the request (Complete it either success /failure)
        request.end();
        // return the promise object
        return defer.promise;
    }

    deleteData(options){
        // use the q to set the promise monitor
        let defer  =q.defer();
        let request; // request object
        let products; // obejct to store the result
        if(!options){
            // reject the promise execution
            defer.reject('The Server Information is missing');
        }else {
            
            request = http.request(options, (result)=>{
                result.on('data', (data)=>{
                    products = data;
                });

                result.on('end', ()=>{
                    try {
                            let res=0;
                            data.forEach((rec,i)=> {
                              if(rec.products === parseInt(id)){  
                                data.splice(i,1);
                                res=1;
                                
                                response.status(200).send({message: "Id deleted"});
                                return;
                              }
                              
                            });
                           
                            // if(res==0){
                            //   response.writeHead(404, { "Content-Type": "application/json" });
                            //   response.write(JSON.stringify("ID Not Found"));
                            //   response.end();
                            // }
                        // if the data received and processed Successfully
                        // defer.resolve(data);
                    }catch(ex){
                        // if any error occur
                        defer.reject(`Error Occured ${ex}`);
                    }
                });
            });
        }
        // end the request (Complete it either success /failure)
        request.end();
        // return the promise object
        return defer.promise;
    }
}

module.exports = ServiceConsumer;