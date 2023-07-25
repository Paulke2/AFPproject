const express = require('express');
const router = express.Router();
const Project = require("../models/projectModel.js");
const mongoose = require('mongoose');

//get all
router.get('/', async(req,res)=>{
    try {
        const plants = await Project.find().sort();
        res.status(200).json(plants);
    }catch (error){
        //status 500 means it is a db error
        res.status(500).json({error: error.message});
    }
});
//get one
router.get('/:Projectid',async (req,res)=>{
    const {Projectid}=req.params;
        if(!mongoose.Types.ObjectId.isValid(Projectid)){
            return res.status(404).json({error: "project not found"});
        }
        const project = await project.findById(Projectid);
        if(!project){
            return res.status(404).json({error: "project not found"});
        }
     res.status(200).json(project);
});
//create one
router.post('/', async(req,res)=>{
    const {name,description,projectid,location}=req.body;

    try{
        const project = await Project.create({name,description,projectid,location});
        res.status(200).json(project);
    }
    catch (error){
        res.status(400).json({error: error.message});
    }

});
//delete one
router.delete('/:Projectid', async(req,res)=>{
    const {Projectid}=req.params;
    if(!mongoose.Types.ObjectId.isValid(Projectid)){
        return res.status(404).json({error: "project not found"});
    }
    const Project = await Project.findOneAndDelete({_id: Projectid});
    if(!Project){
        return res.status(404).json({error: "project not found"});
    }
 res.status(200).json(project);

});

//update 

router.patch('/:Projectid',async(req,res)=>{
    const {projectid}=req.params;
    if(!mongoose.Types.ObjectId.isValid(projectid)){
        return res.status(404).json({error: "project not found"});
    }
    const plant = await project.findOneAndUpdate({_id: projectid},{...req.body});
    if(!plant){
        return res.status(400).json({error: "project not found"});
    }
    return res.status(200).json(plant);
});
module.exports=router;