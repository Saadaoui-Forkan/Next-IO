import { Schema, model, models } from "mongoose";

const TagSchema = new Schema(
  {
    name: {
      type: String,
    },
    slug: {
      type: String,
      unique: true,
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Tag = models.Tag || model("Tag", TagSchema);

export default Tag;
