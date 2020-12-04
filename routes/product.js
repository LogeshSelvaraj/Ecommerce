const express = require("express");
const router = express.Router();

// middlewares
const { authCheck, authAdminCheck } = require("../middlewares/auth");

// controller
const {
  create,
} = require("../controllers/category");

// routes
router.post("/subcategory", authCheck, authAdminCheck, create);
// router.get("/subcategories", list);
// router.get("/subcategory/:slug", read);
// router.put("/subcategory/:slug", authCheck, authAdminCheck, update);
// router.delete("/subcategory/:slug", authCheck, authAdminCheck, remove);

module.exports = router;
