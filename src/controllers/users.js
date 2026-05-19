const bcrypt = require("bcrypt");
const router = require("express").Router();
const Model = require("../models/user");
const responses = require("../constants/responses");

router.get("/", async (request, response) => {
  const collection = await Model.find({})
    response.setHeader("X-Total-Count","10")
    response.setHeader("Access-Control-Expose-Headers","Content-Range")
    response.setHeader("Content-Range","bytes: 0-9/*")
  response.json(collection);
});

router.get("/:id", async (request, response) => {
  const id = request.params.id.trim();

  const result = await Model.find({ _id: id })

  if (result) {
    result[0].id = result[0]._id.toString()
    response.json(result[0]);
  } else {
    response.status(404).end();
  }
});

router.post("/", async (request, response) => {
  const { username, password, employee, access } = request.body;

  if (password.length < 3) {
    return response.status(400).json({ error: responses.ERR_PASSWORD_INVALID });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const item = new Model({
    username,
    passwordHash,
    employee,
    access,
  });

  const savedItem = await item.save();
  response.status(201).json(savedItem);
});

router.post("/clean", async (request, response) => {
  await Model.deleteMany({});
  response.json(200).end;
});

module.exports = router;
