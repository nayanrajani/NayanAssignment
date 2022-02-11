class Product {
    constructor(){
        this.ProductId=1;
        this.ProductName ='';
        this.CategoryName = '';
        this.Manufacturers = '';
        this.Price=0;
    }
}
class Constants {
    constructor(){
        this.Categories = ['ECT','ECL','FOD','FSN'];
        this.Manufacturers =['IBM', 'TATA', 'HP', 'Bajaj'];
    }
}

class ProductLogic {
    constructor(){
        this.Products =[
            {ProductId:1,ProductName:'Laptop', CategoryName:'ECT', Manufacturers:'HP', Price:100000}
        ];
    }

    getProducts(){
        return this.Products;
    }
    #validateProduct(){
        // logic for Validations for all products this method will return an array
        // shown validation error messages for each property
        // the Product Name should be UNIQUE so that our functinality to search by product gives us proper 
        // result
        let errors=[]; 

        return errors;
    }
    registerNewPrtoduct(product){
        if(this.#validateProduct().length === 0) {
            this.Products.push(product);
            return this.Products;
        }
        return this.#validateProduct(); // return all error messages and shopw on UI
    }
    updateProduct(ProductLogicObj,updateId){
        console.log("Update Id:- ",updateId)
        ProductLogicObj.Products.forEach(obj=>{
            if(obj['ProductId'] == updateId){
                console.log(obj);
                obj['ProductName'] = document.getElementById('ProductName').value;
                // document.getElementById('ProductName').value = '';
                obj['CategoryName'] = document.getElementById('CategoryName').value;
                // document.getElementById('CategoryName').value = ''
                obj['Manufacturers'] = document.getElementById('Manufacturers').value;
                // document.getElementById('Manufacturers').value = '';
                obj['Price'] = document.getElementById('Price').value;
                // document.getElementById('Price').value = ''
                console.log("Updated Object:- ",ProductLogicObj.Products);
                // document.getElementById('Price').style.visibility = 'visible';
                // document.getElementById('updateBtn').style.visibility = 'hidden';
                showTable(ProductLogicObj,ProductLogicObj.Products);
            }
        })
    }
    deleteProduct(ProductsLogicObj,deleteId){
        let ind = 0;
        var res;
        ProductsLogicObj.Products.forEach(obj=>{
            console.log("Object value:- ",obj);
            console.log("Object Product Id:-",obj['ProductId']);
            console.log(deleteId);
            if(obj['ProductId'] == deleteId)
            {
                console.log('Inside If condition..');
                res = ProductsLogicObj.Products.splice(ind,1);
                console.log(ProductsLogicObj.Products);
            }
            ind++;
        })
        // if(res.length == '0')
        // {
        //     console.log("Product not found")
        // }
        // else
        showTable(ProductsLogicObj,ProductsLogicObj.Products);
    }
    searchProduct(prodName){
        // e.g. criteria will be CategoryName=='ECT', then return all product for ECT
        // if criteria is undefined then return all reoducts
        // { CategoryName : 'ECT' }
        // showTable(this.Products.find(obj=> obj.ProductName == prodName));
        if(typeof(this.Products.find(obj=> obj.ProductName == prodName)) == 'undefined'){
            console.log("Product value:- ",this.Products);
            showTable(this,this.Products);
        }
        else{
            console.log("Products value:-",this.Products.find(obj=> obj.ProductName == prodName));
            showTable(this,[this.Products.find(obj=> obj.ProductName == prodName)]);
        }
    }

    showProductGroup(groupKey){
        // return all product by groupKey
        let ConsObj = new Constants();
        if(ConsObj.Manufacturers.indexOf(groupKey) !== -1)
        {
            let temp = []
            this.Products.forEach(item=>{
                if(item['Manufacturers'] == groupKey)
                {
                    temp.push(item);
                }
            })
            return temp;
        }
        else if(ConsObj.Categories.indexOf(groupKey)!== -1)
        {
            let temp = []
            this.Products.forEach(item=>{
                if(item['CategoryName'] == groupKey)
                {
                    temp.push(item);
                }
            })
            return temp;

        }
        else
        {
            throw new Error("Not Found..");
        }
    } 
}
// table content generator

let showTable = (ProductLogicObj,data) =>{
    // document.getElementById('dvfilter').innerHTML = dropDownList(['Doctor','Disease','Ward'],'filter',1);
    document.getElementById('tableData').innerHTML = generateHeading() + generateBody(ProductLogicObj,data);
}
let generateHeading = (field = Object.keys(new Product())) => {
    let headHTML = "<tr>";
    for (let ind in field) {
        headHTML += "<th>" + field[ind] + "</th>";
    }
    headHTML += "</tr>"
    return headHTML;
}
let generateBody = (ProductLogicObj,DataVal = new ProductLogic().Products, field = Object.keys(new Product())) => {
    console.log("Inside generate body function...", DataVal);
    if(DataVal.length == '0')
    {
        DataVal = ProductLogicObj.Products;
    }
    let bodyHTML = "";
    for(let ind in DataVal)
    {
        let rowHTML = "<tr>"
        for(let ind2 in field)
        {
            rowHTML += "<td id ='entry"+ind+field[ind2]+"'>"+DataVal[ind][field[ind2]]+"</td>"
            // console.log(data[ind][field[ind2]]);
            // console.log("entry"+ind+field[ind2])
        }
        bodyHTML += rowHTML;
    }
    return bodyHTML;
}


