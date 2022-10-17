const router = require("express").Router();
const { body } = require("express-validator");
const {
    getAllUsers,
    getRandomUser,
    saveAUser,
    updateAUser,
    deleteAUser,
    updateBulkUser,
} = require("../controllers/user.controller");

router.get("/user/random", getRandomUser);
router.get("/user/all", getAllUsers);
router.post(
    "/user/save",
    body("id")
        .toInt()
        .isNumeric()
        .notEmpty()
        .withMessage("please provide a integer value"),
    body("gender").notEmpty().withMessage("please provide gender"),
    body("name").notEmpty().withMessage("please provide name"),
    body("contact").notEmpty().withMessage("please provide contact"),
    body("address").notEmpty().withMessage("please provide address"),
    body("photoUrl").notEmpty().withMessage("please provide photoUrl"),
    saveAUser
);
router.patch(
    "/user/update",
    body("id")
        .toInt()
        .isNumeric()
        .notEmpty()
        .withMessage("please provide a integer value"),
    updateAUser
);
router.patch(
    "/user/bulk-update",
    body("ids").isArray().withMessage("please provide an array of IDs"),
    body().notEmpty().withMessage("please provide gender"),
    updateBulkUser
);
router.delete(
    "/user/delete",
    body("id")
        .toInt()
        .isNumeric()
        .notEmpty()
        .withMessage("please provide a integer value"),
    deleteAUser
);

module.exports = router;
