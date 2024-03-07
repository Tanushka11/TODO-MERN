const express = require("express");
const { createTodo, updateTodo } = require("./types");
const { todo } = require("./db");
const app = express();
const cors = require("cors")
app.use(cors())

app.use(express.json())

app.post("/todos", async function(req, res) {
    const createPayload = req.body;
    const parsedPayload = createTodo.safeParse(createPayload);

    if (!parsedPayload.success) {
        res.status(411).json({
            msg: "You sent the wrong inputs",
        })
        return;
    }
    // put it in db
    await todo.create({
        title: createPayload.title,
        description: createPayload.description,
        completed: false
    })

    res.json({
        msg: "todo created"
    })
})
app.get("/todos",async (req,res)=>{
    const todos = await todo.find({});
    res.json({
        todos
    })

})
app.put("/completeTodo",async (req,res)=>{
    const id = req.body.id;
    const parsedID = updateTodo.safeParse(id);
    if(!parsedID.success){
        res.status(411).json({
            msg: "wrong id, todo does not exist"
        })
        return;
    }
    await todo.update({
        _id: req.body.id
    },{
        completed: true
    })
    res.json({
        msg: "todo marked as completed"
    })
})

app.listen(3000);