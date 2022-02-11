class Admin{
    #admins=[];
    constructor(){
        this.#admins = [
            {
                Username: 'nayan.rajani@blazeclan.com',
                Password: 'pass@123'
            },
            {
                Username: 'nayan',
                Password: 'nayan@123'
            }
        ];
    }

    validateAdmin(authHeader){
        let credentials = authHeader.split(" ")[1];
        console.log(credentials);
        let userName = credentials.split(":")[0]; 
        let password = credentials.split(":")[1];
        console.log(userName);
        console.log(password);
        for(let i=0;i<this.#admins.length;i++){
            if(userName===this.#admins[i].Username){
                if(password===this.#admins[i].Password){
                    console.log("success!!");
                    return true;
                }
            }
        }
        return false;
    }
}

module.exports = Admin;