function putData(auth,prod,id) {
    return new Promise((resolve, reject) => {
        let http = new XMLHttpRequest();     
        http.onload = function () { 
            resolve(http.response); 
        };
        http.onerror = function (e) {
            reject(e); 
        };
        http.open(
            "PUT",
            `http://localhost:9081/api/productDetails/${id}`
        );
        http.setRequestHeader('Authorization',auth);
        http.setRequestHeader('Content-Type','application/json');    
        http.send(JSON.stringify(prod));
    });
}

function getData(auth,id) {
    return new Promise((resolve, reject) => {
        let http = new XMLHttpRequest();     
        http.onload = function () { 
            resolve(http.response); 
        };
        http.onerror = function (e) {
            reject(e); 
        };
        http.open(
            "GET",
            `http://localhost:9081/api/productDetails/${id}`
        );
        http.setRequestHeader('Authorization',auth);    
        http.send();
    });
}


window.onload=function(){
    
    let user=localStorage.getItem('Cred');
    if(user===undefined || user ===null){
        document.getElementById('out').innerHTML="Please Login!<br>Click Log Out to access the login page.";
        document.getElementById('cont').style.display="none";
    }
    else{
    let credentials = user.split(" ")[1];
    let username = credentials.split(":")[0]; 
    document.getElementById('logged').innerHTML=`Hi, ${username.charAt(0).toUpperCase()}${username.slice(1)} `;

    document.getElementById('clrbtn').addEventListener('click',function(){
        let clr=document.getElementsByName('clr');
        for(let i=0;i<clr.length;i++){
            clr[i].value="";
        }
    },false);
    
    let product_id=localStorage.getItem('updateid');
    let response=getData(user,product_id);
    response.then(function(resp){
        
            let prod=JSON.parse(resp);
            document.getElementById('ProductName').value= prod.rows.product_name;
            document.getElementById('Category').value=prod.rows.product_category;
            document.getElementById('Manufacturing').value=prod.rows.product_Manufacturing;
            document.getElementById('Price').value=prod.rows.Product_price;
    }).catch(function(e){
        document.getElementById('msg').innerHTML = e;      
    });




    document.getElementById('sbtbtn').addEventListener('click',function(){
        let product={
            product_id: product_id,
            product_name: document.getElementById('ProductName').value,
            product_category: document.getElementById('Category').value,
            product_Manufacturing: document.getElementById('Manufacturing').value,
            Product_price: parseInt(document.getElementById('Price').value)
        };
        let auth = localStorage.getItem('Cred');
        let response=putData(auth,product,product_id);
        response.then(function(resp){
            console.log(resp);
            document.getElementById('msg').innerHTML = resp;
            document.getElementById('clrbtn').click();
            localStorage.removeItem('updateid');
        }).catch(function(e){
            document.getElementById('msg').innerHTML = e;      
        });
        
    },false);
    
    

    document.getElementById('prod').addEventListener('click',function(){
        localStorage.removeItem('updateid');
        document.getElementById('Product').click();
    },false);
    }
    document.getElementById('logout').addEventListener('click',function(){
        localStorage.clear();
        document.getElementById('Logoutbtn').click();
    },false);
}    