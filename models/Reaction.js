//TODO: this is going to only be a schema only and not just a model
const { Schema, Types } = require("mongoose");

const reactionSchema = new Schema({
  reactionId: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId(),
  },
  reactionBody: {
    type: String,
    required: true,
    maxlength: 280,
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: function (timestamp) {
      return require("moment")(timestamp).format("MMM Do YYYY, h:mm:ss a");
    },
  },
});

module.exports = reactionSchema;
