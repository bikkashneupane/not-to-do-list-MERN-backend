import express from "express";
import {
  getTask,
  insertTask,
  updateTask,
  deleteTask,
} from "../model/task/TaskModel.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const tasks = await getTask(req.body);
    console.log(req.body);
    res.json({
      status: "success",
      message: "From Router get",
      tasks,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      messgae: "Something went wrong, try again later",
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const result = await insertTask(req.body);
    result?._id
      ? res.json({
          status: "success",
          message: "New task has been added",
        })
      : res.json({
          status: "error",
          message: "Failed to add new data",
        });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      messgae: "Something went wrong, try again later",
    });
  }
});

// update task
router.patch("/", async (req, res) => {
  try {
    const result = await updateTask(req.body);

    result?._id
      ? res.json({
          status: "success",
          message: "Your task has been updated",
          result,
        })
      : res.json({
          status: "error",
          message: "Your task update failed",
        });
  } catch (error) {
    res.send(500).json({
      status: "error",
      messgae: "Something went wrong, try again later",
    });
  }
});

//delete task
router.delete("/", async (req, res) => {
  try {
    console.log(req.body);
    const result = await deleteTask(req.body);

    result?.deletedCount
      ? res.json({
          status: "success",
          message: "Your task has been deleted",
        })
      : res.json({
          status: "error",
          message: `Unable to delete, try again later `,
        });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      messgae: "Something went wrong, try again later",
    });
  }
});

//delete task
// router.delete("/:_id", async (req, res) => {
//   try {
//     const { _id } = req.params;

//     console.log(req.body);

//     const result = await deleteTask(_id);

//     result?._id
//       ? res.json({
//           status: "success",
//           message: "Your task has been deleted",
//         })
//       : res.json({
//           status: "error",
//           message: `Unable to delete, try again later ${_id}`,
//         });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       status: "error",
//       messgae: "Something went wrong, try again later",
//     });
//   }
// });

export default router;
