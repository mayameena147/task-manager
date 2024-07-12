const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const tasks = [
    {
        id: 1,
        title: "Set up environment",
        description: "Install Node.js, npm, and git",
        completed: true,
    },
    {
        "id": 2,
        "title": "Create a new project",
        "description": "Create a new project using Magic",
        "completed": false
    }
];

app.get("/tasks", (req, res) => {
    res.send(tasks);
});

app.get("/tasks/:id", (req, res) => {
    const id = req.params.id;
    const task = tasks.find((task) => task.id === parseInt(id))
    if(!task){
        return res.status(404).send("The task with the given id was not found");
    }
    res.send(tasks.find((task) => task.id === parseInt(id)));
});

app.post("/tasks", (req, res) => {
    const task = req.body;
    if(!task.title || !task.description || typeof task.completed != 'boolean')
    {
        return res.status(400).send("Invalid input");
    }
    task.id =  tasks.length + 1;
    tasks.push(task)
    res.status(201).send(task);
});

app.put("/tasks/:id", (req, res) => {
    const id = req.params.id;
    const body = req.body;
    
    if(!body.title || !body.description || typeof body.completed != 'boolean')
    {
        return res.status(400).send("Invalid input");
    }
    const task =  tasks.find(task => task.id === parseInt(id));

    if(!task){
        return res.status(404).send("The task with the given id was not found");
    }

    task.title = body.title;
    task.description = body.description;
    task.completed = body.completed;
    res.send(task);
});
        
app.delete("/tasks/:id", (req, res) => {
    const id = req.params.id;
    const task = tasks.find((task) => task.id === parseInt(id))
    if(!task){
        return res.status(404).send("The task with the given id was not found");
    }
    const index = tasks.indexOf(task);
    tasks.splice(index, 1);
    res.send(task);
});

app.listen(port, (err) => {
    if (err) {
        return console.log('Something bad happened', err);
    }
    console.log(`Server is listening on ${port}`);
});



module.exports = app;