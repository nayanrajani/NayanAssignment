function login(auth) {
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
            "http://localhost:9081/Signin"
        );
        http.setRequestHeader('Authorization',auth);   
          

         
        http.send();
        
    });
}

window.onload=function() {
    localStorage.clear();
    document.getElementById('sbtbtn').addEventListener('click',function(){
        let auth='Basic ';
        auth=`${auth}${document.getElementById('username').value}:`;
        auth=`${auth}${document.getElementById('password').value}`;
        let response = login(auth);
        response.then(function(resp){
            console.log("inside onload");
            console.log(resp);
            if(resp === 'true'){
                document.getElementById('dvdata').innerHTML = "Valid Credentials";
                localStorage.clear();
                localStorage.setItem('Cred', auth);
                document.getElementById('Products').click();
            }    
            else{
                document.getElementById('dvdata').innerHTML = "UserName or Password may be wrong.<br>Check for spellings or spaces<br>";
            }    
            
        }).catch(function(e){
            document.getElementById('dvdata').innerText = e;
            
        });
    },false);
}