// import { response } from 'express'
var express = require('express')
var mysql = require('mysql2')
var bodyParser =  require('body-parser')
var cors = require('cors')
const { v4: uuidv4} = require('uuid')
require("dotenv").config();



const app = express()
var con = mysql.createPool ({
    host             : process.env.HOST,
    user             :process.env.ROOT,
    password         :process.env.PASSWORD,
    database         :"todoapp",
    connectionLimit  :10, 
    port             :process.env.DBPORT
})

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.json())



const PORT = 8000
//create connection is where we have to manage everything

app.listen(PORT, ()=> console.log(`server running on port ${PORT}`))

//get todos
app.get('/todos/:userEmail', (req,res) => {
    
    const {userEmail}=req.params
    console.log(userEmail)
    const sqlSelect = "select * from todoapp.todos where user_email = ?";
    con.query(sqlSelect,userEmail,(err,result) => {
        if(err){
            return console.log(err)
        }
         return res.json(result);
        
    })
})

app.post("/todos",(req,res) => {
    console.log("from server : ",req.body.data)
    const { user_email, title, progress, date} = req.body.data

    const id=uuidv4()

    const sqlInsert = "INSERT INTO todoapp.todos (id,user_email,title,progress,date) VALUES (?,?,?,?,?)"
    con.query( sqlInsert, [id, user_email, title, progress, date], (err,result) => {
        if(err) throw err;       
        console.log("result : ",result)
        res.send('todo added')
    }) 
})


//editing todo

app.put('/todos/:id',(req,res) => {
    const {id} = req.params 
    console.log("updating from server : ",req.body.data)
    const {user_email,title, progress,date} = req.body.data
    const sqlUpdate = "UPDATE todoapp.todos set user_email=? ,title = ?, progress =?, date=? where id=?;"
    con.query( sqlUpdate, [user_email,title, progress,date,id], (err,result) => {
        if(err) throw err;       
        console.log("result : ",result)
        res.send('todo updated')
    }) 
})

//deleting todo
app.delete('/todos/:id', (req, res) => {
    const {id} = req.params
    const sqlDelete = "DELETE from todoapp.todos where id=?"
    con.query( sqlDelete, [id], (err, result) => {
        if(err) throw err;
        console.log('todo deleted')
        console.log("deleted item : ",result)
    })
})