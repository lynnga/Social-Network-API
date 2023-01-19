const { ObjectId } = require("mongoose").Types;
const { User, Thought } = require("../models");

module.exports = {
  getUsers(req, res) {
    User.find()
      .then(async (user) => {
        return res.json(user);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  getUserById(req, res) {
    User.findOne({ _id: req.params.id })
      .select("-__v")
      .then(async (user) => res.status(200).json(user))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },

  deleteUser(req, res) {
    User.findOneAndRemove({ _id: req.params.id })
      .then((user) => res.status(200).json(user))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  updateUser(req, res) {
    User.findByIdAndUpdate(
      req.params.id,
      req.body, 

      { new: true },

      (err, user) => {
        if (err) return res.status(500).send(err);
        return res.send(user);
      }
    );
  },

  postFriend(req, res) {
    User.findByIdAndUpdate(
      { _id: req.params.userId },
      { $push: { friends: req.params.friendId } },
      { new: true },
      (err, friend) => {
        if (err) return res.status(500).send(err);
        return res.send(friend);
      }
    );
  },

  deleteFriend(req, res) {
    User.findByIdAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { new: true },
      (err, friend) => {
        if (err) return res.status(500).send(err);
        return res.send(friend);
      }
    );
  },
};
