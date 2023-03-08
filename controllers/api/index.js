const router = require("express").Router();

const userRoutes = require("./userRoutes");
const listItemRoutes = require("./listRoutes");
const productRoutes = require("./productRoutes");
const categoryRoutes = require("./categoryRoutes");

router.use("/users", userRoutes);
router.use("/list", listItemRoutes);
router.use("/products", productRoutes);
router.use("/categories", categoryRoutes);

module.exports = router;
