const { Router } = require("express");
const {
  getValues,
  createValues,
  deleteValues,
  updateValues,
  getOneValue,
} = require("../controllers/values.controller");

const router = Router();

router.get("/home", getValues);

router.get("/home/:id", getOneValue);

router.post("/home/new", createValues);

router.delete("/home/:id", deleteValues);

router.put("/home/:id", updateValues);

module.exports = router;
