var customers = {
    customer1: {
        firstname: "Jack",
        lastname: "Davis",
        age: 25,
        id: 1
    },
    customer2: {
        firstname: "Mary",
        lastname: "Taylor",
        age: 37,
        id: 2
    },
    customer3: {
        firstname: "Peter",
        lastname: "Thomas",
        age: 17,
        id: 3
    },
    customer4: {
        firstname: "Peter",
        lastname: "Thomas",
        age: 17,
        id: 4
    }
}

let Admins=["Basic nayan.rajani@blazeclan.com:pass@123", "Basic nayan:rajani", "Basic jagdish:rajani"];

exports.create = function(req, res) {
    // read authorization Headers
        let authHeader = req.headers.authorization;
        console.log(`AUTH Headers ${authHeader}`);
        let flag=false;
        for(let i=0;i<Admins.length;i++){
            if(authHeader === Admins[i]){
                flag=true;

                // read crdentials
                // Basic UserName:Password
                let credentials = authHeader.split(" ")[1];
                console.log(`Credentials ${credentials}`);
                let userName = credentials.split(":")[0]; // UserName
                let password = credentials.split(":")[1]; // PAssword
                console.log(userName);
                console.log(password);
                // if (userName === "mahesh" && password === "mahesh") {
                    var newCustomer = req.body;
                    customers["customer" + newCustomer.id] = newCustomer;
                    console.log("--->After Post, customers:\n" + JSON.stringify(customers));
                    res.end("Post Successfully: \n" + JSON.stringify(newCustomer));

                    break;
                }
            }
            if(!flag){
            res.status(401).send({ message: "Credentials are invalid" });
        }       

};

exports.findAll = function(req, res) {
    // read authorization Headers
    let authHeader = req.headers.authorization;
    console.log(`AUTH Headers ${authHeader}`);
    let flag=false;
    for(let i=0;i<Admins.length;i++){
        if(authHeader === Admins[i]){
            flag=true;

            // read crdentials
            // Basic UserName:Password
            let credentials = authHeader.split(" ")[1];
            console.log(`Credentials ${credentials}`);
            let userName = credentials.split(":")[0]; // UserName
            let password = credentials.split(":")[1]; // PAssword
            console.log(userName);
            console.log(password);
            // if (userName === "mahesh" && password === "mahesh") {
                console.log("--->Find All: \n" + JSON.stringify(customers));
                res.end("All Customers: \n" + JSON.stringify(customers));          
                
                break;
            }
    }
    if(!flag){
        res.status(401).send({ message: "Credentials are invalid" });
    } 

};

exports.findOne = function(req, res) {
        // read authorization Headers
        let authHeader = req.headers.authorization;
        console.log(`AUTH Headers ${authHeader}`);
        let flag=false;
        for(let i=0;i<Admins.length;i++){
            if(authHeader === Admins[i]){
                flag=true;
    
                // read crdentials
                // Basic UserName:Password
                let credentials = authHeader.split(" ")[1];
                console.log(`Credentials ${credentials}`);
                let userName = credentials.split(":")[0]; // UserName
                let password = credentials.split(":")[1]; // PAssword
                console.log(userName);
                console.log(password);
                // if (userName === "mahesh" && password === "mahesh") {
                    var customer = customers["customer" + req.params.id];
                    console.log("--->Find customer: \n" + JSON.stringify(customer));
                    res.end( "Find a Customer:\n" + JSON.stringify(customer));         
                    
                    break;
                }
        }
        if(!flag){
            res.status(401).send({ message: "Credentials are invalid" });
        } 

};

exports.update = function(req, res) {

        // read authorization Headers
        let authHeader = req.headers.authorization;
        console.log(`AUTH Headers ${authHeader}`);
        let flag=false;
        for(let i=0;i<Admins.length;i++){
            if(authHeader === Admins[i]){
                flag=true;

                // read crdentials
                // Basic UserName:Password
                let credentials = authHeader.split(" ")[1];
                console.log(`Credentials ${credentials}`);
                let userName = credentials.split(":")[0]; // UserName
                let password = credentials.split(":")[1]; // PAssword
                console.log(userName);
                console.log(password);
                // if (userName === "mahesh" && password === "mahesh") {
                    var id = parseInt(req.params.id);
                    var updatedCustomer = req.body; 
                    if(customers["customer" + id] != null){
                        // update data
                        customers["customer" + id] = updatedCustomer;

                        console.log("--->Update Successfully, customers: \n" + JSON.stringify(customers))

                        // return
                        res.end("Update Successfully! \n" + JSON.stringify(updatedCustomer));

                        break;
                    }
                }
            }
            if(!flag){
            res.status(401).send({ message: "Credentials are invalid" });
        }     

};

exports.delete = function(req, res) {
    // read authorization Headers
    let authHeader = req.headers.authorization;
    console.log(`AUTH Headers ${authHeader}`);
    let flag=false;
    for(let i=0;i<Admins.length;i++){
        if(authHeader === Admins[i]){
            flag=true;

            // read crdentials
            // Basic UserName:Password
            let credentials = authHeader.split(" ")[1];
            console.log(`Credentials ${credentials}`);
            let userName = credentials.split(":")[0]; // UserName
            let password = credentials.split(":")[1]; // PAssword
            console.log(userName);
            console.log(password);
            // if (userName === "mahesh" && password === "mahesh") {
                var deleteCustomer = customers["customer" + req.params.id];
                delete customers["customer" + req.params.id];
                console.log("--->After deletion, customer list:\n" + JSON.stringify(customers) );
                res.end( "Deleted customer: \n" + JSON.stringify(deleteCustomer));

                break;
            }
    }
    if(!flag){
        res.status(401).send({ message: "Credentials are invalid" });
    } 


};