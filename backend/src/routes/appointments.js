const express = require("express");
const router = express.Router();
const appointmentsController = require("../controllers/appointmentsController");

router.get("/get_data", appointmentsController.getData);
router.post("/post_data", appointmentsController.postData);
router.delete("/delete_data", appointmentsController.deleteData);

module.exports = router;
