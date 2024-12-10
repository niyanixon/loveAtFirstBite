const express = require("express");
const router = express.Router();
const city = require("../city");
const homeController = require("../controllers/home");
const cityController = require("../controllers/cities");
const authController = require("../controllers/auth");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Main Routes - simplified for now
router.get("/", homeController.getIndex);
router.get("/main", homeController.getMain);
router.get("/city/:city", ensureAuth, cityController.getCity);
router.get("/favorites", ensureAuth, cityController.getFavoritesPage);
router.post("/city/favorites", ensureAuth, cityController.getFavorites);
router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);
router.get("/logout", authController.logout);
router.get("/signup", authController.getSignup);
router.post("/signup", authController.postSignup);
router.delete("/deleteRestaurant/:id", cityController.deleteRestaurant);

module.exports = router;
