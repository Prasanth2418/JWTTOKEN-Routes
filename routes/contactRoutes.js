const express = require("express");
const router = express.Router();
const {
  getallcontacts,
  createcontact,
  updatecontact,
  deletecontact,
  getcontact,
} = require("../controllers/contactController");
// const validateToken = require("../middleware/validateTokenHandler");

// router.use(validateToken);   
router.route("/").get(getallcontacts);
router.route("/addcontact").post(createcontact);
router.route("/updatecontact/:id").put(updatecontact);
router.route("/deletecontact/:id").delete(deletecontact);
router.route("/:id").get(getcontact);

module.exports = router;
