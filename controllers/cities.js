const connectDB = require("../config/database");
const city = require("../city");
const Restaurant = require("../models/Restaurant");
const mongoose = require("mongoose");

module.exports = {
  getCity: async (req, res) => {
    const cityName = req.params.city.toLowerCase();
    const cityData = city[cityName];

    if (cityData) {
      const { restaurants } = cityData;
      res.render("city", { cityData, restaurants });
    } else {
      res.status(404).send("City not found");
    }
  },

  getFavorites: async (req, res) => {
    console.log(req.body);
    try {
      const { cityData, restaurants } = req.body;

      // Save the restaurant using Mongoose
      const newRestaurant = await Restaurant.create({
        name: req.body.name,
        price: req.body.price,
        category: req.body.category,
        style: req.body.style,
        description: req.body.description,
        user: req.user.id, // Ensure req.user exists
      });

      console.log("Restaurant saved:", newRestaurant);
      
      res.status(200).json({ message: "Restaurant saved successfully" });
    } catch (err) {
      console.error("Error saving to favorites:", err);
      res.status(500).json({ error: "Server error" });
    }
  },

  getFavoritesPage: async (req, res) => {
    try {
      const favorites = await Restaurant.find({ user: req.user.id }); // Filter by logged-in user
      console.log("Fetched favorites:", favorites);

      res.render("profile", { favorites }); // Pass data to profile.ejs
    } catch (err) {
      console.error("Error fetching favorites:", err);
      res.status(500).send("Server error");
    }
  },
  deleteRestaurant: async (req, res) => {
    
    try {
      // Delete restaurant from db
      console.log(req.params.id )
      await Restaurant.deleteOne({ _id: req.params.id });
      console.log("Deleted Restaurant");
      res.redirect("/favorites");
    } catch (err) {
      res.redirect("/favorites");
    }
  },
};
