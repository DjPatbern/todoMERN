import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema({
    taskName: { type: String, required: true },
    dateAdded: { type: String, required: true },
    deadline: { type: String, required: true  },
    completed: { type: Boolean, required: true  },
    image: {type: String, required: false},
    userOwner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    }
})

export const TodoModel = mongoose.model("todoLists", TodoSchema)