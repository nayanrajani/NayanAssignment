const express = require("express");
const cors = require("cors");
const path = require("path");
const dataAccess = require('./dal/dataaccess');

const instance = express();

instance.use(express.urlencoded({ extended: false }));
instance.use(express.json());
instance.use(
  cors({
    origin: "*",
    allowedHeaders: "*",
    methods: "*",
  })
);


// define an instance of the DataAccess
const objDal =new dataAccess();

// REST API with callback
// the calback methdo will be passed with request,response object 

instance.get("/Signin", objDal.Signin);

instance.get("/api/productDetails/", objDal.getProductdetail);

instance.get("/api/productDetails/:id", objDal.getProductById);

instance.delete('/api/productDetails/:id', objDal.deleteProduct);

instance.post("/api/productDetails/", objDal.createProduct);

instance.put('/api/productDetails/:id', objDal.updateProduct);

instance.listen(9081) 
console.log("Listening on Port 9081!!");
 














