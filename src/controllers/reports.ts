import express from 'express';
import Model from '../models/report'
const router = express.Router();

router.get("/", async (request, response) => {
  const page = Number(request.query.page) || 1;
  const limit = Number(request.query.limit) || 10;

  const startIndex = (page - 1) * limit;
  const total = await Model.countDocuments();

  const collection = await Model.find().sort({ created_at: -1 }).skip(startIndex).limit(limit);
  response.setHeader("X-Total-Count","10")
  response.setHeader("Access-Control-Expose-Headers","Content-Range")
  response.setHeader("Content-Range","bytes: 0-9/*")
  response.json({
    page, 
    limit, 
    total, 
    pages:Math.ceil(total / limit),
    data:collection
  });
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

// Manual set reports to pending
// For Testing only
router.post("/to-pending", async (request, response) => {
  await Model.updateMany({}, { $set: { status: 'pending' } });
  response.status(201).json().end();
});

router.patch("/:id",  async (request, response) => {
  const id = request.params.id;
  const body = request.body;
  const result = await Model.findOneAndUpdate({ _id: { $eq: id } }, body, {
    returnOriginal: false,
  });
  response.status(200).json(result);
});

router.post("/clean", async (request, response) => {
  await Model.deleteMany({});
  response.json(200).end;
});

export default router;
