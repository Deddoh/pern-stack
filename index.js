const express = require('express');
const pg = require('pg');
const cors = require('cors');
const PORT = 4555;
const app = express();
const pool = require('./db');


app.use(cors());
app.use(express.json());

// ROUTES

// create a todo
app.post("/todos", async(req, res)=> {
try{
console.log(req.body)
const {description} = req.body;
const newTodo = await pool.query("INSERT INTO todo (description)  VALUES($1) RETURNING *", [description]) //the $1 specifies the items to be saved, ie it represents description. If we had more fields, we'd include more $ to represent them dynamically.
res.json(newTodo.rows);

} catch (err){
console.error(err.message)
}
}) 

// get all todos
app.get('/todos', async(req, res)=>{
    try{
        let allTodos = await pool.query("SELECT * FROM todo");
        res.json(allTodos.rows);
    }
    catch(error){
        console.log(error.message);
    }
    
})

// get a todo
app.get('/todos/:id', async(req, res)=>{
     try{
        const {id} = req.params;
        const singleTodo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [id])
        res.json(singleTodo.rows);
    }
    catch(error){
        console.error(error.message);
    }
})

// update a todo
app.put('/todos/:id', async(req, res)=>{
    try{
    const {id} = req.params;
    const {description} = req.body;
    let updateTodo = await pool.query("UPDATE todo SET description=$1 WHERE todo_id = $2", [description, id]);
    res.json(updateTodo);
    }
    catch(err){
        console.error(err.message);
    }
})

// delete a todo
app.delete('/todos/:id', async(req, res)=>{
    try{
        const {id} = req.params;
        let deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [id]);
        res.json(deleteTodo);
    }
    catch(error){
        console.error(error.message);
    }
})


app.listen(PORT, ()=> console.log(`Server listening on port: ${PORT}`));


