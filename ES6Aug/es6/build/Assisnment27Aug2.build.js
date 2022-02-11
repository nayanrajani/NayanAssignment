"use strict";

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Product = function Product() {
  _classCallCheck(this, Product);

  this.ProductId = 1;
  this.ProductName = '';
  this.CategoryName = '';
  this.Manufacturers = '';
  this.Price = 0;
};

var Constants = function Constants() {
  _classCallCheck(this, Constants);

  this.Categories = ['ECT', 'ECL', 'FOD', 'FSN'];
  this.Manufacturers = ['IBM', 'TATA', 'HP', 'Bajaj'];
};

var _validateProduct = /*#__PURE__*/new WeakSet();

var ProductLogic = /*#__PURE__*/function () {
  function ProductLogic() {
    _classCallCheck(this, ProductLogic);

    _validateProduct.add(this);

    this.Products = [{
      ProductId: 1,
      ProductName: 'Laptop',
      CategoryName: 'ECT',
      Manufacturers: 'HP',
      Price: 100000
    }];
  }

  _createClass(ProductLogic, [{
    key: "getProducts",
    value: function getProducts() {
      return this.Products;
    }
  }, {
    key: "registerNewPrtoduct",
    value: function registerNewPrtoduct(product) {
      if (_classPrivateMethodGet(this, _validateProduct, _validateProduct2).call(this).length === 0) {
        this.Products.push(product);
        return this.Products;
      }

      return _classPrivateMethodGet(this, _validateProduct, _validateProduct2).call(this); // return all error messages and shopw on UI
    }
  }, {
    key: "updateProduct",
    value: function updateProduct(ProductLogicObj, updateId) {
      console.log("Update Id:- ", updateId);
      ProductLogicObj.Products.forEach(function (obj) {
        if (obj['ProductId'] == updateId) {
          console.log(obj);
          obj['ProductName'] = document.getElementById('ProductName').value; // document.getElementById('ProductName').value = '';

          obj['CategoryName'] = document.getElementById('CategoryName').value; // document.getElementById('CategoryName').value = ''

          obj['Manufacturers'] = document.getElementById('Manufacturers').value; // document.getElementById('Manufacturers').value = '';

          obj['Price'] = document.getElementById('Price').value; // document.getElementById('Price').value = ''

          console.log("Updated Object:- ", ProductLogicObj.Products); // document.getElementById('Price').style.visibility = 'visible';
          // document.getElementById('updateBtn').style.visibility = 'hidden';

          showTable(ProductLogicObj, ProductLogicObj.Products);
        }
      });
    }
  }, {
    key: "deleteProduct",
    value: function deleteProduct(ProductsLogicObj, deleteId) {
      var ind = 0;
      var res;
      ProductsLogicObj.Products.forEach(function (obj) {
        console.log("Object value:- ", obj);
        console.log("Object Product Id:-", obj['ProductId']);
        console.log(deleteId);

        if (obj['ProductId'] == deleteId) {
          console.log('Inside If condition..');
          res = ProductsLogicObj.Products.splice(ind, 1);
          console.log(ProductsLogicObj.Products);
        }

        ind++;
      }); // if(res.length == '0')
      // {
      //     console.log("Product not found")
      // }
      // else

      showTable(ProductsLogicObj, ProductsLogicObj.Products);
    }
  }, {
    key: "searchProduct",
    value: function searchProduct(prodName) {
      // e.g. criteria will be CategoryName=='ECT', then return all product for ECT
      // if criteria is undefined then return all reoducts
      // { CategoryName : 'ECT' }
      // showTable(this.Products.find(obj=> obj.ProductName == prodName));
      if (typeof this.Products.find(function (obj) {
        return obj.ProductName == prodName;
      }) == 'undefined') {
        console.log("Product value:- ", this.Products);
        showTable(this, this.Products);
      } else {
        console.log("Products value:-", this.Products.find(function (obj) {
          return obj.ProductName == prodName;
        }));
        showTable(this, [this.Products.find(function (obj) {
          return obj.ProductName == prodName;
        })]);
      }
    }
  }, {
    key: "showProductGroup",
    value: function showProductGroup(groupKey) {
      // return all product by groupKey
      var ConsObj = new Constants();

      if (ConsObj.Manufacturers.indexOf(groupKey) !== -1) {
        var temp = [];
        this.Products.forEach(function (item) {
          if (item['Manufacturers'] == groupKey) {
            temp.push(item);
          }
        });
        return temp;
      } else if (ConsObj.Categories.indexOf(groupKey) !== -1) {
        var _temp = [];
        this.Products.forEach(function (item) {
          if (item['CategoryName'] == groupKey) {
            _temp.push(item);
          }
        });
        return _temp;
      } else {
        throw new Error("Not Found..");
      }
    }
  }]);

  return ProductLogic;
}(); // table content generator


function _validateProduct2() {
  // logic for Validations for all products this method will return an array
  // shown validation error messages for each property
  // the Product Name should be UNIQUE so that our functinality to search by product gives us proper 
  // result
  var errors = [];
  return errors;
}

var showTable = function showTable(ProductLogicObj, data) {
  // document.getElementById('dvfilter').innerHTML = dropDownList(['Doctor','Disease','Ward'],'filter',1);
  document.getElementById('tableData').innerHTML = generateHeading() + generateBody(ProductLogicObj, data);
};

