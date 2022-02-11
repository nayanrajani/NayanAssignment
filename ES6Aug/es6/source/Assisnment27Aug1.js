class UserInfo {
    constructor(){
        this.firstName="Nayan";
        this.lastName ="Rajani";
        this.Email1 = "nayan.rajani@blazeclan.com";
        this.Email2= "nayan.rajani@blazeclan.co.in"
        this._Secret  ="Secret key"; // needs to hide this
        this.occupation = "Own Business"; // make it readonly using proxy
    }
}

// Configure the hanldler to prevent all propeties starts from _
// hanlder object for proxy, has 3 methods
// 1. get() to read propeties
// 2. set() to write properties means will write extended behavior
// 3. ownKeys() to check properties in the target object
// when the handler object is pased to the Proxy() object, it has an access 
// of the target object
const handler1={
    // target: the actual object
    // prop: the property form the actual object
    get(target, prop){
        
        if ((target[prop]).endsWith('.com')){
              return "Access Denied";
        
            
        }else{
            // read property values and return it
            let v = target[prop];
            return v;
        }
    },
    // writing data to target object's prop as val 
    set(target,prop,val){
        if ((target[prop]).endsWith('.com')){
            throw new Error('Sorry, this property cannot be written');
       } else {
           target[prop] = val;
           return true;
       }
    },
    // read all properties of the target object
    ownKeys(target){
        let keys = Object.keys(target);
        // filter properties starts with '_'
        let properties = keys.filter((p,i)=>{
            return p[0]!=='_';
        });
        return properties;
    },
    // read values of all properties
    ownValues(target,prop){
        let values = target[prop];
        return values;
    }
};

// handler has an access on an instance of the UserInfo
const proxy1 = new Proxy(new UserInfo(),handler1);


console.log('Consumer that accept .co.in');
// Consumer that accept .co.in
function Consumer1(){

     console.log(Object.keys(proxy1)); // read all properties
     console.log(Object.values(proxy1)); // read all values
     
     console.log(`First Name- ${proxy1.firstName}`);
     console.log(`Last Name- ${proxy1.lastName}`); 
     
     //For Consumer1(), the Email must be supporting 'co.in'
     console.log(`Email: ${proxy1.Email1}`); 
     console.log(`Email: ${proxy1.Email2}`); 

     //readonly secret key
     console.log(`Secret: ${proxy1._Secret}`); 

}
try {
    Consumer1();
}catch(e) {
    console.log(e.message);
}

console.log('--------------------------');
console.log('Consumer that accept .com');

const handler2={
    // target: the actual object
    // prop: the property form the actual object
    get(target, prop){
        
        if ((target[prop]).endsWith('.co.in')){
              return "Access Denied";
        
            
        }else{
            // read property values and return it
            let v = target[prop];
            return v;
        }
    },
    // writing data to target object's prop as val 
    set(target,prop,val){
        if ((target[prop]).endsWith('.co.in')){
            throw new Error('Sorry, this property cannot be written');
       } else {
           target[prop] = val;
           return true;
       }
    },
    // read all properties of the target object
    ownKeys(target){
        let keys = Object.keys(target);
        // filter properties starts with '_'
        let properties = keys.filter((p,i)=>{
            return p[0]!=='_';
        });
        return properties;
    },
    // read values of all properties
    ownValues(target,prop){
        let values = target[prop];
        return values;
    }
};

// handler has an access on an instance of the UserInfo
const proxy2 = new Proxy(new UserInfo(),handler2);

// Consumer that accept .com
function Consumer2(){

    console.log(Object.keys(proxy2)); // read all properties
    console.log(Object.values(proxy2)); // read all values
    
    console.log(`First Name- ${proxy2.firstName}`);
    console.log(`Last Name- ${proxy2.lastName}`); 
    
    //For Consumer2(), only Email of '.com' will be accepted
    console.log(`Email: ${proxy2.Email1}`); 
    console.log(`Email: ${proxy2.Email2}`); 

}
try {
   Consumer2();
}catch(e) {
   console.log(e.message);
}


console.log('--------------------------');
console.log('Consumer Email and Occupation will not be accessible');

const handler3={
    // target: the actual object
    // prop: the property form the actual object
    get(target, prop){
        
        if ((prop.startsWith('Email')) || (prop.startsWith('occupation'))){
              return "Access Denied";
        
            
        }else{
            // read property values and return it
            let v = target[prop];
            return v;
        }
    },
    // writing data to target object's prop as val 
    set(target,prop,val){
       if ((prop.startsWith('Email')) || (prop.startsWith('occupation'))){
        throw new Error('Sorry, this property cannot be written');
       } else {
           target[prop] = val;
           return true;
       }
    },
    // read all properties of the target object
    ownKeys(target){
        let keys = Object.keys(target);
        // filter properties starts with '_'
        let properties = keys.filter((p,i)=>{
            return p[0]!=='_';
        });
        return properties;
    },
    // read values of all properties
    ownValues(target,prop){
        let values = target[prop];
        return values;
    }
};

// handler has an access on an instance of the UserInfo
const proxy3 = new Proxy(new UserInfo(),handler3);

// Consumer Access denied for Email and ocupation
function Consumer3(){

    console.log(Object.keys(proxy3)); // read all properties
    console.log(Object.values(proxy3)); // read all values
    
    console.log(`First Name- ${proxy3.firstName}`);
    console.log(`Last Name- ${proxy2.lastName}`); 
    
    console.log(`Email: ${proxy3.Email1}`); 
    console.log(`Email: ${proxy3.Email2}`); 


    //For Consumer3(), the Email and Occupation will not be accessible
    console.log(`ocuupation: ${proxy3.occupation}`);
}
try {
   Consumer3();
}catch(e) {
   console.log(e.message);
}

console.log('--------------------------');
console.log('Consumer _Secret can be readonly ');

const handler4={
    // target: the actual object
    // prop: the property form the actual object
    get(target, prop){
        
        if ((prop.startsWith('_Secret'))){
              return target[prop];
        
            
        }else{
            // read property values and return it
            let v = target[prop];
            return v;
        }
    },
    // writing data to target object's prop as val 
    set(target,prop,val){
        if ((prop.startsWith('_'))){
            throw new Error('Sorry, this property cannot be written');
       } else {
           target[prop] = val;
           return true;
       }
    },
    // read all properties of the target object
    ownKeys(target){
        let keys = Object.keys(target);
        // filter properties starts with '_'
        let properties = keys.filter((p,i)=>{
            return p[0]!=='_';
        });
        return properties;
    },
    // read values of all properties
    ownValues(target,prop){
        let values = target[prop];
        return values;
    }
};

// handler has an access on an instance of the UserInfo
const proxy4 = new Proxy(new UserInfo(),handler4);

// Consumer Access denied for Email and ocupation
function Consumer4(){

    console.log(Object.keys(proxy4)); // read all properties
    console.log(Object.values(proxy4)); // read all values
    
    console.log(`First Name: ${proxy4.firstName}`);
    console.log(`Last Name: ${proxy4.lastName}`); 
    
    console.log(`Email: ${proxy4.Email1}`); 
    console.log(`Email: ${proxy4.Email2}`); 

    //readonly secret key
    console.log(`Secret: ${proxy4._Secret}`); 
    
    proxy4._Secret ="Service"; // made readonly

    console.log(`Secret: ${proxy4._Secret}`);

}
try {
   Consumer4();
}catch(e) {
   console.log(e.message);
}