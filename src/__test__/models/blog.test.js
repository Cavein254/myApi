const mongoose = require("mongoose");
const config = require("../../../config.cjs");
const BlogModel = require("../../models/blogModel.js");
const userPost = { title: "Test this post", content: "Test post content" };
const MONGODB_URI = "mongodb://localhost:27017/test";

describe("User Model Test", () => {
  /*
   *Before running the tests first establish
   *a database connection
   */
  beforeAll(async () => {
    await mongoose.connect(
      MONGODB_URI,
      {
        useNewUrlParser: true,
      },
      (err) => {
        if (err) {
          console.error(err);
          mongoose.disconnect();
        }
      }
    );
  });
  /*
   *After running all tests, clear the
   *database and close the connection
   */
  afterAll(async () => {
    mongoose.connection.dropDatabase(() => {
      mongoose.connection.close();
    });
  });

  //Test whether the model accepts new posts
  test("POST create a post", async () => {
    const post = new BlogModel(userPost);
    const createdPost = await post.save();
    //should have an Id field
    expect(createdPost._id).toBeDefined();
    expect(createdPost.title).toBe(userPost.title);
    expect(createdPost.content).toBe(userPost.content);
  });

  //Test whether the model may accept fewer fields
  //than specified in the schema i.e title
  test("POST sending data with less fields - title", async () => {
    const lakingTitle = new BlogModel({ content: "Test title 2" });
    let error;
    try {
      const saveLakingTitle = await lakingTitle.save();
      err = saveLakingTitle;
    } catch (err) {
      error = err;
    }
    expect(error).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(error.errors.title).toBeDefined();
  });

  //Test whether the model may accept fewer fields
  //than specified in the schema i.e content
  test("POST sending data with less fields - content", async () => {
    const lakingContent = new BlogModel({ title: "Test content 3" });
    let error;
    try {
      const saveLakingContent = await lakingContent.save();
      err = saveLakingContent;
    } catch (err) {
      error = err;
    }
    expect(error).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(error.errors.content).toBeDefined();
  });

  //Test whether the model field are working correctly
  //Whether it can allow more fields than defined in the schema
  test("POST sending data with more fields", async () => {
    const addAuthor = new BlogModel({
      title: "Test title 4",
      content: "Test post content 4",
      author: "Jane Doe",
    });
    const savedAddAuthor = await addAuthor.save();
    expect(savedAddAuthor._id).toBeDefined();
    expect(savedAddAuthor.content).toBeDefined();
    expect(savedAddAuthor.title).toBeDefined();
    expect(savedAddAuthor.author).toBeUndefined();
  });
});