var generateHeading = function generateHeading() {
  var field = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Object.keys(new Product());
  var headHTML = "<tr>";

  for (var ind in field) {
    headHTML += "<th>" + field[ind] + "</th>";
  }

  headHTML += "</tr>";
  return headHTML;
};

var generateBody = function generateBody(ProductLogicObj) {
  var DataVal = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new ProductLogic().Products;
  var field = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : Object.keys(new Product());
  console.log("Inside generate body function...", DataVal);

  if (DataVal.length == '0') {
    DataVal = ProductLogicObj.Products;
  }

  var bodyHTML = "";

  for (var ind in DataVal) {
    var rowHTML = "<tr>";

    for (var ind2 in field) {
      rowHTML += "<td id ='entry" + ind + field[ind2] + "'>" + DataVal[ind][field[ind2]] + "</td>"; // console.log(data[ind][field[ind2]]);
      // console.log("entry"+ind+field[ind2])
    }

    bodyHTML += rowHTML;
  }

  return bodyHTML;
};

function dropDownList(ddList, id) {
  var flag = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  var value = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "";
  var temp = "";

  if (flag == 1) {
    console.log("Hello Inside diff drop down");
    temp = "<select id = '".concat(id, "' onchange = \"filterCat()\" required><option value = ''>--Select--</option>");
  } else if (flag == 2) {
    console.log("Hello Inside diff drop down");
    temp = "<select id = '".concat(id, "' onchange = \"filteredCat(").concat(id, ")\" required><option value = ''>--Select--</option>");
  } else console.log(ddList);

  console.log(id);
  temp = "<select id = '".concat(id, "' required><option value = ''>--Select--</option>");
  ddList.map(function (item) {
    console.log(item);
    temp += "<option value='".concat(item, "'>").concat(item, "</option>");
  });
  temp += "</select>";
  return temp;
} // storeData Function to get elements name and store into ProductsLogic class


function storeData(ProductOb) {
  var temp = {};
  Object.keys(ProductOb).forEach(function (ele) {
    if (ele.endsWith('Id')) {
      temp[ele] = ProductOb.ProductId + 1;
      ProductOb.ProductId += 1;
    } else {
      temp[ele] = document.getElementById(ele).value;
      document.getElementById(ele).value = "";
    }

    ;
  });
  console.log(temp);
  return temp;
}

function clear() {
  document.getElementById('ProductName').value = "";
  document.getElementById('CategoryName').value = "";
  document.getElementById('Manufacturers').value = "";
  document.getElementById('Price').value = "";
  window.onload();
}

window.onload = function () {
  var ProductLogicObj = new ProductLogic();
  var ProductObj = new Product();
  var ConstantsObj = new Constants();
  console.log(ConstantsObj.Manufacturers);
  document.getElementById('CategoryNameList').innerHTML = dropDownList(ConstantsObj.Categories, "CategoryName");
  document.getElementById('ManufacturersList').innerHTML = dropDownList(ConstantsObj.Manufacturers, "Manufacturers");
  document.getElementById('Submit').addEventListener('click', function () {
    var data = storeData(ProductObj);
    ProductLogicObj.registerNewPrtoduct(data);
    showTable(ProductLogicObj, ProductLogicObj.Products);
    document.getElementById('functionality').innerHTML = "<input type='text' id='searchPro' placeholder='Search by Name'>  <input type='submit' value='Search' id='btnSearchPro'>&emsp;  <input type='text' id='searchBy' placeholder='Search by Maker'> <input type='submit' value='Search' id='btnSearchCat'><br><br>  <input type='text' id='deleteBy' placeholder='Delete by Product-Id'> <input type='submit' value='Delete' id='btnDelete'>&emsp; <input type='text' id='updateBy' placeholder='Update by Product-Id'> <input type='submit' value='Update' id='btnUpdate'> <br><br>";
    document.getElementById('btnSearchPro').addEventListener('click', function () {
      console.log(ProductLogicObj.searchProduct(document.getElementById('searchPro').value));
    }, false);
    document.getElementById('btnSearchCat').addEventListener('click', function () {
      showTable(ProductLogicObj, ProductLogicObj.showProductGroup(document.getElementById('searchBy').value));
    }, false);
    document.getElementById('btnDelete').addEventListener('click', function () {
      console.log(ProductLogicObj.deleteProduct(ProductLogicObj, document.getElementById('deleteBy').value));
    }, false);
    document.getElementById('btnUpdate').addEventListener('click', function () {
      var updateIdVal = document.getElementById('updateBy').value;
      ProductLogicObj.Products.forEach(function (obj) {
        if (obj['ProductId'] == updateIdVal) {
          document.getElementById('ProductName').value = obj['ProductName'];
          document.getElementById('CategoryName').value = obj['CategoryName'];
          document.getElementById('Manufacturers').value = obj['Manufacturers'];
          document.getElementById('Price').value = obj['Price']; // document.getElementById('Submit').style.visibility = 'hidden';

          document.getElementById('dvButton').innerHTML = document.getElementById('dvButton').innerHTML + "  <input type='submit' id='updateBtn' value='Update Product'>";
          document.getElementById('updateBtn').addEventListener('click', function () {
            ProductLogicObj.updateProduct(ProductLogicObj, updateIdVal);
            clear();
          }, false);
        }
      });
      console.log(ProductLogicObj.updateProduct(ProductLogicObj, updateIdVal));
    }, false);
  }, false);
}; // let ProductObj = new Product();
// console.log(Object.keys(ProductObj));
