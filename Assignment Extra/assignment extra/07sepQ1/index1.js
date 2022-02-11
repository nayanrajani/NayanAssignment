const express = require('express');
const cors = require('cors');
ProductDetails = [
    {ProductId : '1',ProductName:'Laptop'},
    {ProductId : '2',ProductName:'Mobile'},
    {ProductId : '3',ProductName:'Charger'},
    {ProductId : '4',ProductName:'Earphone'},
    {ProductId : '5',ProductName:'Mouse'}
]

const app = express()


app.use(cors({
    allowedHeaders : "*",
    origin : '*',
    methods : '*'
}
));

app.get('/', (req,res)=>{
    res.sendFile(__dirname + '/index.html');
});

app.get('/api',(req,res)=>{res.json(ProductDetails)})
app.get('/api/:id',(req,res)=>{
    ProductDetails.forEach(element => {
        if(req.params.id == undefined)
        res.send(JSON.stringify(ProductDetails));
        if(element.ProductId  == req.params.id)
        {
            res.send(`Your ProductDetails:- ${JSON.stringify(element)}`)
        }
    });
    res.json(JSON.stringify(ProductDetails))
})

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post('/addProduct',(req,res)=>{
    let flag = 1
    ProductDetails.forEach(element=>{
        if(element.ProductId == req.body.ProductId)
        {
            res.send("Product Id already in use.");
            flag = 0
        }
    })
    if(flag == 1) ProductDetails.push({ProductId : req.body.ProductId , ProductName : req.body.ProductName});
    res.send(`ProductDetails added at Id:- ${req.body.ProductId}`);
})

app.put('/updateProduct',(req, res)=> {
    console.log(req.body);
    ProductDetails.forEach(element=>{
        if(element.ProductId == req.body.ProductId)
        {
            element.ProductName = req.body.ProductName;
            element.ProductId = req.body.ProductId;
            res.send("ProductDetails Updated");
        }
    })
    res.send(`The Id :- ${req.body.ProductId} is not available.`);
})

app.delete('/delete/:id' , (req,res)=>{
    for(let i = 0 ; i < ProductDetails.length ; i++){
        if(ProductDetails[i].ProductId == req.params.id)
        {
            ProductDetails.splice(i,1);
            res.send(`ProductDetails Deleted $`);
        }
    }
    res.send("Id not available");
})
app.listen(9080);
console.log("STarted listening on port 9080");