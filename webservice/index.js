const mysql=require('mysql');
const express=require('express');
var app=express();
const bodyparser=require('body-parser');
app.use(bodyparser.json());

 
var mysqlConnection=mysql.createConnection({
    host:'localhost',
    user :'root',
    password:'',
    database:'projet1'



});

mysqlConnection.connect((err)=>
{
    if(!err){
        console.log('DB coonection succeed');
    }
    else console.log('DBconnection failed');

} 
);
app.listen(3000,()=>console.log('Express server is running at port 3000'))
app.get('/user',(req,res)=>{
    mysqlConnection.query('SELECT * FROM user',(err,rows)=>{
        if(!err){
        res.send(rows);
        for (let p of rows)
        {
            console.log(p.id);

        }

    }
        else {
        console.log(err); }

    })
})

 app.get('/user/:id',(req,res)=>
 {
     mysqlConnection.query('SELECT * FROM user WHERE id = ?',[req.params.id],(err,rows)=>
    {
       if(!err)
       res.send(rows)
       else
       console.log(err);


    })
 })
// app.get('/user/bynom/:nom',(req,res)=>
// {
//     mysqlConnection.query('SELECT * FROM user WHERE nom = ?',[req.params.nom],(err,rows)=>
//     {
//         if(!err)
//         res.send(rows);
//         else
//         console.log(err);
//     })
// })
// app.get('/user/byprenom/:prenom',(req,res)=>
// {
//     mysqlConnection.query('SELECT * FROM user WHERE prenom = ?',[req.params.prenom],(err,rows)=>
//     {
//         if(!err)
//         res.send(rows);
//         else
//         console.log(err);
//     })
// })

// app.delete('/user/:id',(req,res)=>{
//     mysqlConnection.query('DELETE FROM user WHERE id = ?',[req.params.id],(err)=>
//     {
//         if(!err)
//         res.send('Deleted successfuly');
//         else
//         console.log(err);
//     })
// })
 app.post('/user/add',(req,res)=>
{
    let u=req.body
    console.log(req);
     var sql ="INSERT INTO user (nom,prenom,email,numtel,password) VALUES (?,?,?,?,?)" ;
    mysqlConnection.query(sql,[u.nom,u.prenom,u.email,u.numtel,u.password],(err)=>{
        if(!err){
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({ "success": 1 , "message" : " user added successfully" },undefined,2));   }     
        else  
        console.log(err); 
    })

})
app.post('/user/update',  (req, res)  =>{
    console.log(req.body);
    sql='UPDATE user SET  email = ? , numtel = ?, password = ? WHERE id = ?';
    
 mysqlConnection.query(sql, [req.body.email,req.body.numtel,req.body.password,req.body.id], (error, results) =>{
    console.log(req.body) 
    if (error) throw error;
	  res.end(JSON.stringify(results));
	});
});



// //rest api to update record into mysql database
// app.post('/user/update',  (req, res)  =>{
//     console.log(req.body);
//     sql='UPDATE user SET  prenom = ? , password = ? WHERE id = ?';
    
//  mysqlConnection.query(sql, [req.body.prenom,req.body.password,req.body.id], (error, results) =>{
//     console.log(req.body) 
//     if (error) throw error;
// 	  res.end(JSON.stringify(results));
// 	});
// });

/////////////////////////////////////****************************************************************************///////////////// */

app.get('/objet',(req,res)=>{
    mysqlConnection.query('SELECT * FROM objet',(err,rows)=>{
        if(!err){
        res.send(rows);
        for (let p of rows)
        {
            console.log(p.id);

        }

    }
        else {
        console.log(err); }

    })
})

app.post('/objet/add',(req,res)=>
{
    let u=req.body
    console.log(req);
     var sql ="INSERT INTO objet (iduser,objet,lieu,description,etat) VALUES (?,?,?,?,?)" ;
    mysqlConnection.query(sql,[u.iduser,u.objet,u.lieu,u.description,u.etat],(err)=>{
        if(!err){
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({ "success": 1 , "message" : " objet added successfully" },undefined,2));   }     
        else  
        console.log(err); 
    })

})

app.post('/message/add',(req,res)=>
{    let u=req.body

    var sql="INSERT INTO message (message,idsender,idreceiver) VALUES (?,?,?)";
    mysqlConnection.query(sql,[u.message,u.idsender,u.idreceiver],(err)=>
    {
        if(!err){
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify({ "success": 1 , "message" : " objet added successfully" },undefined,2));   }     
            else  
            console.log(err); 

    })

})
app.get('/message/:idreceiver',(req,res)=>{
    mysqlConnection.query('SELECT * FROM message where idreceiver = ?',[req.params.idreceiver],(err,rows)=>{
        if(!err){
        res.send(rows);
        for (let p of rows)
        {
            console.log(p.id);

        }

    }
        else {
        console.log(err); }

    })
})

app.post('/test/add',(req,res)=>
{
    let u=req.body
    console.log(req);
     var sql ="INSERT INTO test (nom,address,model,ip,etat) VALUES (?,?,?,?,1)" ;
    mysqlConnection.query(sql,[u.nom,u.adress,u.model,u.ip,u.etat],(err)=>{
        if(!err){
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({ "success": 1 , "message" : " user added successfully" },undefined,2));   }     
        else  
        console.log(err); 
    })

})
app.post('/test/update',  (req, res)  =>{
    console.log(req.body);
    sql='UPDATE test SET  etat = ? , WHERE id = ?';
    
 mysqlConnection.query(sql, [req.body.etat,req.body.id], (error, results) =>{
    console.log(req.body) 
    if (error) throw error;
	  res.end(JSON.stringify(results));
	});
});
app.get('/test',(req,res)=>{
    mysqlConnection.query('SELECT nom,etat FROM test',(err,rows)=>{
        if(!err){
        res.send(rows);
        for (let p of rows)
        {
            console.log(p.id);

        }

    }
        else {
        console.log(err); }

    })
})