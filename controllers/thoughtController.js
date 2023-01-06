
const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');



module.exports = {
  
  getThought(req, res) {
    Thought.find()
      .then(async (thought) => {
        return res.json(thought);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  
  getThoughtById(req, res) {
    
  Thought.findOne({ _id: req.params.id })
      .select('-__v')
      .then(async (thought) =>
          res.status(200).json(thought)
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => {
        User.findByIdAndUpdate(
          { _id: req.body.userId },
          { $push: { thoughts: thought } },
          { new: true },
          (err, user) =>{
            if (err) return res.status(500).json(err);
            return res.json(user)
          }
        )
      })
      .catch((err) => res.status(500).json(err));
  },

  deleteThought(req, res) {
  Thought.findOneAndRemove({ _id: req.params.id })
      .then((user) =>
          res.status(200).json(user)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  updateThought(req, res) {
    Thought.findByIdAndUpdate (req.params.id,
      req.body,
      {new: true},
      (err, user) => {
          if (err) return res.status(500).send(err);
          return res.send(user);
      }
    )
  },

  createReaction(req,res){
    Thought.findByIdAndUpdate(
      { _id : req.params.thoughtId },
      { $push: {reactions: req.body}},
      {new: true},
      (err, thought) => {
        if (err) return res.status(500).json(err);
        return res.json(thought);
      }
    )
  },

  deleteReaction(req,res){
    Thought.findByIdAndUpdate(
      { _id : req.params.thoughtId },
      { $pull: {reactions: { reactionId: req.params.reactionId}}},
      {new: true},
      (err, thought) => {
        if (err) return res.status(500).json(err);
        return res.json(thought);
      }
    )
  }
};
