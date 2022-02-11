function del(id){
    let pid=parseInt(id);
    console.log(pid);
    let auth = localStorage.getItem('Cred');
    let response=delData(auth,pid);
    response.then(function(resp){
        document.getElementById('del').innerHTML = resp;
        allDept();
    }).catch(function(e){
        document.getElementById('del').innerHTML = e;      
    });
}

function upd(id) {
    localStorage.setItem('Product',id.slice(1,));
    document.getElementById('updateProduct').click();
    
}

function setTable(product){
    console.log(product);
    document.getElementById('prod').innerHTML='<table class="table table-bordered table-striped table-hover"><thead id="thead"></thead><tbody id="tbody"></tbody></table>';
    let heads=[];
    let i,j;
    if(product[0]===undefined){//if there is only one record
        let tablehead='<tr class="table-dark">';
        for(i in product){
            heads.push(i);
            tablehead=`${tablehead}<th>${i}</th>`;   
        }
        tablehead=`${tablehead}<th>Update</th><th>Delete</th></tr>`;
        let tablerow="<tr>";
        document.getElementById("thead").innerHTML=tablehead;
        for(i in product){
            tablerow=`${tablerow}<td>${product[i]}</td>`
        }
        tablerow=`${tablerow}<td><input type="button" value="Update" id="U${product.product_id}" onclick="upd(this.id)"></td><td><input type="button" value="Delete" id="D${product.product_id}" onclick="del(this.id)"></td>`;
        document.getElementById("tbody").innerHTML=tablerow;
        
    }else{
        let tablehead='<tr class="table-dark">';
        for(i in product[0]){
            heads.push(i);
            tablehead=`${tablehead}<th>${i}</th>`;   
        }
        tablehead=`${tablehead}<th>Update</th><th>Delete</th></tr>`;
        let tablerow="";
        document.getElementById("thead").innerHTML=tablehead;
        for(i=0;i<product.length;i++){
            tablerow=`${tablerow}<tr>`;
            for(j=0;j<heads.length;j++){
                tablerow=`${tablerow}<td>${product[i][heads[j]]}</td>`;
            }
            tablerow=`${tablerow}<td><input type="button" value="Update" id="${product.product_id}" onclick="upd(this.id)"></td><td><input type="button" value="Delete" id="D${product.product_id}" onclick="del(this.id)"></td>`;
            tablerow=`${tablerow}</tr>`;
        }
        document.getElementById("tbody").innerHTML=tablerow;
    }

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
        if( id === undefined || id===''){
            http.open(
                "GET",
                "http://localhost:9081/api/productDetails/"
            );
        }else{
            http.open(
                "GET",
                `http://localhost:9081/api/productDetails/${id}`
            );
        }
        http.setRequestHeader('Authorization',auth);    
        http.send();
    });
}

function delData(auth,id) {
    return new Promise((resolve, reject) => {
        let http = new XMLHttpRequest();     
        http.onload = function () { 
            resolve(http.response); 
        };
        http.onerror = function (e) {
            reject(e); 
        };
        http.open(
            "DELETE",
            `http://localhost:9081/api/productDetails/${id}`
        );
        http.setRequestHeader('Authorization',auth);    
        http.send();
    });
}

function allDept(id){
    let auth = localStorage.getItem('Cred');
    if(id===undefined||id===''){
        var response = getData(auth);
    }else{
        var response = getData(auth,id);

    }
    response.then(function(resp){
        let prod=JSON.parse(resp);
        //console.log(typeof(prod));
        if(typeof(prod)==='string'){
                document.getElementById('prod').innerHTML = resp;    
        }else{
            console.log(prod.rows);    
            if(parseInt(prod.rowCount)===0){
                document.getElementById('msg').innerHTML="No Records Available for this Product ID";
                document.getElementById('prod').innerHTML="";
            }else{
                setTable(prod.rows); 
                document.getElementById('msg').innerHTML=`${prod.message} Row count : ${prod.rowCount}`;
            }
        }
        
    }).catch(function(e){
        document.getElementById('prod').innerText = e;
        
        
    });
}

window.onload=function(){
    let user=localStorage.getItem('Cred');
    if(user===undefined || user ===null){
        document.getElementById('out').innerHTML="Please Login!<br>Click Log Out to login again.";
        document.getElementById('cont').style.display="none";
    }
    else{
        let credentials = user.split(" ")[1];
        let username = credentials.split(":")[0]; 
        document.getElementById('logged').innerHTML=`Hi, ${username.charAt(0).toUpperCase()}${username.slice(1)} `;

        allDept();
        document.getElementById('searchbtn').addEventListener('click',function(){
            document.getElementById('del').innerHTML="";
            let searchid=document.getElementById('searchid').value;
            document.getElementById('msg').innerHTML="";
            if(searchid===undefined||searchid.length===0||searchid===''){
                allDept();
            }
            else{
                allDept(searchid);
            }
        },false);
    }

    document.getElementById('addpro').addEventListener('click',function(){
        document.getElementById('addProduct').click();
    },false);

    document.getElementById('uppro').addEventListener('click',function(){
        let searchid = document.getElementById('searchid').value;
        if(searchid===undefined||searchid.length===0||searchid===''){
            allDept();
        }
        else{
            localStorage.setItem('updateid', searchid)
            document.getElementById('updateProduct').click();
        }
        
    },false);


    document.getElementById('delpro').addEventListener('click',function(){
        document.getElementById('del').innerHTML="";
        let deleteid = document.getElementById('searchid').value;
        document.getElementById('msg').innerHTML="";
        if(deleteid===undefined||deleteid.length===0||deleteid===''){
            allDept();
        }
        else{
            del(deleteid);
        }
    },false);


    document.getElementById('Signout').addEventListener('click',function(){
        localStorage.clear();
        document.getElementById('Signoutbtn').click();
    },false);
}

    
