var express = require('express');
var router = express.Router();
const {dbUrl,mongodb,MongoClient} = require('../views/dbconfig')
const {hashing, hashCompare} = require('../views/auth')

router.post('/reg', async(req, res) =>{
   const Client = await MongoClient.connect(dbUrl);
  try{
      let db = await Client.db('sample1');
      let user = await db.collection('users').findOne({email:req.body.email})
   
      if(user)
      {
        res.send({
          statusCode:400,
          message:"Already existed"
        })
      }
      else{
        let hashPassword = await hashing(req.body.password);
        req.body.password = hashPassword;
        let doc = await db.collection('users').insertOne(req.body)    
        res.send({
              statusCode:200,
              message:'Account Created'
            })
      }
    }

  catch(error){
    console.log(error)
    res.send({
      statusCode:500,
      message:"server error"
    })
  }
  finally{
    Client.close();
  }
  });




  router.post('/login', async(req, res) =>{
    const Client = await MongoClient.connect(dbUrl);
   try{
       let db = await Client.db('sample1');
       let user = await db.collection('users').findOne({email:req.body.email})
    
       if(!user)
       {
         res.send({
           statusCode:404,
           message:"User not found"
         })
       }
       else{
        //  let hashPassword = await hashing(req.body.password);
        //  req.body.password = hashPassword;
        //  let doc = await db.collection('users').insertOne(req.body)    
        //comparing
        let compare = await hashCompare(req.body.password,user.password)

        if(compare==true){
          res.send({
            statusCode:200,
            message:'Login Successfull'
          })
        }
        else{
          res.send({
            statusCode:400,
            message:'Invalid Password'
          })
        }
       }
     }
 
   catch(error){
     console.log(error)
     res.send({
       statusCode:500,
       message:"server error"
     })
   }
   finally{
     Client.close();
   }
   });
 

module.exports = router;