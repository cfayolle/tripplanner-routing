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

router.post("/itineraries", (req, res, next) => {
  console.log(req.body)
  let Hotels = req.body[0];
  let Restaurants = req.body[1];
  let Activities = req.body[2];
  let newItinerary;
  console.log("hotel:", Hotels);
  Itinerary.create()
  .then(result => {
    newItinerary = result;
    return Promise.all(Hotels.map(hotel => {
      result.addHotel(hotel.id, {through: "itinerary-hotel"})
    }))
  })
  .then( () => {
    return Promise.all(Restaurants.map(restaurant => {
      newItinerary.addRestaurant(restaurant.id, {through: "itinerary-restaurant"})
    }))
  })
  .then( () => {
    return Promise.all(Activities.map(activity => {
      newItinerary.addActivity(activity.id, {through: "itinerary-activity"})
    }))
  })
  .then( () => {
    res.json(newItinerary);
  })
  .catch(next);



})

module.exports = router;
