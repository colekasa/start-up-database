const { User, Thought } = require("../models");

module.exports = {
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({
        _id: req.params.thoughtId,
      }).select("-__v");

      if (!thought) {
        return res.status(404).json({ message: "No thought with that ID" });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
      console.log(err);
    }
  },

  async createThought(req, res) {
    try {
      // create the new thought
      const thought = await Thought.create(req.body);

      // push the thought's _id to the associated user's thoughts array field
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $push: { thoughts: thought._id } },
        { new: true }
      );
      console.log(user);

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { new: true }
      );

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
      console.log(req.body);
    }
  },
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndDelete({
        _id: req.params.thoughtId,
      });

      if (!thought) {
        return res.status(404).json({ message: "No thought with that ID" });
      }

      res.json({ message: "thought deleted!" });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async createReaction(req, res) {
    try {
      // // Find the thought we want to add a reaction to
      // const thought = await Thought.findById(req.params.thoughtId);

      // if (!thought) {
      //   return res.status(404).json({ message: "No thought with that ID" });
      // }

      // Create the new reaction
      const newReaction = {
        reactionBody: req.body.reactionBody,
        username: req.body.username,
      };

      let thought = await Thought.updateOne(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: newReaction } },
        { new: true }
      );

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
      console.log(err);
    }
  },

  async removeReaction(req, res) {
    try {
      const thoughtId = req.params.thoughtId;
      const reactionId = req.params.reactionId;

      const thought = await Thought.findByIdAndUpdate(thoughtId, {
        $pull: { reactions: { _id: reactionId } },
      });
      if (!thought) {
        return res.status(404).json({ message: "No thought with that ID" });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
