const router = require("express").Router();
const { tvSearch, createRoom } = require("../controllers/adminControllers");
const { protect } = require("../middleware/auth");

router.route("/tvSearch").post(tvSearch);
router.route("/createRoom").post(protect, createRoom);

module.exports = router;
