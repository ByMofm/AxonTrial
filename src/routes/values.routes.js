const { Router } = require("express");
const {
  getValues,
  createValues,
  deleteValues,
  updateValues,
  getOneValue,
  getTotalImport
} = require("../controllers/values.controller");

const router = Router();

router.get("/home", getValues);

router.get("/home/:id", getOneValue);

router.post("/home/new", createValues);

router.delete("/home/:id", deleteValues);

router.get("/display", getTotalImport);

router.put("/home/:id", updateValues);

module.exports = router;
