const router = require("express").Router();
const thoughtRoutes = require("./thoughtRoutes");
const userRoutes = require("./userRoutes");

router.use("/apps", appRoutes);
router.use("/users", userRoutes);

module.exports = router;
