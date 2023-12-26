const express = require("express");
const router = express.Router();
const appointmentsController = require("../controllers/appointmentsController");
const { verifyToken } = require("../helpers/verifyToken");

router.get("/get_data", verifyToken, appointmentsController.getData);
router.post("/post_data", verifyToken, appointmentsController.postData);
router.delete("/delete_data", verifyToken, appointmentsController.deleteData);

module.exports = router;
