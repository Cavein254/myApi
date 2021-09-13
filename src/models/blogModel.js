let mongoose = require("mongoose");
const { Schema } = mongoose;

//create a schema for the blog
const blogschema = new Schema(
  {
    title: {
      type: String,
      required: [true, "You must provide a title"],
      min: 3,
      max: 50,
    },
    content: {
      type: String,
      required: [true, "You must provide the content"],
    },
  },
  { timestamps: true }
);
const BlogModel = mongoose.model("Blog", blogschema);
module.exports = BlogModel;
