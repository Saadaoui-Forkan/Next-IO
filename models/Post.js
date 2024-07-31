import { Schema, model, models } from "mongoose";

const PostSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    parent: {
      type: Schema.Types.ObjectId,
      ref: "Post",
    },
    question: {
      title: {
        type: String,
      },
      answersCount: {
        type: Schema.Types.Number,
        default: 0,
      },
    },
    answer: {
      accepted: {
        type: Boolean,
        default: false,
      },
    },
    content: {
      type: String,
      required: true,
    },
    tags: [
      {
        type: Schema.Types.ObjectId,
        ref: "Tag",
      },
    ],
    votes: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
        type: {
          type: Boolean,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Post = models.Post || model("Post", PostSchema);

export default Post;
