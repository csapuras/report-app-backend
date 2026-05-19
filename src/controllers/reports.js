const router = require("express").Router();
const Model = require("../models/report");

router.get("/", async (request, response) => {
  const collection = await Model.find({});
  response.setHeader("X-Total-Count","10")
  response.setHeader("Access-Control-Expose-Headers","Content-Range")
  response.setHeader("Content-Range","bytes: 0-9/*")
  response.json(collection);
});

router.get("/:id", async (request, response) => {
  const id = request.params.id.trim();

  const result = await Model.find({ _id: id });
  if (result) {
    result[0].id = result[0]._id.toString()
    response.json(result[0]);
  } else {
    response.status(404).end();
  }
});

router.post("/", async (request, response) => {
  const body = request.body;
  const item = new Model(body);
  const savedItem = await item.save();

  response.status(201).json(savedItem).end();
});

router.post("/clean", async (request, response) => {
  await Model.deleteMany({});
  response.json(200).end;
});

module.exports = router;
