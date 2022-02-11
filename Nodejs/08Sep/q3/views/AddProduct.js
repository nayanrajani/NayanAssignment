function posData(auth,prod) {
    return new Promise((resolve, reject) => {
        let http = new XMLHttpRequest();     
        http.onload = function () { 
            resolve(http.response); 
        };
        http.onerror = function (e) {
            reject(e); 
        };
        http.open(
            "POST",
            `http://localhost:9081/api/productDetails/`
        );
        http.setRequestHeader('Authorization',auth);
        http.setRequestHeader('Content-Type','application/json');    
        http.send(JSON.stringify(prod));
    });
}

window.onload=function(){
    // let categoryList = ['Electrical','Electronics','Food','Fashion','Software','Hardware'];
    // let manufacturerList = ['Tata','IBM','MacD','Bajaj','Google','Microsoft','Amazon'];

    // // create the drop down list
    // function dropDownFunc(dropDownList)
    // {   
    //     var temp = "<option value=''>--Select--</option>";
    //     for(var i in dropDownList)
    //     {
    //         temp+= "<option value='"+dropDownList[i]+"'>"+dropDownList[i]+"</option>";
    //     }
    //     return temp;
    // }   

    let user=localStorage.getItem('Cred');
    if(user===undefined || user===null){
        document.getElementById('out').innerHTML="Please Login!<br>Click Log Out to access the login page.";
        document.getElementById('cont').style.display="none";
    }
    else{
    let user=localStorage.getItem('Cred');
    let credentials = user.split(" ")[1];
    let username = credentials.split(":")[0]; 
    document.getElementById('logged').innerHTML=`Hi, ${username.charAt(0).toUpperCase()}${username.slice(1)} `;

    document.getElementById('clrbtn').addEventListener('click',function(){
        let clr=document.getElementsByName('clr');
        for(let i=0;i<clr.length;i++){
            clr[i].value="";
        }
    },false);

    document.getElementById('sbtbtn').addEventListener('click',function(){
        let Product={
            product_name: document.getElementById('ProductName').value,
            product_category: document.getElementById('Category').value,
            product_Manufacturing: document.getElementById('Manufacturing').value,
            Product_price: parseInt(document.getElementById('Price').value)
          };
        console.log('In sbtbtn');
        let auth = localStorage.getItem('Cred');
        let response=posData(auth,Product);
        response.then(function(resp){
            document.getElementById('msg').innerHTML = resp;
            document.getElementById('clrbtn').click();
        }).catch(function(e){
            document.getElementById('msg').innerHTML = e;      
        });
    },false);


    

    document.getElementById('prod').addEventListener('click',function(){
        document.getElementById('Product').click();
    },false);
}   
document.getElementById('logout').addEventListener('click',function(){
    localStorage.clear();
    document.getElementById('Signoutbtn').click();
},false); 
}