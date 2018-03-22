const router = require("express").Router();
const Hotel = require("../models").Hotel;
const Restaurant = require("../models").Restaurant;
const Activity = require("../models").Activity;
const Itinerary = require("../models").Itinerary;

router.get("/", (req, res, next) => {
  Promise.all([
    Hotel.findAll({ include: [{ all: true }] }),
    Restaurant.findAll({ include: [{ all: true }] }),
    Activity.findAll({ include: [{ all: true }] })
  ])
    .then(([hotels, restaurants, activities]) => {
      res.json({
        hotels,
        restaurants,
        activities
      });
    })
    .catch(next);
});

router.get("/itineraries/:id", (req, res, next) => {
  Itinerary.findById(req.params.id, {
    include: {all: true, nested: true}
  })
  .then(result => {
    res.json(result);
  });
});

router.post("/itineraries/:id", (req, res, next) => {
  let id = req.params.id;
  let Hotels = req.body[0];
  let Restaurants = req.body[1];
  let Activities = req.body[2];
  let newItinerary;
  
  if (id == "0")
    id = null;
  
  Itinerary.findOrCreate({where: {id}})
  .then(result => {
    newItinerary = result[0];
    return newItinerary.setHotels(Hotels.map(value => value.id), {through: "itinerary-hotel"})
  })
  .then( () => {
    return newItinerary.setRestaurants(Restaurants.map(value => value.id), {through: "itinerary-restaurant"})
  })
  .then( () => {
    return newItinerary.setActivities(Activities.map(value => value.id), {through: "itinerary-activity"})
  })
  .then( () => {
    res.json(newItinerary);
  })
  .catch(error => {
    console.log(error);
    next();
  });



})

module.exports = router;
