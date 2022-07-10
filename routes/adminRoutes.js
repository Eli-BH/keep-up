const router = require("express").Router();
const { tvSearch, createTvRoom } = require("../controllers/adminControllers");
const { protect } = require("../middleware/auth");

router.route("/tvSearch").post(tvSearch);
router.route("/createTvRoom").get(protect, createTvRoom);

module.exports = router;
