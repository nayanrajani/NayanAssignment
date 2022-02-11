const path = require("path");
const DALUser = require("./Admin")

// load sequelize object Model
const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("Product", "root", "Nayan@98digisol", {
  host: "localhost",
  dialect: "mysql",
  pool: {
    min: 0,
    max: 5,
    idle: 10000,
  },
  define: {
    timestamps: false,
  },
});

const productModel = require(path.join(__dirname, "./../models/productdetails"))(
  sequelize,
  Sequelize.DataTypes
);

const Admindetails = new DALUser();

// the class will use ES 6+ async and await code for accessing Database using
// sequelize 

class ProductdetailsDataAccess {

  async Signin(req,resp){
    let authHeader = req.headers.authorization;
    console.log("authHeader" + authHeader);
    if(await Admindetails.validateAdmin(authHeader)){
        resp.status(200).send(JSON.stringify(true));   
    }
    else{
        resp.status(400).send({message: false});   
    }
  }

    async getProductdetail(req,resp){
      let authHeader = req.headers.authorization;
      if(Admindetails.validateAdmin(authHeader)){
            await sequelize.sync({force:false});
            let rows = await productModel
        .findAll();
            if(rows) {
              return resp.status(200).send({
                    message: "Data is Read Successfully",
                    rowCount: rows.length,
                    rows: rows,
                  });
            }
            return resp
            .status(500) // internal server error
            .send({ message: "Some Error Occured"}); 
      }
      // return resp.status(401).send({
      //   message: "Invalid User",
      // });
        
    }


    async getProductById(req,resp){
      let authHeader = req.headers.authorization;
      if(Admindetails.validateAdmin(authHeader)){
        let id = parseInt(req.params.id);
        await sequelize.sync({force:false});
        let row = await productModel
    .findOne({where:{product_id:id}});
        if(row) {
           return resp.status(200).send({
                // message: "Data is Read Successfully",
                rows: row,
              });
        }
        return resp
        .status(404) // internal server error
        .send({ message: `Product-${id} is not present, add new Product` }); 
    }
  
  // return resp.status(401).send({
  //   message: "Invalid User",
  // });

}

    async createProduct(req,resp){
      console.log("inside create")
      let authHeader = req.headers.authorization;
      if(Admindetails.validateAdmin(authHeader)){
        const prod  = req.body;
        await sequelize.sync({ force: false });
        let rec = productModel
    .create(prod).then((response)=>{
      console.log(`in then ${response}`);
      return resp.status(200).send( JSON.stringify("Data is Added Successfully"));
    }).catch((err)=>{
      return resp
        .status(500)  
        .send(`Error Occured : ${err.message} The DeptNo may already be present in DataBase`);
    });
  }
  else{
    return resp.status(401).send(JSON.stringify("Credentials Invalid"));
  }


}
    

    async deleteProduct(req, resp){
      let authHeader = req.headers.authorization;
      if(Admindetails.validateAdmin(authHeader)){
        const id = parseInt(req.params.id);
        await sequelize
        .sync({ force: false })
        .then(() => productModel.destroy({
            where:{product_id:id}
        }))
        .then((data) => {
          resp.status(200).send({
            message: "Data is Deleted Successfully",
            rows: data,
          });
        })  
        .catch((error) => {
          resp
            .status(500)  
            .send({ message: "Some Error Occured, please check the id you have passed!", errorDetails: error.message });
        });
      }
      // return resp.status(401).send({
      //   message: "Invalid User",

      // });
    }

    async updateProduct(req, resp){
      let authHeader = req.headers.authorization;
      if(Admindetails.validateAdmin(authHeader)){
        const id = parseInt(req.params.id);
        const pro  = req.body;
        
        await sequelize
        .sync({ force: false })
        .then(() => productModel.update({
            product_name: pro.product_name,
            product_category: pro.product_category,
            product_Manufacturing: pro.product_Manufacturing,
            Product_price: pro.Product_price
        },{
            where:{product_id:id}
        }))
        .then((data) => {
          resp.status(200).send({
            message: "Data is Updated Successfully",
            rows: data,
          });
        })  
        .catch((error) => {
          resp
            .status(500)  
            .send({ message: "Some Error Occured", errorDetails: error.message });
        }); 
      }  
      // return resp.status(401).send({
      //   message: "Invalid User",
 
      // });
    }


}
module.exports = ProductdetailsDataAccess;
  