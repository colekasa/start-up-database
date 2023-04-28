const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: function (email) {
        const emailval = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,}$/;
        return emailval.test(email);
      },
    },
  },
  thoughts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Thought",
    },
  ],
  friends: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  toJSON: {
    virtuals: true,
  },
  id: false,
});

userSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

// Initialize our Post model
const User = model("user", userSchema);

module.exports = User;
