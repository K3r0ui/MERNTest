const express = require("express")
const Task = require ('../models/tasks')
const  router = express.Router();

// Get all tasks
router.get('/task'  , async (req,res) => {
    try {
        const task = await Task.find()
        res.status(200).send(task)
    } catch (error) {
        res.status(400).send("Error message")
    }
} )
// Post new task
router.post('/task',async (req,res)=>{
   const {title,description} = req.body

    try {
        
        const task =await Task.create({title,description})
        res.status(200).send(task)
    } catch (error) {
        res.status(400).send("error")
    }
    
})

// Update task
router.put('/task/:id',async(req,res)=>{
    try {
        const finished = await Task.findById(req.params.id);
        if ( finished.finished){
            const task = await Task.findByIdAndUpdate(
                req.params.id,
                {   
                      title: req.body.title,
                      description: req.body.description,
                      finished: req.body.finished,
                      finished_at: null,
                      updated_at: Date.now()
                      
      
      
                },
                { new: true }
              );
              res.status(200).send(task);
        }else{
            const task = await Task.findByIdAndUpdate(
                req.params.id,
                {   
                      title: req.body.title,
                      description: req.body.description,
                      finished: req.body.finished,
                      finished_at:req.body.finished_at,
                      updated_at: Date.now()
                      
      
      
                },
                { new: true }
              );
              res.status(200).send(task);
        }
        
      } catch {
        return res.status(400).send("Cannot be updated");
      }

})
// Get task by id
router.get('/task/:id',async (req,res) => {
    try {
        const task = await Task.findById(req.params.id)
        res.status(200).send(task)
    } catch (error) {
        res.status(400).send("Error message")
    }
} )
// dfelete task 
router.delete('/task/:id',async(req,res)=>{
    try {
        const task = await Task.findByIdAndRemove(req.params.id);
        res.status(200).send("task deleted sucessfuly");
      } catch {
        res.status(500).send("Error");
      }
})

module.exports = router