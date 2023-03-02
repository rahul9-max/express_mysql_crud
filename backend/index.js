const express=require("express");
const app=express()
const cors=require("cors")
const mysql=require("mysql")
// const axios=require("axios")

app.use(cors())
app.use(express.json())

const db=mysql.createConnection({
  user:"root",
  host:"localhost",
  password:"",
  database:"employees"
})
app.post("/create",(req,res)=>{
  const id=req.body.id;
const name=req.body.name;
const country=req.body.country;
const position=req.body.position;
const wage=req.body.wage;

// we don't have to put values directly here in mysql but we make an array
//  after it .the value of the array is the value of the question marks.
db.query("INSERT INTO data(id,name,country,position,wage) VALUES(?,?,?,?,?)",
  [id,name,country,position,wage],
  (err,result)=>{
    if(err){
      console.log(err)
    }
    else{
      res.send(result)
    }
  })
})

app.get("/data",(req,res)=>{
  db.query("SELECT * FROM data ",
  (err,result)=>{
    if(err){
      console.log(err)
    }else{
      res.send(result)
    }
  }
  )
})


app.put("/update",(req,res)=>{
  const id=req.body.id;
  const wage=req.body.wage;
  db.query("UPDATE data SET wage=? where id=?",
  [wage,id],
  (err,result)=>{
    if(err){
      console.log(err)
    }else{
      res.send(result)
    }
  })
})

app.delete("/delete/:id",(req,res)=>{
  id=req.body.id,
  db.query("DELETE FROM data where id=?",id,
  (err,result)=>{
    if(err,result){
      console.log(err)
    }else{
      res.send(result)
    }
  })
})



app.listen(3001, () => {
  console.log("Yey, your server is running on port 3001");
});