function dropDownList(ddList,id,flag = 0,value=""){
    let temp = "";
    if(flag ==1 )
    {
        console.log("Hello Inside diff drop down");
        temp = `<select id = '${id}' onchange = "filterCat()" required><option value = ''>--Select--</option>`;    
    }
    else if(flag == 2 )
    {
        console.log("Hello Inside diff drop down");
        temp = `<select id = '${id}' onchange = "filteredCat(${id})" required><option value = ''>--Select--</option>`;    
    }
    else
    console.log(ddList);
    console.log(id);
    temp = `<select id = '${id}' required><option value = ''>--Select--</option>`;
    ddList.map(item=>{
        console.log(item);
            temp+= `<option value='${item}'>${item}</option>`;
        }
    )
    temp+= "</select>"
    return temp;
}

// storeData Function to get elements name and store into ProductsLogic class
function storeData(ProductOb)
{
    let temp = {};
    Object.keys(ProductOb).forEach((ele)=>{
        if(ele.endsWith('Id'))
        {
            temp[ele] = ProductOb.ProductId + 1;
            ProductOb.ProductId += 1;
        }
        else
        {
            temp[ele] = document.getElementById(ele).value;
            document.getElementById(ele).value = ""
        };
    })
    console.log(temp);
    return temp;
}

function clear(){
    document.getElementById('ProductName').value = "";
    document.getElementById('CategoryName').value = "";
    document.getElementById('Manufacturers').value = "";
    document.getElementById('Price').value = ""; 
    window.onload();
}

window.onload = ()=>{
    let ProductLogicObj =  new ProductLogic()
    let ProductObj = new Product();
    let ConstantsObj = new Constants();
    console.log(ConstantsObj.Manufacturers);
    document.getElementById('CategoryNameList').innerHTML = dropDownList(ConstantsObj.Categories,"CategoryName");
    document.getElementById('ManufacturersList').innerHTML = dropDownList(ConstantsObj.Manufacturers,"Manufacturers");
    document.getElementById('Submit').addEventListener('click',()=>{
        let data = storeData(ProductObj);
        ProductLogicObj.registerNewPrtoduct(data);
        showTable(ProductLogicObj,ProductLogicObj.Products);
        document.getElementById('functionality').innerHTML = "<input type='text' id='searchPro' placeholder='Search by Name'>  <input type='submit' value='Search' id='btnSearchPro'>&emsp;  <input type='text' id='searchBy' placeholder='Search by Maker'> <input type='submit' value='Search' id='btnSearchCat'><br><br>  <input type='text' id='deleteBy' placeholder='Delete by Product-Id'> <input type='submit' value='Delete' id='btnDelete'>&emsp; <input type='text' id='updateBy' placeholder='Update by Product-Id'> <input type='submit' value='Update' id='btnUpdate'> <br><br>";
        document.getElementById('btnSearchPro').addEventListener('click',()=>{
            console.log(ProductLogicObj.searchProduct(document.getElementById('searchPro').value));
        },false);
        document.getElementById('btnSearchCat').addEventListener('click',()=>{
            showTable(ProductLogicObj,ProductLogicObj.showProductGroup(document.getElementById('searchBy').value));
        },false);
        document.getElementById('btnDelete').addEventListener('click',()=>{
            console.log(ProductLogicObj.deleteProduct(ProductLogicObj,document.getElementById('deleteBy').value));
        },false);
        document.getElementById('btnUpdate').addEventListener('click',()=>{
            let updateIdVal = document.getElementById('updateBy').value;
            ProductLogicObj.Products.forEach(obj=>{
                if(obj['ProductId'] == updateIdVal){
                    document.getElementById('ProductName').value = obj['ProductName'];
                    document.getElementById('CategoryName').value = obj['CategoryName'];
                    document.getElementById('Manufacturers').value = obj['Manufacturers'];
                    document.getElementById('Price').value = obj['Price']; 
                    // document.getElementById('Submit').style.visibility = 'hidden';
                    document.getElementById('dvButton').innerHTML = document.getElementById('dvButton').innerHTML+`  <input type='submit' id='updateBtn' value='Update Product'>`;
                    document.getElementById('updateBtn').addEventListener('click',()=>{
                        ProductLogicObj.updateProduct(ProductLogicObj , updateIdVal); 
                        clear();
                    },false)
                }
            })
            console.log(ProductLogicObj.updateProduct(ProductLogicObj,updateIdVal));
        },false);
    },false)
}
// let ProductObj = new Product();
// console.log(Object.keys(ProductObj));