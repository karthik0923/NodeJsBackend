const express=require('express');
const  bodyparser=require('body-parser');
const cors=require('cors');
const mysql=require('mysql2');

const app=express();


app.use(cors());
app.use(bodyparser.json());
// to connect mysql
const db=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'userinfo',
    port:3306
});
//check database
db.connect(err=>{
    if(err){console.log('error')}
    console.log('Database connected succssful')
}) 
//get all users
app.get('/users',(req,res)=>{
    //console.log('Get All Users')
    let qrr=`SELECT * FROM users`;
    db.query(qrr,(err,results)=>{
    if(err){console.log(err,'errs')}
    if(results.length>0){
        res.send({
            message:'All users Data',
            data:results
        })
    }
});
});
//get a single use by id
app.get('/users/:id',(req,res)=>{
    console.log(req.params.id);
    let qrId = req.params.id;
    let query=`SELECT * FROM users where id = ${qrId}`;
    db.query(query,(err,results)=>{
        if(err){
            console.log('Error occured',err);
        }if(results.length>0){
            res.send({
                message:'Data for the given id',
                data :results
            })
        }else{
            res.send({
                message:"Data not found"
            })
        }
    })
})
//post operation
app.post('/user',(req,res)=>{
    console.log(req.body,'post data success');
    let fullname=req.body.fullname;
    let email=req.body.email;
    let mobile=req.body.mobile;

    let qr=`insert into users(fullname,email,mobile)value('${fullname}','${email}','${mobile}')`;
    db.query(qr,(err,results)=>{
        if(err){
            console.log(err,'Error occured');
        }
            res.send({
                message:"Data inserted success",
                data:results
            });
    })
})
// update operation
app.put('/user/:id',(req,res)=>{
    //console.log(req.body,"Updated data");
    let UID=req.params.id;
    let fullname=req.body.fullname;
    let email=req.body.email;
    let mobile=req.body.mobile;

    let query=`update users set fullname= '${fullname}',email='${email}',mobile='${mobile}' where id=${UID}`;
    db.query(query,(err,results)=>{
        if(err){console.log('ERRROR OCCURED');}
        res.send({
            message:"Data upadted successfully",
            data:results
        })
    })

})
//delete data
app.delete('/users/:id',(req,res)=>{
    let id=req.params.id;
    let query=`delete from users where id=${id}`;
    db.query(query,(err,results)=>{
        if(err){console.log('Error ocuured');}
        res.send({
            message:"data deleted successfully",
            data:results
        })
    })
})
app.listen(3000,()=>{
console.log("Server is running on port 3000");
})
    
