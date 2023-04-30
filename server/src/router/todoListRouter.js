import express from "express";
import { TodoModel } from "../model/todoListModel.js";
import { verifyToken } from "./userRouter.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const response = await TodoModel.find({});
    res.json(response);
  } catch (error) {
    res.json(error);
  }
});



router.post("/", verifyToken, async (req, res) => {
  const todoLists = new TodoModel(req.body);
  try {
    const response = await todoLists.save();
    res.json(response);
  } catch (error) {
    res.json(error);
  }
});

router.delete("/:id", async (req, res) => {
  const response = await TodoModel.findByIdAndDelete(req.params.id);
  res.json(response);
});

router.get("/each-task/:id", async (req, res) => {
  try {
    const response = await TodoModel.findById(req.params.id);
    res.json(response);
  } catch (error) {
    console.log(error);
  }
});

// router.post("/:id", async (req,res) => {
//   const response = await TodoModel.findByIdAndUpdate(req.params.id, {"completed": !req.body.completed}, {new: true})
//   res.json(response)
// })

router.put("/edit-task/:id", async (req, res) => {
try {
  const response =  await TodoModel.findByIdAndUpdate(req.params.id, {
    $set: req.body,
  })
  res.json(response)
} catch (error) {
  console.log(error);
}
});

export { router as todoRouter };
