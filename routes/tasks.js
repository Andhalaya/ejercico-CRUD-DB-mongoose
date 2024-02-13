
const express = require("express");
const router = express.Router();
const Task = require("../models/task"); 


router.post('/create', async (req, res) => {
    try {
      const { title } = req.body;
      const task = new Task({ title });
      await task.save();
      res.status(201).json(task);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  router.get('/', async (req, res) => {
    try {
      const tasks = await Task.find();
      res.json(tasks);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  router.get('/id/:_id', async (req, res) => {
    try {
      const task = await Task.findById(req.params._id);
      if (task) {
        res.json(task);
      } else {
        res.status(404).json({ message: 'Task not found' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
   
  router.put('/markAsCompleted/:_id', async (req, res) => {
    try {
      const task = await Task.findById(req.params._id);
      if (task) {
        task.completed = true;
        await task.save();
        res.json(task);
      } else {
        res.status(404).json({ message: 'Task not found' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  router.put('/id/:_id', async (req, res) => {
    try {
      const task = await Task.findById(req.params._id);
      if (task) {
        task.title = req.body.title;
        await task.save();
        res.json(task);
      } else {
        res.status(404).json({ message: 'Task not found' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  router.delete('/id/:_id', async (req, res) => {
    try {
      const task = await Task.findById(req.params._id);
      if (task) {
        await task.remove();
        res.json({ message: 'Task deleted' });
      } else {
        res.status(404).json({ message: 'Task not found' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  module.exports = router;