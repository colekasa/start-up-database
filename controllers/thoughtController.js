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
      const thought = await Thought.findOne({ _id: req.params.userId }).select(
        "-__v"
      );

      if (!thought) {
        return res.status(404).json({ message: "No thought with that ID" });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async createThought(req, res) {
    try {
      const userId = req.params;

      // create the new thought
      const thought = await Thought.create(req.body);

      // push the thought's _id to the associated user's thoughts array field
      const user = await User.findByIdAndUpdate(
        userId,
        { $push: { thoughts: thought._id } },
        { new: true }
      );

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.id },
        { $set: req.body },
        { new: true }
      );
      res.json(thought);
    } catch {
      res.status(500).json(err);
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
      // Find the thought we want to add a reaction to
      const thought = await Thought.findById(req.params.thoughtId);

      if (!thought) {
        return res.status(404).json({ message: "No thought with that ID" });
      }

      // Create the new reaction
      const newReaction = {
        reactionBody: req.body.reactionBody,
        username: req.body.username,
      };

      Thought.updateOne(
        { _id: thoughtId },
        { $push: { reactions: newReaction } },
        { new: true }
      );

      // Save the updated thought
      await thought.save();

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async removeReaction(req, res) {
    try {
      const userId = req.params.userId;
      const reactionId = req.params.friendId;

      // Find the user by ID and remove the friend from their friends array
      const thought = await Thought.findByIdAndUpdate(userId, {
        $pull: { friends: reactionId },
      });

      if (!thought) {
        return res.status(404).json({ message: "No user with that ID" });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
